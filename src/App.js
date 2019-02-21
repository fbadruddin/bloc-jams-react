import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album'


class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
          <Link to='/'><img className="navbar-brand" src="./../assets/images/bloc_jams_logo.png" alt="Bloc Jams Landing" /></Link>
          <Link className="nav-item library" to='/Library'>Library</Link>
        </nav>
        <main>
          <Route exact path='/' component={Landing} />
          <Route path='/library' component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
