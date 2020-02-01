import {GraphQLServer } from 'graphql-yoga';
import uuid from 'uuid/v4';
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
];
const posts = [{
    id: '1',
    title: 'hello',
    body: 'bla bla bla',
    published: true,
    author: '1'
},
{
    id: '2',
    title: 'on your position',
    body: 'bla bla bla',
    published: true,
    author: '2'
},
{
    id: '3',
    title: 'On my postion',
    body: 'bla bla bla',
    published: false,
    author: '2'
}]
const comments = [
    {
        id: '1',
        text: "Worse post ever",
        author: '1',
        post: '2'
    },
    {
        id:'2',
        text: " Best post ever",
        author: '1',
        post: '3'
    },
    {
        id: '3',
        text: "Totally agree with you, man",
        author: '3',
        post : '1'
    },
    {
        id: '4',
        text:"Good point, and thoerically yes, practically NO.",
        author: '2',
        post: '1'
    }
]
//Type defentions (schema)
const typeDefs = `
    type Query{
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
        comments(query:String): [Comment!]!
    }

    type Mutation{
        createUser(data: CreateUserInput): User!
        createPost(data:CreatePostInput): Post!
        createComment(data:CreateCommentInput): Comment!
    }

    input CreateUserInput{
        name: String!
        email: String!
        age: Int
    }
    input CreatePostInput{
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }
    input CreateCommentInput{
        text: String!
        post: ID!
        author: ID!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]
        comments: [ Comment!]!
    }
    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User
        comments: [Comment!]!
    }
    type Comment{
        id: ID!
        text: String!
        author: User!
        post: Post!
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
            if(!args.query){
                return users
            }

            return users.filter((user)=>{
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        posts(parent,args,ctx,info){
            if(!args.query){
                return posts
            }

            return posts.filter((post)=>{
                return post.title.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        comments(parent,args,ctx,info){
            if(!args.query){
                return comments
            }
        }
    },
    Mutation:{
        createUser(parent,args,ctx,info){
            const emailTaken = users.some((user)=>user.email == args.data.emailTaken);
            if(emailTaken){
                throw new Error('Email taken.');
            }
            let user = {
                ...args.data,
                id: uuid()

            }
            users.push(user);
            return user;
        },
        createPost(parents,args,ctx,info){
            const userFound = users.some((user)=>user.id === args.data.author);
            if(!userFound);
            let post = {
                id: uuid(),
                ...args.data
            }
            posts.push(post);
            return post;
        },
        createComment(parent, args, ctx,info){
            const userFound = users.some((user)=>user.id === args.data.author);
            const postFound = posts.some((post)=>post.id == args.data.post);
            if( !userFound && !postFound){
                throw new Error('Either the user not found or post not found');
            }
            let comment = {
                id: uuid(),
                ...args.data
            }
            comments.push(comment);
            return comment;
        }
    },
    Post: {
        author(parent, args, ctx,info){
            return users.find((user)=> user.id == parent.author)
        },
        comments(parent,args,ctx,info){
            return comments.filter((comment)=>comment.post == parent.id)
        }
    },
    User:{
        posts(parent,args,ctx,info){
            return posts.filter((post)=>{
                return post.author === parent.id
            })
        },
        comments(parent,args,ctx,info){
            return comments.filter((comment)=>comment.author === parent.id)
        }
    },
    Comment:{
        author(parent,args,ctx,info){
            return users.find((user)=>user.id === parent.author)
        },
        post(parent,args,ctx,info){
            return posts.find((post)=>post.id == parent.post)
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