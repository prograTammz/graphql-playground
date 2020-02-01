const Query = {
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
}

export {Query as default}
