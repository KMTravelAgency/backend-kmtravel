const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send({message: "Hello from kmtravel backend!"});
});

app.listen(8080, console.log("Server is running on port, ", 8080));