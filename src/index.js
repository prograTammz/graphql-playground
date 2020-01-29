import {GraphQLServer } from 'graphql-yoga';

//Types
//String
//Boolean
//Int
//Float
//ID

//Type defentions (schema)
const typeDefs = `
    type Query{
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`

//Resolvers
const resolvers = {
    Query:{
        hello(){
            return "Hello world, this is first query!";
        },
        name(){
            return "Ahmed Tamer";
        },
        location(){
            return "56,Mohammed el mokaled";
        },
        bio(){
            return "web dev";
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