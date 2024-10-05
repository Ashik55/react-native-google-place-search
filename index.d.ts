declare module "react-native-google-place-search" {
  import React from "react";
  import { StyleProp, ViewStyle, TextStyle } from "react-native";

  interface GooglePlaceSearchProps {
    apiKey: string;
    onPlaceSelected: (place: any) => void;
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
    minimumQueryLength?: number;
  }

  const GooglePlaceSearch: React.FC<GooglePlaceSearchProps>;

  export default GooglePlaceSearch;
}
