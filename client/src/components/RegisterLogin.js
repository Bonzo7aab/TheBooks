import React, { Component } from 'react'
import axios from 'axios'

class RegisterLogin extends Component {
  state = {
    signUpName: '',
    signUpSurname: '',
    signUpEmail: '',
    signUpPassword: '',
    signUpConfirmPassword: ''
  }



  formSubmit = (e) => {
    e.preventDefault()
    const { signUpName, signUpSurname, signUpEmail, signUpPassword, signUpConfirmPassword } = this.state
    let data = {
      signUpName,
      signUpSurname,
      signUpEmail,
      signUpPassword,
      signUpConfirmPassword
    }
    axios.post('http://localhost:4000/registerLogin', data
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
        <form className="ui form" onSubmit={this.formSubmit}>
          <div className="field">
            <label>Name</label>
            <input type="text" name='name' onChange={(e) => this.setState({ signUpName: e.target.value })} />
          </div>
          <div className="field">
            <label>Surname</label>
            <input type="text" name='surname' onChange={(e) => this.setState({ signUpSurname: e.target.value })} />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="text" name='email' onChange={(e) => this.setState({ signUpEmail: e.target.value })} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="text" name='password' onChange={(e) => this.setState({ signUpPassword: e.target.value })} />
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <input type="text" name='confirmPassword' onChange={(e) => this.setState({ signUpConfirmPassword: e.target.value })} />
          </div>
          <button>Register</button>
        </form>
      </div>
    )
  }
}

export default RegisterLogin