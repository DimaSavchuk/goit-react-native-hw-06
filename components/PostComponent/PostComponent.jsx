import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CommentIcon, LocationIcon } from "../../assets/icons/icons";

import { styles } from "./PostComponentStyled";

export const PostComponent = ({
  id,
  path,
  name,
  commentsNumber,
  country,
  coords,
}) => {
  const navigation = useNavigation();

  const handleCommentsRedirect = (path) => {
    navigation.navigate("Comments", { path: path, id: id });
  };

  const handleMapRedirect = (coords) => {
    navigation.navigate("Map", { coords: coords });
  };

  return (
    <View style={{ marginBottom: 32 }}>
      <View style={{ marginBottom: 8 }}>
        <Image
          source={typeof path === "number" ? path : { uri: path }}
          resizeMode={"cover"}
          style={styles.image}
        />
      </View>
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.aboutContainer}>
        <View style={styles.aboutLeftContainer}>
          <TouchableOpacity onPress={() => handleCommentsRedirect(path)}>
            <CommentIcon />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              {
                color: "#BDBDBD",
              },
            ]}
          >
            {commentsNumber}
          </Text>
        </View>
        <View style={styles.aboutRightContainer}>
          <TouchableOpacity onPress={() => handleMapRedirect(coords)}>
            <LocationIcon />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              {
                color: "#212121",
                textDecorationLine: "underline",
              },
            ]}
          >
            {country}
          </Text>
        </View>
      </View>
    </View>
  );
};
