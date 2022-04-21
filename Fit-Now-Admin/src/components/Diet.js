import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardList from './CardList';
import Typography from '@material-ui/core/Typography';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { Grid } from '@material-ui/core';
import {ReactComponent as Weightlifting} from '../assets/diet.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        width:'85%',
        padding: theme.spacing(2)
    },
    title:{
        margin: theme.spacing(2),
    },
  }));

function Diet({trainers}) {
    const classes = useStyles();
    const robots = trainers.filter(robot=>{return(
        robot.specialization.toLowerCase().includes('diet') || robot.specialization.toLowerCase().includes('food') || robot.specialization.toLowerCase().includes('healthy')
    )});
    
    return (
        <Grid container justify="center">
        <Typography className={classes.title} variant="h4">Get healthy with our diet consultants</Typography>
        <Weightlifting />
        <div className={classes.root}>
        {
            robots.length?
            (<CardList robots={robots} />)
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

export default Diet;
