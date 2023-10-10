import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";

import { logIn } from "../../redux/auth/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

import { BackgroundComponent } from "../../components/BackgroundComponent/BackgroundComponent";

import { globalStyles } from "../../components/styles/globalStyles";
import { styles } from "./LoginScreenStyles";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Home");
    }
  }, [isLoggedIn, navigation]);

  const handleSubmit = async () => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(logIn({ email, password }));
      navigation.navigate("Home");
      return credentials.user;
    } catch (error) {
      alert(error.message);
    }
  };

  const togglePassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
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
                    paddingBottom: isKeyboardVisible ? 32 : 111,
                    height: isKeyboardVisible ? 248 : "auto",
                  },
                ]}
              >
                <Text style={styles.title}>Увійти</Text>
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
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={[styles.commonText, styles.buttonText]}>
                    Увійти
                  </Text>
                </TouchableOpacity>
                <View style={styles.signInContainer}>
                  <Text style={[styles.commonText, styles.signInText]}>
                    Немає акаунту?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Registration")}
                  >
                    <Text
                      style={[
                        styles.commonText,
                        styles.signInText,
                        styles.signInLink,
                      ]}
                    >
                      Зареєструватися
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </BackgroundComponent>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};
