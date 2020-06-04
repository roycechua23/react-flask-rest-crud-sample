import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

import PostForm from './postform';
import PostsFeed from './postsfeed';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
  },
}));

export default function Home() {
  const classes = useStyles();

  const [value, setValue] = React.useState('Controlled');  
    
  const handleChange = (event) => {
    setValue(event.target.value);
  };  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Post It
          </Typography>
        </Toolbar>
      </AppBar>
      <p></p>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
          <Paper children={<PostForm/>} elevation={3} />
                
      </Grid>
      <p></p>
      <Grid container spacing={2}>
        <Grid item xs>
          <Paper className={classes.paper} elevation={0}></Paper>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4"  style={{textAlign: 'left'}} gutterBottom>
            Posts Board
          </Typography>
          <Paper children={<PostsFeed/>} className={classes.paper}></Paper>
        </Grid>
        <Grid item xs>
        <Paper className={classes.paper} elevation={0}></Paper>
        </Grid>
      </Grid>
      
    </div>
  );
}
