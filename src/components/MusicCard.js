import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      isChecked: false,
      favoriteClass: 'fa-regular fa-heart favorite-button',
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    this.setState({ isLoading: true });
    const arrayFavorites = await getFavoriteSongs();
    this.setState({ isLoading: false, favoriteSongs: arrayFavorites }, () => {
      const { favoriteSongs } = this.state;
      const { musicObj } = this.props;
      const validation = favoriteSongs.some((element) => (
        element.trackId === musicObj.trackId
      ));
      if (validation) {
        this.setState({ isChecked: true, favoriteClass:'fa-solid fa-heart favorite-button-selected' });
      }
    });
  }

  fetchAddSong = (event, musicObj) => {

    this.setState((prevState) => ({ isLoading: true, isChecked: !prevState.isChecked }), async () => {
      const{isChecked} = this.state;
      if (isChecked) {
        this.setState({favoriteClass:'fa-solid fa-heart favorite-button-selected' })
        await addSong(musicObj);
      } else {
        this.setState({favoriteClass:'fa-regular fa-heart favorite-button' })
        await removeSong(musicObj);
      }
  
      this.setState({ isLoading: false });
    } );
  }

  render() {
    const { musicObj } = this.props;
    const { isLoading, favoriteClass } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div className='row  music-section py-4'>
        <div className='col-6 d-flex align-items-center justify-content-start'>
          <h4>{musicObj.trackName}</h4>
        </div>
        <div className='col-4 d-flex align-items-center justify-content-center '>
          <audio data-testid="audio-component" src={ musicObj.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
        </div>
        <div className='col-2 d-flex align-items-center justify-content-center'>
            <i
              role='button'
              tabIndex={1}
              id="favorite-input"
              className={favoriteClass}
              onClick={ (event) => this.fetchAddSong(event, musicObj) }
            />
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
