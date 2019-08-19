const graphql = require("graphql")
const _ = require("lodash")
const Book = require("../model/book")
const Author = require("../model/author")
const User = require("../model/user")
const Orders = require("../model/orders")

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean
} = graphql

const OrderType = new GraphQLObjectType({
	name: "Order",
	fields: () => ({
		id: { type: GraphQLID },
		isPaid: { type: GraphQLBoolean },
		isDelivered: { type: GraphQLBoolean },
		userId: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.userId)
			}
		},
		booksId: { type: GraphQLString },
		orderedBooks: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				let booksId = parent.booksId.split(",")
				for (book in booksId) {
					booksId[book] = booksId[book].trim()
				}
				return Book.find({ _id: booksId })
			}
		}
	})
})

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		userName: { type: GraphQLString },
		userSurname: { type: GraphQLString },
		userEmail: { type: GraphQLString },
		orderId: { type: GraphQLString },
		order: {
			type: new GraphQLList(OrderType),
			resolve(parent, args) {
				return Orders.find({ userId: parent.id })
			}
			// past: { type: new GraphQLList(BookType) }
		},
		date: { type: GraphQLString }
	})
})

const BookType = new GraphQLObjectType({
	name: "Book",
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
		authorId: { type: GraphQLInt },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// return _.find(authors, { id: parent.authorId })
				return Author.findById(parent.authorId)
			}
		},
		orders: {
			type: new GraphQLList(OrderType),
			resolve(parent, args) {
				return Orders.find({ booksId: parent.id })
			}
		}
	})
})

const AuthorType = new GraphQLObjectType({
	name: "Author",
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
	name: "RootQueryType",
	fields: {
		order: {
			type: OrderType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Orders.findById(args.id)
			}
		},

		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return User.findById(args.id)
			}
		},

		orders: {
			type: new GraphQLList(OrderType),
			resolve(parent, args) {
				return Orders.find()
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find()
			}
		},
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
				return Book.find()
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return Author.find()
			}
		}
	}
})

const Mutation = new GraphQLObjectType({
	name: "Mutation",
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
		// addBookToBasket: {
		//   typ
		// }
		// ,
		// COMPLETE!!!
		// make an order: {

		// }
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
