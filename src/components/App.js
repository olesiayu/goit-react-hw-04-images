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
  // state = {
  //   searchCard: '',
  //   images: [],
  //   largeImageURL: '',
  //   tags: '',
  //   error: null,
  //   status: 'idle',
  //   page: 1,
  //   totalHits: null,
  //   showModal: false,
  // };

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
    // setImages([]);
    // setPage(1);
    // setStatus('pending');
    if (searchCard === '') {
      return;
    }

    cardAPI
      .fetchCard(searchCard, page)
      .then(
        ({ hits, totalHits }) => {
          // setImages(hits);

          setImages(prevState => [...prevState, ...hits]);
          setTotalHit(totalHits);
          setStatus('resolved');
        }
        // this.setState({ images: hits, totalHits, status: 'resolved' })
      )
      // .catch(error => this.setState({ error, status: 'rejected' }));
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });

    if (totalHit === 0) {
      return toast.error(
        'Sorry, there are no images matching your search query. Please try again'
      );
    }
  }, [searchCard, page]);

  // componentDidUpdate(prevProps, prevState) {
  //   const prevCard = prevState.searchCard;
  //   const nextCard = this.state.searchCard;

  //   if (prevCard !== nextCard) {
  //     this.setState({ status: 'pending', page: 1 });

  //     cardAPI
  //       .fetchCard(nextCard)
  //       .then(({ hits, totalHits }) =>
  //         this.setState({ images: hits, totalHits, status: 'resolved' })
  //       )
  //       .catch(error => this.setState({ error, status: 'rejected' }));
  //   } else if (this.state.totalHits === 0) {
  //     return toast.error(
  //       'Sorry, there are no images matching your search query. Please try again'
  //     );
  //   }
  // }

  const onLoadMore = () => {
    // const { page, searchCard } = this.state;
    // const nextPage = page + 1;
    // const nextPage = setPage(prevState => prevState + 1);

    // this.setState({ status: 'pending' });
    setStatus('pending');
    // setImages(prevState => [...prevState, ...images]);
    // setImages(images);
    // console.log(setImages(prevState => [...prevState, ...images]));
    setPage(prevState => prevState + 1);

    // cardAPI
    //   .fetchCard(searchCard, nextPage)
    //   .then(({ hits }) =>
    //     this.setState(prevState => ({
    //       images: [...prevState.images, ...hits],
    //       page: nextPage,
    //       status: 'resolved',
    //     }))
    //   )
    //   .catch(error => this.setState({ error, status: 'rejected' }));
  };

  const toggleModal = (largeImage, tag) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImage);
    setTags(tag);

    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    //   largeImageURL,
    //   tags,
    // }));
  };

  const handleFormSubmit = search => {
    setImages([]);
    setSearchCard(search);
    // setImages(images);
    setPage(1);

    // this.setState({ search });
  };

  // const { images, error, status, totalHits, showModal, largeImageURL, tags } =
  //   this.state;

  return (
    <div className={s.app}>
      <Searchbar onSubmit={handleFormSubmit} />

      {status === 'idle' && <div className={s.text}>Enter a search query</div>}

      {status === 'rejected' && <div>{error.message}</div>}

      {(status === 'resolved' || status === 'pending') && (
        <ImageGallery onClick={toggleModal} images={images} />
      )}

      {status === 'pending' && <Loader />}

      {totalHit > images.length && <Button loadMore={onLoadMore} />}

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
