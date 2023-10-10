import { ImageBackground } from "react-native";

import { globalStyles } from "../styles/globalStyles";

import BACKGRAUND from "../../assets/images/background.jpg";

export const BackgroundComponent = ({ children }) => {
  return (
    <ImageBackground
      source={BACKGRAUND}
      resizeMode="cover"
      style={globalStyles.image}
    >
      {children}
    </ImageBackground>
  );
};
