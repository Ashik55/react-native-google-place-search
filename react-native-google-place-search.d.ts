declare module "react-native-google-place-search" {
  import React from "react";
  import { ViewStyle, TextStyle, StyleProp } from "react-native";

  interface Place {
    description: string;
    place_id: string;
  }

  interface PlaceDetails {
    lat: number;
    lng: number;
  }

  interface GooglePlaceSearchProps {
    onPlaceSelected: (place: Place & Partial<PlaceDetails>) => void;
    placeholder?: string;
    shouldShowPoweredLogo?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    placeItemStyle?: StyleProp<ViewStyle>;
    placeTextStyle?: StyleProp<TextStyle>;
    listFooterComponent?: React.ReactNode;
    listFooterStyle?: StyleProp<ViewStyle>;
    listHeaderComponent?: React.ReactNode;
    listHeaderStyle?: StyleProp<ViewStyle>;
    apiKey: string;
    minimumQueryLength?: number;
  }

  const GooglePlaceSearch: React.FC<GooglePlaceSearchProps>;

  export default GooglePlaceSearch;
}
