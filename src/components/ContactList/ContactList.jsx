import css from './ContactList.module.css';

import PropTypes from 'prop-types';

export const ContactList = ({ deleteContact, contacts }) => {
  return (
    <ul className={css.contactList}>
      {contacts.map(contact => (
        <li key={contact.id} className={css.contactItem}>
          <div className={css.contactTextBlock}>
            <p className={css.contactText}>{contact.name}</p>
            <p className={css.contactText}>{contact.number}</p>
          </div>
          <button
            className={css.contactBtn}
            type="button"
            onClick={() => deleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
