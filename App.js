import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";

import { LoginScreen } from "./screens/LoginScreen/LoginScreen";
import { RegistrationScreen } from "./screens/RegistrationScreen/RegistrationScreen";
import { Home } from "./screens/Home/Home";
import { CommentsScreen } from "./screens/CommentsScreen/CommentsScreen";
import { MapScreen } from "./screens/MapScreen/MapScreen";

import { BackButtonComponent } from "./components/BackButtonComponent";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Comments"
              component={CommentsScreen}
              options={{
                title: "Коментарі",
                headerTitleAlign: "center",
                headerShown: true,
                headerLeft: () => <BackButtonComponent />,
                headerStyle: {
                  borderBottomWidth: 1,
                },
              }}
            />
            <Stack.Screen
              name="Map"
              component={MapScreen}
              options={{
                title: "Мапа",
                headerTitleAlign: "center",
                headerShown: true,
                headerLeft: () => <BackButtonComponent />,
                headerStyle: {
                  borderBottomWidth: 1,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
