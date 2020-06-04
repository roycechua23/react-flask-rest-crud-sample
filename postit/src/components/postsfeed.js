import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Post from './post';

const useStyles = makeStyles((theme) => ({
    root: {
      
    },
}));

export default function PostsFeed() {
        const [posts, setPosts] = useState([]);

        useEffect(() => {
            async function fetchData() {
                await fetch('http://localhost:5000/postslist').then(function(response) {
                    console.log(response)
                    return response.json();
                }).then(function(data) {
                    console.log(data);
                    setPosts(data);
                });
            };

            fetchData();
        });

        const classes = useStyles();
     
        return (
            <div style={{padding:20, display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Grid container direction="row" justify="center" alignItems="center">
                        {posts.length > 0 ? posts.map((post, index) => <Post key={post._id.$oid} id={post._id.$oid} title={post.title} message={post.message} />) : <p>No Posts to show :(</p>}
                </Grid>     
            </div>
        );
}