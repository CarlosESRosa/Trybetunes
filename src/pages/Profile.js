import React, { Component } from 'react';
import Header from '../components/Header';
import '../css/header.css'

export default class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <div className='container perfil-infos'>
          <div className='row mb-4'>
            <div className='img-fluid col-4' id='profile-char'>
              <img src={require('../img/char-icon.png')} alt='char icon' id='profile-char' ></img>
            </div>
            <div className='col-8' id='profile-char-button'> 
              <button className="btn btn-outline-primary" >Editar perfil</button>
            </div>
          </div>
          <div className='row'>
            <p className='perfil-title'>Nome</p>
            <p className='perfil-subtitle'>Usuário</p>
            <p className='perfil-title'>E-mail</p>
            <p className='perfil-subtitle'>usuario@usuario.com.br</p>
            <p className='perfil-title'>Descrição</p>
            <p className='perfil-subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean est lorem, fermentum nec hendrerit quis,
              rhoncus sed massa. Duis varius bibendum efficitur. Proin tempus euismod eros, ut lobortis nisl malesuada a. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Praesent in ex vel erat accumsan mollis tempus in erat.</p>
          </div>
        </div>
      </div>
    );
  }
}
