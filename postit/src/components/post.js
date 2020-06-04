import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function Post(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
          
        },
    }));

    const classes = useStyles();

    return (
        <Card className={classes.root} style={{margin:20}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.message}
                </Typography>
                </CardContent>
            <CardActions>
                <Button size="small" style={{color:"green"}}>
                Update
                </Button>
                <Button size="small" color="secondary">
                Delete
                </Button>
            </CardActions>
        </Card>
    );
}