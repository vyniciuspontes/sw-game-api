import { Router } from 'express';
import * as planetController from './planet.controller';

const router = new Router();

router.use(function(req, res, next) {
    console.log('Request to planet router =>', Date.now());
    next();
  });

router.get('/', planetController.findAll);
router.get('/:id', planetController.findById);
router.post('/', planetController.create);
router.delete('/:id', planetController.deleteById);

export default router;

