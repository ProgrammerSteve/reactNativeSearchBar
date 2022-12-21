import supabase from "../supabase/supabaseClient";
import { useEffect, useState } from "react";

export const useGetSmooothies = () => {
  const [smoothies, setSmoothies] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const getData = async () => {
      setError("");
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order("title", { ascending: true });
      if (data) {
        setSmoothies(data);
      } else {
        setError(error);
      }
    };
    getData();
  }, []);
  return { smoothies, error };
};
