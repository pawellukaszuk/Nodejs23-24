const axios = require('axios');

const getUser = async (id) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    const response = await axios.get(url);
    return response.data;
}

(async () => {
    const user = await getUser(2);
    console.log(user.name);
})();
