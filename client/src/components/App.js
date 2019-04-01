import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import ImportPlex from './plex/PlexNew';
// const Dashboard = () => <h2>Dashboard</h2>;
// const SurveyNew = () => <h2>SurveyNew</h2>;

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
              <Route exact path="/" component={Landing} />
              <Route exact path="/surveys" component={Dashboard} />
              <Route path="/app/plex" component={ImportPlex} />
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
