'use client'
import { useState } from "react";
import NoteList from "../../../components/NoteList/NoteList";
import NoteForm from "../../../components/NoteForm/NoteForm";
import Pagination from "../../../components/Pagination/Pagination";
import SearchBox from "../../../components/SearchBox/SearchBox";
import css from "./NotesPages.module.css";
import Modal from "../../../components/Modal/Modal";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "../../../lib/api";
import type { NotesResponse } from "../../../lib/api";
import { useDebounce } from "use-debounce";
type NotesClientprops = {
   tag?: string;
}
export default function NotesClient({tag}: NotesClientprops) {
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [debounceValue] = useDebounce(value, 500)

  const { data } = useQuery<NotesResponse>({
    queryKey: ["notes", debounceValue, currentPage, tag],
    queryFn: () => fetchNotes(debounceValue, currentPage,12, tag),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
  setValue(value);
  setCurrentPage(1);
}


  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleCreateNote = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={value}
          onChange={handleSearchChange}
        />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages ?? 1}
            onChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => handleCreateNote()}>
          Create note +
        </button>
        {modalIsOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </header>
      <NoteList notes={notes} />
    </div>
  );
}
