import React, { useState, useEffect } from 'react';
import cardAPI from 'services/card-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';

export default function App() {
  const [searchCard, setSearchCard] = useState('');
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalHit, setTotalHit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchCard === '') {
      return;
    }

    setStatus('pending');

    cardAPI
      .fetchCard(searchCard, page)
      .then(({ hits, totalHits }) => {
        setImages(prevState => [...prevState, ...hits]);
        setTotalHit(totalHits);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });

    if (totalHit === 0) {
      return () => {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again'
        );
      };
    }
  }, [searchCard, page]);

  const onLoadMore = () => {
    setStatus('pending');
    setPage(prevState => prevState + 1);
  };

  const toggleModal = (largeImage, tag) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImage);
    setTags(tag);
  };

  const handleFormSubmit = search => {
    setImages([]);
    setSearchCard(search);
    setPage(1);
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={handleFormSubmit} />

      {status === 'idle' && <div className={s.text}>Enter a search query</div>}

      {status === 'rejected' && <div>{error.message}</div>}

      {(status === 'resolved' || status === 'pending') && (
        <ImageGallery onClick={toggleModal} images={images} />
      )}

      {status === 'pending' && <Loader />}

      {totalHit > images.length && status === 'resolved' && (
        <Button loadMore={onLoadMore} />
      )}

      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={toggleModal}
        />
      )}

      <ToastContainer />
    </div>
  );
}
