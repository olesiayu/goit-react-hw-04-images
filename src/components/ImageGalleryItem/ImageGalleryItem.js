import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
    return (
        <li className={s.item}>
            <img src={webformatURL} alt={tags} onClick={onClick} className={s.image}/>
</li>
    )
}


ImageGalleryItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
}

export default ImageGalleryItem;



