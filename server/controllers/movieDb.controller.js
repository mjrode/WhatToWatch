import {Router} from 'express';
import movieDbService from '../services/moviedb';
import tdawService from '../services/tdaw';

const router = Router();

router.get('/tv/search', movieDbService.searchTv);
// router.get('/tv/similar', movieDbService.similarTv);
router.get('/tv/similar', tdawService.similarMedia);
router.get('/tv/popular', movieDbService.popularTv);
router.get('/tv/top-rated', movieDbService.topRatedTv);

export default router;
