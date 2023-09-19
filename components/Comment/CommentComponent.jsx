import { Image, View, Text } from "react-native";

import { styles } from "./CommentComponentStyles";

export const CommentComponent = ({
  img,
  text,
  date,
  direction = "row",
  textAlign = "right",
}) => {
  console.log(date);
  const formatDate = (date) => {
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
          {formatDate(date)}
        </Text>
      </View>
    </View>
  );
};
