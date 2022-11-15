import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {routeGetList} from './routes/routeGetList.js';
import {routeCharacter} from './routes/routeCharacter.js';

// SET UP
const app = express();
app.use(bodyParser.json({license: '50mb'}));
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 8000;
// ROUTES
app.get('/v1', routeGetList)
app.get('/v1/:character', routeCharacter )

app.listen(PORT, function() {
    console.log("successfully started");
})