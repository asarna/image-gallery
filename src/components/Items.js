import React, { Component } from 'react';
import fire, { auth, provider, storage } from './../fire.js';
import { Card, Image, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

export default class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      imgFile: {}
    }
  }

  componentWillMount() {
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
  }

  addItem(e){
    e.preventDefault();

    let imgUrl;

    this.uploadImage(this.state.imgFile).then(() => {
      const storageRef = storage.ref();
        storageRef.child(`${this.props.user.uid}/image.jpg`).getDownloadURL().then((url) => {
          imgUrl = url;

          /* Send the message to Firebase */
          fire.database().ref(`${this.props.user.uid}/items`).push({
            name: this.nameEl.value,
            imgUrl: imgUrl
          });
          this.nameEl.value = '';
          this.setState({
            imgFile: {}
          })
        });
    });

    
    
  }

  onDrop(files) {
    const file = files[0];

    this.setState({
      imgFile: file
    });   
  }

  uploadImage(file) {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`${this.props.user.uid}/image.jpg`);

    return imageRef.put(file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
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
                    <Image src={item.imgUrl} />
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
                        description
                      </Card.Description>
                    </Card.Content>
                  </Card>
                )
              })
            }
            <Card>
              <form onSubmit={this.addItem.bind(this)}>
                Name: <input type="text" ref={ el => this.nameEl = el }/>
                <Dropzone 
                  ref={ el => this.imgEl = el}
                  multiple={false}
                  onDrop={this.onDrop.bind(this)}
                />
                <img src={this.state.imgFile.preview && this.state.imgFile.preview} />
                <input type="submit"/>
              </form>
            </Card>
          </Card.Group>
      </div>
    );
  }
}