import React from 'react';
import user from '../User/UserHOC';
import { Button, Grid, Segment, Header } from 'semantic-ui-react';
import './Splash.css';

class Splash extends React.Component {

  render() {
    return <div className='splash'>
      <Grid
        textAlign='center'
        verticalAlign='middle'
        className='splash'
        columns={3}
      >
        <Grid.Column as={Segment}>
          <Header as='h1'>Start storing your images now</Header>
          <Button 
            onClick={this.props.user.login}
            fluid
            primary
          >Login or Register with Google</Button>
        </Grid.Column>
      </Grid>
    </div>
  }
}

export default user(Splash);