import React, { Component } from 'react'
import { stack as Menu } from 'react-burger-menu'
import '../css/nav.css'

class Navigation extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu right>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="marketplace" className="menu-item" href="/marketplace">Marketplace</a>
        <a id="login" className="menu-item" href="/login">Log In</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        {/*<a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>*/}
      </Menu>
    );
  }
}

export default Navigation
