import React, { Component } from 'react';
import fire from './../fire.js';
import { Card, Dimmer, Loader, Header } from 'semantic-ui-react';
import Item from './Item';
import Uploader from './Uploader';
import user from './UserHOC';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false
    }
    this.setLoading = this.setLoading.bind(this);
  }

  componentWillMount() {
    this.getItems(); 
  }

  getItemIndex(id) {
    const itemIndex = this.state.items.findIndex(item => {
      return item.id === id;
    });
    return itemIndex;
  }

  setLoading(bool) {
    this.setState({
      loading: bool
    });
  }

  getItems() {
    this.setLoading(true);
    const { user } = this.props;
    /* Create reference to items in Firebase Database */
    let itemsRef = fire.database().ref(`${user.profile.uid}/items`).orderByKey().limitToLast(100);
    itemsRef.on('child_added', snapshot => {
      // Update React state when item is added at Firebase Database
      let item = { 
        name: snapshot.val().name,
        description: snapshot.val().description,
        imgUrl: snapshot.val().imgUrl, 
        id: snapshot.key 
      };
      this.setState({ 
        items: [item].concat(this.state.items),
      });
      this.setLoading(false);
    });

    itemsRef.on('child_removed', snapshot => {
      // Update React state when item is removed at Firebase Database
      const itemId = snapshot.key;
      const itemIndex = this.getItemIndex(itemId);
      const itemsArr = this.state.items;
      itemsArr.splice(itemIndex, 1);

      this.setState({
        items: itemsArr
      });
    });

    itemsRef.on('child_changed', snapshot => {
      const itemId = snapshot.key;
      const itemIndex = this.getItemIndex(itemId);
      const snapshotVal = snapshot.val();
      const itemsArr = this.state.items;
      itemsArr[itemIndex] = {
        ...itemsArr[itemIndex],
        ...snapshotVal
      };
      this.setState({
        items: itemsArr
      });
    });
  };

  render() {
    return (
      <div>
        <Dimmer 
          active={this.state.loading}
          inverted
        >
          <Loader />
        </Dimmer>
        <Header as='h1'>My stuff</Header>
        <Card.Group itemsPerRow={4}>
            {
              this.state.items.map( item => {
                return (
                  <Item
                    img={item.imgUrl}
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    user={this.props.user}
                  />
                )
              })
            }
            <Card className='uploaderCard'>
              <Uploader 
                setLoading={this.setLoading}
                user={this.props.user}
              />
            </Card>
          </Card.Group>
      </div>
    );
  }
}

export default user(Items);

