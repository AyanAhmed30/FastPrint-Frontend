// services/comicBookService.js
import axios from "axios";

const API_BASE = "http://localhost:8000/api/comicbook"; // adjust if needed

export const fetchComicBindings = () =>
  axios.get(`${API_BASE}/bindings/`).then((res) => res.data);

export const updateComicBinding = (id, data) =>
  axios.patch(`${API_BASE}/bindings/${id}/`, data);
