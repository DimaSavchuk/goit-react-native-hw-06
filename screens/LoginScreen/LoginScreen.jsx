import { useState } from "react";
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
  SafeAreaView,
} from "react-native";

import { globalStyles } from "../../styles/globalStyles";
import { styles } from "./LoginScreenStyles";

import { BackgroundComponent } from "../../components/BackgroundComponent";
import { Formik } from "formik";
import * as yup from "yup";
import { StyledBtn } from "../../components/StyledBtn/StyledBtn";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLogged } from "../../redux/auth/selectors";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { logIn } from "../../redux/auth/authSlice";

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

export const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const togglePasswordVisible = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const navigation = useNavigation();
  const isLogged = useSelector(selectIsLogged);

  useEffect(() => {
    if (isLogged) {
      navigation.navigate("Home");
    }
  }, [isLogged, navigation]);

  const dispatch = useDispatch();
  const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values;
    console.log(`
    Email: ${values.email}
    Password: ${values.password}
    `);

    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(logIn({ email, password }));
      navigation.navigate("Home");

      resetForm();

      return credentials.user;
    } catch (error) {
      alert(error.message);
    }
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
                    paddingBottom: isKeyboardShown ? 32 : 111,
                    height: isKeyboardShown ? 248 : "auto",
                  },
                ]}
              >
                <Text style={styles.title}>Увійти</Text>

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

                      <StyledBtn title="Увійти" onPress={handleSubmit} />

                      <View style={styles.signInContainer}>
                        <Text style={[styles.text, styles.signInText]}>
                          Немає акаунту?{" "}
                        </Text>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("Registration")}
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
