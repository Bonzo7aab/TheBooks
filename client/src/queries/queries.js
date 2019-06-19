import { gql } from 'apollo-boost'

const getBooksQuery = gql`
  {
    books {
      name
      id
      genre
      category
      price
      nrInStock
      ISBN
      publisher
      publishDate
      addedDate
      imageURL
      description
      condition
      nrPages
      shelveInShop
      author {
        name
      }
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!, $category: String!, $price: Int!, $nrInStock: Int!, $ISBN: Int!, $publisher: String!, $publishDate: Int!, $imageURL: String!,
  $addedDate: Int!, $description: String!, $condition: String!, $nrPages: Int!, $shelveInShop: Int!){
    addBook(name: $name, genre: $genre, authorId: $authorId,
      category: $category, price: $price, nrInStock: $nrInStock, ISBN: $ISBN, publisher: $publisher, publishDate: $publishDate, imageURL: $imageURL,
      addedDate: $addedDate, description: $description, condition: $condition, nrPages: $nrPages, shelveInShop: $shelveInShop){
      name
      id
    }
  }
`

const getBookQuery = gql`
  query($id: ID){
    book(id: $id){
      id
      name
      genre
      category
      price
      nrInStock
      ISBN
      publisher
      publishDate
      addedDate
      imageURL
      description
      condition
      nrPages
      shelveInShop
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`

// const addBookToBasketMutation = gql`
// `

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery }