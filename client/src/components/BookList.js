import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails';
import { connect } from 'react-redux'
import { basketAdd, basketRemove } from '../actions'

import './css/booklist.css'

class BookList extends Component {
  state = {
    showDetails: null
  }

  addOrRemoveFromBasket = (book, basket) => {
    if (!basket.products.includes(book)) {
      return (
        <button className="ui green button" onClick={() => this.props.basketAdd(book)}>
          <i className="plus icon"></i>
          Basket
        </button>
      )
    } else {
      return (
        <button className="ui red button" onClick={() => this.props.basketRemove(book)}>
          <i className="minus icon"></i>
          Basket
        </button>
      )
    }
  }

  showBookDetails = (book, basket, user) => (
    <div className='book-details-deep'>
      <div className='content ui grid'>
        <div className='two column row'>
          <div className='details_image four wide column'>
            <img src='https://thebooks.pl/wp-content/uploads/2019/01/9781407109084.jpg' alt={book.name} />
          </div>
          <div className='details_content twelve wide column'>
            <div className='ui grid'>
              <div className='six wide column'>
                <p>Name: {book.name}</p>
                <p>ISBN: {book.ISBN}</p>
                <p>Author: {book.author.name}</p>
                <p>Genre: {book.genre}</p>
              </div>
              <div className='six wide column'>
                <p>Publisher: {book.publisher}</p>
                <p>Pages: {book.nrPages}</p>
                <p>Condition: {book.condition}</p>
                <p>Date added: {book.addedDate}</p>
              </div>
              <div className='four wide column'>
                <p>Price: {book.price}</p>
                <p>In stock: {book.nrInStock}</p>
                <p>Shelves: {book.shelveInShop}</p>
                <i className="details_close close icon" onClick={() => this.setState({ showDetails: null })}></i>
                {!user.loggedIn ? <div>Log in to order</div> : this.addOrRemoveFromBasket(book, basket)}
              </div>
            </div>
            <div className='row'>
              <p>Description: {book.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="ui divider"></div>
    </div>
  )

  displayBooks = (basket, user) => {
    let {data} = this.props
    if (data.loading) {
      return <div className="ui active centered inline loader"></div>
    }

    return data.books.map(book => {
      return (
        <li key={book.id} >
          {/* <img src={book.imageURL} alt={book.name} /> */}
          <img src='https://thebooks.pl/wp-content/uploads/2019/01/9781407109084.jpg' alt={book.name} />
          <p>{book.name}</p>
          <p>{book.author.name}</p>
          <p>{book.price}</p>
          <button onClick={() => this.setState({ showDetails: book })}>Details</button>
          {!user.loggedIn ? <div>Log in to order</div> : this.addOrRemoveFromBasket(book, basket)}
        </li >
      )
    })
  }

  seeState = () => {
    console.log('STATE: ', this.state)
    console.log('PROPS: ', this.props)
  }

  render() {
    const {basket, user} = this.props
    return (
      <div>
        {this.state.showDetails ? this.showBookDetails(this.state.showDetails, basket, user) : null}
        <h2>Catalog</h2>
        <ul id='book-list'>
          {this.displayBooks(basket, user)}
        </ul>
        <BookDetails bookId={this.state.selected} />
        <button onClick={this.seeState}>State</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.details.login,
    basket: state.user.basket
  }
}

const graphqla = graphql(getBooksQuery)(BookList)

export default connect(mapStateToProps, { basketAdd, basketRemove })(graphqla)
