let users = [{
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
let posts = [{
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
let comments = [
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

const db = {
    users,
    posts,
    comments
}
export {db as default}