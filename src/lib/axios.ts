import axios from "axios";
const Token = process.env.NEXT_PUBLIC_TOKEN;
export const Axios = axios.create({
  baseURL: "https://next-fullstack-plate.vercel.app/api/",
  // "http://localhost:3000/api/",

  headers: {
    authorization: `Bearer ${Token}`,
  },
});
