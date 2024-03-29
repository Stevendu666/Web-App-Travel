import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Container, Button, TextField, Paper, Grid, Divider } from '@material-ui/core';
import storyFormStyles from './styles';
import ChipInput from 'material-ui-chip-input';
import FileBase from 'react-file-base64';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createStory } from '../../redux/actions/stories';
import { updateStory } from '../../api';
import { getStory } from '../../redux/actions/stories';
import backgroundImage from '../../images/background.png';
import Nav from "../nav"
import { Alert, AlertTitle } from '@mui/material';
import Login from "../login";


const StoryForm = ({ currentId, setCurrentId }) => {
    const { id } = useParams();
    const classes = storyFormStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { selectedStory, isLoading } = useSelector((state) => state.stories);
    const authData = useSelector((state) => state.auth.authData);
    const [storyData, setStoryData] = useState({ title: '', message: '', country: '', city: '', tags: [], selectedPicture: '', creatorId: '', creatorName: '' });
    const user = JSON.parse(localStorage.getItem('user_info'));

    useEffect(() => {
        if (id) {
            dispatch(getStory(id));
        }
    }, [id]);

    useEffect(() => {
        if (id && selectedStory) {
            setStoryData({
                creator: selectedStory.creatorId || '',
                creatorName: selectedStory.creatorName || '',
                title: selectedStory.title || '',
                message: selectedStory.message || '',
                country: selectedStory.country || '',
                city: selectedStory.city || '',
                tags: selectedStory.tags || [],
                selectedPicture: selectedStory.selectedPicture || '',
                likeCount: selectedStory.likeCount || 0,
                createdAt: selectedStory.createdAt || Date()
            });
        }
    }, [selectedStory]);


    const handleCreate = (e) => {
        e.preventDefault();

        if (id) {
            try {
                console.log("Updated stroy id: ", id);
                dispatch(updateStory(id, { ...storyData, creatorName: user?.result?.firstName + ' ' + user?.result?.lastName, creatorId: user?.result?._id }));
                navigate(-1);
            } catch (error) {
                console.log(error);
                alert(`Error: couldn't update the story. `);
            }
        } else {
            try {
                console.log("Story that will be created: ", storyData);
                console.log("Creator username: ", user?.result?.firstName + ' ' + user?.result?.lastName);
                console.log("Creator id", user?.result?._id);
                dispatch(createStory({ ...storyData, creatorName: user?.result?.firstName + ' ' + user?.result?.lastName, creatorId: user?.result?._id }));
                navigate(-1);
            } catch (error) {
                console.log(error);
                alert(`Error: couldn't create the story.`);
            }
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const addTag = (tag) => {
        setStoryData({ ...storyData, tags: [...storyData.tags, tag] });
    };

    const deleteTag = (deleteTag) => {
        setStoryData({
            ...storyData,
            tags: storyData.tags.filter((tag) => tag !== deleteTag),
        });
    };

    if (!user?.result?.firstName) {
        return (
            <div>
                <Alert severity="warning">
                    <AlertTitle>Info</AlertTitle>
                    Please <strong>log in</strong> to access this page - check it out!
                </Alert>
                <Login />
            </div>)
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Container maxWidth="xl">
                <Container maxWidth="lg">
                    <Nav />
                    <main>
                        <div style={{ marginTop: '60px' }} />
                        <Paper className={classes.paper} elevation={4}>
                            <form autoComplete="off" noValidate className={`${classes.container} ${classes.form}`}>
                                <Typography className={classes.createStory} variant="h6">{id ? 'Edit a story' : 'Creating new story'}</Typography>
                                <TextField name="title" variant="outlined" label="Title" fullWidth value={storyData.title} onChange={(e) => setStoryData({ ...storyData, title: e.target.value })} />
                                <Grid container item xs={12} spacing={2} justifyContent="space-between">
                                    <Grid item xs={6}>
                                        <TextField name="country" variant="outlined" label="Country" fullWidth value={storyData.country} onChange={(e) => setStoryData({ ...storyData, country: e.target.value })} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField name="city" variant="outlined" label="City" fullWidth value={storyData.city} onChange={(e) => setStoryData({ ...storyData, city: e.target.value })} />
                                    </Grid>
                                </Grid>
                                <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={storyData.message} onChange={(e) => setStoryData({ ...storyData, message: e.target.value })} />
                                <div style={{ padding: '5px 8px', width: '100%' }}>
                                    <ChipInput
                                        name="tags"
                                        variant="outlined"
                                        label="Tags"
                                        fullWidth
                                        value={storyData.tags}
                                        onAdd={(chip) => addTag(chip)}
                                        onDelete={(chip) => deleteTag(chip)}
                                    />
                                </div>
                                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setStoryData({ ...storyData, selectedPicture: base64 })} style={{ fontSize: '10px' }} /></div>
                                <Button className={classes.submitButton} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleCreate}>{id ? 'Edit story' : 'Create story'}</Button>
                                <Button className={classes.cancelButton} variant="contained" size="large" fullWidth onClick={handleGoBack}>Cancel</Button>
                            </form>
                        </Paper>
                        <Divider style={{ margin: '40px' }} />
                    </main>
                </Container>
            </Container>
        </div>
    );
};

export default StoryForm;