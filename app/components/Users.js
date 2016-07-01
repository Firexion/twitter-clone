import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import User from './User'

import { Cell, List } from 'react-mdl';

export default class Users extends Component {
	render() {
		const content = this.props.viewer.users.edges.map(edge => {
      return <User key={edge.node.id} user={edge.node} />;
    });
		return (
			<Cell col={4} offset={4}>
				<List>
					{content}
				</List>
				
			</Cell>
		);
	}
}

export default Relay.createContainer(Users, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
      	users (first: 5) {
		      edges {
		        node {
		          id,
		          ${User.getFragment('user')}
		        }
		      }
		    }
      }
    `,
  },
});
