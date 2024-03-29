import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
import * as Yup from "yup";
const initialValues = {
  name: "",
  number: "",
};

const ContactFormSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too short! This field must be at least three characters long!").max(50, "Too Long!").required("Required"),
  number: Yup.string().min(3, "Too short! This field must be at least three characters long!").max(50, "Too Long!").required("Required"),
});

const ContactForm = ({ onAdd }) => {
  const onSubmitHandle = (values, actions) => {
    onAdd(values);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitHandle} validationSchema={ContactFormSchema}>
      <Form className={css.form}>
        <label htmlFor="name">
          Name
          <Field type="text" name="name" />
          <ErrorMessage component="span" name="name" />
        </label>
        <label htmlFor="number">
          Number
          <Field type="text" name="number" />
          <ErrorMessage component="span" name="number" />
        </label>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
