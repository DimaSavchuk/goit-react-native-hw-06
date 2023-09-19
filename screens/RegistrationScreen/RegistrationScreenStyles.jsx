import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formWrapper: {
    paddingTop: 92,
    paddingBottom: 78,
    paddingRight: 16,
    paddingLeft: 16,

    backgroundColor: "#ffffff",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontSize: 30,
    fontFamily: "Roboto-Bold",
    lineHeight: 35.16,
    color: "#212121",

    textAlign: "center",

    marginBottom: 33,
  },

  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },
  input: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontSize: 16,

    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    marginBottom: 16,
  },
  showPassword: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  showBtn: {
    color: "#1B4371",
  },

  signInContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  signInText: {
    color: "#1B4371",
    textAlign: "center",
  },

  signInLink: {
    textDecorationLine: "underline",
  },

  userPhoto: {
    width: 120,
    height: 120,

    position: "absolute",
    top: -60,
    left: "50%",

    backgroundColor: "#F6F6F6",

    borderRadius: 16,

    transform: [{ translateX: -50 }],
  },

  addPhoto: {
    position: "absolute",
    top: 81,
    right: -12.5,

    justifyContent: "center",
    alignItems: "center",

    width: 25,
    height: 25,

    borderColor: "#FF6C00",
    borderRadius: 12.5,
    borderWidth: 1,
  },
  addPhotoButton: { color: "#FF6C00" },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
});
