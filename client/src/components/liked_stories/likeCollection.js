/*import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { likeStory } from "../../redux/actions/stories";
import Stories from "../stories/Stories";
import { useParams } from 'react-router-dom';
import Drawer from "./drawer";
import Box from "@mui/material/Box";
import { getLikedStories } from '../../redux/actions/stories';

const LikeCollection = () => {


  const dispatch = useDispatch();
  const { likedStories, isLoading } = useSelector((state) => state.stories);

  useEffect(() => {
    dispatch(getLikedStories());
  }, [dispatch]);

  const [currentId, setCurrentId] = useState(0);
    // const dispatch = useDispatch();

    // const { selectedStory, stories, isLoading } = useSelector((state) => state.stories);

  
    const authData = useSelector((state) => state.auth.authData); // check if the user is authenticated
  
    // useEffect(() => {
    //   dispatch(likeStory());
    // }, [dispatch]);
  


  // const { id } = useParams();


    // const likedStories = useSelector(state => state.likeCollection);

    return (

        /*<>
            <Box sx={{ display: 'flex' }}><Drawer /></Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h2>Liked Stories</h2>
                {likedStories.map(story => (
                    <div key={story._id}>
                        <h3>{story.title}</h3>
                      
                    </div>
                ))}
            </Box>
        </>
        <Stories setCurrentId={setCurrentId} stories={likedStories} isLoading={isLoading} />
    );
};

export default LikeCollection;*/