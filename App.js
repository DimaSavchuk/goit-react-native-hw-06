import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import { RegistrationScreen } from "./screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./screens/LoginScreen/LoginScreen";
import { CommentsScreen } from "./screens/CommentsScreen/CommentsScreen";
import { MapScreen } from "./screens/MapScreen/MapScreen";
import { BackButtonComponent } from "./components/BackButtonComponent/BackButtonComponent";
import { Home } from "./screens/Home/Home";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const MainStack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Login">
            <MainStack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{
                headerShown: false,
              }}
            />
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <MainStack.Screen
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
            <MainStack.Screen
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
          </MainStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
