import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';

class PlexForm extends Component {
  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="row">
        <form className="col s12" onSubmit={handleSubmit}>
          <div class="row">
            <div class="input-field col s12">
              <label htmlFor="username">Username</label>
              <Field type="text" name="username" component="input" />
            </div>
          </div>

          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
          />
          <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Submit
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'plexForm',
})(PlexForm);
