import React from 'react';
import { Icon } from 'semantic-ui-react';
import user from './UserHOC';

class Edit extends React.Component {

  render() {
    return <Icon 
      name='write' 
      color='grey'
      onClick={this.props.onClick}
    />;
  }
}

export default user(Edit);