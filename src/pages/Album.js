import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

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
        <h2 data-testid="artist-name">{songInfos.artistName}</h2>
        <h2 data-testid="album-name">
          {`${songInfos.artistName} ${songInfos.collectionName}`}
        </h2>
        <ul>
          {onlySongs.map((musicObj) => (
            <li key={ musicObj.trackId }>
              <MusicCard
                musicObj={ musicObj }
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;
