import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {Facebook, FacebookApiException} from 'fb';
import User from './User'
import { fetchUsersIfNeeded } from '../actions'
import FacebookUserProvider from '../util/FacebookUserProvider'
import Divider from 'material-ui/Divider';
import {List, ListItem } from 'material-ui/List';

class FacebookUserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        users: []
    };
    var options = {
      appId      : '288501908166908',
      xfbml      : true,
      version    : 'v2.7'
    };
    var accessToken = props.auth.getAccessToken();
    this.fb = new FacebookUserProvider(accessToken);
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchUsersIfNeeded(this.fb.getProvider()))
  }
  render() {
    if(this.props.users.length == 0) {
      return(
        <div>
          <p style={{"padding-left": "16px"}}>There are no active friends. Invite some!</p>
          <Divider inset={true} />
        </div>
      )
    } else {
        return(
            <List>
                {this.props.users.map(user =>
                    <User 
                    meid={this.props.profileId}
                    fbase={this.props.fbase}
                    {...user}
                    />
                )}
                <Divider inset={true} />
            </List>
        )
    }
  }
}

export default connect()(FacebookUserList);