import { useNavigation } from "@react-navigation/native";

import { View, Image, Text, TouchableOpacity } from "react-native";

import { CommentIcon, LocationIcon } from "../../assets/icons/icons";

import { styles } from "./PostComponentStyles";

export const PostComponent = ({
  id,
  postPhoto,
  postName,
  commentsNumber,
  locationName,
  location,
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
          style={styles.image}
        />
      </View>
      <Text style={styles.nameText}>{postName}</Text>
      <View style={styles.aboutContainer}>
        <View style={styles.aboutLeftContainer}>
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
                color: "#BDBDBD",
              },
            ]}
          >
            {commentsNumber}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => handleMapRedirect(location)}
          style={styles.aboutRightContainer}
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
