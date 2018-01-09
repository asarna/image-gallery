import React, { Component } from 'react';
import fire from './../fire.js';
import { Card, Image, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

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
      let item = { 
        name: snapshot.val().name,
        imgPath: snapshot.val().imgPath, 
        id: snapshot.key 
      };
      this.setState({ items: [item].concat(this.state.items) });
    })
  }

  addItem(e){
    e.preventDefault();
    /* Send the message to Firebase */

    fire.database().ref(`${this.props.user.uid}/items`).push({
      name: this.nameEl.value,
      imgPath: this.imgEl.value
    });
    this.nameEl.value = '';
    this.imgEl.value = '';
  }

  onDrop(files) {
    console.log('got', files);
    this.setState({
      imgToUpload: 'updatee!'
    });
    console.log(files[0].preview);
  }

  render() {
    return (
      <div>
        <h1>My stuff</h1>
        <Card.Group itemsPerRow={4}>
            {
              this.state.items.map( item => {
                return (
                  <Card key={item.id}>
                    <Image src={item.imgPath} />
                    <Card.Content>
                      <Card.Header>
                        {item.name}
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
                Name: <input type="text" ref={ el => this.nameEl = el }/>
                Image path: <input type="text" ref={ el => this.imgEl = el }/>
                <Dropzone 
                  onDrop={this.onDrop}
                  preview={this.state.imgToUpload}
                />
                <input type="submit"/>
              </form>
            </Card>
          </Card.Group>
      </div>
    );
  }
}