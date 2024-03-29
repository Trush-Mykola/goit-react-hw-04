import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <Contact contacts={contact} key={contact.id} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default ContactList;
