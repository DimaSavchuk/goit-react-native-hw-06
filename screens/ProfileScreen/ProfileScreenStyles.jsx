import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    alignContent: "flex-end",

    height: "80%",
    width: "100%",

    paddingLeft: 16,
    paddingRight: 16,

    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  photoContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],

    width: 120,
    height: 120,

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  deletePhotoButton: {
    position: "absolute",
    top: 81,
    right: -12.5,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: 25,
    height: 25,

    borderColor: "#E8E8E8",
    backgroundColor: "white",
    borderRadius: 12.5,
    borderWidth: 1,
  },

  text: {
    marginTop: 92,
    marginBottom: 32,

    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
  },
});
