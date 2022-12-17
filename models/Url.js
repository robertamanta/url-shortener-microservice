const mongoose = require('mongoose');
/** 1) Install & Set up mongoose */
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
/** 2) Create an 'Url' SCHEMA */
const urlSchema  = new mongoose.Schema(
    {
        shortUrl: String,
        originalUrl: String
    }
)

/** 2) Create and save  an 'Url' */

const Url = mongoose.model('Url',urlSchema);



module.exports = { Url };