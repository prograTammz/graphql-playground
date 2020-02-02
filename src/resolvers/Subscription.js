const Subscription = {

        comment: {
            subscribe(parent, args, {
                db,
                pubsub
            }, info) {
                const {
                    postID
                } = args;
                const post = db.posts.find((post) => post.id === postID && post.published);

                if (!post) {
                    throw new Error("Post not found");
                }

                return pubsub.asyncIterator(`Comment`)
            }
        },
        post: {
            subscribe(parent, args, {db, pubsub}, info) {
                return pubsub.asyncIterator(`Post`);
            }
        }
    }
    export { Subscription as default}