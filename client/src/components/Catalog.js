import React, { Component } from 'react'
import BookList from './BookList';
import AddBook from './AddBook';

class Catalog extends Component {
  render() {
    return (
      <div>
        <BookList />
        <AddBook />
      </div>
    )
  }
}

export default Catalog