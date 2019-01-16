import React, { Component } from 'react';
import UserProvider from './components/User/UserProvider';
import Layout from './components/Layout';

class App extends Component {
  render() {
    return (
      <UserProvider>
        <Layout />
      </UserProvider>
    );
  }
}

export default App;