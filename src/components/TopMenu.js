import React from 'react';
import { Menu } from 'semantic-ui-react';
import user from './UserHOC';

class TopMenu extends React.Component {

  render() {
    const { user } = this.props;

    return <Menu inverted>
      <Menu.Menu position='right'>
      {user.isLoggedIn() ?
        <Menu.Item onClick={user.logout}>Log Out</Menu.Item>                
        :
        <Menu.Item onClick={user.login}>Log In</Menu.Item>              
      }
      </Menu.Menu>
    </Menu>
  }
}

export default user(TopMenu);