const axios = require('axios');
const { writeFile } = require('fs').promises;

const getUser = (id) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    return axios.get(url)
        .then(response => response.data);
}

const getAlbums = (id) => {
    const url = `https://jsonplaceholder.typicode.com/albums?userId=${id}`;
    return axios.get(url)
        .then(response => response.data);
}

const getPhotos = (id) => {
    const url = `https://jsonplaceholder.typicode.com/photos?albumId=${id}`;
    return axios.get(url)
        .then(response => response.data);
}

const saveFile = (filename, data) => {
    return writeFile(filename, JSON.stringify(data))
        .then(() => 'file saved');
}

let filename;

getUser(2)
    .then(user => {
        console.log("Username: " + user.name);
        return getAlbums(user.id);
    })
    .then(albums => {
        console.log("Albums count: " + albums.length);
        console.log("First album name: " + albums[0].title);

        filename = albums[0].title.substr(0, 10);

        return getPhotos(albums[0].id);
    })
    .then(photos => {
        console.log("Photos:");
        photos.forEach(photo => console.log(photo.title));
        return saveFile(`${filename}.json`, photos);
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
