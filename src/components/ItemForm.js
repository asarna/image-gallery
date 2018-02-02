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
    const { 
      formData: { name, description, imgFile }, 
      showDropzone, handleSubmit, handleChange, buttonText, children
    } = this.props;

    return <Form 
      onSubmit={handleSubmit}
      className='dropzoneWrapper'
    >
      {showDropzone && <Dropzone 
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
        onChange={handleChange}
        value={name}
      />
      <Form.Input 
        label='Description'
        name='description' 
        type="text" 
        onChange={handleChange}
        value={description}
      />
      <Button type="submit">{buttonText}</Button>
      { children }
    </Form>
  }
}

