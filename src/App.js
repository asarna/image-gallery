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
              render={() => <AuthContent
                user={ this.state.user }
              />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;