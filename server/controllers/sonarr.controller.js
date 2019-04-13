import {Router} from 'express';
import sonarrService from '../services/sonarr';

const router = Router();

router.get('/search', sonarrService.search);
router.get('/series/add', sonarrService.addSeries);
router.get('/series', sonarrService.getSeries);

export default router;
