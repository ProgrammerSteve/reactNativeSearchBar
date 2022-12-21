import { StyleSheet, View, Text } from "react-native";
import { useGetSmooothies } from "../utils/useGetSmoothies";
import { SmoothieList } from "../components";

const Menu = ({ navigation }) => {
  const { smoothies, error } = useGetSmooothies();

  return (
    <View style={styles.container}>
      {smoothies.length > 0 && (
        <SmoothieList smoothies={smoothies} navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f58484",
    paddingVertical: 15,
  },
});

export default Menu;
