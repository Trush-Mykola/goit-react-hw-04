import { FaUserAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import css from "./Contact.module.css";

const Contact = ({ contacts, onDelete }) => {
  return (
    <li className={css.item}>
      <div>
        <div className={css.itemWrapper}>
          <FaUserAlt size="25" />
          <p>{contacts.name}</p>
        </div>
        <div className={css.itemWrapper}>
          <FaPhone size="25" />
          <p>{contacts.number}</p>
        </div>
      </div>
      <button onClick={() => onDelete(contacts.id)}>Delete</button>
    </li>
  );
};

export default Contact;
