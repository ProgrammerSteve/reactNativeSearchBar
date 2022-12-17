import SmoothieCard from "../smoothieCard/SmoothieCard";

import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";

const SmoothieList = ({ smoothies, text }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={smoothies}
        renderItem={SmoothieCard}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default SmoothieList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
