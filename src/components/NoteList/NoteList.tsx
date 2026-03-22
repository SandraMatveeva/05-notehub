import type {Note} from '../../types/note';
import styles from './NoteList.module.css';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";



interface NoteListProps {
  notes: Note[];
  // onDelete: (id: string) => void;
}



export default function NoteList({ notes }: NoteListProps) {
 const queryClient = useQueryClient();

const deleteMutation = useMutation({
  mutationFn: deleteNote,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  },
});


  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.listItem}>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <button  
                className={styles.button}  
                onClick={() => deleteMutation.mutate(note.id)}
                 >Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
