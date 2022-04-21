import React, { useContext } from 'react';
import { AppContext } from '../index';
import { makeStyles } from '@material-ui/core/styles';
import CardList from './CardList';
import Typography from '@material-ui/core/Typography';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width:'85%',
        padding: theme.spacing(2)
    },
    title:{
        margin: theme.spacing(2),
    },
  }));

function Reccomendations({trainers}) {
    const app = useContext(AppContext);
    const classes = useStyles();
    const pref = app.state.user.pref;
    const arr = pref.split(",");
    console.log(arr);
    let t = [];
    for(let i=0;i<arr.length;i++){
        let robots = trainers.filter(robot=>{return robot.specialization.toLowerCase().includes(arr[i].toLowerCase())});
        t = t.concat(robots)
    }
    const trainerArr = t;
    console.log("t:",t)
    
    return (
        <Grid container justify="center">
        <Typography className={classes.title} variant="h4">Our Reccomendations based on your preference</Typography>
        <div className={classes.root}>
        {
            trainerArr.length?
            (<CardList robots={trainerArr} />)
            :
            (<Grid container justify="center">
            <NotInterestedIcon />
            <Typography variant="subtitle1">No results</Typography>
            </Grid>)
        }
        </div>
        </Grid>
    )
}

export default Reccomendations;