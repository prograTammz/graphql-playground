import {GraphQLServer } from 'graphql-yoga';
import uuid from 'uuid/v4';
import db from './db';



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
        users(parent,args,{ db },info){
            if(!args.query){
                return db.users
            }

            return db.users.filter((user)=>{
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        posts(parent,args,{ db },info){
            if(!args.query){
                return db.posts
            }

            return db.posts.filter((post)=>{
                return post.title.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        comments(parent,args,{ db },info){
            if(!args.query){
                return db.comments
            }
        }
    },
    Mutation:{
        createUser(parent,args,{ db },info){
            const emailTaken = db.users.some((user)=>user.email == args.data.emailTaken);
            if(emailTaken){
                throw new Error('Email taken.');
            }
            let user = {
                ...args.data,
                id: uuid()

            }
            db.users.push(user);
            return user;
        },
        deleteUser(parent,args,{ db },info){
            const userIndex = db.users.findIndex((user)=>user.id == args.id);
            if(userIndex === -1 ){
                throw new Error('user not found');
            }
            const deletedUsers = db.users.splice(userIndex, 1);

            posts = db.posts.filter((post)=>{
                const match = post.author === args.id

                if(match){
                    comments = db.comments.filter((comment)=>comment.post !== post.id);
                }

                return !match
            })
            comments = db.comments.filter((filter)=>filter.author !== args.id)

            return deletedUsers[0];
            
        },
        createPost(parents,args,{ db },info){
            const userFound = db.users.some((user)=>user.id === args.data.author);
            if(!userFound){
                throw new Error('User not found');
            }
            let post = {
                id: uuid(),
                ...args.data
            }
            db.posts.push(post);
            return post;
        },
        deletePost(parents,args,{ db },info){
            const postIndex = db.posts.findIndex((post)=>post.id === args.id);
            if(postIndex === -1){
                throw new Error("Post not found")
            }
            const deletedPosts = db.posts.splice(postIndex,1);
            comments = db.comments.filter((comment)=>comment.post !== args.id)
            return deletedPosts[0];
        },
        createComment(parent, args, { db },info){
            const userFound = db.users.some((user)=>user.id === args.data.author);
            const postFound = db.posts.some((post)=>post.id == args.data.post);
            if( !userFound && !postFound){
                throw new Error('Either the user not found or post not found');
            }
            let comment = {
                id: uuid(),
                ...args.data
            }
            db.comments.push(comment);
            return comment;
        },
        deleteComment(parent,args,{ db },info){
            const commentIndex = db.comments.findIndex((comment)=>comment.id === args.id);

            if( commentIndex === -1){
                throw new Error("This comment is not found, id incorrect");
            }

            const deletetedComments = db.comments.splice(commentIndex,1);
            
            return deletetedComments[0];
        }
    },
    Post: {
        author(parent, args, { db },info){
            return db.users.find((user)=> user.id == parent.author)
        },
        comments(parent,args,{ db },info){
            return db.comments.filter((comment)=>comment.post == parent.id)
        }
    },
    User:{
        posts(parent,args,{ db },info){
            return db.posts.filter((post)=>{
                return post.author === parent.id
            })
        },
        comments(parent,args,{ db },info){
            return db.comments.filter((comment)=>comment.author === parent.id)
        }
    },
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