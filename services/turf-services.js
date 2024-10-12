import { supabase } from "@/utils/supabase/supabase";

export const getTurfBySport = async (sport) => {
  if (sport === "all") {
    const { data, error } = await supabase.from("turfs").select("*"); // Just select all records when "all" is selected
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("turfs")
      .select("*")
      .contains("available_sports", [sport]); // Ensure `available_sports` is an array field
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }
    return data;
  }
};

export const getTurfById = async (id) => {
  const { data, error } = await supabase.from("turfs").select("*").eq("id", id);
  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  return data;
};
