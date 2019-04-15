import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Hero from './Hero';
import Plex from './plex/Plex';
import PlexPin from './plex/PlexPin';
import SimilarList from './SimilarList';
import PopularList from './PopularList';
import PlexTokenForm from './plex/PlexTokenForm';
import TopRatedList from './TopRatedList';

class App extends Component {
  componentDidMount() {
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
              <Route exact path="/sonarr" component={PlexTokenForm} />
              <Route exact path="/plex-pin" component={PlexPin} />
              <Route path="/most-watched" component={Plex} />
              <Route
                path="/similar/:show"
                render={props => <SimilarList {...props} />}
              />
              <Route path="/popular" component={PopularList} />
              <Route path="/top-rated" component={TopRatedList} />
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
