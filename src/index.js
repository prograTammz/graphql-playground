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
        greeting(name: String, isNew: Boolean!): String!
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
        greeting(parent, args, ctx, info){
            if(args.isNew){
                if(args.name != ""){
                    return `Welcome to our platform, ${args.name}`;
                }else{
                    return `Welcome to our platform`
                }
            }
            return "Welcome back !"
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