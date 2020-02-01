import {GraphQLServer } from 'graphql-yoga';
import uuid from 'uuid/v4';
import db from './db';

import Query from "./resolvers/Query";


//Resolvers
const resolvers = {
    Comment:{
        author(parent,args,{ db },info){
            return db.users.find((user)=>user.id === parent.author)
        },
        post(parent,args,{ db },info){
            return db.posts.find((post)=>post.id == parent.post)
        }
    }
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