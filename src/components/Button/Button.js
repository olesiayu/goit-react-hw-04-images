import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css'

const Button = ({ loadMore }) => {
    return (
<button type="button" onClick={loadMore} className={s.button} >Load more</button>
    )        
}

Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
}

export default Button;