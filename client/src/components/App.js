import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import ReactGA from 'react-ga';

import Header from './Header';
import Hero from './Hero';
import Plex from './plex/Plex';
import SimilarList from './SimilarList';
import PopularList from './PopularList';

ReactGA.initialize('UA-138294820-1');

class App extends Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <div>
          <BrowserRouter>
            <div className="container">
              <Header />
              <Route exact path="/" component={Hero} />
              <Route path="/most-watched" component={Plex} />
              <Route
                path="/similar/:show"
                render={props => <SimilarList {...props} />}
              />
              <Route path="/popular" component={PopularList} />
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions,
)(App);
