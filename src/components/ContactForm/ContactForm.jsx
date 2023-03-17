import css from './ContactForm.module.css';

import PropTypes from 'prop-types';

export const ContactForm = ({ addContact }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const { name, number } = event.target;
    addContact({ [name.name]: name.value, [number.name]: number.value });
    event.target.reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={css.contactForm}>
        <p className={css.contactFormText}>Name</p>
        <input
          className={css.contactFormInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <p className={css.contactFormText}>Number</p>
        <input
          className={css.contactFormInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit" className={css.contactFormBtn}>
          Add Contact
        </button>
      </form>
    </>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
