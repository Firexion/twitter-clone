import React from 'react'
import {Link} from 'react-router'
import Relay from 'react-relay'

export default class Home extends React.Component {
	render () {
		return (
			<div className="jumbotron col-sm-12 text-center" style= {{background: 'transparent'}}>
				<Link to='/users'>
					<button type='button' className='btn btn-lg btn-success'>Users</button>
				</Link>
			</div>
		);
	}
}