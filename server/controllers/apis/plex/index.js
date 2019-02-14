import {Router} from 'express';
import plexService from '../../../services/plexApi';

const router = Router();

router.get('/users', plexService.getUsers);
router.get('/most-watched', plexService.getMostWatched);
router.get('/sections', plexService.getSections);
router.get('/sections/import', plexService.importSections);
router.get('/library-by-section', plexService.getLibraryDataBySection);
router.get('/libraries/import', plexService.importLibraries);

export default router;
