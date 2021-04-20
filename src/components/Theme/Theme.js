import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(54,69,71)',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgb(255,226,104)',
    },
  },
});

export default Theme