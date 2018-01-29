import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { auth, provider } from '../fire';


class UserProvider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ 
          profile: user
        });
      } 
    });
  };

  logout() {
     auth.signOut()
      .then(() => {
        this.setUser(null);
      });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const profile = result.user;
        this.setUser(profile);
    });
  };

  isLoggedIn() {
    return !!this.state.profile;
  }

  setUser(profile) {
    this.setState({
      profile: profile
    });
  };

  static childContextTypes = {
     user: PropTypes.object,
  }

  getChildContext() {
    const { profile } = this.state;
    return { user: {
      profile: profile,
      login: this.login,
      logout: this.logout,
      isLoggedIn: this.isLoggedIn
    }}
  };

  render() {
    return Children.only(this.props.children)
  }
}

export default UserProvider;