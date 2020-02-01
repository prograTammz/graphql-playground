import {GraphQLServer } from 'graphql-yoga';
import uuid from 'uuid/v4';
import db from './db';

import Query from "./resolvers/Query";


//Resolvers
const resolvers = {
    
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context:{
        db
    }
})

server.start(
    ()=>{
        console.log("The server is up and running");
    }
)