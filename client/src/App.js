import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import Header from './components/Header';
import Footer from './components/Footer';


import './components/css/app.css'

//Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className='ui container'>
          <Header />
          <Footer />
        </div>
      </ApolloProvider>
    )
  }
}

export default App