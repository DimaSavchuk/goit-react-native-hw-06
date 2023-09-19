import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";

import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { PostsScreen } from "../PostsScreen/PostsScreen";

import { AddIcon, UserIcon, GridIcon } from "../../assets/icons/icons";

import { LogoutButtonComponent } from "../../components/LogoutButtonComponent";
import { BackButtonComponent } from "../../components/BackButtonComponent";

import { styles } from "./HomeStyles";

export const Home = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "Posts") {
            return (
              <View style={focused ? styles.focusedIcon : styles.icon}>
                <GridIcon stroke={focused ? "white" : "black"} />
              </View>
            );
          } else if (route.name === "CreatePosts") {
            return (
              <View style={focused ? styles.focusedIcon : styles.icon}>
                <AddIcon fill={focused ? "white" : "black"} />
              </View>
            );
          } else if (route.name === "Profile") {
            return (
              <View style={focused ? styles.focusedIcon : styles.icon}>
                <UserIcon stroke={focused ? "white" : "black"} />
              </View>
            );
          }
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          paddingBottom: 22,
          paddingLeft: 82,
          paddingRight: 82,
          justifyContent: "center",
          alignItems: "flex-start",
        },

        headerShown: true,
        headerStyle: {
          borderBottomWidth: 1,
        },
      })}
    >
      <Tabs.Screen
        name={"Posts"}
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerTitleAlign: "center",
          headerRight: () => <LogoutButtonComponent />,
          headerStyle: {
            borderBottomWidth: 1,
          },
        }}
      />
      <Tabs.Screen
        name={"CreatePosts"}
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
          headerLeft: () => <BackButtonComponent />,
          headerStyle: {
            borderBottomWidth: 1,
          },
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name={"Profile"}
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};
