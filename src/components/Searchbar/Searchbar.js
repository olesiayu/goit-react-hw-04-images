import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css'

export class Searchbar extends Component {
  state = {
    searchCard: '',
  }

  handleCardChange = event => {
    this.setState({ searchCard: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchCard.trim() === '') {
      return toast.error('Enter a search query');
    }

    this.props.onSubmit(this.state.searchCard);

    this.setState({ searchCard: '' });
  }

  render() {
    return (
    <header className={s.searchbar} >
        <form onSubmit={this.handleSubmit} className={s.form}>
    <button type="submit" className={s.button}>
      <span className={s.label} >Search</span>
    </button>

    <input
      className={s.input}
            type="text"
            value={this.state.searchCard}
            onChange={this.handleCardChange}
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
  )
}
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}