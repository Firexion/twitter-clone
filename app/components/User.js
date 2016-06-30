import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router'

export default class User extends Component {
	render() {
		const user = this.props.user;
		return (
			<Link to= {"user/" + user.username}>
				<button type='button' className='btn btn-lg btn-success'>{user.name}</button>
			</Link>
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