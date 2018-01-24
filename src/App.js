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
import Sidebar from './components/Sidebar';

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
              <Sidebar />
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