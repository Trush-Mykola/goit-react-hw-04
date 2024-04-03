import css from "./SearchBar.module.css";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SearchBox = ({ onSearch }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if (isFormSubmitted) {
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted]);

  const onHandleSubmit = (values, actions) => {
    if (!values.search.trim()) {
      toast.error("Please enter text to search for images.");
      return;
    }
    onSearch(values.search.trim().toLowerCase());
    actions.resetForm();
    setIsFormSubmitted(true);
  };

  return (
    <>
      <header className={css.header}>
        <Formik initialValues={{ search: "" }} onSubmit={onHandleSubmit}>
          <Form>
            <Field className={css.input} name="search" type="text" placeholder="Search images and photos" autoComplete="off" autoFocus />
            <button className={css.btn} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </header>
    </>
  );
};

export default SearchBox;
