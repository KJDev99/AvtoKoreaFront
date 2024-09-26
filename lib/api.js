import axios from "axios";

const api = axios.create({
  baseURL: "https://api.boom-avto.co/",
});

export default api;
