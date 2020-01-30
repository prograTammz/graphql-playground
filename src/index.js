import {GraphQLServer } from 'graphql-yoga';

//Types
//String
//Boolean
//Int
//Float
//ID
// !means the it must return value of same data type not giving a null value

//dummy data
const users = [{
    id: '1',
    name: "Ahmed",
    email: "ahmed@mail.com"
    },
    {
        id: '2',
        name: 'Mario',
        email: "mario@mail.com"
    },
    {
        id: '3',
        name: 'Hegazy',
        email: "hegazy@mail.com",
        age: 22
    }
]
//Type defentions (schema)
const typeDefs = `
    type Query{
        users: [User!]!
        me: User!
        post: Post!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
    }
    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

//Resolvers
const resolvers = {
    Query:{
        me(){
            return{
                id: '123abc',
                name: "Ahmed Tamer",
                email: "Ahmedtamer@mail.com",
                age: 22
            }
        },
        post(){
            return{
                id: '123abc',
                title: "Tamer the greatest",
                body: "Bla bla bla bla i am the greatest ever",
                published: true
            }
        },
        users(parent,args,ctx,info){
            return users
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