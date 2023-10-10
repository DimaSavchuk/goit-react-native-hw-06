import { View, TouchableOpacity, Image, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { selectPosts } from "../../redux/posts/selectors";

import { auth } from "../../firebase/config";

import { BackgroundComponent } from "../../components/BackgroundComponent/BackgroundComponent";
import { UserPostsComponent } from "../../components/UserPostsComponent//UserPostsComponent";
import { LogoutButtonComponent } from "../../components/LogoutButtonComponent/LogoutButtonComponent";

import { DeleteIcon } from "../../assets/icons/icons";

import { styles } from "./ProfileScreenStyles";

import USERPHOTO from "../../assets/images/userProfile.png";

export const ProfileScreen = () => {
  const posts = useSelector(selectPosts);
  const userName = auth.currentUser?.displayName;

  const sortedPosts = [...posts].sort((a, b) => b.data.date - a.data.date);

  return (
    <BackgroundComponent>
      <View style={styles.wrapper}>
        <TouchableOpacity style={{ position: "absolute", right: 16, top: 22 }}>
          <LogoutButtonComponent />
        </TouchableOpacity>
        <View style={styles.photoContainer}>
          <Image source={USERPHOTO} />
          <TouchableOpacity style={styles.deletePhotoButton}>
            <DeleteIcon />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>{userName}</Text>

        <FlatList
          data={sortedPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UserPostsComponent
              id={item.id}
              path={item.data.photoUri}
              name={item.data.photoName}
              commentsNumber={item.data.comments.length}
              country={item.data.locationName}
              coords={item.data.location}
              likes={item.data.likes}
            />
          )}
        />
      </View>
    </BackgroundComponent>
  );
};
