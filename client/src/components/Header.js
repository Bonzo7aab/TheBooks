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
import Admin from './admin/Admin'

import './css/header.css'
import image1 from '../utils/image1.png'
import logo from '../utils/logo.png'


const PrivateRoute = ({ component: Component, login, ...rest }) => (
  <Route {...rest} render={props => (
    login.loggedIn
      ? <Component {...props} />
      : <Redirect to='/contact' />
  )} />
)

const PrivateRouteAdmin = ({ component: Component, loginAdmin, ...rest }) => (
  <Route {...rest} render={props => (
    loginAdmin.loggedInADMIN
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

class Header extends Component {
  onLogout = () => (
    this.props.logOutUser()
  )

  displayMenu = (login, basket) => {
   if (login.loggedInADMIN) {
    return (
      <>
        <li><Link to='/admin'>ADMIN PANEL</Link></li>
        <li><Link to='/about' onClick={this.onLogout}>Logout</Link></li>
      </>
    )
  } if (login.loggedIn) {
      return (
        <>
        <li>
          <Link to='/basket'>Basket {this.basketNumber(basket)}</Link>
        </li>
        <li><Link to='/about' onClick={this.onLogout}>Logout</Link></li>
        </>
      )
    } else {
      return (
        <>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Log In</Link></li>
        </>
      )
    }
  }

  basketNumber = (basket) => {
    if (basket.products.length !== 0) {
      return <span>&#40;{basket.products.length}&#41;</span>
    }
  }

  render() {
    const { login, basket } = this.props
    return (
      <div>
        <Router basename='/pl'>
          <ul className='top-menu'>
            <li>PL/EN</li>
            <li><Link to='/contact'>Contact</Link></li>
            {this.displayMenu(login, basket)}
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
          <PrivateRoute path='/private' component={Private} login={this.props.login} />
          <PrivateRouteAdmin path='/admin' component={Admin} loginAdmin={this.props.login} />

        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    login: state.user.details.login,
    basket: state.user.basket,
    STORE: state
  }
}

export default connect(mapStateToProps, { logOutUser })(Header)