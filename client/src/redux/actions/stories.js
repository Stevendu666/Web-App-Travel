import * as api from '../../api/index.js';

export const getStories = () => async (dispatch) => {
    try {
        const { data } = await api.fetchStories();
        dispatch({ type: 'FETCH_ALL', payload: data });

    } catch (error) {
        console.log(error.message);
    }
};

export const getStory = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchStory(id);

        dispatch({ type: 'FETCH_STORY', payload: { story: data } });
    } catch (error) {
        console.log(error);
    }
};

export const createStory = (newStory) => async (dispatch) => {
    try {
        const { data } = await api.createStory(newStory);
        dispatch({ type: 'CREATE', payload: data });

    } catch (error) {
        console.log(error.message);
    }
};