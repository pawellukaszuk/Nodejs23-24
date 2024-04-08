const http = require("http");

let users = [
    {
      name: "Jan",
      username: "Nowak",
      email: "jannowak@gmail.com",
      id: 1
    },
    {
      name: "Leszek",
      username: "Kowalski",
      email: "leszekkowalski@gmail.com",
      id: 2
    },
    {
      name: "Grzegorz",
      username: "Nowacki",
      email: "grzegorznowacki@gmail.com",
      id: 3
    }
  ];

const showUser = (searchParams, response) => {
    if (!searchParams.has("id")) {
        response.writeHead(200, {"Content-type": "application/json"});
        response.write(JSON.stringify(users));
        return;
    }

    const user = users.filter(
        (u) => u.id == searchParams.get("id")
    );

    if (!user[0]) {
        response.writeHead(404);
        response.write("Not found");
    } else {
        response.writeHead(200, {"Content-type": "application/json"});
        response.write(JSON.stringify(user[0]));
    }
};

const addUser = (searchParams, response) => {
    let name = searchParams.get("name");
    let username = searchParams.get("username");
    let email = searchParams.get("email");

    var userIds = users.map(u => u.id);
    var maxUserId = Math.max(...userIds);

    let newUser = {
        name: name,
        username: username,
        email: email,
        id: maxUserId + 1
    }

    users.push(newUser);
    
    response.writeHead(201);
    response.write(newUser.id.toString());
};

const deleteUser = (searchParams, response) => {
    if (!searchParams.has("id")) {
        response.writeHead(400);
        response.write("Brak parametru Id");
        return;
    }

    const userExists = users.find(
        (u) => u.id == searchParams.get("id")
    );

    if (!userExists) {
        response.writeHead(404);
        response.write("Not found");
    } else {
        users = users.filter(
            (u) => u.id != searchParams.get("id")
        );
        response.writeHead(204);
        response.write("Not Deleted");
    }
}

const app = http.createServer((request, response) => {
    const urlObject = new URL(`http://${request.headers.host}${request.url}`);
    if (urlObject.pathname === "/show" && request.method === "GET") {
        showUser(urlObject.searchParams, response);
    } else if (urlObject.pathname === "/add" && request.method === "POST") {
        addUser(urlObject.searchParams, response);
    } else if (urlObject.pathname === "/delete" && request.method === "DELETE") {
        deleteUser(urlObject.searchParams, response);
    } else if (urlObject.pathname === "/show" || urlObject.pathname === "/add" || urlObject.pathname === "/delete") {
        response.writeHead(405);
        response.write("Method not allowed");
    } else{
        response.writeHead(404);
        response.write("Not found");
    }
    
    response.end();
});

app.listen(4700);
