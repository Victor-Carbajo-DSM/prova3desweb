import { Router } from 'express';
import * as controller from '../controllers/reservationController';

const router = Router();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id/cancel', controller.cancel);
router.delete('/:id', controller.remove);

export default router;