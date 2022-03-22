import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
// import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={ process.env.PUBLIC_URL } >
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
        <Route
          exact
          path="/album/:id"
          render={ (props) => <Album { ...props } /> }
        />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
