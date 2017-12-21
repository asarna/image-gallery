import React, { Component } from 'react';
import fire from './../fire.js';
import { Card, Image, Icon } from 'semantic-ui-react';

export default class authContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentWillMount() {
    /* Create reference to items in Firebase Database */
    let itemsRef = fire.database().ref(`${this.props.user.uid}/items`).orderByKey().limitToLast(100);
    itemsRef.on('child_added', snapshot => {
      /* Update React state when item is added at Firebase Database */
      let item = { text: snapshot.val(), id: snapshot.key };
      this.setState({ items: [item].concat(this.state.items) });
    })
  }

  addItem(e){
    e.preventDefault();
    /* Send the message to Firebase */
    fire.database().ref(`${this.props.user.uid}/items`).push(this.inputEl.value);
    this.inputEl.value = ''; // <- clear the input
  }

  render() {
    return (
      <div>
        <h1>My stuff</h1>
        <Card.Group itemsPerRow={6}>
            {
              this.state.items.map( item => {
                return (
                  <Card key={item.id}>
                    <Image src='/assets/images/avatar/large/matthew.png' />
                    <Card.Content>
                      <Card.Header>
                        {item.text}
                      </Card.Header>
                      <Card.Meta>
                        <span className='date'>
                          Joined in 2015
                        </span>
                      </Card.Meta>
                      <Card.Description>
                        Matthew is a musician living in Nashville.
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name='user' />
                        22 Friends
                      </a>
                    </Card.Content>
                  </Card>
                )
              })
            }
            <Card>
              <form onSubmit={this.addItem.bind(this)}>
                <input type="text" ref={ el => this.inputEl = el }/>
                <input type="submit"/>
              </form>
            </Card>
          </Card.Group>
      </div>
    );
  }
}