import React, { Component } from 'react'
import axios from 'axios'

import './css/register.css'

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

  displayMessage = () => {
    const removeMessage = (message) => {
      let newMessages = this.state.messageText.filter(text => text !== message)
      this.setState({ messageText: newMessages })
    }

    if (this.messageText === 0) {
      return ''
    }

      this.state.messageText.map(message => (
        <div className="ui red message" key={message.msg} hidden={this.state.messageHidden}>
          {message.msg}
          <span className='close-message' onClick={() => removeMessage(message)}><i className="window close outline icon"></i></span>
        </div>
      ))
    
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
    axios.post('http://localhost:4000/register', data)
      .then((res) => {
        this.setState({ messageHidden: false, messageText: res.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className='qwe'>
        <form className="ui form" onSubmit={this.formSubmit}>
          {this.displayMessage()}
          <div className="field">
            <label className='asa'>Name</label>
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