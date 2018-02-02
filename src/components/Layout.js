import React from 'react';
import { Grid } from 'semantic-ui-react';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import TopMenu from './TopMenu';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { routes } from '../routes';
import user from './UserHOC';
import Splash from './Splash';

class Layout extends React.Component {

  renderLoggedInView() {
    return <div>
      <TopMenu/>
      <Grid columns={16} padded>
        <Grid.Column width={3}>
          <Sidebar routes={ routes }/>
        </Grid.Column>
        <Grid.Column width={13}>
          <ContentArea 
            routes={ routes }
            user={this.props.user}
          />
        </Grid.Column>
      </Grid>
    </div>;
  }

  render() {
    return <Router>
      { this.props.user.isLoggedIn() ?
        this.renderLoggedInView()
        : <Splash />
      }
    </Router>
  }
}

export default user(Layout);