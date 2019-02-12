import {Router} from 'express';
import plexService from '../../../services/plex';

const router = Router();

router.get('/users', plexService.getUsers);
// router.get('/:id', plexService.getDogWithId);

export default router;
