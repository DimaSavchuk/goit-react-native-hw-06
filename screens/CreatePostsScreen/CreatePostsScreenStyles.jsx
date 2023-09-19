import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-end",

    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },

  photoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    height: 240,

    backgroundColor: "#F6F6F6",

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
  },

  photoIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: 60,
    height: 60,

    backgroundColor: "white",

    borderRadius: 30,
  },

  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },

  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginBottom: 32,
  },

  input: {
    height: 50,

    marginBottom: 16,

    fontFamily: "Roboto-Regular",
    fontSize: 16,

    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },

  locationInputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,

    marginBottom: 32,
  },

  locationInput: {
    flex: 1,

    marginBottom: 0,

    borderBottomWidth: 0,

    fontFamily: "Roboto-Regular",
  },

  bottomContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    width: 70,
    height: 40,

    backgroundColor: "#F6F6F6",

    borderRadius: 20,
  },
});
