import React, { useContext,useState } from 'react';
import { AppContext } from '../../index';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { toggleReg,signIn,setUser } from '../../global/Reducer';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// This function will register the user into our MongoDB database.
export default function Register() {
    const app = useContext(AppContext);
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPass] = useState('');
    const [repass,setRepass] = useState('');

  const handleClose = () => {
    app.dispatch(toggleReg());
  };

  function register(){
      if(repass===password){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email:email,
            password:password,
            name
           })
        };

        fetch('http://127.0.0.1:5001/admin/signup', requestOptions)
          .then(response => response.json())
          .then(data =>{
            if(data.message === "Admin registered successfully"){
              app.dispatch(setUser(data.createdUser));
              console.log(data);
              app.dispatch(signIn());
            }
            else{
              alert(data.message);
            }
          });
      }
      else{
          alert("Password didn't matched.. Try again");
      }
  }

  return (
      <Dialog
        open={app.state.register}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Register"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            onChange={(event)=>{setName(event.target.value)}}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            onChange={(event)=>{setEmail(event.target.value)}}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            onChange={(event)=>{setPass(event.target.value)}}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Re-type password"
            type="password"
            onChange={(event)=>{setRepass(event.target.value)}}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={register} color="primary" variant="contained">
            Register
          </Button>
        </DialogActions>
      </Dialog>
  );
}