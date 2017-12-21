import React, { Component } from 'react';
import {
  Route
} from 'react-router-dom';

export default class AuthRoute extends Component {
  render() {
    const { authenticated, component, ...restProps } = this.props;
    return (
      <Route
        { ...restProps }
        render={(props) => this.props.authenticated === true
            ? this.props.render()
            : <p>You must log in to see this.</p>
        } 
      />
    )
  }
}