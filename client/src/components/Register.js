import React, { Component } from 'react'
import axios from 'axios'

class Register extends Component {
  state = {
    userName: '',
    userSurname: '',
    userEmail: '',
    userPassword: '',
    userConfirmPassword: '',
    messageHidden: true,
    messageText: []
  }



  formSubmit = (e) => {
    e.preventDefault()
    const { userName, userSurname, userEmail, userPassword, userConfirmPassword } = this.state
    let data = {
      userName,
      userSurname,
      userEmail,
      userPassword,
      userConfirmPassword
    }
    axios.post('http://localhost:4000/register', data
    )
      .then((res) => {
        this.setState({ messageHidden: false, messageText: res.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.formSubmit}>
          {this.state.messageText.map(message => (
            <div className="ui red message" key={message.msg} hidden={this.state.messageHidden}>{message.msg}</div>
          ))}
          <div className="field">
            <label>Name</label>
            <input type="text" name='name' onChange={(e) => this.setState({ userName: e.target.value })} />
          </div>
          <div className="field">
            <label>Surname</label>
            <input type="text" name='surname' onChange={(e) => this.setState({ userSurname: e.target.value })} />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" name='email' onChange={(e) => this.setState({ userEmail: e.target.value })} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" name='password' onChange={(e) => this.setState({ userPassword: e.target.value })} />
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <input type="password" name='confirmPassword' onChange={(e) => this.setState({ userConfirmPassword: e.target.value })} />
          </div>
          <button>Register</button>
        </form>
      </div>
    )
  }
}

export default Register