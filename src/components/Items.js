import React, { Component } from 'react';
import fire from './../fire.js';
import { Card } from 'semantic-ui-react';
import Item from './Item';
import Uploader from './Uploader';

export default class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentWillMount() {
    this.getItems(); 
  }

  getItems() {
    /* Create reference to items in Firebase Database */
    let itemsRef = fire.database().ref(`${this.props.user.uid}/items`).orderByKey().limitToLast(100);
    itemsRef.on('child_added', snapshot => {
      /* Update React state when item is added at Firebase Database */
      let item = { 
        name: snapshot.val().name,
        imgUrl: snapshot.val().imgUrl, 
        id: snapshot.key 
      };
      this.setState({ items: [item].concat(this.state.items) });
    })
  };

  render() {
    return (
      <div>
        <h1>My stuff</h1>
        <Card.Group itemsPerRow={4}>
            {
              this.state.items.map( item => {
                return (
                  <Item
                    img={item.imgUrl}
                    key={item.id}
                    name={item.name}
                  />
                )
              })
            }
            <Card>
              <Uploader 
                user={this.props.user}
              />
            </Card>
          </Card.Group>
      </div>
    );
  }
}