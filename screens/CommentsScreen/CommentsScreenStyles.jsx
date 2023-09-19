import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-end",

    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },

  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },

  input: {
    width: "100%",
    height: 50,

    paddingLeft: 16,
    paddingRight: 16,

    fontSize: 16,
    lineHeight: 19.36,

    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 25,
  },

  sendMessageButton: {
    position: "absolute",
    top: 8,
    right: 8,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: 34,
    height: 34,

    backgroundColor: "#FF6C00",
    borderRadius: 17,
  },
});
