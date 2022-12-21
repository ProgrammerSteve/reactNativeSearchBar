import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

const Details = ({ navigation, route }) => {
  const { title, method, id, rating } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{
            resizeMode: "stretch",
            width: "70%",
            flex: 1,
            borderRadius: 10,
          }}
          source={require("../assets/smoothiePic.jpg")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.rating}>{`Rating: ${rating}/10`}</Text>
        <Text style={styles.subTitle}>{`Steps:`}</Text>
        <ScrollView style={styles.methodContainer}>
          <Text style={styles.method}>{method}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f58484",
  },
  imageContainer: {
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    width: "100%",
    flex: 2,
    paddingHorizontal: 15,

    paddingBottom: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 30,
    textAlign: "center",
  },
  rating: {
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  method: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
  },
  methodContainer: {
    backgroundColor: "#9b4c4c",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});

export default Details;
