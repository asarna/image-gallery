import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import fire, { auth, provider } from '../fire';

export default class TopMenu extends React.Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.props.setUser(user);
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.props.setUser(null);
      });
  }

  render() {
    return <Menu inverted>
      <Menu.Menu position='right'>
      {this.props.user ?
        <Menu.Item onClick={this.logout}>Log Out</Menu.Item>                
        :
        <Menu.Item onClick={this.login}>Log In</Menu.Item>              
      }
      </Menu.Menu>
    </Menu>
  }
}