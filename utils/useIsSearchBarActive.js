import { useEffect, useRef, useState } from "react";
import { Keyboard } from "react-native";

export const useIsSearchBarActive = () => {
  const inputRef = useRef();
  const [active, setActive] = useState(false);
  const handleActive = (status) => setActive(status);
  const keyboardDidHideCallback = () => {
    handleActive(false);
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

  return [active, handleActive, inputRef];
};
