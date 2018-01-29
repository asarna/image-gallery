import React from 'react';
import { Icon, Modal, Button, Header } from 'semantic-ui-react';
import fire from './../fire.js';
import user from './UserHOC';

class Delete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showConfirm: false
    }
    this.deleteItem = this.deleteItem.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleConfirm() {
    this.deleteItem().then(() => {
      this.closeModal();
    })
  }

  closeModal() {
    this.setState({showConfirm: false})
  }

  deleteItem() {
    const { user, itemToDelete } = this.props;
    const itemRef = fire.database().ref(`${user.profile.uid}/items/${itemToDelete}`);
    return itemRef.remove();
  }

  render() {
    return <Modal 
      trigger={<Icon name='trash' color='red'/>}  
      closeIcon
    >
      <Header icon='archive' content='Delete Item' />
      <Modal.Content>
        <p>Are you sure you want to delete this item?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' inverted
          onClick={ this.deleteItem }
        >
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  }
}

export default user(Delete);