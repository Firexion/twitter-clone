import React from 'react'
import Relay from 'react-relay';

export default class Main extends React.Component {
	render () {
		return (
			<div className='main-container'>
				{this.props.children}
			</div>
		)
	}
}