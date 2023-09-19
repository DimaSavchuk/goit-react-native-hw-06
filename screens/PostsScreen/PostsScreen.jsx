import { View, Image, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../../redux/posts/selectors";

import { globalStyles } from "../../styles/globalStyles";
import { styles } from "./PostsScreenStyles";

import { PostComponent } from "../../components/Post/PostComponent";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { addPost } from "../../redux/posts/postsSlice";
import { auth, db } from "../../firebase/config";
import { useState } from "react";

export const PostsScreen = () => {
  const [user, setUser] = useState(null);
  const userName = auth.currentUser?.displayName;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const posts = useSelector(selectPosts);

  const sortedPosts = [...posts].sort((a, b) => b.data.date - a.data.date);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        try {
          const snapshot = await getDocs(collection(db, "posts"));

          const postsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          dispatch(addPost(postsData));
        } catch (error) {
          console.log(error);
          throw error;
        }
      })();
    }
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={[globalStyles.container, styles.postsContainer]}>
      <View style={styles.profileContainer}>
        <View style={styles.userPhoto}>
          <Image source={require("../../assets/images/photo.png")} />
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>

      <FlatList
        data={sortedPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          console.log(item),
          (
            <PostComponent
              id={item.id}
              postPhoto={item.data.photoUri}
              postName={item.data.photoName}
              commentsNumber={item.data.comments.length}
              locationName={item.data.locationName}
              location={item.data.location}
            />
          )
        )}
      />
    </View>
  );
};
