import mongoose from 'mongoose';

const storySchema = mongoose.Schema({
    creator: String,
    title: String,
    country: String,
    city: String,
    message: String,
    tags: [String],
    selectedPicture: String,
    saveCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Story = mongoose.model('Story', storySchema);

export default Story;