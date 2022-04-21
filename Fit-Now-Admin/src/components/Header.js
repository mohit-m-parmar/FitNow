import React, { useContext } from 'react';
import { AppContext } from '../index';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {toggleTheme, toggleSI, signOut} from '../global/Reducer';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Tooltip from '@material-ui/core/Tooltip'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const app = useContext(AppContext);
  const classes = useStyles();
  const history = useHistory();

  function logout(){
    app.dispatch(signOut());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("localStorage removed");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Button
                    edge="start"  color="inherit" aria-label="menu"
                    size="large"
                    className={classes.menuButton}
                    startIcon={<FitnessCenterIcon />}
                    onClick={()=>{console.log(app.state); history.push("/");}}
                    >
                    FIT-NOW ADMIN
            </Button>
          <Typography variant="h6" className={classes.title}>
            
          </Typography>
          {app.state.login ? (
            <div>
            <Button
                className={classes.menuButton}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                endIcon={<AccountCircle />}
                color="inherit"
            >
                    {app.state.user.name}
            </Button>
              <Button onClick={logout} color="inherit" variant="outlined">
                  Logout
              </Button>
            </div>
          ):
          (
              <Button onClick={()=>{console.log('login clicked');app.dispatch(toggleSI());}} color="inherit" variant="outlined">
                  Login
              </Button>
          )
          }
                  {
                   app.state.darkMode ? 
                   (
                    <Tooltip title="light mode" arrow>
                     <IconButton onClick={()=>{app.dispatch(toggleTheme())}} color="inherit">
 									    <Brightness7Icon />
 								    </IconButton>
                     </Tooltip>
                   )
                   :
                   (
                     <Tooltip title="dark mode" arrow>
                     <IconButton onClick={()=>{app.dispatch(toggleTheme())}} color="inherit">
 									    <Brightness4Icon />
 								    </IconButton>
                     </Tooltip>
                   )
                 }
        </Toolbar>
      </AppBar>
    </div>
  );
}