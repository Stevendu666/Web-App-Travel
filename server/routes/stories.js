import express from 'express';
import authmiddle from "../middleware/authmiddle.js";
import { getStories, getStory, createStory, deleteStory, updateStory, likeStory } from '../controllers/storyController.js';

const router = express.Router();

router.get('/', getStories);
router.get('/:id', getStory);
router.post('/', createStory);
router.delete('/:id', deleteStory);
router.patch('/:id', updateStory);
router.patch('/:id/likeStory', likeStory);

export default router;