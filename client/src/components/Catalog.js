import React, { Component } from 'react'
import BookList from './BookList';
import {connect} from 'react-redux'

class Catalog extends Component {
  render() {
    return (
      <div>
        <BookList />
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return {
    user: state.user.details
  }
}

export default connect(mapStatetoProps)(Catalog)