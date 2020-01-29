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
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`

//Resolvers
const resolvers = {
    Query:{
        id(){
            return 'abc123'
        },
        name(){
            return "Ahmed Tamer"
        },
        age(){
            return 21
        },
        employed(){
            return false
        },
        gpa(){
            return null
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