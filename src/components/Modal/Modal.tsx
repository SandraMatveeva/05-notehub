import { createPortal } from 'react-dom';
import styles from './Modal.module.css'
import NoteForm from '../NoteForm/NoteForm';

interface ModalProps {
    onClose: () => void;
    onCreate: (data: { title: string; content: string, tag: string }) => void;
}


export default function Modal({onClose, onCreate}: ModalProps )  {
  return createPortal(
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}><NoteForm onClose={onClose} onCreate={onCreate} /></div>
    </div>,
    document.body,
  );

}
