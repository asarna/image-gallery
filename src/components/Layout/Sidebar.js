import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Sidebar extends React.Component {
  render() {
    return <Menu vertical>
      { this.props.routes.map((route, index) => {
        return <Menu.Item key={ index }>
          <Link to={ route.path } key={ index }>
            { route.menuLabel }
          </Link>
        </Menu.Item>
      })}
    </Menu>
  }
}