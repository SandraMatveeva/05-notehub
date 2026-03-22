import axios from "axios";
import type { Note } from "../types/note";

interface ResponseResult {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(search: string, page: number): Promise<ResponseResult> {
  const result = await axios.get<ResponseResult>(
    `https://notehub-public.goit.study/api/notes?search=${search}&page=${page}&perPage=12`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    },
  );

  return result.data;
}

export async function createNote(note: Partial<Note>): Promise<ResponseResult> {
  const response = await axios.post<ResponseResult>(
    `https://notehub-public.goit.study/api/notes`,
    note,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    },
  );

  return response.data;
}

export async function deleteNote(id: string): Promise<ResponseResult> {
  const response = await axios.delete<ResponseResult>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    },
  );

  return response.data
}