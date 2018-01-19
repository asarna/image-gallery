import React from 'react';
import fire, { storage } from './../fire.js';
import Dropzone from 'react-dropzone';
import './Uploader.css';
import { Form } from 'semantic-ui-react';

export default class Uploader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imgFile: {},
      form: {
        name: '',
        description: ''
      }
    }

    this.itemsPath = `${this.props.user.uid}/items`;

    this.addItem = this.addItem.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const storageRef = storage.ref();
    const newKey = fire.database().ref(this.itemsPath).push().key; // generate unique key

    this.uploadImage(this.state.imgFile, newKey).then(() => {   // upload image
      storageRef.child(`${this.props.user.uid}/${newKey}.jpg`).getDownloadURL().then((url) => { // get image url
        this.addItem(url);  // add to db
      });
    }); 

    this.setState({
      imgFile: {}
    });   
  }

  addItem(imgUrl){
    const { form: { name, description } } = this.state;

    fire.database().ref(this.itemsPath).push({  // Send the message to Firebase
      name: name,
      description: description,
      imgUrl: imgUrl
    });
    this.setState({
      form: {
        name: '',
        description: ''
      }
    });
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

  onChange(e) {
    e.preventDefault();
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  render() {
    const { form: { name, description } } = this.state;

    return <Form 
      onSubmit={this.onSubmit}
      className='dropzoneWrapper'
    >
      <Form.Input 
        label='Name'
        name='name' 
        type="text" 
        onChange={this.onChange}
        value={name}
      />
      <Form.Input 
        label='Description'
        name='description' 
        type="text" 
        onChange={this.onChange}
        value={description}
      />
        <Dropzone 
          multiple={false}
          onDrop={this.onDrop}
          className='dropzone'
        >
        {this.state.imgFile.preview ? 
          <img 
            src={this.state.imgFile.preview} 
            alt='preview'
            className='previewImg'
          /> :
          <p>Drop an image here.</p>
        }
        </Dropzone>

      <input type="submit"/>
    </Form>
  }
}