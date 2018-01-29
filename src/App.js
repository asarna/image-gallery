import React, { Component } from 'react';
import { auth } from './fire';
import TopMenu from './components/TopMenu';
import UserProvider from './components/UserProvider';
import Layout from './components/Layout';

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
          <Layout/>
        </div>
      </UserProvider>
    );
  }
}

export default App;