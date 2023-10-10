import { Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CommentIcon, LikeIcon, LocationIcon } from "../../assets/icons/icons";

import { styles } from "./UserPostsComponentStyled";

export const UserPostsComponent = ({
  id,
  path,
  name,
  commentsNumber,
  country,
  coords,
  likes,
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
          style={{ width: "100%", height: 240, borderRadius: 8 }}
        />
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", gap: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <TouchableOpacity onPress={() => handleCommentsRedirect(path)}>
              <CommentIcon fill="#FF6C00" stroke="#FF6C00" />
            </TouchableOpacity>

            <Text
              style={[
                styles.text,
                {
                  color: "#212121",
                },
              ]}
            >
              {commentsNumber}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <LikeIcon />
            <Text
              style={[
                styles.text,
                {
                  color: "#212121",
                },
              ]}
            >
              {likes}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
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
