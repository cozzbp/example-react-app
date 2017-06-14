import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import TopBar from './top-bar/top-bar';
import LandingPage from './landing-page/landing-page';
import ContactPage from './contact-page/contact-page';
import './Main.scss';

export default class Root extends React.Component {
  render() {
    return (
      <div className="App">
        <HashRouter hashType={'hashbang'}>
          <div>
            <TopBar/>
            <Switch>
              <Route exact path="/" component={LandingPage}/>
              <Route path="/contact" component={ContactPage}/>
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}
