import { useRef } from "react";
import supabase from "../supabase/supabaseClient";

export const useThrottle = (
  text,
  handleText,
  handleSmoothies,
  handleFetchError
) => {
  //inputText is similar event.value.input in react native
  const throttling = useRef(false);
  const handleThrottleSearch = (inputText) => {
    handleText(inputText);
    if (throttling.current) {
      return;
    }
    if (!text.trim()) {
      handleSmoothies([]);
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
          handleFetchError("Could not fetch smoothies");
          handleSmoothies([]);
          console.log(error);
        }
        if (data) {
          handleSmoothies(data);
          handleFetchError(null);
        }
      };
      fetchSmoothies();
    }, 600);
  };
  return handleThrottleSearch;
};
