import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogIn from './logIn';
import SignUp from './signUp';
import { signUpUser } from '../actions/signUpAction';
import { logIn } from '../actions/loginAction';

class Splash extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      imageURL: '',
      location: ''
    }

    this.onChange = this.onChange.bind(this);
    this.handleData = this.handleData.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleData(){
    const data = this.state;
    this.props.signUpUser(data)
    .then(() => {
      this.props.history.push('/home');
    })
  }

  handleLogin() {
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.logIn(user)
    .then(() => {
      this.props.history.push('/home')
    })
  }

  handleKeyPress(e) {
    if(e.charCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      const user = {
        username: this.state.username,
        password: this.state.password
      }
      this.props.logIn(user)
      .then(() => {
        this.props.history.push('/home');
      })
    }
  }

  render(){
    return (
      <div className="splashWrapper">
        <div className="loginWrapper">
          <div className="loginHeader">
            <div className="loginLogo">
              <div className="loginLogoTitle"><img className="splashLogo" alt="logo" src="https://www.jarrodyellets.com/images/BlogHubLogo.png"/>Nucleus</div>
              <div className="loginLogoDescription">Watch the World Happen Live.</div>
            </div>
            <div className="loginTitle">{this.props.member ? "Login:" : "Sign Up:"}</div>
          </div>
          <div className="loginFormWrapper">
            {this.props.member || this.props.userData.newUser ? <LogIn userData={this.props.userData} handleMember={this.props.handleMember} onChange={this.onChange} handleKeyPress={this.handleKeyPress} handleLogin={this.handleLogin}/> : <SignUp user={this.state} userData={this.props.userData} handleData={this.handleData} handleKeyPress={this.handleKeyPress} onChange={this.onChange} handleMember={this.props.handleMember} />}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  member: state.member.member,
  userData: state.user,
})

export default connect(mapStateToProps, {signUpUser, logIn})(Splash);