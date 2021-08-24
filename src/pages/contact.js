import React, { Component } from 'react';
import logo from '../assets/boilerplate/logo.svg';
import '../css/home.css';


class Contact extends Component {

  async componentWillMount() {

  }


  componentDidMount(){
    document.title = "About | Lux"
  }


  async componentWillUnmount() {
  }


  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <p>
              <code>Contact Lux</code><br />
              A blockchain water rights marketplace
            </p>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Lux is currently under development and in demo mode
            </p>
            <a
              className="App-link"
              href="https://github.com/ryoungblom/luxwater"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </a>
          </div>
        </header>
      </div>

    );
  }
}

export default Contact;
