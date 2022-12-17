import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";

const SmoothieCard = ({ item }) => {
  const { title, id, method, rating } = item;
  return (
    <View style={styles.container}>
      <Text numberOfLines={2}>{`${title}`}</Text>
      <Text numberOfLines={3}>{`Steps: ${method}`}</Text>
      <Text numberOfLines={1}>{`rating: ${rating}`}</Text>
    </View>
  );
};

export default SmoothieCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderRadius: 5,
    borderWidth: 4,
    borderStyle: "solid",
    marginVertical: 5,
    borderColor: "black",
    width: "95%",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});
