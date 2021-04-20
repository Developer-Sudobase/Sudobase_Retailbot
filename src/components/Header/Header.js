import React, { useState, useContext, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Collapse, Drawer, IconButton, Toolbar, Typography, useTheme } from '@material-ui/core';
import QueryBox from '../QueryBox/QueryBox';    
import SignOutButton from '../SignOutButton/SignOutButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { AppContext } from '../../AppContext';
import { AccountCircle, Email, ExitToApp, LockOpen, Person, Settings } from '@material-ui/icons';
import ChangePasswordContainer from '../ChangePassword/ChangePasswordContainer';


const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: '0px 0px',
        display: 'flex',
    },
    appbar: {
        // // minHeight: '70px',
        // // color: 'secondary',
        // width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
    logoimg: {
        width: '15%',
        paddingTop: '5px',
        [theme.breakpoints.down('xs')]: {
            width: '30%',
        },
    },
    menu:{
        marginLeft: 'auto',
        '&:focus': {
            outline: 'none !important'
          },
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    hide: {
        display: 'none',
      },
    drawer: {
       width: drawerWidth,
       flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
      },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
     },
     signoutMob: {
        [theme.breakpoints.down('xl')]: {
            display: 'none',
        },
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
        [theme.breakpoints.down('md')]: {
            display: 'flex',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
     }
}))

const Header = () => {

    const classes = useStyles();
    const theme = useTheme();

    const { pushChat, email, username, botName, botAlias, signOutHandler } = useContext(AppContext)

    const [open, setOpen] = React.useState(false);

    const [dropOpen, setDropOpen] = React.useState(false);

    const [passwordOpen, setPasswordOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    
    const handleClick = () => {
        setDropOpen(!dropOpen);
      };

    const handlePassword = () => {
        setPasswordOpen(!passwordOpen);
    };

    // const signOutHandler = () => {
    //     signOut();
    //   };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
                <Toolbar>
                    <img className={classes.logoimg}
                        src={process.env.PUBLIC_URL + '/images/sleekbuys_logo.png'}
                        alt="SleekBuys"
                    />
                    <QueryBox pushChat={pushChat} username={username} botName={botName} botAlias={botAlias}/>
                    <SignOutButton signOutHandler={() => {signOutHandler(); localStorage.removeItem("transcript");}}/>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        className={clsx(open && classes.hide, classes.menu)}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} varaiant="persistant" anchor="right" open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <List>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <AccountCircle/>
                        </ListItemIcon>
                        <ListItemText primary="Account Details" />
                        {dropOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={dropOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <Person/>
                                </ListItemIcon>
                                <ListItemText>{username}</ListItemText>
                            </ListItem>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <Email/>
                                </ListItemIcon>
                                <ListItemText><Typography variant="body1">{email}</Typography></ListItemText>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button>
                        <ListItemIcon>
                            <Settings/>
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem button className={classes.signoutMob} onClick={() => signOutHandler()}>
                        <ListItemIcon>
                            <ExitToApp/>    
                        </ListItemIcon>
                        <ListItemText primary="Sign Out"/>
                    </ListItem>
                    <ListItem button onClick={handlePassword} >
                        <ListItemIcon>
                            <LockOpen/>
                        </ListItemIcon>
                        <ListItemText primary="Change Password"/>
                        {passwordOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={passwordOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                            <ChangePasswordContainer handlePassword={handlePassword}/>
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
        </div>   
    )
}

export default Header
