import { Fab, makeStyles } from '@material-ui/core'
import { Chat, Close } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { AppContext } from '../../AppContext';
import MessageContainer from '../MessageContainer/MessageContainer';
import './FloatButton.css';
import FloatMessageBox from './FloatMessageBox';
import TestComp from './TestComp';

const useStyles = makeStyles((theme) => ({
    float: {
        position: 'absolute',
        right: 20,
        bottom: 25,
        // [theme.breakpoints.down('xs')]: {
        //     height: '80vh',
        // },
    },
    outline: {
        '&:focus': {
            outline: 'none !important'
          },
    },
    floatBox: {
        width: '100%',
        position: 'absolute'
    }
}));

const FloatButton = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(<TestComp/>);

    const handleFloat = () => {
        setOpen(!open);
        console.log("clicked")
    }

    
const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);

    // Now send the message throught the backend API
  };
    
useEffect(() => {
    addResponseMessage('Welcome to SleekBuys!');
  }, []);
  
  const getCustomLauncher = (handleToggle) =>
  <button onClick={handleToggle}>This is my launcher component!</button>

    return (
        <>
        <div className={classes.float}>
            <Fab color="secondary" className={classes.outline} aria-label="send"> <Chat/> </Fab>
            {/* <Widget  launcher={handleToggle => getCustomLauncher(handleToggle)} title="SleekBuys" subtitle={false} fullScreenMode={false}/> */}
        </div>
        </>
    )
}

export default FloatButton
