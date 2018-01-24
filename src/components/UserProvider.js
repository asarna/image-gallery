import { Component, Children } from 'react';
import PropTypes from 'prop-types';

class UserProvider extends Component {

  static childContextTypes = {
     user: PropTypes.object,
  }

  getChildContext() {
   const { user } = this.props;
   return { user }
  }

  render() {
    return Children.only(this.props.children)
  }
}

export default UserProvider;