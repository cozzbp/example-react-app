import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';

import './top-bar.scss';

export default class TopBar extends React.Component {
  render() {
    return (
      <div className="top-bar">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
        <p><Link to="/">Root</Link></p>
        <p><Link to="/contact">Contact</Link></p>
      </div>
    );
  }
}
