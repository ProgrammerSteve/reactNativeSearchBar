import { StyleSheet, Text, View, TextInput } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const SearchBar = ({
  smoothies,
  text,
  active,
  inputRef,
  handleText,
  handleActive,
  handleSmoothies,
  handleSearch,
}) => {
  return (
    <View
      style={
        smoothies.length === 0
          ? styles.searchContainerEmpty
          : styles.searchContainerFilled
      }
    >
      {smoothies.length > 0 && (
        <Entypo
          name="home"
          size={30}
          color="#573939"
          style={{
            marginHorizontal: 5,
            backgroundColor: "#f2cbcb",
            padding: 5,
            borderRadius: 5,
          }}
          onTouchStart={() => {
            handleText("");
            handleSmoothies([]);
          }}
        />
      )}
      <TextInput
        style={smoothies.length === 0 ? styles.input : styles.justify}
        onChangeText={(inputText) => handleSearch(inputText)}
        onFocus={() => handleActive(true)}
        ref={(ref) => {
          inputRef && (inputRef.current = ref);
        }}
        value={text}
      />
      {!active && text.length === 0 && (
        <View style={styles.magnifyingGlassContainer}>
          <Text style={{ color: "white" }}>Search</Text>
          <Foundation
            name="magnifying-glass"
            size={16}
            color="white"
            style={[{ marginLeft: 5 }, { transform: [{ translateY: 2 }] }]}
          />
        </View>
      )}
      {smoothies.length > 0 && (
        <View
          onTouchStart={() => {
            handleText("");
            handleSmoothies([]);
          }}
          style={styles.clearTextIconContainer}
        >
          <AntDesign
            name="close"
            size={24}
            color="gray"
            style={[
              {
                position: "absolute",
                right: 10,
              },
              { transform: [{ translateY: -12 }] },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainerEmpty: {
    height: 40,
    width: "90%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  searchContainerFilled: {
    height: 40,
    width: "80%",
    marginVertical: 10,

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#7d3d3d",
    color: "white",
    borderRadius: 5,
  },
  justify: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#7d3d3d",
    color: "white",
    borderRadius: 5,
  },
  magnifyingGlassContainer: {
    position: "absolute",
    flexDirection: "row",
  },
  clearTextIconContainer: {
    position: "relative",
  },
});

export default SearchBar;
