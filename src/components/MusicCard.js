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
        this.setState({ isChecked: true });
      }
    });
  }

  fetchAddSong = async (event, musicObj) => {
    this.setState({ isLoading: true, isChecked: event.target.checked });

    if (event.target.checked) {
      await addSong(musicObj);
    } else {
      await removeSong(musicObj);
    }

    this.setState({ isLoading: false });
  }

  render() {
    const { musicObj } = this.props;
    const { isLoading, isChecked } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div>
        <h4>{musicObj.trackName}</h4>
        <audio data-testid="audio-component" src={ musicObj.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <input
          type="checkbox"
          id="favorite-input"
          data-testid={ `checkbox-music-${musicObj.trackId}` }
          onChange={ (event) => this.fetchAddSong(event, musicObj) }
          checked={ isChecked }
        />
        {isChecked && 
          <button id='favorite-button'><i class="fa-solid fa-heart"></i></button>
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
