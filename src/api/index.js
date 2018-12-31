import { Router } from 'express';
import planetRouter from './planets/planet.router';

const restRouter = new Router();

restRouter.use('/planets', planetRouter);

export default restRouter;