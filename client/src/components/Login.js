import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loginUser } from './actions'

class Login extends Component {
  state = {
    userEmail: '',
    userPassword: '',
    messageHidden: true,
    messageText: '',
    loggedIn: false
  }

  loginSubmit = (e) => {
    e.preventDefault()
    const { userEmail, userPassword } = this.state
    let data = {
      userEmail,
      userPassword
    }
    axios.post('http://localhost:4000/login', data
    )
      .then((res) => {
        console.log(res.data)
        this.setState({ messageHidden: false, messageText: res.data.msg, loggedIn: res.data.loggedIn })
        console.log(this.state.loggedIn)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  reduxCall = () => {
    console.log(this.props)
    //this.props.state.dispatch(loggedUser())
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
          <button onClick={this.reduxCall}>Redux</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps, { loginUser })(Login)