import {GraphQLServer } from 'graphql-yoga';

//Type defentions (schema)
const typeDefs = `
    type Query{
        hello: String!
    }
`

//Resolvers
const resolvers = {
    Query:{
        hello(){
            return "Hello world, this is first query!";
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