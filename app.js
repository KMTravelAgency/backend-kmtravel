const express = require('express');
const amqp = require('amqplib');

var channel;
var connection;

var amqp_url = process.env.AMQP_URL || 'amqp://localhost:5672';

async function connectQueue() {
    try {
        console.log('Connecting to amqp: ' + amqp_url);
        connection = await amqp.connect(amqp_url)
        channel = await connection.createChannel();

        console.log('Connection established');

        await channel.assertQueue("product_queue",)
    } catch (error) {
        console.log(error)
    }
}
connectQueue();



const app = express();

app.get("/", (req, res) => {
    res.send({message: "Hello from kmtravel backend!"});
});



app.listen(8080, console.log("Server is running on port, ", 8080));