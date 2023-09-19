import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  postsContainer: {
    display: "flex",
    flexDirection: "column",

    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },

  profileContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,

    marginBottom: 32,
  },

  userPhoto: {
    width: 60,
    height: 60,

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  name: {
    fontFamily: "Roboto-Medium",
    lineHeight: 15.23,
    fontSize: 13,
  },

  email: {
    fontFamily: "Roboto-Regular",
    lineHeight: 12.89,
    fontSize: 11,
    color: "#212121CC",
  },
});
