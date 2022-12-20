import { StyleSheet, Text } from "react-native";

const BottomTextHome = () => {
  return (
    <>
      <Text style={styles.bottomText}>{`try searching "strawberry"`}</Text>
      <Text style={styles.bottomLink}>{`[Full Menu]`}</Text>
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
});

export default BottomTextHome;
