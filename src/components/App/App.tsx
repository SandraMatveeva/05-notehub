import NoteList from "../NoteList/NoteList";
import "./App.css";
import styles from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote, createNote } from "../../services/noteService";
import Modal from "../Modal/Modal";
import { useState } from "react";
import type { Note } from "../../types/note";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [page,  setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(search, page),
    placeholderData: keepPreviousData,
  });

  console.log({ data, isLoading, error, isSuccess, page });


 const updateSearchQuery = useDebouncedCallback(
  (value: string) => setSearch(value),
  300
);

  
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const notes: Note[] = data && data.notes ? data.notes : [];

  const isPagination = data && data.totalPages > 1;
  const totalPages = data?.totalPages ?? 0;

  if (isLoading) {
  return <Loader />;
}

if (error) {
  return <ErrorMessage message="Failed to load notes" />;
}

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox onSubmit={updateSearchQuery} />
         {isSuccess && isPagination && <Pagination page={page} totalPages={totalPages} setPage={setPage}/>}
        <button onClick={openModal} className={styles.button}>
          Create note +
        </button>
      </header>
      <NoteList notes={notes} onDelete={(id) => deleteMutation.mutate(id)} />
      {isModalOpen && (
        <Modal onClose={closeModal} onCreate={createMutation.mutate} />
      )}
    </div>
  );
}
