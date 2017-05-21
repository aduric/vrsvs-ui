import React, {Component} from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Fav from 'material-ui/svg-icons/action/favorite';
import Hist from 'material-ui/svg-icons/action/history';

const recentsIcon = <Hist />;
const favoritesIcon = <Fav />;
const nearbyIcon = <IconLocationOn />;

const styles = {
  root: {
    position: 'fixed',
    bottom: '0px'
  }
};

class BottomNav extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <div style={styles.root}>
        <Paper zDepth={1}>
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
                label="Recents"
                icon={recentsIcon}
                onTouchTap={() => this.select(0)}
            />
            <BottomNavigationItem
                label="Favorites"
                icon={favoritesIcon}
                onTouchTap={() => {
                  this.select(1)
                  this.props.dispatch(push('/subscribed'))
                }}
            />
            <BottomNavigationItem
                label="Nearby"
                icon={nearbyIcon}
                onTouchTap={() => this.select(2)}
            />
            </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

export default connect()(BottomNav);