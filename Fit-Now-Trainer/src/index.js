import React,{useReducer,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createTheme } from '@material-ui/core/styles';
import { blue, deepPurple } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {reducer, INITIAL_STATE, setUser, signIn} from './global/Reducer';

export const AppContext = React.createContext();

const RootComponent = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      const id = localStorage.getItem('id');
      fetch(`http://127.0.0.1:5001/trainers/${id}`).then(res => res.json())
      .then(data => {
        if(data.message==="found"){
          dispatch(setUser(data.doc));
          dispatch(signIn());
        }
        else{
          console.log("user not found");
        }
      })
    }
    else{
      console.log("no pre existing token");
    }
  }, []);

  const lighttheme = createTheme({
    palette: {
      primary: deepPurple,
      secondary: deepPurple,
      type: "light",
    },
    status: {
      danger: 'orange',
    },
  });
  
  const darktheme = createTheme({
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
