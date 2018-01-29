import React from 'react';
import { Grid } from 'semantic-ui-react';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import TopMenu from './TopMenu';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { routes } from '../routes';

export default class Layout extends React.Component {
  render() {
    return <Router>
      <div>
        <TopMenu/>
        <Grid>
          <Grid.Column width={4}>
            <Sidebar routes={ routes }/>
          </Grid.Column>
          <Grid.Column width={12}>
            <ContentArea routes={ routes }/>
          </Grid.Column>
        </Grid>
      </div>
    </Router>
  }
}