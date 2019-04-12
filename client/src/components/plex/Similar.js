import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import styles from '../../css/materialize.css.js';
import axios from 'axios';
import SimilarCard from './../SimilarCard';
import * as actions from '../../actions';

class Similar extends Component {
  state = {
    shows: [],
  };
  componentDidMount() {
    this.getSimilar();
  }

  getSimilar = async () => {
    const params = {showName: this.props.match.params.show};
    const res = await axios.get('/api/moviedb/tv/similar', {params});
    console.log('sim res', res);
    const shows = res.data;
    console.log('shows', shows);
    this.setState({shows: shows});
  };

  render() {
    if (this.state.shows.length > 0) {
      console.log('call me', this.state);
      const mediaList = this.state.shows.map(show => {
        return (
          <div>
            <div className="row" key={show.name}>
              <SimilarCard media={show} />
            </div>
          </div>
        );
      });
      return <div>{mediaList}</div>;
    }
    return <div>Loading</div>;
  }
}

function mapStateToProps({plex}) {
  return {loading: plex.loading};
}

export default connect(
  mapStateToProps,
  actions,
)(withStyles(styles)(Similar));
