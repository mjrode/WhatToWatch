import {Router} from 'express';
import sonarrService from '../services/sonarr';

const router = Router();

router.get('/search', sonarrService.search);
router.get('/add-show', sonarrService.addShow);

export default router;
