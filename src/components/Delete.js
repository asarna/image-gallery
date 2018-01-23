import React from 'react';
import { Icon } from 'semantic-ui-react';
import fire from './../fire.js';

export default class Delete extends React.Component {

  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem() {
    const itemRef = fire.database().ref(`${this.props.user.uid}/items/${this.props.itemToDelete}`);
    itemRef.remove();
  }

  render() {
    return <Icon 
      name='trash' 
      color='red'
      onClick={this.deleteItem}
    />;
  }
}