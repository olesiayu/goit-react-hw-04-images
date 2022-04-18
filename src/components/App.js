import React, { Component } from 'react';
import cardAPI from 'services/card-api';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';

export class App extends Component {
  state = {
    searchCard: '',
    images: [],
    largeImageURL: '',
    tags: '',
    error: null,
    status: 'idle',
    page: 1,
    totalHits: null,
    showModal: false,
  }

  componentDidUpdate(prevProps, prevState) {
        const prevCard = prevState.searchCard;
        const nextCard = this.state.searchCard;
        

        if (prevCard !== nextCard) {
            this.setState({ status: 'pending', page: 1 });
            
            cardAPI
                .fetchCard(nextCard)            
                .then(({hits, totalHits}) => this.setState({ images: hits, totalHits, status: 'resolved' }))
                .catch(error => this.setState({ error, status: 'rejected' }));
    } else if (this.state.totalHits === 0) {
      return toast.error('Sorry, there are no images matching your search query. Please try again');
        }
    
  }
  
  toggleModal = (largeImageURL, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL,
      tags,
    }));
  };

  handleFormSubmit = searchCard => {
    this.setState({searchCard});
  }

  onLoadMore = () => {
    const { page, searchCard } = this.state;
    const nextPage = page + 1;

    this.setState({ status: 'pending'});
    
    cardAPI
                .fetchCard(searchCard, nextPage)            
                .then(({hits}) => this.setState(prevState => ({ images: [...prevState.images, ...hits], page: nextPage, status: 'resolved' })))
                .catch(error => this.setState({ error, status: 'rejected' }));
  }

  render() {
    const { images, error, status, totalHits, showModal, largeImageURL, tags } = this.state;
        
    return (
      <div className={s.app}>

        <Searchbar onSubmit={this.handleFormSubmit} />        

        {status === 'idle' && (<div className={s.text}>Enter a search query</div>)}            

        {status === 'rejected' && (<div>{error.message}</div>)}

        {(status === 'resolved' || status === 'pending') && (<ImageGallery onClick={this.toggleModal} images={images} />)}

        {status === 'pending' && (<Loader />)}

        {totalHits > images.length && (<Button loadMore={this.onLoadMore} />)}

        {showModal && <Modal largeImageURL={largeImageURL} tags={tags} onClose={this.toggleModal}/>}       
        
        <ToastContainer />
  </div>
    
  );
  }  
};
