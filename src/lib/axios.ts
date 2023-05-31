import axios from "axios";
const Token = process.env.NEXT_PUBLIC_TOKEN;
export const Axios = axios.create({
  baseURL: "https://themefisher-backend.vercel.app/",
  // "http://localhost:4001/",
  // "https://test-db-sl6v.vercel.app/",
  headers: {
    authorization: `Bearer ${Token}`,
  },
});
