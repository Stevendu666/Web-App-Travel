import Story from '../models/story.js';
import mongoose from 'mongoose';

export const getStories = async (req, res) => {
    const { page = 1, searchTerm = '', filter = 'all' } = req.query;

    console.log('Filter: ', filter);
    console.log('Search Term: ', searchTerm);


    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        // const total = await Story.countDocuments({});

        let filterCondition = {};

        // Apply filter based on 'filter' parameter
        if (filter === 'today') {
            filterCondition = {
                createdAt: {
                    $gte: new Date().setHours(0, 0, 0, 0),
                    $lt: new Date().setHours(23, 59, 59, 999),
                },
            };
        } else if (filter === 'week') {
            const currentDate = new Date();
            const startOfWeek = currentDate.getDate() - currentDate.getDay();
            const endOfWeek = startOfWeek + 6;
            filterCondition = {
                createdAt: {
                    $gte: new Date(currentDate.setDate(startOfWeek)).setHours(0, 0, 0, 0),
                    $lt: new Date(currentDate.setDate(endOfWeek + 1)).setHours(23, 59, 59, 999),
                },
            };
        } else if (filter === 'month') {
            const currentDate = new Date();
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            filterCondition = {
                createdAt: {
                    $gte: new Date(startOfMonth).setHours(0, 0, 0, 0),
                    $lt: new Date(endOfMonth).setHours(23, 59, 59, 999),
                },
            };
        } else if (filter === 'year') {
            const currentDate = new Date();
            const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
            const endOfYear = new Date(currentDate.getFullYear() + 1, 0, 0);
            filterCondition = {
                createdAt: {
                    $gte: new Date(startOfYear).setHours(0, 0, 0, 0),
                    $lt: new Date(endOfYear).setHours(23, 59, 59, 999),
                },
            };
        }

        // Combine search and filter conditions
        const searchCondition = {
            $or: [
                { title: { $regex: new RegExp(searchTerm, 'i') } },
                { message: { $regex: new RegExp(searchTerm, 'i') } },
                { city: { $regex: new RegExp(searchTerm, 'i') } },
                { country: { $regex: new RegExp(searchTerm, 'i') } },
            ],
        };

        const combinedCondition = { ...searchCondition, ...filterCondition };
        console.log('Combined Condition: ', combinedCondition);

        const total = await Story.countDocuments(combinedCondition);
        console.log('total ' + total);


        const filteredObjects = await Story.find(combinedCondition)
            .skip(startIndex)
            .limit(LIMIT);

        console.log('Start Index: ', startIndex);
        console.log('Limit: ', LIMIT);



        //const stories = await Story.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({ data: filteredObjects, currentPage: Number(page), numPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        // Not found
        res.status(404).json({ message: error.message });
    }
}

export const getStory = async (req, res) => {
    const { id } = req.params;

    try {
        const story = await Story.findById(id);
        res.status(200).json(story);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createStory = async (req, res) => {
    const story = req.body;
    const newStory = new Story({ ...story, creator: "Test"/*req.userId*/, createdAt: new Date().toISOString() })

    try {
        await newStory.save();
        // Successful creation
        res.status(201).json(newStory);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteStory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No story with id: ${id}`);

    await Story.findByIdAndDelete(id);

    res.json({ message: "Story deleted successfully." });
}

export const updateStory = async (req, res) => {
    const { id } = req.params;
    const { title, message, tags, country, city, selectedPicture } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No story with id: ${id}`);

    const updatedStory = { _id: id, title, message, tags, country, city, selectedPicture };

    await Story.findByIdAndUpdate(id, updatedStory, { new: true });

    res.json(updatedStory);
}

export const likeStory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No story with id: ${id}`);

    const stories = await Story.findById(id);
    const updatedStory = await Story.findByIdAndUpdate(id, { likeCount: stories.likeCount + 1 }, { new: true });

    res.json(updatedStory);
}

