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

  loginSubmit = async e => {
    e.preventDefault()
    // const { userEmail, userPassword } = this.state
    // let inputData = {
    //   userEmail,
    //   userPassword
    // }

    
    // LOGIN FOR ADMIN SIMPLE
    let inputData = {
      userEmail: 'sadur@gmail.com',
      userPassword: '123456'
    }
    let res = await axios.post('http://localhost:4000/login', inputData)
      console.log('SERVER: ', res.data)
      this.loginVerify(res.data)
  }

  loginVerify = (data) => {
    const { logInUser, logOutUser, logInADMIN, history } = this.props
    if (data.loggedIn === true) {
      if (data.loggedInADMIN) {
        logInADMIN(data)
        history.push('/admin')
      } else {
        logInUser(data)
        history.push('/private')
      }
    } else {
      logOutUser()
    }
    this.setState({ messageHidden: false, messageText: data.msg })
  }

  render() {
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
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    login: state.user.details.login
  }
}

export default connect(mapStateToProps, { logInUser, logOutUser, logInADMIN })(Login)