require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const URL = require('url').URL;
const dns = require('dns');
const {
    nanoid
} = require("nanoid");

const {
    Url
} = require('./models/Url');

app.use(cors());
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));





app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/shorturl', (req, res) => {

    let originalUrl = req.body.url;
    let shortUrl;
    let url;
    //check if the URL has a valid structure 
    try {
        url = new URL(originalUrl);
        // check if the domain is operational
        dns.lookup(url.hostname, async (err, address, family) => {
            if (err) {
                res.json({
                    error: 'invalid url'
                });
            } else
                try {
                    //else connect to database and verify if the URL already exists 
                    //if already exists
                    let findUrl = await Url.findOne({
                        originalUrl: originalUrl
                    });

                    if (findUrl) {
                        res.json({
                            "original_url": findUrl.originalUrl,
                            "short_url": findUrl.shortUrl
                        })
                    } else {
                        shortUrl = nanoid(4);
                        let urlNew = new Url({
                            shortUrl: shortUrl,
                            originalUrl: originalUrl
                        });
                        await urlNew.save();
                        res.json({
                            "original_url": originalUrl,
                            "short_url": shortUrl
                        })
                    }

                }
            catch (err) {
                console.error(err);
                res.json('Server error!')

            }

        });
    } catch (err) {
        res.json({
            error: 'invalid url'
        });
    }




});

app.get('/api/shorturl/:short_URL?', async (req, res) => {

    try {

        let findUrl = await Url.findOne({
            shortUrl: req.params.short_URL
        });
        if (findUrl) {
            res.redirect(findUrl.originalUrl);
        } else {
            res.json('No Url Found!');
        }

    } catch (err) {
        console.error(err);
        res.json('Server error!')
    }
})
app.listen(port, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port: " + port)
    else
        console.log("Error occurred, server can't start", error);
});