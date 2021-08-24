import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navigation from './components/nav.js'

import Home from './pages/home.js';
import About from './pages/about.js';
import Marketplace from './pages/marketplace.js';
import Login from './pages/login.js'
import Error from './pages/error.js';
import Contact from './pages/contact.js'


class App extends Component {

  render() {
    return (
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" render={props =>
               (<Home {...props} state={this.state}/>)
             } exact/>
             <Route path="/about" render={props =>
               (<About {...props} state={this.state}/>)
             } exact/>
             <Route path="/marketplace" render={props =>
               (<Marketplace {...props} state={this.state}/>)
             } exact/>

             <Route path="/login" render={props =>
               (<Login {...props} state={this.state}/>)
             } exact/>

             <Route path="/contact" render={props =>
               (<Contact {...props} state={this.state}/>)
             } exact/>


             <Route component={Error}/>
           </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
