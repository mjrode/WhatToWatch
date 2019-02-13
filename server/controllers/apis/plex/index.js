import {Router} from 'express';
import plexService from '../../../services/plexApi';

const router = Router();

router.get('/users', plexService.getUsers);
router.get('/most-watched', plexService.getMostWatched);

export default router;
