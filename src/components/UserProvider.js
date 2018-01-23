import { Component, Children } from 'react';
import PropTypes from 'prop-types';

class UserProvider extends Component {

  // you must specify what you’re adding to the context
  static childContextTypes = {
     user: PropTypes.object,
  }

  getChildContext() {
   const { user } = this.props;
   return { user }
  }

  render() {
    // `Children.only` enables us not to add a <div /> for nothing
    return Children.only(this.props.children)
  }
}

export default UserProvider;