import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";

import { styles } from "./MapScreenStyled";

export const MapScreen = () => {
  const route = useRoute();
  const coords = route.params?.coords;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...coords,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={1}
      >
        {coords && <Marker title="You are here" coordinate={coords} />}
      </MapView>
    </View>
  );
};
