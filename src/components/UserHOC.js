import React, { Component } from 'react';
import PropTypes from 'prop-types';

const user = (ComponentToWrap) => {
  return class UserComponent extends Component {
    // let’s define what’s needed from the `context`
    static contextTypes = {
      user: PropTypes.object,
    }

    render() {
      const { user } = this.context

      return (
        <ComponentToWrap { ...this.props } user={ user } />
      )
    }
  }
}

export default user;