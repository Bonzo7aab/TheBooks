import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

import './css/header.css'
import image1 from '../utils/image1.png'
import logo from '../utils/logo.png'

class Header extends Component {
  render() {
    return (
      <div>
        <Router basename='/pl'>
          <ul className='top-menu'>
            <li>PL/EN</li>
            <li><Link to='/basket'>Basket</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
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

          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/basket' component={Basket} />
          <Route path='/contact' component={Contact} />
          <Route path='/' exact component={About} />
          <Route path='/catalog' component={Catalog} />
          <Route path='/terms' component={Terms} />
          <Route path='/faq' component={Faq} />
          <Route path='/microlibrary' component={MicroLibrary} />

        </Router>
      </div>
    )
  }
}

export default Header