import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import uuid from "react-native-uuid";

import { CommentComponent } from "../../components/CommentComponent/CommentComponent";

import { ArrowUp } from "../../assets/icons/icons";

import { globalStyles } from "../../components/styles/globalStyles";
import { styles } from "./CommentsScreenStyles";

import USER_PHOTO from "../../assets/images/userPhoto.png";
import { useEffect } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { FlatList } from "react-native";

export const CommentsScreen = () => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState([]);

  const route = useRoute();
  const { path } = route.params;
  console.log(route.params);
  const { id } = route.params;
  const currentDate = Date.now();

  const updateDataInFirestore = async (collectionName, docId) => {
    try {
      const ref = doc(db, collectionName, docId);

      await updateDoc(ref, {
        comments: [
          ...comments,
          { comment: inputValue, currentDate, id: uuid.v4() },
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setInputValue("");
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));

        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        const comments = postsData.find((post) => post.id === id).data.comments;

        setComments(comments);
      } catch (error) {
        console.log(error);
        throw error;
      }
    })();
  }, [inputValue]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <View
          style={[
            globalStyles.container,
            styles.container,
            {
              paddingBottom: isKeyboardShown ? 90 : 16,
            },
          ]}
        >
          <Image
            source={typeof path === "number" ? path : { uri: path }}
            resizeMode={"cover"}
            style={styles.image}
          />

          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CommentComponent
                img={USER_PHOTO}
                text={item.comment}
                date={item.currentDate}
                direction={"row-reverse"}
                textAlign={"left"}
              />
            )}
          />
          <View>
            <TextInput
              onFocus={() => setIsKeyboardShown(true)}
              onBlur={() => setIsKeyboardShown(false)}
              style={styles.input}
              placeholder="Коментувати..."
              value={inputValue}
              onChangeText={setInputValue}
            />
            <TouchableOpacity
              style={styles.sendMessageButton}
              onPress={() => updateDataInFirestore("posts", id)}
            >
              <ArrowUp />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
