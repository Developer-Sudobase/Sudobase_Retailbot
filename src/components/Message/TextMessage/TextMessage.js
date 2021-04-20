import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
   

}))
const TextMessage = ({message}) => {
    const classes = useStyles();
    return (
        <div >
            <Typography variant="h6">{message}</Typography>
        </div>
    )
}

export default TextMessage
