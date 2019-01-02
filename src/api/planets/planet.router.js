import { Router } from 'express';
import * as planetController from './planet.controller';
import validate from '../../util/SchemaValidator';
import planetValidation from './planet.validation';

const router = new Router();

router.route('/').get(planetController.findAll).post(validate(planetValidation), planetController.create);
router.route('/:id').get(planetController.findById).delete(planetController.deleteById);

export default router;

