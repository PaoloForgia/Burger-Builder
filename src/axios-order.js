import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-1d5db.firebaseio.com/",
});

export default instance;
