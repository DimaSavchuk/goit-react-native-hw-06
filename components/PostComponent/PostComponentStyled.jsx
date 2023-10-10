import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },

  nameText: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },

  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },

  aboutContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  aboutLeftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  aboutRightContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
