import {GraphQLServer } from 'graphql-yoga';

//Types
//String
//Boolean
//Int
//Float
//ID
// !means the it must return value of same data type not giving a null value

//Type defentions (schema)
const typeDefs = `
    type Query{
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`

//Resolvers
const resolvers = {
    Query:{
        title(){
            return "The war of art"
        },
        price(){
            return 12.99
        },
        releaseYear(){
            return 2020
        },
        rating(){
            return null
        },
        inStock(){
            return true
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(
    ()=>{
        console.log("The server is up and running");
    }
)