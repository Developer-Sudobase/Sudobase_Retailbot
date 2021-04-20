import { LinearProgress, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';
import Message from '../Message/Message';

const useStyles = makeStyles((theme) => ({
    messagecontainer: {
        height: 'calc(100vh - 65px)',
        width: '100%',
        position: 'relative',
        backgroundColor: '#f3efef',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        padding: '0.5rem'
    },
}))

const MessageContainer = () => {
    const classes = useStyles();
    const { messages, isWaiting } = useContext(AppContext);
    const isLast = (index) => {
        return index + 1 === messages.length ? true : false;
      };

    return (
        <div className={classes.messagecontainer}>
           
            {messages.map((message, index) =>{
                return <Message  isLast={isLast(index)} key={index} index={index} message={message}/>
            })}
        </div>
    )
}

export default MessageContainer
