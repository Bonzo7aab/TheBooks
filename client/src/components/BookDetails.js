import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data
    
    if (book) {
      console.log(this.props)
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>{book.price}</p>
          <p>All books by this author</p>
          <ul>
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>
            })}
          </ul>
        </div>
      )
    }
    return (
      <div>No book selected...</div>
    )
  }
  render() {
    return (
      <div>
        <ul id='book-list'>
          <div>{this.displayBookDetails()}</div>
        </ul>
      </div>
    )
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails)