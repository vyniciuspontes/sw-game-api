'use strict'

import "@babel/polyfill";
import express from 'express';
import './config/database.config';
import middlewaresConfig from './config/middlewares.config';
import serverConfigs from './config/server.config';
import restRouter from './api';

const server = express();
middlewaresConfig(server);

server.use('/api', restRouter);

server.get('/', (req, res) => { res.send('Server is Running'); });

server.listen(serverConfigs.PORT, () => { if (process.env.NODE_ENV !== 'test') console.log(`API server is running on port ${serverConfigs.PORT}`) });

export default server;