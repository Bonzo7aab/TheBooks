import React, { Component } from 'react'
import { connect } from 'react-redux'
import { basketRemove } from '../actions'

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
      this.props.history.push('/login')
    }
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
    basket: state.basket,
    login: state.login.user
  }
}

export default connect(mapStateToProps, { basketRemove })(Basket)