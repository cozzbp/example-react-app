import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './index.css';

let mountNode = document.createElement('div');
document.body.appendChild(mountNode);
ReactDOM.render(
  <Root />,
  mountNode
);