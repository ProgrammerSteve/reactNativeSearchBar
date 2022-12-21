import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";
import { useThrottle } from "../utils/useThrottle";
import { useIsSearchBarActive } from "../utils/useIsSearchBarActive";
import { useLog } from "../utils/useLog";

import {
  TitlePic,
  SvgBgHome,
  SmoothieList,
  BottomTextHome,
  SearchBar,
} from "../components";

const Home = ({ navigation }) => {
  const [fetchError, setFetchError] = useState(null);
  const [text, setText] = useState("");
  const [smoothies, setSmoothies] = useState([]);
  const [active, handleActive, inputRef] = useIsSearchBarActive();
  useLog(text, smoothies);

  const handleFetchError = (status) => setFetchError(status);
  const handleText = (text) => setText(text);
  const handleSmoothies = (data) => setSmoothies(data);

  const handleThrottleSearch = useThrottle(
    text,
    handleText,
    handleSmoothies,
    handleFetchError
  );
  return (
    <View
      style={
        smoothies.length === 0 ? styles.container : styles.containerAltered
      }
    >
      {smoothies.length === 0 && <TitlePic />}
      <SvgBgHome />
      <SearchBar
        smoothies={smoothies}
        text={text}
        active={active}
        inputRef={inputRef}
        handleText={handleText}
        handleActive={handleActive}
        handleSmoothies={handleSmoothies}
        handleSearch={handleThrottleSearch}
      />
      {smoothies.length === 0 && <BottomTextHome navigation={navigation} />}
      {smoothies.length > 0 && (
        <SmoothieList smoothies={smoothies} navigation={navigation} />
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f58484",
  },
  containerAltered: {
    flex: 1,
    backgroundColor: "#f58484",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
});

export default Home;
