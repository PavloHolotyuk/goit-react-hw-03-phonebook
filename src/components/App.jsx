import { ContactForm } from './ContactForm/ContactForm';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.setState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
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
