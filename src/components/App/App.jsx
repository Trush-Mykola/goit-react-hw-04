import { useEffect, useState } from "react";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import { nanoid } from "nanoid";
import ContactForm from "../ContactForm/ContactForm";
import css from "./App.module.css";

const contactsInfo = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem("allContactsData");
    if (!stringifiedContacts) return contactsInfo;
    const parsedContacts = JSON.parse(stringifiedContacts);
    return parsedContacts;
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("allContactsData", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contactData) => {
    const newContact = {
      ...contactData,
      id: nanoid(),
    };
    setContacts([...contacts, newContact]);
  };
  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };
  const filterContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()) || contact.number.includes(filter));

  return (
    <div className={css.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList contacts={filterContacts} onDelete={deleteContact} />
    </div>
  );
};

export default App;
