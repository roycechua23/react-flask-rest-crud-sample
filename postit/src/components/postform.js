import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
}));


export default function PostForm() {
        const classes = useStyles();

        const { register, handleSubmit, watch, errors, reset} = useForm();
        const onSubmit = data => {
            fetch('http://127.0.0.1:5000/postslist', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data)
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
            });
        };

        return (
            <div style={{padding:20}}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate autoComplete="off">
                    <Typography variant="h6"  style={{textAlign: 'center'}} gutterBottom>
                        Post your messages here
                    </Typography>
                    <p>
                        <TextField
                            name="title"
                            inputRef={register({required: true})}
                            id="filled-textarea"
                            label="Title"
                            placeholder="Put your title here"
                        />
                        {errors.exampleRequired && <span>This field is required</span>}
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
                        />
                        {errors.exampleRequired && <span>This field is required</span>}
                    </p>
                    <p>
                        <Button type="submit" fullWidth={true} variant="outlined" color="primary">Post Message</Button>
                    </p>
            </form>
            </div>
        );
}