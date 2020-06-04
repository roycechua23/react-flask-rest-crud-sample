import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useForm } from "react-hook-form";

export default function Post(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const [title, setTitle] = React.useState(props.title)
    const [message, setMessage] = React.useState(props.message)
    const [open, setOpen] = React.useState(false);

    // handle Modal opening and closing
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const useStyles = makeStyles((theme) => ({
        root: {
            
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

    }));

    const handleDelete = function () {
        fetch('http://127.0.0.1:5000/posts/' + props.id, {
                mode: 'cors',
                method: 'delete',
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
            });
            
    }

    const handleUpdate = function (data) {
        fetch('http://127.0.0.1:5000/posts/' + props.id, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
           
        });
        
    }

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
                <Button size="small" style={{color:"green"}} onClick={handleOpen}>
                Update
                </Button>
                <Button size="small" color="secondary" onClick={handleDelete}>
                Delete
                </Button>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Post</DialogTitle>
                    <DialogContent>
                    <form onSubmit={handleSubmit(handleUpdate)} className={classes.root} noValidate autoComplete="off">
                            <p>
                                <TextField
                                    name="title"
                                    inputRef={register({required: true})}
                                    id="filled-textarea"
                                    label="Title"
                                    placeholder="Put your title here"
                                    defaultValue={title}
                                    onChange={(new_val) => setTitle(new_val)}
                                />
                            </p>
                            <p>
                                <TextField
                                    name="message"
                                    inputRef={register({required: true})}
                                    id="filled-textarea"
                                    label="Message"
                                    placeholder="Put your message here"
                                    rows={4}
                                    multiline
                                    defaultValue={message}
                                    onChange={(new_val) => setTitle(new_val)}
                                />
                            </p>
                            <p>
                                <Button type="submit" fullWidth={true} variant="outlined" color="primary" onClick={()=>handleClose()}>
                                    Update Message
                                </Button>
                            </p>
                    </form>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>
            </CardActions>
        </Card>
    );
}