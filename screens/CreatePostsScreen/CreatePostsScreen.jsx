import { globalStyles } from "../../styles/globalStyles";
import { styles } from "./CreatePostsScreenStyles";

import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { CameraIcon, LocationIcon, TrashIcon } from "../../assets/icons/icons";

export const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
      })();
    }
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const writeDataToFirestore = async () => {
    const currentDate = Date.now();

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        photoName,
        locationName,
        photoUri,
        location,
        likes: 0,
        comments: [],
        date: currentDate,
      });

      console.log(docRef.id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const clearData = () => {
    setPhotoName("");
    setLocationName("");
    setPhotoUri(null);
  };

  const handlePostPhoto = () => {
    writeDataToFirestore();
    navigation.navigate("Home", { screen: "Posts" });
    clearData();
  };

  const makePhoto = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setPhotoUri(uri);
    }
  };

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
              paddingBottom: isKeyboardVisible ? 50 : 34,
            },
          ]}
        >
          <View>
            {photoUri ? (
              <View style={styles.photoContainer}>
                <Image source={{ uri: photoUri }} style={styles.photo} />
              </View>
            ) : (
              <Camera
                style={styles.photoContainer}
                type={Camera.Constants.Type.back}
                ref={cameraRef}
              >
                <TouchableOpacity onPress={makePhoto}>
                  <View style={styles.photoIcon}>
                    <CameraIcon />
                  </View>
                </TouchableOpacity>
              </Camera>
            )}

            <Text style={styles.text}>Завантажте фото</Text>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Назва..."
                value={photoName}
                onChangeText={setPhotoName}
                onFocus={() => setIsKeyboardVisible(true)}
                onBlur={() => setIsKeyboardVisible(false)}
              />
              <View style={[styles.input, styles.locationInputContainer]}>
                <LocationIcon />
                <TextInput
                  style={[styles.input, styles.locationInput]}
                  placeholder="Місцевість..."
                  value={locationName}
                  onChangeText={setLocationName}
                  onFocus={() => setIsKeyboardVisible(true)}
                  onBlur={() => setIsKeyboardVisible(false)}
                />
              </View>
            </View>
            {photoName !== "" && locationName !== "" && photoUri !== null ? (
              <TouchableOpacity
                style={globalStyles.button}
                onPress={handlePostPhoto}
              >
                <Text style={globalStyles.buttonText}>Опубліковати</Text>
              </TouchableOpacity>
            ) : (
              <View style={globalStyles.disabledButton}>
                <Text style={globalStyles.disabledButtonText}>
                  Опубліковати
                </Text>
              </View>
            )}
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            onPress={() => {
              setPhotoUri(null);
            }}
          >
            <View style={styles.bottomContainer}>
              <TrashIcon />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
