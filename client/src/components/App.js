import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import PlexForm from './plex/PlexForm';
// const Dashboard = () => <h2>Dashboard</h2>;
// const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  state = {user: {}};
  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const res = await axios.get('/auth/current_user');
    this.setState({user: res.data});
    console.log(res.data);
    return res;
  };

  render() {
    return (
      <div>
        <div>
          <BrowserRouter>
            <div className="container">
              <Header />
              <Route exact path="/" component={Landing} />
              <Route exact path="/surveys" component={Dashboard} />

              <Route
                path="/app/plex"
                render={props => <PlexForm user={this.state.user} />}
              />
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
