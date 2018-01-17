import React from 'react';
import fire, { storage } from './../fire.js';
import Dropzone from 'react-dropzone';

export default class Uploader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imgFile: {}
    }
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
    return <form onSubmit={this.addItem.bind(this)}>
      Name: <input type="text" ref={ el => this.nameEl = el }/>
      <Dropzone 
        multiple={false}
        onDrop={this.onDrop.bind(this)}
      />
      <img 
        src={this.state.imgFile.preview && this.state.imgFile.preview} 
        alt='preview'
      />
      <input type="submit"/>
    </form>
  }
}