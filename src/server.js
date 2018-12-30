'use strict'

import express from 'express';
import bodyParser from 'body-parser';
import './config/database.config';
import configs from './config/server.config';

const port = 3000;


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => console.log(`API server is running on port ${port}`));