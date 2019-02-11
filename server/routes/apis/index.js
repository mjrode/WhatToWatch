import {Router} from 'express';
import v1ApiController from './v1';

const router = Router();

router.use('/v1', v1ApiController);

export default router;
