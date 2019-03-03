import {Router} from 'express';
import tdawService from '../services/tdaw';

const router = Router();

router.get('/similar', tdawService.similarMedia);

export default router;
