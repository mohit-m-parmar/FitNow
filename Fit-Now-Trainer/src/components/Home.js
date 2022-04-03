import React from 'react';
import {ReactComponent as Dumbell} from '../assets/dumbell.svg';
import Typography from '@material-ui/core/Typography';

function Home() {
    return (
        <div style={{marginTop: 20}}>
        <Dumbell />
        <Typography variant="h2" color="inherit">
            The Fit-Now Application For Gym Trainers
        </Typography>
        <Typography variant="h5" color="inherit">
            Reach out to thousands of customers world wide!
        </Typography>
        </div>
    )
}

export default Home;
