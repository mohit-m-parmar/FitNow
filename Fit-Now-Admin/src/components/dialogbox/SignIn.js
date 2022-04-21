import React, { useContext,useState } from 'react';
import { AppContext } from '../../index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { toggleSI,toggleReg,signIn,setUser } from '../../global/Reducer';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignIn() {
    const app = useContext(AppContext);
    const [email,setEmail] = useState('');
    const [password,setPass] = useState('');

  const handleClose = () => {
    app.dispatch(toggleSI());
  };

  function login(){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email:email,
          password:password
         })
      };
      console.log("login called");
      fetch('http://127.0.0.1:5001/admin/login', requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log("response recieved");
          if(data.message === "Admin Login Succesful"){
            app.dispatch(setUser(data.user));
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.user._id);
            app.dispatch(signIn());
          }
          else{
            alert(data.message);
          }
        });
        console.log("login ended");
  }

  return (
      <Dialog
        open={app.state.signin}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Sign In"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Sign in with your email and password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            onChange={(event) => {setEmail(event.target.value)}}
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            onChange={(event) => {setPass(event.target.value)}}
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={login} color="primary" variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>
  );
}