import { Button, makeStyles } from '@material-ui/core'
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '5px'
    },
    button: {
        borderRadius: '24px',
        margin: theme.spacing(1),
        '&:hover': {
            backgroundColor: 'rgb(255,226,104)',
            color: '#333',
            }
        }
  }));

const Buttons = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button variant="outlined" color="primary" className={classes.button}/>
        </div>
    )
}

export default Buttons
