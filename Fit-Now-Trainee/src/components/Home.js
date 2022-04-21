import React, { useContext } from "react";
import { AppContext } from "../index";
import  Workout from "../assets/UD.svg";
import { ReactComponent as Workout1 } from "../assets/UD1.svg";
import { ReactComponent as Meditation } from "../assets/meditation.svg";
import { ReactComponent as Running } from "../assets/running.svg";
import { ReactComponent as Shoe } from "../assets/shoe.svg";
import { ReactComponent as Wlifting } from "../assets/weightlifting.svg";
import { ReactComponent as Diet } from "../assets/diet.svg";
import {ReactComponent as GymEq} from '../assets/gym.svg';
import { ReactComponent as Recommend } from "../assets/recommend.svg";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:"20vh"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  symbol: {
    marginTop: theme.spacing(2),
  },
  banner: {
    display: "flex",
    justifyContent: "space-between",
    marginTop:"20vh",
    paddingLeft:"20px"
   
  },
  homeImageBanner:{
    flex: 0.5
  },
  homeImage:{
    width: "80%",
    objectFit: "contain",
  }
 

}));

function Home() {
  const app = useContext(AppContext);
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      
      {app.state.login ? (
        <div>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            &nbsp;
          <Workout1 class="symbol"/>
          
          <Grid container spacing={2} className={classes.root}>
           
           <Grid item xs={6}>
          
             <Paper
               className={classes.paper}
               onClick={() => history.push("/search")}
             >
               <Grid
                 container
                 direction="row"
                 justify="center"
                 alignItems="center"
               >
                 <Typography variant="h5">View all instructors</Typography>
                 <Running />
               </Grid>
             </Paper>
           </Grid>
           <Grid item xs={6}>
             <Paper
               className={classes.paper}
               onClick={() => history.push("/recommendations")}
             >
               <Grid
                 container
                 direction="row"
                 justify="center"
                 alignItems="center"
               >
                 <Typography variant="h5">Recommendations</Typography>
                 <Recommend />
               </Grid>
             </Paper>
           </Grid>
           <Grid item xs={3}>
             <Paper
               className={classes.paper}
               onClick={() => history.push("/strength")}
             >
               <Grid
                 container
                 direction="column"
                 justify="center"
                 alignItems="center"
               >
                 <Wlifting />
                 Strength training
               </Grid>
             </Paper>
           </Grid>
           <Grid item xs={3}>
             <Paper
               className={classes.paper}
               onClick={() => history.push("/yoga")}
             >
               <Grid
                 container
                 direction="column"
                 justify="center"
                 alignItems="center"
               >
                 <Meditation />
                 Yoga
               </Grid>
             </Paper>
           </Grid>
           <Grid item xs={3}>
             <Paper
               className={classes.paper}
               onClick={() => history.push("/fitness")}
             >
               <Grid
                 container
                 direction="column"
                 justify="center"
                 alignItems="center"
               >
                 <Shoe />
                 Professional Swimmers
               </Grid>
             </Paper>
           </Grid>
           <Grid item xs={3}>
             <Paper
               className={classes.paper}
               onClick={() => history.push("/diet")}
             >
               <Grid
                 container
                 direction="column"
                 justify="center"
                 alignItems="center"
               >
                 <Diet />
                 Diet and health
               </Grid>
             </Paper>
           </Grid>
         </Grid>
         </Grid>
        </div>
      ) : (
        <div>
         
        <div className={classes.banner}>
        <div>
        <Typography variant="h2" color="inherit" fontWeight="400">
          ABOUT US
        </Typography>

        <p style={{fontSize:"16px"}}> We believe that fitness is not a part of your life, rather, it’s a lifestyle. We want you to build <br/> healthy habits, 
        which will help your physical health and mental health – something that you can maintain your whole life! <br/><br/>
        Project Fit-Now is a group of expert fitness coaches.
Our transformation goals are powered by <br/>infusing a healthy lifestyle  into our mentee’s routines in such a way that it is sustainable in the <br/>long run. Our programs are not just limited to physical weight loss/gain but they extend farther <br/>into every aspect of our client's life. Our expertise in this field helps us transform people inside <br/>out. There is a lot of misinformation and myths around fitness and lifestyle. We aim to spread<br/> correct awareness about a healthy lifestyle through our carefully crafted fitness plans. We neither <br/> advocate any kind of shortcuts or quick fixes for weight loss or muscle gain nor promote any drug usage.</p>
        </div>
        
        <i className={classes.homeImageloggedin}>
          <img className={classes.homeImage} src={Workout} alt="workout" />
        </i>
      </div>
        <Grid container justify="center" className={classes.root}>
          <div className={classes.paper}>
            <Typography variant="h5">
              Create a new account or login to view all instructors!
            </Typography>
          </div>
        </Grid>

        </div>
      )}
    </div>
  );
}

export default Home;