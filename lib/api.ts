import axios from "axios";
import type { Note, CreateNote } from "../types/note";
import { log } from "console";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
  tag: string;
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
export const fetchNotes = async (
  search = "",
  page = 1,
  perPage = 12,
  tag?: string
): Promise<NotesResponse> => {
  const res = await axios.get<NotesResponse>(
    `https://notehub-public.goit.study/api/notes`,
    {
      params: {
        page,
        perPage,
        search,
        ...(tag && { tag }),
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  return res.data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const res = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    newNote,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
  console.log(id);

  return res.data;
};
