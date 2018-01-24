import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import Delete from './Delete';
import Edit from './Edit';
import ItemForm from './ItemForm';
import fire from './../fire.js';

export default class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      form: {
        name: this.props.name,
        description: this.props.description
      }
    }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing,
    })
  }

  handleChange(e) {
    e.preventDefault(); 
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.updateItem().then(() => {
      this.toggleEdit();
    });
  }

  updateItem() {
    return fire.database().ref(`${this.props.user.uid}/items`).child(this.props.id).update({
      ...this.state.form
    });
  }

  renderEditView() {
    const { form } = this.state;

    return <div>
      <ItemForm
        formData={ form }
        showDropzone={ false }
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        buttonText={'Save'}
      >
        <Button 
          floated='right'
          onClick={ this.toggleEdit }
        >Cancel</Button>
      </ItemForm>
    </div>
  }

  renderReadView() {
    return <Card.Content>
      <Card.Header>
       {this.props.name}
      </Card.Header>
      <Card.Description>   
        {this.props.description}
      </Card.Description>
    </Card.Content>
  }

  renderButtons() {
    const { id } = this.props;
    return <Card.Content extra>
      <Delete 
        itemToDelete={id}
      />
      <Edit 

        itemToEdit={id}
        onClick={this.toggleEdit}
      />
    </Card.Content>
  }

  render() {
    return <Card key={this.props.id}>
      <Image src={this.props.img} />
        { this.state.editing ?
          this.renderEditView()
          : this.renderReadView()
        }
        { !this.state.editing && this.renderButtons() }
    </Card>
  }
}