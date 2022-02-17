import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MIN_LENGTH_INPUT } from '../const';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      isLoading: false,
      isRedirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  fetchName = async (event, inputName) => {
    this.setState({ isLoading: true });
    await createUser({ name: inputName });
    this.setState({ isLoading: false, isRedirect: true });
  }

  render() {
    const { inputName, isLoading, isRedirect } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-login">
        <h1>Tela de login</h1>
        <form>
          <label htmlFor="inputName">
            Name:
            <input
              type="text"
              id="inputName"
              name="inputName"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ inputName.length < MIN_LENGTH_INPUT }
            onClick={ (event) => this.fetchName(event, inputName) }
          >
            Entrar
          </button>
          {isRedirect && <Redirect to="/search" /> }
        </form>
      </div>
    );
  }
}
