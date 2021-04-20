import { Grid } from '@material-ui/core';
import { useContext } from 'react';
import '../App.css';
import { AppContext } from '../AppContext';
import Header from '../components/Header/Header';
import MessageContainer from '../components/MessageContainer/MessageContainer';
import TestComp from './FloatButton/TestComp';

function RetailApp() {

  const { timeoutPrompt } = useContext(AppContext)
  return (
    <div className="RetailApp">
      <Grid container direction='column'>
        <Grid><Header/></Grid>
        <Grid item container xs={12}>
          {timeoutPrompt}
          <MessageContainer/>
          <TestComp/>
        </Grid>
      </Grid>
    </div>
  );
}

export default RetailApp;
