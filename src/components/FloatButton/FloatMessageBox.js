import { makeStyles, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';
import MessageContainer from '../MessageContainer/MessageContainer';
import QueryBox from '../QueryBox/QueryBox';

const useStyles = makeStyles((theme) => ({
    messageBox: {
        height: '60%',
        backgroundColor: '#333',
        position: 'absolute',
        [theme.breakpoints.down('xl')]: {
            width: '35%',
        },
        [theme.breakpoints.down('lg')]: {
            width: '35%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },  
    },
    floatHeader: {
        height: '80px',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    floatContainer: {
        height: '80%',
        position: 'absolute',
        flexDirection: 'column',
        display: 'flex'
    },
    floatInput: {
        bottom: 0,
        position: 'absolute',
        marginLeft: 20,
        width: '100%',
    }
}))

const FloatMessageBox = () => {

    const classes = useStyles();

    const { pushChat, username, botName, botAlias } = useContext(AppContext)

    return (
        <div className={classes.messageBox}>
            <div className={classes.floatHeader}>
                <Typography variant="h5">SleekBuys</Typography>
            </div>
            <div >
                <MessageContainer className={classes.floatContainer}/>
            </div>
            <div className={classes.floatInput}>
                <QueryBox pushChat={pushChat} username={username} botName={botName} botAlias={botAlias}/>
            </div>
        </div>

    )
}

export default FloatMessageBox
