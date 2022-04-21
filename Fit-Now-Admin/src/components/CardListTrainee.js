import React from 'react';
import CardTrainee from './CardTrainee';
import { Grid } from '@material-ui/core';

function CardListTrainee({robots}) {
    console.log(robots)
    return (
        <Grid>
        {
            robots.map((a,i)=>{
                return(
                    <CardTrainee key={i} trainer={a} />
                );
            })
        }
        </Grid>
    )
}

export default CardListTrainee;