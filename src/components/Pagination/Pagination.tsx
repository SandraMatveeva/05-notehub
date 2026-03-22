import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import styles from "./Pagination.module.css";
import type { ComponentType } from "react";

// Допоміжний тип: описує модуль, у якого реальний експорт лежить у полі .default.
type ModuleWithDefault<T> = { default: T };

// Дістаємо справжній React-компонент із .default, щоб React отримав саме компонент.
// Ми явно повідомляємо TS форму значення, щоб зберегти правильні типи пропсів
// (ReactPaginateProps) і мати коректну перевірку/підказки в IDE.
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface PaginationProps {
  totalPages: number;
  setPage: (page: number) => void;
  page: number;
}

console.log("===>>>",ReactPaginate);

export default function Pagination({
  totalPages,
  setPage,
  page,
}: PaginationProps) {
  return (
    <div>
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            nextLabel="→"
            previousLabel="←"
            />
    </div>
    
  );
}
