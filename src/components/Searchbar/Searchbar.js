import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  // state = {
  //   searchCard: '',
  // }
  const [searchCard, setSearchCard] = useState('');

  const handleCardChange = event => {
    setSearchCard(event.currentTarget.value.toLowerCase());
    // this.setState({ searchCard: event.currentTarget.value.toLowerCase() });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchCard.trim() === '') {
      return toast.error('Enter a search query');
    }

    onSubmit(searchCard);

    // this.setState({ searchCard: '' });
    setSearchCard('');
  };

  return (
    <header className={s.searchbar}>
      <form onSubmit={handleSubmit} className={s.form}>
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          value={searchCard}
          onChange={handleCardChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
