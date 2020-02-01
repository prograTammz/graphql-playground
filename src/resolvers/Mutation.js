const Mutation = {
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
}
export {Mutation as default}