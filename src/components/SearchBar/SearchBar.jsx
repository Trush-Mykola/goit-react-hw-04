import css from "./SearchBar.module.css";
import { Formik, Form, Field } from "formik";

const SearchBox = ({ onSearch }) => {
  const onHandleSubmit = (values, actions) => {
    onSearch(values.search.trim().toLowerCase());
    actions.resetForm();
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
