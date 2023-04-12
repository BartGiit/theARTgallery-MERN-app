import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import { routerExplore } from "./routes/explore.js";
import { routerDisplay } from "./routes/display.js";
import { routerAuth } from "./routes/auth.js";

const app = express();

app.use(bodyParser.json()); // Content-type: application/json

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/explore', routerExplore);
app.use('/display', routerDisplay);
app.use('/auth', routerAuth);

mongoose
.connect("CONNECT DATABASE HERE")
.then(result => {
    app.listen(3001, '0.0.0.0', () => {
        console.log('Listening on http://localhost:3001');
    });
})
.catch(err => console.log("Connection error" + err))
