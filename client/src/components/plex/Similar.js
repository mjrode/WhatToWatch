import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import styles from '../../css/materialize.css.js';
import axios from 'axios';
import SimilarCard from './../SimilarCard';
import * as actions from '../../actions';

class Similar extends Component {
  componentDidMount() {
    this.getSimilar();
  }

  getSimilar = async () => {
    const params = {mediaName: this.props.show.title, mediaType: 'show'};
    const res = await axios.get('/api/tdaw/similar', {params});
    console.log('similarres', res);
    this.shows = res.data;
  };

  render() {
    console.log('My state mikey--', this.shows);
    if (this.shows) {
      const mediaList = this.shows.map(show => {
        return (
          <div>
            <h1>Hello</h1>
            <div className="row" key={show.title}>
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

Similar.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({plex}) {
  return {loading: plex.loading};
}

export default connect(
  mapStateToProps,
  actions,
)(withStyles(styles)(Similar));
