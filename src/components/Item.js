import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default class Item extends React.Component {
  render() {
    return <Card key={this.props.id}>
      <Image src={this.props.img} />
      <Card.Content>
        <Card.Header>
          {this.props.name}
        </Card.Header>
        <Card.Description>
          description
        </Card.Description>
      </Card.Content>
    </Card>
  }
}