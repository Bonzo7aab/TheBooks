import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { logOutUser } from '../actions'

import Register from './Register';
import Login from './Login';
import Basket from './Basket';
import Contact from './Contact';
import News from './News';
import About from './About';
import Catalog from './Catalog';
import Terms from './Terms';
import Faq from './Faq'
import MicroLibrary from './MicroLibrary'
import Private from './Private'

import './css/header.css'
import image1 from '../utils/image1.png'
import logo from '../utils/logo.png'


const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route {...rest} render={props => (
    loggedIn === true
      ? <Component {...props} />
      : <Redirect to='/contact' />
  )} />
)



class Header extends Component {
  onLogout = () => {
    this.props.logOutUser()
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Router basename='/pl'>
          <ul className='top-menu'>
            <li>PL/EN</li>
            <li>
              <Link to='/basket'>Basket</Link>
              {/* <div className="floating ui red label">22</div> */}
            </li>
            <li><Link to='/register'>Register</Link></li>
            <li onClick={this.onLogout}>Logout</li>
            <li><Link to='/login'>Log In</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
          <div className='header-images'>
            <img id='image1' src={image1} alt='image1' />
            <img id='logo' src={logo} alt='logo' />
            <div id='search-input' className="ui icon input">
              <input type="text" placeholder="Search..." />
              <i className="search icon"></i>
            </div>
          </div>
          <div>
            <ul className='menu five ui buttons'>
              <li className='ui button'>
                <Link to='/'>About</Link>
              </li>
              <li className='ui button'>
                <Link to='/catalog'>Catalog</Link>
              </li>
              <li className='ui button'>
                <Link to='/terms'>Terms</Link>
              </li>
              <li className='ui button'>
                <Link to='/faq'>FAQ</Link>
              </li>
              <li className='ui button'>
                <Link to='/microlibrary'>MicroLibrary</Link>
              </li>
            </ul>
          </div>
          <News />
          <div className='ui divider'></div>

          <Route path='/' exact component={About} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/basket' component={Basket} />
          <Route path='/contact' component={Contact} />
          <Route path='/catalog' component={Catalog} />
          <Route path='/terms' component={Terms} />
          <Route path='/faq' component={Faq} />
          <Route path='/microlibrary' component={MicroLibrary} />
          <PrivateRoute path='/private' component={Private} loggedIn={this.props.loggedIn} />

        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps, { logOutUser })(Header)