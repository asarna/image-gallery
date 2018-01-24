import React from 'react';
import { Menu } from 'semantic-ui-react';

export default class Sidebar extends React.Component {
  render() {
    return <Menu vertical>
      <Menu.Item name='inbox' onClick={this.handleItemClick}>
        Inbox
      </Menu.Item>
      <Menu.Item name='spam' onClick={this.handleItemClick}>
        Spam
      </Menu.Item>
      <Menu.Item name='updates' onClick={this.handleItemClick}>
        Updates
      </Menu.Item>
    </Menu>
  }
}