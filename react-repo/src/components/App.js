import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Header from './header';
import { connect } from "react-redux";
import { setUser } from "../actions";
import * as util from "../util";
import { ToastContainer } from 'react-toastify';

class App extends Component {

	componentDidMount() {
		const user = util.getUser();
		if (user) {
			this.props.setUser(user);
		}
	}

	render = () => {
		return (
			<div>
				<ToastContainer />
				<Header {...this.props} />
				{this.props.children}
			</div>
		);
	}
}


export default connect(null, { setUser })(App);