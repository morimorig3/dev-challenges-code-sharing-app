import axios from "axios";
import type { Snippet } from "./type";

interface CreateSnippetDto {
  code: string;
  language: string;
  theme: string;
}

export const createSnippet = async (
  createSnippetDto: CreateSnippetDto
): Promise<Snippet | null> => {
  try {
    const response = await axios.post<Snippet>(
      `${import.meta.env.VITE_API_URL}/api/snippets`,
      createSnippetDto
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
