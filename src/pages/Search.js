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
        <form>
          <label htmlFor="artist-input">
            Nome do Artista:
            <input
              name="artistName"
              id="artist-input"
              value={ artistName }
              type="text"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artistName.length < 2 }
            onClick={ this.clickButton }
          >
            Pesquisar
          </button>
          { artistAlbums.length > 0
          && <p>{`Resultado de álbuns de: ${name}`}</p> }
        </form>
        { artistAlbums.length > 0 && artistAlbums.map((element) => (
          <div key={ element.collectionId }>
            <Link
              to={ `/album/${element.collectionId}` }
              data-testid={ `link-to-album-${element.collectionId}` }
            >
              More infos
            </Link>
            <p>
              {element.collectionName}
            </p>
            <img src={ element.artworkUrl100 } alt={ element.collectionName } />
          </div>
        ))}
        {arrayVazio && artistAlbums.length === 0 && <p>Nenhum álbum foi encontrado</p>}

      </div>
    );
  }
}
