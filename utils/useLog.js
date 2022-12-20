import { useEffect } from "react";
export const useLog = (text, smoothies) => {
  useEffect(() => {
    console.log("text", text);
    console.log("smoothies", smoothies);
  }, [smoothies]);
};
