'use strict'

import express from 'express';
import './config/database.config';
import middlewareConfig from './config/middleware.config';
import serverConfigs from './config/server.config';
import restRouter from './api';

const server = express();
middlewareConfig(server);

server.use('/api', restRouter);

server.get('/', (req, res) => { res.send('Server is Running'); });

server.listen(serverConfigs.PORT, () => console.log(`API server is running on port ${serverConfigs.PORT}`));

export default server;