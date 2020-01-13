import React from 'react';
import { Route, } from 'react-router-dom'
import App from './components/App';
import Main from './screens/Main';
import Header from './components/header';
import {ViewList} from './components/viewList'

export default (
	<App>
		<Route path="/" exact component={Main} />
		<Route path="/header" component={Header} />
		<Route path="/viewList" component={ViewList} />
	</App>
);