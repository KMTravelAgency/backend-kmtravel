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

async function sendOrder(order) {
    await channel.sendToQueue("product_queue", Buffer.from(JSON.stringify(order)));

    await channel.close();
    await connection.close(); 
}

const app = express();

app.get("/", (req, res) => {
    res.send({message: "Hello from kmtravel backend!"});
});

app.post("/orders", (req, res) => {

    console.log("order was received: " + req.body)

    const order = {
        uuid: "96581174-7d68-4fc8-9cb0-d5a8b263ab77",
        name: "Bella Italia",
        country: "Italy",
        location: "lake garda",
        accommodation_type: "mobilehomes",
        accommodation_unit_size: 4,
        accommodation_price: 6.499
    }

    sendOrder(order);
})

app.listen(8080, console.log("Server is running on port, ", 8080));