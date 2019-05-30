import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { logInUser, logOutUser } from '../actions'

class Login extends Component {
  state = {
    userEmail: '',
    userPassword: '',
    messageHidden: true,
    messageText: '',
    loggedIn: false
  }


  loginSuccess = (data) => {
    const { logInUser, logOutUser } = this.props
    data.loggedIn = true ? (logInUser(), this.props.history.push('/private')) : logOutUser()
    this.setState({ messageHidden: false, messageText: data.msg })
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
        this.loginSuccess(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
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
          <br />
          <button onClick={logInUser}>Redux +</button>
          <button onClick={logOutUser}>Redux -</button>
          <button onClick={this.reduxCall}>Redux Store</button>
        </form>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    state,
    loggedIn: state.loginReducer.loggedIn
  }
}

export default connect(mapStateToProps, { logInUser, logOutUser })(Login)