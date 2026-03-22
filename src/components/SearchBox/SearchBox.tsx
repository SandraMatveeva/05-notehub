import styles from './SearchBox.module.css'

interface SearchBoxProps {
    onSubmit: (search: string) => void;
}

export default function SearchBox ({onSubmit}: SearchBoxProps){
    return (
        <input
  className={styles.input}
  type="text"
  placeholder="Search notes"
  onChange={(e) => onSubmit(e.target.value)}
 />
    );
}