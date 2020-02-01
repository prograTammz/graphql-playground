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
        deleteUser(parent,args,ctx,info){
            const userIndex = users.findIndex((user)=>user.id == args.id);
            if(userIndex === -1 ){
                throw new Error('user not found');
            }
            const deletedUsers = users.splice(userIndex, 1);

            posts = posts.filter((post)=>{
                const match = post.author === args.id

                if(match){
                    comments = comments.filter((comment)=>comment.post !== post.id);
                }

                return !match
            })
            comments = comments.filter((filter)=>filter.author !== args.id)

            return deletedUsers[0];
            
        },
        createPost(parents,args,ctx,info){
            const userFound = users.some((user)=>user.id === args.data.author);
            if(!userFound){
                throw new Error('User not found');
            }
            let post = {
                id: uuid(),
                ...args.data
            }
            posts.push(post);
            return post;
        },
        deletePost(parents,args,ctx,info){
            const postIndex = posts.findIndex((post)=>post.id === args.id);
            if(postIndex === -1){
                throw new Error("Post not found")
            }
            const deletedPosts = posts.splice(postIndex,1);
            comments = comments.filter((comment)=>comment.post !== args.id)
            return deletedPosts[0];
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
        },
        deleteComment(parent,args,ctx,info){
            const commentIndex = comments.findIndex((comment)=>comment.id === args.id);

            if( commentIndex === -1){
                throw new Error("This comment is not found, id incorrect");
            }

            const deletetedComments = comments.splice(commentIndex,1);
            
            return deletetedComments[0];
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