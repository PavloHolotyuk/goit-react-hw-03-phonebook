import { ContactForm } from './ContactForm/ContactForm';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    // contacts: [
    //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    // ],

    contacts: JSON.parse(localStorage.getItem('Contacts')) ?? [],
    filter: '',
  };

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contact) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('Contacts', stringifiedContacts);
    }
  }

  addContact = contact => {
    const isExist = this.state.contacts.find(
      data => data.name === contact.name
    );
    if (isExist) {
      alert(`${contact.name} already exist!`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { ...contact, id: nanoid() }],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getVisibleContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  setFilter = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <h1 className={css.formTitle}>Phone Book</h1>
        <ContactForm addContact={this.addContact} />
        <h2 className={css.listTitle}>Contacts</h2>
        {this.state.contacts.length > 0 ? (
          <Filter setFilter={this.setFilter} />
        ) : (
          <p className={css.text}>There is no contacts in a Phone Book</p>
        )}
        {this.state.contacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            deleteContact={this.deleteContact}
          />
        )}
      </>
    );
  }
}
