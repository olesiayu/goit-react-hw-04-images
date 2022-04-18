import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = e => {
      if (e.code === 'Escape') {
        this.props.onClose();
      }
  }
  
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  }


  render() {
    const { largeImageURL, tags } = this.props;

    return createPortal(
      <div className={s.overlay} onClick={this.handleBackdropClick}>
  <div className={s.modal} >
          <img src={largeImageURL} alt={tags} className={s.image}/>
  </div>
</div>, modalRoot,
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  
}
