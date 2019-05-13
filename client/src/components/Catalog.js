import React, { Component } from 'react'
import BookList from './BookList';
import AddBook from './AddBook';

class Catalog extends Component {
  render() {
    return (
      <div>
        <h2>Catalog</h2>
        <BookList />
        <AddBook />
      </div>
    )
  }
}

export default Catalog