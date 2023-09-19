import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexShrink: 1,

    width: "100%",

    padding: 16,

    backgroundColor: "#00000008",

    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  text: {
    marginBottom: 8,

    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
  },

  date: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 11.72,
  },
});
