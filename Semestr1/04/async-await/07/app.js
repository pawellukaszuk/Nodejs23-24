const axios = require('axios');

const getUser = async (id) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    const response = await axios.get(url);
    return response.data;
}

const getPosts = async (id) => {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${id}`;
    const response = await axios.get(url);
    return response.data;
}

const getComments = async (id) => {
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${id}`;
    const response = await axios.get(url);
    return response.data;
}

(async () => {
    try {
        const user = await getUser(2);
        console.log(user.name);
        console.log(user.email);

        const posts = await getPosts(user.id);
        console.log('posts count:', posts.length);

        const commentsPromise = posts.map(post => getComments(post.id));
        const comments = await Promise.all(commentsPromise);

        commentsCount = comments.reduce((result, next) => result + next.length, 0);
        console.log('comments count:', commentsCount);
    }
    catch (error) {
        console.log('user not found');
    }
})();
