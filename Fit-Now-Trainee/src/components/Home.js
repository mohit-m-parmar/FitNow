import React, { useContext } from "react";
import { AppContext } from "../index";
import { ReactComponent as Dumbell } from "../assets/dumbell.svg";
import { ReactComponent as Meditation } from "../assets/meditation.svg";
import { ReactComponent as Running } from "../assets/running.svg";
import { ReactComponent as Shoe } from "../assets/shoe.svg";
import { ReactComponent as Wlifting } from "../assets/weightlifting.svg";
import { ReactComponent as Diet } from "../assets/diet.svg";
//import { ReactComponent as GymEq } from "../assets/gym.svg";
import { ReactComponent as Recommend } from "../assets/recommend.svg";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "50%",
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
}));

function Home() {
  const app = useContext(AppContext);
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Dumbell className="symbol" />
      <Typography variant="h2" color="inherit">
        FiT-Now
      </Typography>
      <Typography variant="h4" color="inherit" className={classes.title}>
        Find the best workout and trainer for you!
      </Typography>
      {app.state.login ? (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={6}>
            <Paper
              className={classes.paper}
              onClick={() => history.push("/search")}
            >
              <Grid
                container
                direction="row"
                justifyContent="center"
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
                justifyContent="center"
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
                justifyContent="center"
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
                justifyContent="center"
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
                justifyContent="center"
                alignItems="center"
              >
                <Shoe />
                Fitness
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
                justifyContent="center"
                alignItems="center"
              >
                <Diet />
                Diet and health
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="center" className={classes.root}>
          <div className={classes.paper}>
            <Typography variant="h5">
              Create a new account or login to view all instructors!
            </Typography>
          </div>
        </Grid>
      )}
    </Grid>
  );
}

export default Home;
