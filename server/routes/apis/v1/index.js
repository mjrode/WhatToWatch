import {Router} from 'express';
import plexController from '../../../controllers/apis/plex';

const router = Router();

router.use('/plex', plexController);

export default router;
