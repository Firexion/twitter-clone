import React, { Component } from 'react';
import User from './User'

export default class Users extends Component {
	render() {
		return (
			<ol>
				{
					this.props.route.users.map((user) => {
						return <User user={user} key={user.id} />
					})
				}
			</ol>
		);
	}
}
