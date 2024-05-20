import axios from "axios";

const { VITE_RAWR_API_KEY } = import.meta.env;

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: VITE_RAWR_API_KEY,
  },
});
