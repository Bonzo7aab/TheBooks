import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
  state = {
    userEmail: '',
    userPassword: ''
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
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.loginSubmit}>
          <div className="field">
            <label>Email</label>
            <input type="text" name='email' onChange={(e) => this.setState({ userEmail: e.target.value })} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="text" name='password' onChange={(e) => this.setState({ userPassword: e.target.value })} />
          </div>
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default Login