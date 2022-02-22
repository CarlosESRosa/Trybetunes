import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  constructor(){
    super();

    this.state = {
      favoriteSongs: [],
    }
  }

  componentDidMount(){
    this.getFromLocalS();
  }

  getFromLocalS = () => {
    const lsSongs = JSON.parse(localStorage.getItem('favorite_songs'))
    this.setState({favoriteSongs: lsSongs})
  }

  render() {
    
    const { favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className='container'>
          <h2 id='favorite-song-title'>Musicas favoritas:</h2>    
          <ul className='mb-5'>
            {favoriteSongs.map((musicObj) => (
              <li key={ musicObj.trackId } className="song-box">
                <MusicCard musicObj={ musicObj } />
              </li>
            ))}
          </ul>
        </div>
      </div>

    );
  }
}
