import {Router} from 'express';
import plexService from '../../../services/plex';

const router = Router();

router.get('/users', plexService.getUsers);

export default router;
