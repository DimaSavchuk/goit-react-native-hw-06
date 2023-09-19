import { useNavigation } from "@react-navigation/native";

import { Image, Text, View, TouchableOpacity } from "react-native";

import { CommentIcon, LikeIcon, LocationIcon } from "../../assets/icons/icons";

import { styles } from "./UserPostsComponentStyles";

export const UserPostsComponent = ({
  id,
  postPhoto,
  postName,
  commentsNumber,
  locationName,
  location,
  likes,
}) => {
  const navigation = useNavigation();

  const handleCommentsRedirect = (postPhoto) => {
    navigation.navigate("Comments", { postPhoto: postPhoto, id: id });
  };

  const handleMapRedirect = (location) => {
    navigation.navigate("Map", { location: location });
  };

  return (
    <View style={{ marginBottom: 32 }}>
      <View style={{ marginBottom: 8 }}>
        <Image
          source={
            typeof postPhoto === "number" ? postPhoto : { uri: postPhoto }
          }
          resizeMode={"cover"}
          style={{ width: "100%", height: 240, borderRadius: 8 }}
        />
      </View>
      <Text style={styles.postName}>{postName}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", gap: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <TouchableOpacity onPress={() => handleCommentsRedirect(postPhoto)}>
              {commentsNumber === 0 ? (
                <CommentIcon />
              ) : (
                <CommentIcon fill="#FF6C00" stroke="#FF6C00" />
              )}
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

        <TouchableOpacity
          onPress={() => handleMapRedirect(location)}
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
        >
          <LocationIcon />
          <Text
            style={[
              styles.text,
              {
                color: "#212121",
                textDecorationLine: "underline",
              },
            ]}
          >
            {locationName}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
