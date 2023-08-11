import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactList from '../ContactList';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import css from './App.module.css';

export default function App() {
  // lazy initialization
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const isExist = contacts.find(
      contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContact = getVisibleContact();

  return (
    <div className={css.block}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact}></ContactForm>
      <h2 className={css.text}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />

      <ContactList
        contacts={visibleContact}
        onDeleteContact={deleteContact}
      ></ContactList>
    </div>
  );
}
