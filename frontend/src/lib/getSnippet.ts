import axios from "axios";
import type { Snippet } from "./type";

export const getSnippet = async (id: string): Promise<Snippet | null> => {
  try {
    const response = await axios.get<Snippet>(
      `${import.meta.env.VITE_API_URL}/api/snippets/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
