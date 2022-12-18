import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import supabase from "./supabase/supabaseClient";
import SmoothieList from "./components/smoothieList/SmoothieList";
import SVGImg1 from "./assets/smoothie.svg";

export default function App() {
  const [fetchError, setFetchError] = useState(null);
  const [text, setText] = useState("");
  const [smoothies, setSmoothies] = useState([]);

  // const timeout = useRef(null);
  const throttling = useRef(false);

  // const handleDebounceSearch = (inputText) => {
  //   setText(inputText);
  //   clearTimeout(timeout.current);
  //   if (!text.trim()) {
  //     setSmoothies([]);
  //     return;
  //   }
  //   timeout.current = setTimeout(() => {
  //     const fetchSmoothies = async () => {
  //       const { data, error } = await supabase
  //         .from("smoothies")
  //         .select()
  //         .textSearch(
  //           "title",
  //           `${text}|${text.toLowerCase()}|${
  //             text.charAt(0).toUpperCase() + text.substr(1)
  //           }`
  //         );
  //       if (error) {
  //         setFetchError("Could not fetch smoothies");
  //         setSmoothies([]);
  //         console.log(error);
  //       }
  //       if (data) {
  //         setSmoothies(data);
  //         setFetchError(null);
  //       }
  //     };
  //     fetchSmoothies();
  //   }, 600);
  // };

  const handleThrottleSearch = (inputText) => {
    setText(inputText);
    if (throttling.current) {
      return;
    }
    if (!text.trim()) {
      setSmoothies([]);
      return;
    }
    throttling.current = true;
    setTimeout(() => {
      throttling.current = false;
      const fetchSmoothies = async () => {
        const { data, error } = await supabase
          .from("smoothies")
          .select()
          // .textSearch(
          //   "title",
          //   `${text}|${text.toLowerCase()}|${
          //     text.charAt(0).toUpperCase() + text.substr(1)
          //   }`
          // )
          .textSearch("title", text, {
            type: "websearch",
            config: "english",
          });

        if (error) {
          setFetchError("Could not fetch smoothies");
          setSmoothies([]);
          console.log(error);
        }
        if (data) {
          setSmoothies(data);
          setFetchError(null);
        }
      };
      fetchSmoothies();
    }, 600);
  };

  useEffect(() => {
    console.log("text", text);
    console.log("smoothies", smoothies);
  }, [smoothies]);

  return (
    <View style={text !== "" ? styles.containerAltered : styles.container}>
      {text.length === 0 && (
        <>
          <Image
            style={{ resizeMode: "stretch", width: 100, height: 100 }}
            source={require("./assets/smoothiePic.jpg")}
          />
          <Text style={styles.logo}>Smoothie Recipes</Text>
          <Text style={styles.label}>Search our Menu</Text>
        </>
      )}
      <TextInput
        style={text.length === 0 ? styles.input : styles.justify}
        onChangeText={(inputText) => handleThrottleSearch(inputText)}
        value={text}
      />

      {text.length > 0 && <SmoothieList smoothies={smoothies} text={text} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  containerAltered: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },

  label: {
    fontSize: 20,
    fontStyle: "italics",
  },
  input: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  justify: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  logo: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
