const express = require('express')
const app = express()
const port = 3000

const redis = require("redis");
const client = redis.createClient();

const REDIS_KEYS = {
    LIST_OF_BIDS: 'LIST_OF_BIDS',
    LIST_OF_CAMPAIGNS: 'LIST_OF_CAMPAIGNS'
};

const STATUS = {
    PENDING: 0,
    ERROR: 1,
    LOSE: 2,
    WIN: 3
};

client.on("error", function (error) {
    console.error(error);
});


app.get('/campaigns', (req, res) => {
    client.smembers(REDIS_KEYS.LIST_OF_CAMPAIGNS, (err, data) => {
        if (err) res.status(500).send(err)
        else res.send(data)
    });

})

app.get('/bids/:campaignName', (req, res) => {
    client.zscan(REDIS_KEYS.LIST_OF_BIDS, 0, "Match", `campaign:${req.params.campaignName}`, (err, data) => {
        if (err) res.status(500).send(err)
        else res.send(data)
    });

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})