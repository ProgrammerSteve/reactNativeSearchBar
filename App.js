import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from "react-native-svg";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Keyboard,
  FlatList,
} from "react-native";
import supabase from "./supabase/supabaseClient";
import SmoothieList from "./components/smoothieList/SmoothieList";

export default function App() {
  const [fetchError, setFetchError] = useState(null);
  const [text, setText] = useState("");
  const [active, setActive] = useState(false);
  const [smoothies, setSmoothies] = useState([]);

  const inputRef = useRef();
  const keyboardDidHideCallback = () => {
    setActive(false);
    inputRef.current.blur?.();
  };

  useEffect(() => {
    const keyboardDidHideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHideCallback
    );

    return () => {
      keyboardDidHideSubscription?.remove();
    };
  }, []);

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
        let textAdj = "";
        if (text) {
          textAdj = text.trim();
        }
        const { data, error } = await supabase
          .from("smoothies")
          .select()
          .textSearch("title", textAdj, {
            type: "websearch",
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
    <View
      style={
        smoothies.length !== 0 ? styles.containerAltered : styles.container
      }
    >
      {smoothies.length === 0 && (
        <>
          <Image
            style={{
              resizeMode: "stretch",
              width: 170,
              height: 170,
              borderRadius: 10,
            }}
            source={require("./assets/smoothiePic.jpg")}
          />
          <Text style={styles.logo}>Smoothie Recipes</Text>
          <Text style={styles.label}>Search our Menu</Text>
        </>
      )}

      <View
        style={[
          {
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: -1,
            backgroundColor: "#f58484",
          },
          {
            transform: [{ translateY: 0 }],
          },
        ]}
      >
        <Svg
          height="100%"
          preserveAspectRatio="xMinYMin slice"
          width="100%"
          viewBox="0 0 100 100"
        >
          <Polygon points="0,20 100,0 100,25 0,45" fill={"red"} />
        </Svg>
      </View>

      <View
        style={
          smoothies.length === 0
            ? styles.searchContainerEmpty
            : styles.searchContainerFilled
        }
      >
        <TextInput
          style={smoothies.length === 0 ? styles.input : styles.justify}
          onChangeText={(inputText) => handleThrottleSearch(inputText)}
          onFocus={() => setActive(true)}
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
              setText("");
              setSmoothies([]);
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

      {smoothies.length === 0 && (
        <>
          <Text style={styles.bottomText}>{`try searching "strawberry"`}</Text>
          <Text style={styles.bottomLink}>{`[Full Menu]`}</Text>
        </>
      )}

      {smoothies.length > 0 && (
        <SmoothieList smoothies={smoothies} text={text} />
      )}
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
    backgroundColor: "#f58484",
  },
  containerAltered: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },

  searchContainerEmpty: {
    height: 40,
    width: "90%",
    marginVertical: 10,

    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  searchContainerFilled: {
    height: 40,
    width: "90%",
    marginVertical: 10,

    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
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
