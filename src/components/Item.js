import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import Delete from './Delete';
import Edit from './Edit';
import ItemForm from './ItemForm';

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
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEdit() {
    this.setState({
      editing: true,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submit called');
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

  renderEditView() {
    const { form } = this.state;

    return <ItemForm
      formData={ form }
      showDropzone={ false }
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      buttonText={'Save'}
    />
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
    return <Card.Content extra>
      <Delete 
        itemToDelete={this.props.id}
      />
      <Edit 
        itemToEdit={this.props.id}
        onClick={this.handleEdit}
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