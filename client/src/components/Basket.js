import React, { Component } from 'react'
import { connect } from 'react-redux'
import { basketAdd, basketRemove } from '../actions'

import './css/basket.css'

class Basket extends Component {
  showprops = () => {
    console.log(this.props)
  }
  basketList(products) {

    return (
      products.map(book => (
        <div key={book.ISBN} className="event">
          <div className="bookContent content">
            <span className="bookName">{book.name}</span>
            <button className="deleteFromBasket" onClick={() => this.props.basketRemove(book)}>
              <i className="trash icon"></i>
            </button>
          </div>
        </div>
      ))
    )
  }
  priceSum = (products) => {
    let sum = 0
    for (let i = 0; i < products.length; i++) {
      sum = sum + products[i].price
    }
    return sum
  }

  onPayment = () => {
    if (!this.props.login.loggedIn) {
      return this.props.history.push('/login')
    }

    // TODO  if user is loggdin add to his order
    console.log("Accept PAYMENT")
  }

  render() {
    const { products } = this.props.basket
    return (
      <div>
        <div className="ui card">
          <div className="content">
            <div className="header">Cost of {products.length} products</div>
          </div>
          <div className="content">
            <h4 className="ui sub header">Books in basket</h4>
            <div className="ui small feed">
              {this.basketList(products)}
            </div>
          </div>
          <div className="extra content">
            <span className='priceSum'>{this.priceSum(products)} zł</span>
            <button className="gotToPayment ui button" onClick={this.onPayment}>Go to payment</button>
          </div>
        </div>
        <button onClick={this.showprops}>state</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    basket: state.user.basket,
    login: state.user.details.login
  }
}

export default connect(mapStateToProps, { basketAdd, basketRemove })(Basket)