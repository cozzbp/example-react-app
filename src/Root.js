import React from 'react';
import logo from './logo.svg';
import './Main.scss';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    };
  }
  getContentText = () => {
    if (this.state.clicked) {
      return null;
    }
    return (
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    );
  };

  toggleClicked = () => {
    this.setState({clicked: !this.state.clicked});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <h2 onClick={this.toggleClicked}>Click me to {this.state.clicked ? 'show' : 'hide'} the text</h2>
        {this.getContentText()}
      </div>
    );
  }
}

export default Root;
