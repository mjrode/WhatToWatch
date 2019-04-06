import {Router} from 'express';
import recommend from '../services/recommend';

const router = Router();

router.get('/most-watched', recommend.getMostWatched);

export default router;
