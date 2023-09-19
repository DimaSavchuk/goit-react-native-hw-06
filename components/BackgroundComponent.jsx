import React from "react";
import { ImageBackground } from "react-native";

import { globalStyles } from "../styles/globalStyles";
import BACK_GROUND from "../assets/images/background.jpg";

export const BackgroundComponent = ({ children }) => {
  return (
    <ImageBackground
      source={BACK_GROUND}
      resizeMode="cover"
      style={globalStyles.image}
    >
      {children}
    </ImageBackground>
  );
};
