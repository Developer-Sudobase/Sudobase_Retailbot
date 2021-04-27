import { IconButton, makeStyles, Typography, Fab } from '@material-ui/core';
import { Mic, Chat, Close } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../AppContext';
import MessageContainer from '../MessageContainer/MessageContainer';
import QueryBox from '../QueryBox/QueryBox';
import FloatButton from './FloatButton';

const useStyles = makeStyles((theme) => ({
    testcontainer: {
        position: 'absolute',
        width: '60%',
        height: 'calc(100vh - 200px)',
        backgroundColor: 'rgb(0 0 0 / 20%)',
        bottom: 45,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '370px',
        zindex: 9999,
        margin: '0 20px 20px 0',
        border: '1px solid #ffe268',
        boxShadow: '0 1px 6px rgb(32 33 36 / 28%)'
    },
    formtest: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '100%',
        bottom: '0px'
    },
    testinput: {
        height: '32px',
        border: '1px solid #dfe1e5',
        boxShadow: '0 1px 6px rgb(32 33 36 / 28%)',
        borderColor: 'rgba(223,225,229,0)',
        padding: '6px 0 6px 14px',
        backgroundColor: '#fff',
        outline: 'none !important'
    },
    testbutton: {
        outline: 'none !important',
        position: 'absolute',
        bottom: 0,
        right: 0,
        top: 0,
    },
    testheader: {
        height: '60px',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    hide: {
        display: 'none',
      },
    outline: {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        marginLeft: 'auto',
        '&:focus': {
            outline: 'none !important'
        }
    }
}))
const TestComp = () => {
    const classes = useStyles();

    const { pushChat, username, botName, botAlias } = useContext(AppContext)

    const [isBoxOpen, setIsBoxOpen] = useState(true);

    const handleBoxOpen = () => {
        setIsBoxOpen(!isBoxOpen);
        console.log('click');
    }

    const handleBoxClose = () => {
        setIsBoxOpen(false);
        console.log('clicked');
    }

    return (
        <div>
                <div className={clsx(isBoxOpen && classes.hide, classes.testcontainer)}>
                    <header className={classes.testheader}>
                        <Typography varaint="h4">SleekBuys</Typography>  
                    </header>
                    <MessageContainer/>
                    {/* <form className={classes.formtest}>
                    <input type="text"  className= {classes.testinput}/>
                    <IconButton variant="" className = {classes.testbutton}><Mic/></IconButton>
                    </form> */}
                     <QueryBox pushChat={pushChat} username={username} botName={botName} botAlias={botAlias}/> 
                </div>
            <Fab color="secondary" className={classes.outline} aria-label="send"> {!isBoxOpen ? <Close onClick={handleBoxOpen}/> : <Chat onClick={handleBoxClose}/>} </Fab>   
            
        </div>
    )
}

export default TestComp
