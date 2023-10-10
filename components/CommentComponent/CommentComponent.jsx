import { Image, View, Text } from "react-native";

import { styles } from "./CommentComponentStyled";

export const CommentComponent = ({
  img,
  direction = "row",
  text,
  textAlign = "right",
  date,
}) => {
  const visualDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleString("uk-UA", options);
  };

  return (
    <View style={{ flexDirection: direction, gap: 16, marginBottom: 24 }}>
      <Image source={img} />
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <Text style={[styles.date, { textAlign: textAlign }]}>
          {visualDate(date)}
        </Text>
      </View>
    </View>
  );
};
