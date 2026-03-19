import axios from "axios";

export const api = axios.create({
  baseURL: "",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // send cookies (e.g. adt_user_id) with requests
});
