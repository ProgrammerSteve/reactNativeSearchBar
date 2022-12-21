import { StyleSheet, Text, TouchableOpacity } from "react-native";

const BottomTextHome = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate("Menu");
  };
  return (
    <>
      <Text style={styles.bottomText}>{`try searching "strawberry"`}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Menu")}
        style={styles.linkContainer}
      >
        <Text>{`[Full Menu]`}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  bottomText: {
    fontSize: 18,
    fontStyle: "italics",
    color: "#403c3c",
    fontWeight: "300",
    marginTop: 5,
  },
  bottomLink: {
    fontSize: 20,
    fontStyle: "italics",
    color: "#574f4f",
    fontWeight: "600",
    marginTop: 3,
  },
  linkContainer: {
    backgroundColor: "none",
  },
});

export default BottomTextHome;
