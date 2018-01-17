import React from 'react';
import fire, { storage } from './../fire.js';
import Dropzone from 'react-dropzone';

export default class Uploader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imgFile: {}
    }

    this.addItem = this.addItem.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const storageRef = storage.ref();
    const newKey = fire.database().ref(`${this.props.user.uid}/items`).push().key; // generate unique key

    this.uploadImage(this.state.imgFile, newKey).then(() => {   // upload image
      storageRef.child(`${this.props.user.uid}/${newKey}.jpg`).getDownloadURL().then((url) => { // get image url
        this.addItem(url);  // add to db
      });
    });    
  }

  addItem(imgUrl){
    fire.database().ref(`${this.props.user.uid}/items`).push({  // Send the message to Firebase
      name: this.nameEl.value,
      imgUrl: imgUrl
    });
    this.nameEl.value = '';
    this.setState({
      imgFile: {}
    })
  }

  onDrop(files) {
    const file = files[0];

    this.setState({
      imgFile: file
    });   
  }

  uploadImage(file, filename) {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`${this.props.user.uid}/${filename}.jpg`);

    return imageRef.put(file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }

  render() {
    return <form onSubmit={this.onSubmit}>
      Name: <input type="text" ref={ el => this.nameEl = el }/>
      <Dropzone 
        multiple={false}
        onDrop={this.onDrop}
      />
      <img 
        src={this.state.imgFile.preview && this.state.imgFile.preview} 
        alt='preview'
      />
      <input type="submit"/>
    </form>
  }
}