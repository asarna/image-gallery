import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import Delete from './Delete';

export default class Item extends React.Component {
  render() {
    return <Card key={this.props.id}>
      <Image src={this.props.img} />
      <Card.Content>
        <Card.Header>
          {this.props.name}
        </Card.Header>
        <Card.Description>
          {this.props.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Delete 
          itemToDelete={this.props.id}
        />
      </Card.Content>
    </Card>
  }
}