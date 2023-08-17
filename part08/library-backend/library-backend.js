const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const { GraphQLError } = require('graphql')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }



  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filteredBooks = await Book.find({}).populate('author')
      if(args.author) {
        filteredBooks = filteredBooks.filter(b => b.author.name === args.author)
      }
      if(args.genre) {
        filteredBooks = filteredBooks.filter(b => b.genres.find( g => g === args.genre))
      }
      return filteredBooks
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      const bookNumber = await Book.find({ author: root }).countDocuments()
      return bookNumber
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser
      if (!currentUser) {        
        throw new GraphQLError('not authenticated', {          
          extensions: {            
            code: 'BAD_USER_INPUT',          
          }        
        })      
      }

      let author = await Author.findOne({name: args.author})
      if(!author) {
        author = new Author({name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      }
      const book = new Book({...args, author: author })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return book

    },

    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser
      if (!currentUser) {        
        throw new GraphQLError('not authenticated', {          
          extensions: {            
            code: 'BAD_USER_INPUT',          
          }        
        })      
      }

      const author = await Author.findOne({name: args.name})
      
      if(!author) return null

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return author
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {    
    const auth = req ? req.headers.authorization : null    
    if (auth && auth.startsWith('Bearer ')) {      
      const decodedToken = jwt.verify(        
        auth.substring(7), process.env.SECRET      
      )      
      const currentUser = await User        
        .findById(decodedToken.id)     
      return { currentUser }    
    }  
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})