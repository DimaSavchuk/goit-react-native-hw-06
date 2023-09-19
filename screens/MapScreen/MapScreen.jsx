import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";

import { styles } from "./MapScreenStyles";

export const MapScreen = () => {
  const route = useRoute();
  const { coords } = route.params;
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
      >
        {coords && (
          <Marker
            title="You are here"
            coordinate={{
              latitude: coords.location.latitude,
              longitude: coords.location.longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
};
