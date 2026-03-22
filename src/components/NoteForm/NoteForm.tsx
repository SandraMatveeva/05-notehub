import { useId } from "react";
import styles from "./NoteForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";


interface NoteFormProps {
  onClose: () => void;
  // onCreate: (data: { title: string; content: string; tag: string }) => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();

const queryClient = useQueryClient();

   const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const OrderFormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title is too long")
      .required("Title is required"),
    content: Yup.string().max(500, "Content is too long"),
    tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
  });

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Todo" }}
      validationSchema={OrderFormSchema}
      onSubmit={(values) => {
        createMutation.mutate(values);
        console.log(values);

        // onCreate(values);
        // onClose();
      }}
    >
      {({ isValid, dirty }) =>(
      <Form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor={`${fieldId}-title`}>
            Title
          </label>
          <Field
            className={styles.field}
            type="text"
            name="title"
            id={`${fieldId}-title`}
          />
          <ErrorMessage
            name="title"
            component="span"
            className={styles.error}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor={`${fieldId}-content`}>
            Content
          </label>

          <Field
            as="textarea"
            className={styles.field}
            name="content"
            rows={8}
            id={`${fieldId}-content`}
          />

          <ErrorMessage
            name="content"
            component="span"
            className={styles.error}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor={`${fieldId}-tag`}>
            Tag
          </label>
          <Field as="select" name="tag" id={`${fieldId}-tag`}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>

          <ErrorMessage name="tag" component="span" className={styles.error} />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isValid || !dirty }
          >
            Create note
          </button>
        </div>
      </Form>
      )}
    </Formik>
  );
}
