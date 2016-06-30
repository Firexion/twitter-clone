import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import User from './User'

export default class Users extends Component {
	componentDidMount() {
		console.log(this.props);
	}

	render() {
		const content = this.props.viewer.users.edges.map(edge => {
      return <User key={edge.node.id} user={edge.node} />;
    });
		return (
			<ol>
				{content}
			</ol>
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
