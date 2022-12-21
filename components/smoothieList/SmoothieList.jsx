import SmoothieCard from "../smoothieCard/SmoothieCard";

import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";

const SmoothieList = ({ smoothies, navigation }) => {
  smoothiesUpdated = smoothies.map((obj) => {
    return { ...obj, navigation };
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={smoothiesUpdated}
        renderItem={SmoothieCard}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default SmoothieList;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    flex: 1,
  },
});
