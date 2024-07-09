// src/utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // 프록시 설정에 맞춘 baseURL
});

api.interceptors.request.use(
  config => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcyMDUyNzc1OCwiZXhwIjoxNzIwNTMxMzU4fQ.vTA-Cx4SGRIhcr0QN2p7gm7jzLfpshCu2fUvhcq2jbU";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const getBoards = async () => {
  try {
    const response = await api.get("http://localhost:8000/api/v1/boards");
    return response.data;
  } catch (error) {
    console.error("Error fetching boards:", error);
    throw error;
  }
};

export default api;
