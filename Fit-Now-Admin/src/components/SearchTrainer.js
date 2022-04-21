import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardList from './CardList';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
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
    search: {
        marginBottom: theme.spacing(2),
    }
  }));

function SearchTrainer({trainers}) {
    console.log('trainers:',trainers)
    const classes = useStyles();
    const [search, setsearch] = useState('');
    let robots = trainers;

    function filsearch(event){
        setsearch(event.target.value);
        console.log("trainers:",trainers);
        console.log("robots",robots);
    }

    robots = robots.filter(robot=>{return robot.name.toLowerCase().includes(search.toLowerCase())});
    
    return (
        <Grid container justify="center">
        <Typography variant="h3" className={classes.title}>Manage Trainers</Typography>
        <div className={classes.root} >
        <FormControl fullWidth variant="outlined" className={classes.search}>
          <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
          <OutlinedInput
            onChange={filsearch}
            defaultValue=""
            startAdornment={<InputAdornment position="start"><SearchIcon color="primary" /></InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
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

export default SearchTrainer;
