const express = require('express')
const cors = require('cors')
const app = express()
const Promise = require('bluebird');

const port = 8000

app.use(cors())

const redis = require("redis");
const client = Promise.promisifyAll(redis.createClient());

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
    // client.on("subscribe",  (channel, count)=> {
    //     console.log(channel);
    //     console.log(count);
    // });
    client.zrange(REDIS_KEYS.LIST_OF_BIDS, 0, 100, async (err, data) => {
        if (err) res.status(500).send(err)
        else {
            const bids = [];
            await Promise.each(data, bidKey => client.get(bidKey, (err, bidJson) => {
                console.log(bidJson);
                bids.push(bidJson)
            }));
            res.send(bids)
        }
    });

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})