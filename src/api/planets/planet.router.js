import { Router } from 'express';
import * as planetController from './planet.controller';
import validate from 'express-validation';
import planetValidation from './planet.validation';

const router = new Router();

router.use(function (req, res, next) {
    console.log('Request to planet router =>', Date.now());
    next();
});

router.route('/').get(planetController.findAll).post(validate(planetValidation), planetController.create);
router.route('/:id').get(planetController.findById).delete(planetController.deleteById);

export default router;

