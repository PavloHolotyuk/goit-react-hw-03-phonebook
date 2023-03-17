import css from './Filter.module.css';

import PropTypes from 'prop-types';

export const Filter = ({ setFilter }) => {
  return (
    <label className={css.filterLabel}>
      <p className={css.filterText}>Find contacts by name</p>
      <input className={css.filterInput} type="text" onChange={setFilter} />
    </label>
  );
};

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
