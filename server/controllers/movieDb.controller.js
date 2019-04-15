import {Router} from 'express';
import movieDbService from '../services/moviedb';

const router = Router();

router.get('/tv/search', movieDbService.searchTv);
router.get('/tv/similar', movieDbService.similarTv);
router.get('/tv/popular', movieDbService.popularTv);
router.get('/tv/top-rated', movieDbService.topRatedTv);

export default router;
