import supabase from "../supabase/supabaseClient";
import { useRef } from "react";

//NOTE this hook is not being used in favor of useThrottle on the homepage

export const useDebounce = (
  text,
  handleText,
  handleSmoothies,
  handleFetchError
) => {
  //inputText is similar event.value.input in react native
  const timeout = useRef(null);
  const handleDebounceSearch = (inputText) => {
    handleText(inputText);
    clearTimeout(timeout.current);
    if (!text.trim()) {
      handleSmoothies([]);
      return;
    }
    timeout.current = setTimeout(() => {
      const fetchSmoothies = async () => {
        let textAdj = "";
        if (text) {
          textAdj = text.trim();
        }
        const { data, error } = await supabase.rpc("search_smoothie", {
          smoothie_name: textAdj,
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
  return handleDebounceSearch;
};
