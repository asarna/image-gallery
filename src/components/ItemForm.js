import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import './ItemForm.css';

export default class ItemForm extends React.Component {

  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    const file = files[0];

    this.props.setImgFile(file);  
  }

  render() {
    const { formData: { name, description, imgFile } } = this.props;

    return <Form 
      onSubmit={this.props.handleSubmit}
      className='dropzoneWrapper'
    >
      {this.props.showDropzone && <Dropzone 
          multiple={false}
          onDrop={this.onDrop}
          className='dropzone'
        >
        {imgFile.preview ? 
          <img 
            src={imgFile.preview} 
            alt='preview'
            className='previewImg'
          /> :
          <p>Drop an image here.</p>
        }
        </Dropzone>
      }
      <Form.Input 
        label='Name'
        name='name' 
        type="text" 
        onChange={this.props.handleChange}
        value={name}
      />
      <Form.Input 
        label='Description'
        name='description' 
        type="text" 
        onChange={this.props.handleChange}
        value={description}
      />
      <Button type="submit">{this.props.buttonText}</Button>
      { this.props.children }
    </Form>
  }
}

