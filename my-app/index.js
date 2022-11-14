import express from 'express';
import cors from 'cors';
import axios from 'axios';
import cheerio from 'cheerio';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// SET UP
const app = express();
app.use(bodyParser.json({license: '50mb'}));
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 8000;
// ROUTES
app.get('/', function(req, res, next) {
    res.send("ok");
})
app.listen(PORT, function() {
    console.log("successfully started");
})