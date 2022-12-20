import { Image, StyleSheet, Text } from "react-native";

const TitlePic = () => {
  return (
    <>
      <Image
        style={styles.image}
        source={require("../../assets/smoothiePic.jpg")}
      />
      <Text style={styles.logo}>Smoothie Recipes</Text>
      <Text style={styles.label}>Search our Menu</Text>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontSize: 35,
    fontWeight: "900",
    color: "#403c3c",
  },
  label: {
    fontSize: 20,
    fontStyle: "italics",
    color: "#403c3c",
  },
  image: {
    resizeMode: "stretch",
    width: 170,
    height: 170,
    borderRadius: 10,
  },
});

export default TitlePic;
