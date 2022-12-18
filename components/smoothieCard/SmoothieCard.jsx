import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
} from "react-native";
// import Smoothie from "../../assets/audience.svg";

const SmoothieCard = ({ item }) => {
  const { title, id, method, rating } = item;
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header} numberOfLines={2}>{`${title}`}</Text>
        <Text style={styles.subheader} numberOfLines={1}>{`Steps:`}</Text>
        <Text style={styles.body} numberOfLines={3}>{`${method}`}</Text>
        <Text
          style={styles.subheader}
          numberOfLines={1}
        >{`rating: ${rating}/10`}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={{ resizeMode: "stretch", width: "100%", flex: 1 }}
          source={require("../../assets/smoothiePic.jpg")}
        />
      </View>
    </View>
  );
};

export default SmoothieCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "solid",
    marginVertical: 5,
    borderColor: "black",
    width: "95%",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  header: {
    fontSize: 20,
  },
  subheader: {
    fontSize: 14,
  },
  body: {
    fontSize: 10,
  },
  textContainer: {
    width: "70%",
  },
  imageContainer: {
    backgroundColor: "white",
    width: "30%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});
