import React from 'react'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import Main from '../components/Main'
import Home from '../components/Home'
import Users from '../components/Users'

const routes = (
	<Router history={hashHistory}>
		<Route path='/' component={Main}>
			<IndexRoute component={Home} />
			<Route path='users' component={Users} />
		</Route>
	</Router>
)

export default routes;