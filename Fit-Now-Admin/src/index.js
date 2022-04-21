import React,{useReducer,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, blue } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {reducer, INITIAL_STATE, setUser, signIn} from './global/Reducer';

export const AppContext = React.createContext();

const RootComponent = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const lighttheme = createMuiTheme({
    palette: {
      primary: deepPurple,
      secondary: deepPurple,
      type: "light",
    },
    status: {
      danger: 'orange',
    },
  });
  
  const darktheme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: blue,
      type: "dark",
    },
    status: {
      danger: 'orange',
    },
  });

  return(
    <AppContext.Provider value={{state,dispatch}}>
      <ThemeProvider theme={state.darkMode? darktheme: lighttheme}>
      <CssBaseline />
        <App />
      </ThemeProvider>
    </AppContext.Provider>
  );
};

ReactDOM.render(<RootComponent />, document.getElementById('root'));

serviceWorker.unregister();
