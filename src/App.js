import React, { Component } from 'react';
import fire, { auth, provider } from './fire';
import AuthContent from './components/AuthContent';
import AuthRoute from './components/AuthRoute';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { Menu, Icon, Label, Grid } from 'semantic-ui-react';

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
        <Grid>
          <Grid.Column width={4}>
            <Menu vertical>
              <Menu.Item name='inbox' onClick={this.handleItemClick}>
                <Label color='teal'>1</Label>
                Inbox
              </Menu.Item>
              <Menu.Item name='spam' onClick={this.handleItemClick}>
                <Label>51</Label>
                Spam
              </Menu.Item>
              <Menu.Item name='updates' onClick={this.handleItemClick}>
                <Label>1</Label>
                Updates
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column width={12}>
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
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;