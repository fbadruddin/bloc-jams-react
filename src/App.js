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
        <a className="navbar-brand" href="/">
            Bloc Jams
        </a>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-item" to='/'>Landing</Link>  
              </li>
              <li className="nav-item">
                <Link className="nav-item" to='/Library'>Library</Link>
              </li>
            </ul>
        </nav>
        <main>
          <Route exact path='/' component={Landing} /> {/*default*/}
          <Route path='/library' component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
