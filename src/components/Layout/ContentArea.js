import React from 'react';
import { Container } from 'semantic-ui-react';
import AuthRoute from '../AuthRoute';

class ContentArea extends React.Component {
  render() {
    return <Container>
      { this.props.routes.map((route, index) => {
          return <AuthRoute 
              exact={ route.exact } 
              path={ route.path }
              authenticated={this.props.user.isLoggedIn()}
              render={() => <route.component />}
              key={index}
          />
      })}
    </Container>
  }
}

export default ContentArea;