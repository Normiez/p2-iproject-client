import axios from "axios";

const url = axios.create({
  baseURL: "https://memelord-hactiv8.herokuapp.com",
});

export default url;
