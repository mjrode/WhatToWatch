import {Router} from 'express';
import plexService from '../../../services/plexApi';

const router = Router();

router.get('/users', plexService.getUsers);

export default router;
