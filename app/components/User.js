import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router'
import { ListItem, ListItemContent, ListItemAction, Button } from 'react-mdl';

export default class User extends Component {
	render() {
		const user = this.props.user;
		return (
			<ListItem>
				<ListItemAction>
					<Link to= {"/user/" + user.username}>
						<ListItemContent avatar="person">{user.name}</ListItemContent>
					</Link>
				</ListItemAction>
			</ListItem>
		);
	}
}

User.propTypes = {
  user: PropTypes.shape({
  	id: PropTypes.string.isRequired,
  	name: PropTypes.string.isRequired,
  	username: PropTypes.string.isRequired
  })
}


export default Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
  			name,
  			username
      }
    `,
  },
});