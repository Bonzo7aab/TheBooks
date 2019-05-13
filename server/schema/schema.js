const graphql = require('graphql');
const _ = require('lodash')
const Book = require('../model/book')
const Author = require('../model/author')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    category: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    price: { type: GraphQLInt },
    nrInStock: { type: GraphQLInt },
    ISBN: { type: GraphQLInt },
    publisher: { type: GraphQLString },
    publishDate: { type: GraphQLInt },
    addedDate: { type: GraphQLInt },
    description: { type: GraphQLString },
    condition: { type: GraphQLString },
    nrPages: { type: GraphQLInt },
    shelveInShop: { type: GraphQLInt },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId })
        return Author.findById(parent.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id })
        return Book.find({ authorId: parent.id })
      }
    }
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(books, { id: args.id })
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id })
        return Author.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books
        return Book.find()
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors
        return Author.find()
      }
    }
  }
})


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
        imageURL: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        nrInStock: { type: new GraphQLNonNull(GraphQLInt) },
        ISBN: { type: new GraphQLNonNull(GraphQLInt) },
        publisher: { type: new GraphQLNonNull(GraphQLString) },
        publishDate: { type: new GraphQLNonNull(GraphQLInt) },
        addedDate: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        condition: { type: new GraphQLNonNull(GraphQLString) },
        nrPages: { type: new GraphQLNonNull(GraphQLInt) },
        shelveInShop: { type: new GraphQLNonNull(GraphQLInt) }
      },
      // Connecting Book model from Mongoose with provided GraphQL data
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          category: args.category,
          authorId: args.authorId,
          imageURL: args.imageURL,
          price: args.price,
          nrInStock: args.nrInStock,
          ISBN: args.ISBN,
          publisher: args.publisher,
          addedDate: args.addedDate,
          description: args.description,
          condition: args.condition,
          nrPages: args.nrPages,
          shelveInShop: args.shelveInShop
        })
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})