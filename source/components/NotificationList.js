import React from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { fetchNotificationsIfNeeded, handleSeen } from '../actions'

class NotificationList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        notifications: []
    };
  }
  getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchNotificationsIfNeeded(this.props.fbase, this.props.auth.getProfile().user_id))
    
    //this.bindAsArray(firebaseRef.limitToLast(10), 'notifications');
    console.log('fetching notifications')
  }
  handleSeen() {
      console.log('handle seen')
      const { dispatch } = this.props
      dispatch(handleSeen(this.props.fbase, this.props.auth.getProfile().user_id))
  }
  render() {
      console.log('rednering notifications')
      console.log(this.props)
    return(
        <IconMenu
            onItemTouchTap={() => this.handleSeen()}
            iconButtonElement={     
                <Badge
                    badgeContent={this.props.notifications.length}
                    secondary={true}
                    badgeStyle={{top: 12, right: 12}}>
                    <IconButton 
                        tooltip="Notifications">
                        <NotificationsIcon />
                    </IconButton>
                </Badge>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
            {
                this.props.notifications.map(n =>
                    <MenuItem primaryText={n.message} />
            )}
        </IconMenu>
    );
  }
}

NotificationList.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default connect()(NotificationList)