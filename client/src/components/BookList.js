import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails';

import './css/booklist.css'

class BookList extends Component {
  state = {
    selected: null
  }

  displayBooks() {
    var data = this.props.data
    if (data.loading) {
      return (<div>Loading books...</div>)
    }

    return data.books.map(book => {
      return (
        <li key={book.id} onClick={(e) => this.setState({ selected: book.id })}>
          {/* <img src={book.imageURL} alt={book.name} /> */}
          <img src='https://thebooks.pl/wp-content/uploads/2019/01/9781407109084.jpg' alt={book.name} />
          <span>{book.name}</span>
          <p>{book.author.name}</p>
          <p>{book.price}</p>
          <button className="ui button">Add to basket</button>
        </li>
        //<li key={book.id} onClick={(e) => this.setState({ selected: book.id })}>{book.name}</li>
      )
    })
  }
  render() {
    return (
      <div>
        <ul id='book-list'>
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList)