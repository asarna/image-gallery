import React, { Component } from 'react';
import fire from './../fire.js';

export default class authContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentWillMount() {
    /* Create reference to items in Firebase Database */
    let itemsRef = fire.database().ref(`items/${this.props.user.uid}`).orderByKey().limitToLast(100);
    itemsRef.on('child_added', snapshot => {
      /* Update React state when item is added at Firebase Database */
      let item = { text: snapshot.val(), id: snapshot.key };
      this.setState({ items: [item].concat(this.state.items) });
    })
  }

  addItem(e){
    e.preventDefault();
    /* Send the message to Firebase */
    fire.database().ref(`items/${this.props.user.uid}`).push(this.inputEl.value);
    this.inputEl.value = ''; // <- clear the input
  }

  render() {
    return (
      <div>
        <h1>My stuff</h1>
        <form onSubmit={this.addItem.bind(this)}>
          <input type="text" ref={ el => this.inputEl = el }/>
          <input type="submit"/>
          <ul>
            {
              this.state.items.map( item => <li key={item.id}>{item.text}</li> )
            }
          </ul>
        </form>
      </div>
    );
  }
}