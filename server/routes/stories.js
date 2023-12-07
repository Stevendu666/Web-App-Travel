import express from 'express';
import { getStories, getStory, createStory, deleteStory, updateStory, likeStory, fetchLikedStories } from '../controllers/storyController.js';
import auth from '../middleware/authmiddle.js';

const router = express.Router();

router.get('/', getStories);
router.get('/:id', getStory);
router.post('/', auth, createStory);
router.delete('/:id', auth, deleteStory);
router.patch('/:id', auth, updateStory);
router.patch('/:id/likeStory', auth, likeStory);
router.get('/likedStories', auth, fetchLikedStories);

export default router;