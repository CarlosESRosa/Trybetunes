import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import '../css/album.css'

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      songInfos: [],
      isLoading: true,
      onlySongs: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match } = this.props;
    const arrayOfMusics = await getMusics(match.params.id);
    const [infos, ...musicas] = arrayOfMusics;
    this.setState({ songInfos: infos, onlySongs: musicas, isLoading: false });
  }

  render() {
    const { songInfos, isLoading, onlySongs } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-album">
        <Header />
        <div className='container'>
          <div className='row'>
            <div className='card-album-infos col-4'>
              <img src={ songInfos.artworkUrl100 } className='img-fluid' alt={ songInfos.collectionName } />
              <h2 data-testid="album-name">
              {`${songInfos.artistName} ${songInfos.collectionName}`}
              </h2>
              <h3 data-testid="artist-name">{songInfos.artistName}</h3>
            </div>
            <div className='col-8'>
              <ul>
                {onlySongs.map((musicObj) => (
                  <li key={ musicObj.trackId } className="song-box">
                    <MusicCard
                      musicObj={ musicObj }
                      />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;
