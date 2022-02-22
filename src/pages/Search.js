import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../css/search.css'

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      isLoading: false,
      artistAlbums: [],
      arrayVazio: false,
      name: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  clickButton = async () => {
    this.setState({ isLoading: true });
    const { artistName } = this.state;
    const albums = await searchAlbumsAPI(artistName);
    this.setState((prevState) => ({
      isLoading: false,
      name: prevState.artistName,
      artistName: '',
      artistAlbums: albums,
      arrayVazio: true,
    }));
  }

  render() {
    const { artistName, isLoading, artistAlbums, arrayVazio, name } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-search">
        <Header />
        <form className='container search-form'>
            <input
              name="artistName"
              id="artist-input"
              value={ artistName }
              type="text"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
              placeholder='Nome do Artista'
              className='col-12 col-md-5'
            />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artistName.length < 2 }
            onClick={ this.clickButton }
            className='btn btn-primary col-12 col-md-2'
          >
            Procurar
          </button>
        </form>
        { artistAlbums.length > 0
        && <h2 id='resultado-albuns' className='container'>{`Resultado de álbuns de ${name}:`}</h2> }
        <div className='container songs-container'>
        { artistAlbums.length > 0 && artistAlbums.map((element) => (
          <div key={ element.collectionId } className="col-6 col-md-3">
            <div className='album-card'>
            <img src={ element.artworkUrl100 } className='img-fluid' alt={ element.collectionName } />
            <p>
              {element.collectionName}
            </p>
            <Link
              to={ `/album/${element.collectionId}` }
              data-testid={ `link-to-album-${element.collectionId}` }
            >
              More infos
            </Link>
            </div>
          </div>
        ))}
        </div>
        {arrayVazio && artistAlbums.length === 0 && <p>Nenhum álbum foi encontrado</p>}

      </div>
    );
  }
}
