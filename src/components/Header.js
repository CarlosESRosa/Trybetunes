import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const userName = await getUser();
    this.setState({
      user: userName.name,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, user } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <header data-testid="header-component">
        <div className='header-part1'>
          <div className='img-header-div'>
            <img src={require('../img/group11.png')}></img>
          </div>
          <div className='user-box'>
            <img src={require('../img/char-icon.png')} ></img>
            <p data-testid="header-user-name">{user}</p>
          </div>
        </div>
        <nav className='container-fluid nav-link'>
          <Link to="/search" data-testid="link-to-search" className='search-link col-4'>Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites" className='search-link col-4'>Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile" className='search-link col-4'>Profile</Link>
        </nav>
      </header>
    );
  }
}
