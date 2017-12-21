import React, { Component } from 'react';
import fire, { auth, provider } from './fire';
import AuthContent from './components/AuthContent';
import AuthRoute from './components/AuthRoute';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentItem: '',
      username: '',
      items: [],
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }

  componentWillMount() {
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }

  render() {
    return (
      <div>
        <Menu inverted>
          <Menu.Menu position='right'>
          {this.state.user ?
            <Menu.Item onClick={this.logout}>Log Out</Menu.Item>                
            :
            <Menu.Item onClick={this.login}>Log In</Menu.Item>              
          }
          </Menu.Menu>
        </Menu>
        <div className="wrapper">
          <h1>An app</h1>
          
        </div>
        <Router>
          <div>
            <AuthRoute
              exact
              path="/secret"
              authenticated={!!this.state.user}
              component={AuthContent}
            />
          </div>
        </Router>
        { this.state.user && 
          <div>
            <p>You're logged in!</p>
            <form onSubmit={this.addMessage.bind(this)}>
              <input type="text" placeholder="What's your name?" value={this.state.user.displayName || this.state.user.email} />
              <input type="text" ref={ el => this.inputEl = el }/>
              <input type="submit"/>
              <ul>
                { /* Render the list of messages */
                  this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
                }
              </ul>
            </form>
          </div>
        }
        
      </div>
    );
  }
}

export default App;