import React, { Component } from 'react';
import { InputField } from './';
import { connect } from "react-redux";
import { login, signup, logout } from "../actions";
import * as util from "../util";
import { toast } from 'react-toastify';

class Header extends Component {

  state = {
    activeButton: null,
    isLoginButton: true,
    email: "",
    password: "",
    isLoggedInUser: false,
    userDetails: null,
    formError: ""
  };

  componentDidMount() {
    const userData = util.getUser();
    if (userData) {
      this.setState({
        userDetails: userData,
        isLoggedInUser: true
      })
    }
  }

  activeClass = (event) => {
    this.setState({
      activeButton: event
    })
  }

  authenticationHandler = () => {
    const { email, password } = this.state
    if (this.state.isLoginButton) {
      this.props.login({ email, password })
        .then(() => {
          const response = this.props.signin_data;
          this.setState({
            email: "",
            password: "",
            isLoggedInUser: true,
            userDetails: response.user
          })
        })
        .catch((error) => {
          toast.error('Invalid email/password', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        })
    } else {
      if (util.validateEmail(email)) {
        this.props.signup({ email, password })
          .then(() => {
            this.setState({
              email: "",
              password: "",
              isLoginButton: true,
            })
          })
          .catch(() => {
            const error = this.props.signup_data;
            if (error && error.response && error.response.data.error) {
              toast.error(error.response.data.error);
            } else {
              toast.error('Bad request', {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
          })
      } else {
        this.setState({
          formError: "Invalid email address"
        })
      }
    }

  }

  renderSignup() {
    if (!this.state.isLoginButton) {
      return (
        <div className="row">
          Already have an account?  &nbsp;
          <u className="custom-link" onClick={() => this.setState({ isLoginButton: true })}>Sign in</u>
        </div>
      )
    } else {
      return (
        <div className="row">
          Don't have an account?&nbsp;
      <u className="custom-link" onClick={() => this.setState({ isLoginButton: false })}> Sign up  </u>
        </div>
      )
    }
  }

  logoutUser = () => {
    this.props.logout()
    util.logoutUser();
    this.setState({
      isLoggedInUser: false
    })
  }

  renderAccount() {
    if (this.state.isLoggedInUser) {
      return (
        <div className="col-8 userDetails-container">
          <h6 className="text">{this.state.userDetails.email}</h6>
          <button onClick={this.logoutUser} className="ButtonContainer ml-3"> Log out</button>
        </div>
      )
    } else {
      return (
        <div className="col-8 authentication-container">
          <div className="row signup-container">
            <div className="col-5 mt-1  ">
              <InputField placeHolder="Email" value={this.state.email} type="email" onChange={(value) => this.setState({ email: value })} />
            </div>
            <div className="col-5 mt-1">
              <InputField placeHolder="Password" value={this.state.password} type="password" onChange={(value) => this.setState({ password: value })} />
            </div>
            <div className="col-2  mt-1 button-wrapper">
              <button onClick={this.authenticationHandler} className="w-100 ButtonContainer"> {this.state.isLoginButton ? "Sign in" : "Sign up"}</button>
            </div>
          </div>
          <div className="row">
            {this.renderSignup()}
            <p className="ml-4"> | &nbsp; Forgot Password</p>
          </div>
        </div>
      )
    }
  }

  render = () => {
    return (
      <div className="container-fluid navbar-dark">
        <div className="">
          <nav className="navbar navbar-expand-sm header-container">
            <div className="col-4 pl-0">
              {/* <img src={logo} className="App-logoTop" /> */}
            </div>
            {this.renderAccount()}
          </nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    signin_data: state.data.login_data,
    signup_data: state.data.sign_up_data,
  };
}
export default connect(mapStateToProps, { login, signup, logout })(Header);
