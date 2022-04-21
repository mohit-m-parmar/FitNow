import React, { useContext } from 'react';
import { AppContext } from '../index';
import {ReactComponent as Dumbell} from '../assets/dumbell.svg';
import {ReactComponent as Running} from '../assets/running.svg';
import {ReactComponent as Recommend} from '../assets/recommend.svg';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '50%',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      cursor: 'pointer',
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
      <Grid container direction="column" justify="center" alignItems="center">
        <Dumbell class="symbol"/>
        <Typography variant="h2" color="inherit">
          FIT-NOW
        </Typography>
        <Typography variant="h4" color="inherit" className={classes.title}>
          FIT-NOW User Management Application!
        </Typography>
        {
          app.state.login?
          (
            <Grid container spacing={2} className={classes.root}>
            <Grid item xs={6}>
              <Paper className={classes.paper} onClick={() => history.push("/search-trainer")}>
                <Grid container direction="row" justify="center" alignItems="center"><Typography variant="h5">Manage Trainers</Typography><Running /></Grid>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper} onClick={() => history.push("/search-trainee")}>
                <Grid container direction="row" justify="center" alignItems="center"><Typography variant="h5">Manage Trainees</Typography><Recommend /></Grid>
              </Paper>
            </Grid>
          </Grid>
          )
          :
          (
            <div></div>
          )
        }
      </Grid>
    )
}

export default Home;