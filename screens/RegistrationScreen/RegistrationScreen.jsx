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
} from "react-native";

import { globalStyles } from "../../styles/globalStyles";
import { styles } from "./RegistrationScreenStyles";

import { BackgroundComponent } from "../../components/BackgroundComponent";

import { AddIcon } from "../../assets/icons/icons";

import { Formik } from "formik";
import * as yup from "yup";
import { SafeAreaView } from "react-native";
import { StyledBtn } from "../../components/StyledBtn/StyledBtn";
import { useDispatch } from "react-redux";

import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { createUser } from "../../redux/auth/authSlice";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введіть правильний email")
    .required("Email є обов'язковим полем"),
  password: yup
    .string()
    .min(6, "Password повинен містити принаймні 6 символів")
    .required("Password є обов'язковим полем"),
});

export const RegistrationScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const [login, setLogin] = useState("");

  const togglePasswordVisible = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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

  const handleSubmit = (values, { resetForm }) => {
    const { email, password } = values;
    console.log(`
    Login: ${login}
    Email: ${email}
    Password: ${password}
    `);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {
        const user = userInfo.user;
        updateUserProfile(user);
        dispatch(createUser({ email, password }));
        resetForm();
        navigation.navigate("Home");
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
                    paddingBottom: isKeyboardShown ? 32 : 78,
                    height: isKeyboardShown ? 374 : "auto",
                  },
                ]}
              >
                <View style={styles.userPhoto}>
                  <TouchableOpacity style={styles.addPhoto}>
                    <AddIcon fill={"#FF6C00"} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.title}>Реєстрація</Text>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  innerRef={(formikRef) => (this.formik = formikRef)}
                >
                  {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                  }) => (
                    <SafeAreaView>
                      <TextInput
                        style={styles.input}
                        placeholder="Логін"
                        value={login}
                        onChangeText={setLogin}
                        onFocus={() => {
                          setIsKeyboardShown(true);
                        }}
                        onBlur={() => {
                          setIsKeyboardShown(false);
                        }}
                      />
                      {touched.login && errors.login && (
                        <Text style={styles.errorText}>{errors.login}</Text>
                      )}

                      <TextInput
                        style={styles.input}
                        placeholder="Адреса електронної пошти"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onFocus={() => {
                          setIsKeyboardShown(true);
                        }}
                        onBlur={() => {
                          setIsKeyboardShown(false);
                        }}
                      />
                      {touched.email && errors.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}

                      <View>
                        <TextInput
                          style={styles.input}
                          placeholder="Пароль"
                          secureTextEntry={!showPassword}
                          value={values.password}
                          onChangeText={handleChange("password")}
                          onFocus={() => {
                            setIsKeyboardShown(true);
                          }}
                          onBlur={() => {
                            setIsKeyboardShown(false);
                          }}
                        />
                        <TouchableOpacity
                          style={styles.showPassword}
                          onPress={togglePasswordVisible}
                        >
                          <Text style={[styles.text, styles.showBtn]}>
                            {showPassword ? "Приховати" : "Показати"}
                          </Text>
                        </TouchableOpacity>
                        {touched.password && errors.password && (
                          <Text style={styles.errorText}>
                            {errors.password}
                          </Text>
                        )}
                      </View>

                      <StyledBtn
                        title="Зареєстуватися"
                        onPress={handleSubmit}
                      />

                      <View style={styles.signInContainer}>
                        <Text style={[styles.text, styles.signInText]}>
                          Немає акаунту?{" "}
                        </Text>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("Login")}
                        >
                          <Text
                            style={[
                              styles.text,
                              styles.signInText,
                              styles.signInLink,
                            ]}
                          >
                            Зареєструватися
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </SafeAreaView>
                  )}
                </Formik>
              </View>
            </View>
          </KeyboardAvoidingView>
        </BackgroundComponent>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};
