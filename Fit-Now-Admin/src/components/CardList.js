import React from 'react';
import TCard from './Card';
import { Grid } from '@material-ui/core';

function CardList({robots}) {
    return (
        <Grid>
        {
            robots.map((a,i)=>{
                return(
                    <TCard key={i} trainer={a} />
                );
            })
        }
        </Grid>
    )
}

export default CardList;
