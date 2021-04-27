import React from "react";
import { ExitToApp } from "@material-ui/icons";
import { IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    signout: {
        color: '#fff',
        position: 'absolute',
        right: '60px',
        '&:focus': {
          outline: 'none !important'
        },
        marginLeft: 'auto',
        [theme.breakpoints.down('md')]: {
          display: 'none',
      },
        [theme.breakpoints.down('xs')]: {
          display: 'none',
      },
      '&:hover': {
        color: 'rgb(255,226,104)'
      }
    },
    signoutText: {
      fontSize: '20px',
      padding: '2px',
    }
}))

const SignOutButton = ({ signOutHandler }) => {
    const classes = useStyles();

  return (
    <IconButton className={classes.signout} onClick={() => signOutHandler()} aria-label="add an alarm">
      <ExitToApp/><span className={classes.signoutText}>SignOut</span>
    </IconButton>
  );
};

export default SignOutButton;
