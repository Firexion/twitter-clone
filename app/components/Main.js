import React from 'react'
import Relay from 'react-relay';

import { Grid } from 'react-mdl';

export default class Main extends React.Component {
	render () {
		return (
			<Grid>
				{this.props.children}
			</Grid>
		)
	}
}