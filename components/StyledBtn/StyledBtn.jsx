import { Text, TouchableOpacity } from "react-native";
import React from "react";

import { styles } from "./StyledBtnStyles";

export const StyledBtn = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={[styles.text, styles.buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
};
