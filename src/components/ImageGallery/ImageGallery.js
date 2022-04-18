import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css'

const ImageGallery = ({ images, tags, onClick }) => {
    return (
                <ul className={s.gallery}>
                    {images.map(({ id, webformatURL, largeImageURL, tags  }) => (
                            <ImageGalleryItem
                                key={id}
                            webformatURL={webformatURL}
                            tags={tags}
                            onClick={() => onClick(largeImageURL, tags)}
                        />
                    ))}              
                </ul>
    )
}


export default ImageGallery;

ImageGallery.propTypes = {
    onClick: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
}
