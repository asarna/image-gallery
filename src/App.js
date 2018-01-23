import React, { Component } from 'react';
import { auth } from './fire';
import Items from './components/Items';
import AuthRoute from './components/AuthRoute';
import TopMenu from './components/TopMenu';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { Menu, Label, Grid } from 'semantic-ui-react';
import UserProvider from './components/UserProvider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null
    }
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }

  setUser(user) {
    this.setState({
      user: user
    })
  }

  render() {
    const { user } = this.state;

    return (
      <UserProvider user={user}>
        <div>
          <TopMenu
            user={user}
            setUser={this.setUser}
          />
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
                    authenticated={!!user}
                    render={() => <Items/>}
                  />
                </div>
              </Router>
            </Grid.Column>
          </Grid>
        </div>
      </UserProvider>
    );
  }
}

export default App;