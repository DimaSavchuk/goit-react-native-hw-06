import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import {
  updateProfile,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../firebase/config";

import { createUser } from "../../redux/auth/authSlice";

import { BackgroundComponent } from "../../components/BackgroundComponent/BackgroundComponent";

import { AddIcon } from "../../assets/icons/icons";

import { globalStyles } from "../../components/styles/globalStyles";
import { styles } from "./RegistrationScreenStyled";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const updateUserProfile = async (user) => {
    if (user) {
      try {
        await updateProfile(user, { displayName: login });
      } catch (error) {
        throw error;
      }
    }
  };

  const togglePassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const handleSingUp = () => {
    console.log({ login, email, password });

    fetchSignInMethodsForEmail(auth, email)
      .then((signInMethods) => {
        if (signInMethods.length > 0) {
          alert("Something went wrong, maybe such a user already exists");
        } else {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userInfo) => {
              const user = userInfo.user;
              updateUserProfile(user);
              dispatch(createUser({ email, password }));
              navigation.navigate("Home");
            })
            .catch((error) => {
              alert(error.message);
            });
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <BackgroundComponent>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={[
                  styles.formWrapper,
                  {
                    paddingBottom: isKeyboardVisible ? 32 : 78,
                    height: isKeyboardVisible ? 374 : "auto",
                  },
                ]}
              >
                <View style={styles.userPhoto}>
                  <TouchableOpacity style={styles.addPhoto}>
                    <AddIcon fill={"#FF6C00"} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.title}>Реєстрація</Text>
                <TextInput
                  style={[styles.commonText, styles.input]}
                  placeholder="Логін"
                  textContentType="username"
                  value={login}
                  onChangeText={setLogin}
                  onFocus={() => setIsKeyboardVisible(true)}
                  onBlur={() => setIsKeyboardVisible(false)}
                ></TextInput>
                <TextInput
                  style={[styles.commonText, styles.input]}
                  placeholder="Адреса електронної пошти"
                  textContentType="emailAddress"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setIsKeyboardVisible(true)}
                  onBlur={() => setIsKeyboardVisible(false)}
                ></TextInput>
                <View>
                  <TextInput
                    style={[styles.commonText, styles.input]}
                    placeholder="Пароль"
                    textContentType="password"
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setIsKeyboardVisible(true)}
                    onBlur={() => setIsKeyboardVisible(false)}
                    secureTextEntry={isPasswordHidden}
                  />
                  <TouchableOpacity
                    style={styles.showPasswordButton}
                    onPress={togglePassword}
                  >
                    {password !== "" && (
                      <Text>{isPasswordHidden ? "Показати" : "Сховати"}</Text>
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button}>
                  <Text
                    style={[styles.commonText, styles.buttonText]}
                    onPress={handleSingUp}
                  >
                    Зареєстуватися
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={[styles.commonText, styles.loginLink]}>
                    Вже є акаунт? Увійти
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </BackgroundComponent>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};
