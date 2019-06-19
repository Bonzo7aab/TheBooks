import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { logInUser, logOutUser, logInADMIN } from '../actions'

class Login extends Component {
  state = {
    userEmail: '',
    userPassword: '',
    messageHidden: true,
    messageText: ''
  }

  loginSubmit = (e) => {
    e.preventDefault()
    const { userEmail, userPassword } = this.state
    let data = {
      userEmail,
      userPassword
    }
    axios.post('http://localhost:4000/login', data)
      .then((res) => {
        console.log('SERVER: ', res.data)
        this.loginVerify(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  loginVerify = (data) => {
    const { logInUser, logOutUser, logInADMIN, history } = this.props
    if (data.loggedIn === true) {
      if (data.loggedInADMIN) {
        logInADMIN(data)
      } else {
        logInUser(data)
        history.push('/private')
      }
    } else {
      logOutUser()
    }
    this.setState({ messageHidden: false, messageText: data.msg })
  }

  reduxCall = () => {
    console.log(this.props)
  }

  render() {
    const { logInUser, logOutUser } = this.props
    return (
      <div>
        <form className="ui form" onSubmit={this.loginSubmit}>
          <div className="ui red message" hidden={this.state.messageHidden}>{this.state.messageText}</div>
          <div className="field">
            <label>Email</label>
            <input type="text" name='email' onChange={(e) => this.setState({ userEmail: e.target.value })} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" name='password' onChange={(e) => this.setState({ userPassword: e.target.value })} />
          </div>
          <button>Login</button>
        </form>
        <button onClick={logInUser}>Redux +</button>
        <button onClick={logOutUser}>Redux -</button>
        <button onClick={this.reduxCall}>Redux Store</button>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    login: state.login.user
  }
}

export default connect(mapStateToProps, { logInUser, logOutUser, logInADMIN })(Login)