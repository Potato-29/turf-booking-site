import axios from "axios";

export const signUp = async (payload) => {
  const data = await axios.post("/api/user", payload);
  return data.data;
};

export const loginUser = async (payload) => {
  const data = await axios.put("/api/user", payload);
  return data.data;
};
