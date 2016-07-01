import React from 'react'
import {Link} from 'react-router'
import Relay from 'react-relay'

import { Cell, Button } from 'react-mdl'

export default class Home extends React.Component {
	render () {
		return (
			<Cell col={4} offset={4}>
    		<Link to="/users">
      		<Button raised colored ripple>Users</Button>
      	</Link>
      </Cell>
		);
	}
}