import {Router} from 'express';
import tdawService from '../services/tdaw';

const router = Router();

router.get('/similar', tdawService.similarMedia);
router.get('/most-watched', tdawService.mostWatched);
router.get('/qloo/media', tdawService.qlooMedia);

export default router;
