import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Main from '../components/Main'
import Home from '../components/Home'
import Users from '../components/Users'
import ViewerQuery from './ViewerQuery'

export default (
	<Route path='/' component={Main} >
		<IndexRoute component={Home} />
		<Route path='users' component={Users} queries={ViewerQuery} />
	</Route>
);