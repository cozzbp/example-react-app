import React from 'react';

import TopBar from './top-bar/top-bar';
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
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    return (
      <div className="App">
        <TopBar/>
        <h2 onClick={this.toggleClicked}>Click me to {this.state.clicked ? 'show' : 'hide'} the text</h2>
        {this.getContentText()}
      </div>
    );
  }
}

export default Root;
