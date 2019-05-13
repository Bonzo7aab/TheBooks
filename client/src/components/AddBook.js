import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: '',
    imageURL: '',
    price: null,
    category: '',
    nrInStock: null,
    ISBN: null,
    publisher: '',
    publishDate: null,
    addedDate: null,
    description: '',
    condition: '',
    nrPages: null,
    shelveInShop: null
  }


  displayAuthors() {
    var data = this.props.getAuthorsQuery
    if (data.loading) {
      return (<option disabled>Loading Authors...</option>)
    }
    return data.authors.map(author => {
      return (<option key={author.id} value={author.id}>{author.name}</option>)
    })
  }
  submitForm = (e) => {
    e.preventDefault()
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
        category: this.state.category,
        imageURL: this.state.imageURL,
        price: this.state.price,
        nrInStock: this.state.nrInStock,
        ISBN: this.state.ISBN,
        publisher: this.state.publisher,
        publishDate: this.state.publishDate,
        addedDate: this.state.addedDate,
        description: this.state.description,
        condition: this.state.condition,
        nrPages: this.state.nrPages,
        shelveInShop: this.state.shelveInShop
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <div>
          <label>Book name:</label>
          <input type='text' onChange={(e) => this.setState({ name: e.target.value })} />
        </div>
        <div>
          <label>Genre:</label>
          <input type='text' onChange={(e) => this.setState({ genre: e.target.value })} />
        </div>
        <div>
          <label>Author:</label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <div>
          <label>Category:</label>
          <input type='text' onChange={(e) => this.setState({ category: e.target.value })} />
        </div>
        <div>
          <label>imageURL:</label>
          <input type='text' onChange={(e) => this.setState({ imageURL: e.target.value })} />
        </div>
        <div>
          <label>Price:</label>
          <input type='text' onChange={(e) => this.setState({ price: parseInt(e.target.value) })} />
        </div>
        <div>
          <label>Number in stock:</label>
          <input type='text' onChange={(e) => this.setState({ nrInStock: parseInt(e.target.value) })} />
        </div>
        <div>
          <label>ISBN:</label>
          <input type='text' onChange={(e) => this.setState({ ISBN: parseInt(e.target.value) })} />
        </div>
        <div>
          <label>Publisher:</label>
          <input type='text' onChange={(e) => this.setState({ publisher: e.target.value })} />
        </div>
        <div>
          <label>Publish date:</label>
          <input type='text' onChange={(e) => this.setState({ publishDate: parseInt(e.target.value) })} />
        </div>
        <div>
          <label>Added date:</label>
          <input type='text' onChange={(e) => this.setState({ addedDate: parseInt(e.target.value) })} />
        </div>
        <div>
          <label>Description:</label>
          <input type='text' onChange={(e) => this.setState({ description: e.target.value })} />
        </div>
        <div>
          <label>Condition:</label>
          <input type='text' onChange={(e) => this.setState({ condition: e.target.value })} />
        </div>
        <div>
          <label>Number of pages:</label>
          <input type='text' onChange={(e) => this.setState({ nrPages: parseInt(e.target.value) })} />
        </div>
        <div>
          <label>Shellve in shop:</label>
          <input type='text' onChange={(e) => this.setState({ shelveInShop: parseInt(e.target.value) })} />
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)