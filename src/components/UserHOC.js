import React, { Component } from 'react';
import PropTypes from 'prop-types';

const user = (ComponentToWrap) => {
  return class UserComponent extends Component {
    // let’s define what’s needed from the `context`
    static contextTypes = {
      user: PropTypes.object.isRequired,
    }

    render() {
      const { user } = this.context
      // what we do is basically rendering `ComponentToWrap`
      // with an added `theme` prop, like a hook
      return (
        <ComponentToWrap { ...this.props } user={ user } />
      )
    }
  }
}

export default user;