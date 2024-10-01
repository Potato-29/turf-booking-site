import { supabase } from "@/utils/supabase/supabase";

export const getTurfBySport = async (sport) => {
  if (sport === "all") {
    const { data } = await supabase
      .from("turfs")
      .select("*")
      .contains("available_sports", []);
    return data;
  } else {
    const { data } = await supabase
      .from("turfs")
      .select("*")
      .contains("available_sports", [sport]);
    return data;
  }
};
