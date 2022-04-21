import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardList from './CardList';
import Typography from '@material-ui/core/Typography';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { Grid } from '@material-ui/core';
import {ReactComponent as Shoe} from '../assets/shoe.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        width:'85%',
        padding: theme.spacing(2)
    },
    title:{
        margin: theme.spacing(2),
    },
  }));

function Fitness({trainers}) {
    const classes = useStyles();
    const robots = trainers.filter(robot=>{return robot.specialization.toLowerCase().includes('fit')});
    
    return (
        <Grid container justify="center">
        <Typography className={classes.title} variant="h4">Our fittest fitness coaches</Typography>
        <Shoe />
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

export default Fitness;
