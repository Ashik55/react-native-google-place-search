import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import debounce from "lodash.debounce";

const GooglePlaceSearch = (props) => {
  const {
    onPlaceSelected,
    placeholder = "Search for a place",
    containerStyle,
    inputStyle,
    placeItemStyle,
    placeTextStyle,
    apiKey,
    minimumQueryLength = 3,
  } = props;

  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!apiKey) {
      setError(
        "API Key is missing. Please provide a valid Google Places API key."
      );
    }
  }, [apiKey]);

  const fetchPlaces = async (text) => {
    if (text.length < minimumQueryLength) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
        {
          params: {
            input: text,
            key: apiKey,
            types: "geocode",
          },
        }
      );
      setPlaces(response.data.predictions);
    } catch (error) {
      setError("Error fetching places. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchPlaces = useRef(
    debounce((text) => fetchPlaces(text), 500)
  ).current;

  useEffect(() => {
    return () => {
      debouncedFetchPlaces.cancel();
    };
  }, []);

  const fetchPlaceDetails = async (placeId) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: placeId,
            key: apiKey,
            fields: "name,formatted_address,geometry,place_id",
          },
        }
      );
      const { lat, lng } = response.data.result.geometry.location;
      return { lat, lng };
    } catch (error) {
      console.error("Error fetching place details: ", error);
      return null;
    }
  };

  const handleSelectPlace = async (place) => {
    setPlaces([]);
    setQuery(place.description);
    inputRef.current?.blur();

    const details = await fetchPlaceDetails(place.place_id);
    if (details) {
      onPlaceSelected({ ...place, ...details });
    } else {
      onPlaceSelected(place);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        ref={inputRef}
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          debouncedFetchPlaces(text);
        }}
      />
      {loading && <ActivityIndicator />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={places}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelectPlace(item)}
            style={[styles.placeItem, placeItemStyle]}
          >
            <Text style={[styles.placeText, placeTextStyle]}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    fontSize: 14,
    lineHeight: 18,
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 8,
  },
  placeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  placeText: {
    fontSize: 16,
  },
});

export default GooglePlaceSearch;
