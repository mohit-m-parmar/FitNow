import React, { useContext,useState,useEffect } from 'react';
import { AppContext } from '../index';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { setUser,signOut } from '../global/Reducer';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: '80%',
    marginTop: '15px',
  },
  title: {
    fontSize: 20,
  },
  delbutton: {
    color:'#ff1744',
  },
});

export default function AccountTrainer() {
    const app = useContext(AppContext);
    const classes = useStyles();
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [gender,setGender] = useState('');
    const [phno,setPh] = useState('');
    const [city,setCity] = useState('');
    const [pic,setPic] = useState('');
    const [special,setSpecial] = useState('');
    const [open, setOpen] = useState(false);

    function getprof(){
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`http://127.0.0.1:5001/trainers/${app.state.id}`, requestOptions)
        .then(response => response.json())
        .then(data =>{
          if(data.message === "Trainer found"){
            console.log(data.doc);
            setAge(data.doc.age);
            setEmail(data.doc.email);
            setName(data.doc.name);
          }
          else{
            alert(data.message);
          }
        });
    }
    
    function editprof(){
        const requestOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email:email,
            name,
            ph_no:phno,
            age,
            gender,
            city,
            photo:pic,
            specialization:special
           })
        };
        fetch(`http://127.0.0.1:5001/trainers/${app.state.id}`, requestOptions)
          .then(response => response.json())
          .then(data =>{
            if(data.message === "Trainer updated"){
              console.log(data);
              setOpen(true);
            }
            else{
              alert(data.message);
            }
          });
    }

    function deleteprof(){
      const conf = prompt("Are you sure you want to delete your account? Type 'YES' to confirm");
      if(conf==='YES'){
        fetch(`http://127.0.0.1:5001/trainers/${app.state.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => response.json())
          .then(data =>{
            if(data.message === "Trainer deleted successfully"){
              console.log(data);
              app.dispatch(signOut());
              alert("account deleted");
            }
            else{
              alert(data.message);
            }
          });
      }
    }

    useEffect(() => {
      getprof();
    },[]);

  return (
      <div>
        <Grid container justify="center">
          <Card className={classes.root}>
              <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Manage Trainer profile
                    </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            defaultValue={name}
            variant="outlined"
            onChange={(event)=>{setName(event.target.value)}}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            defaultValue={email}
            variant="outlined"
            onChange={(event)=>{setEmail(event.target.value)}}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Phone Number"
            type="text"
            defaultValue={phno}
            variant="outlined"
            onChange={(event)=>{setPh(event.target.value)}}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Gender"
            type="text"
            defaultValue={gender}
            variant="outlined"
            onChange={(event)=>{setGender(event.target.value)}}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="Age"
            type="text"
            defaultValue={age}
            variant="outlined"
            onChange={(event)=>{setAge(event.target.value)}}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="City of Residence"
            type="text"
            defaultValue={city}
            variant="outlined"
            onChange={(event)=>{setCity(event.target.value)}}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="URL of profile photo"
            type="text"
            defaultValue={pic}
            variant="outlined"
            onChange={(event)=>{setPic(event.target.value)}}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="What do you specialize in?"
            type="text"
            defaultValue={special}
            variant="outlined"
            onChange={(event)=>{setSpecial(event.target.value)}}
            fullWidth
            multiline
            rows={3}
          />
              </CardContent>
              <CardActions>
                  <Grid container justify="space-between">
                  <Button variant="contained" color="primary" onClick={editprof}>Save changes</Button>
                  <Button className={classes.delbutton} onClick={deleteprof}>Delete account</Button>
                  </Grid>
              </CardActions>
          </Card>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={()=>setOpen(false)}
        message="Changes saved"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={()=>setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      </div>
  );
}