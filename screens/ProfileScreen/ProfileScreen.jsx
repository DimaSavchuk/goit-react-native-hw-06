import { View, TouchableOpacity, Image, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { selectPosts } from "../../redux/posts/selectors";
import { styles } from "./ProfileScreenStyles";

import { BackgroundComponent } from "../../components/BackgroundComponent";
import { UserPostsComponent } from "../../components/UserPosts/UserPostsComponent";
import { LogoutButtonComponent } from "../../components/LogoutButtonComponent";

import { DeleteIcon } from "../../assets/icons/icons";

import USER_PHOTO from "../../assets/images/photoProfile.png";
import { auth } from "../../firebase/config";

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
          <Image source={USER_PHOTO} />
          <TouchableOpacity style={styles.deletePhotoButton}>
            <DeleteIcon />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>{userName}</Text>

        <FlatList
          data={sortedPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            console.log(item),
            (
              <UserPostsComponent
                id={item.id}
                postPhoto={item.data.photoUri}
                postName={item.data.photoName}
                commentsNumber={item.data.comments.length}
                locationName={item.data.locationName}
                location={item.data.location}
                likes={item.data.likes}
              />
            )
          )}
        />
      </View>
    </BackgroundComponent>
  );
};
