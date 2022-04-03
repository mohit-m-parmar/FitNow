import React, { useContext } from 'react';
import { AppContext } from '../index';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import Divider from '@material-ui/core/Divider';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: "80%",
    margin: '20px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  info: {
      margin: '10px',
  },
  like: {
      color: '#00e676',
  },
  dislike: {
      color: '#ff1744',
  }
});

export default function Account() {
  const app = useContext(AppContext);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const history = useHistory();

  return (
      <Grid container justifyContent="center">
          <Card className={classes.root}>
              <CardContent>
                  <Grid container alignItems="center" className={classes.info}>
                  <img src={app.state.user.pic} alt="profile" width='250px' heigh='auto'/>
                  <Grid item className={classes.info}>
                  <Typography variant="h4">
                    {app.state.user.name}
                  </Typography>
                  {bull}
                  <Typography variant="h5">
                    {app.state.user.spec}
                  </Typography>
                  <Typography variant="h5">
                    {app.state.user.email}
                  </Typography>
                  <Typography variant="h5">
                    {app.state.user.phno}
                  </Typography>
                  </Grid>
                  </Grid>
                  <Divider variant="middle" />
                  <ButtonGroup variant="text" color="inherit" aria-label="text primary button group" size="large">
                    <Button
                    startIcon={<ThumbUpAltIcon />}
                    className={classes.like}
                    >{app.state.user.like}</Button>
                    <Button
                    endIcon={<ThumbDownAltIcon />}
                    className={classes.dislike}
                    >{app.state.user.dislike}</Button>
                  </ButtonGroup>
                  <Grid className={classes.info}>
                  <Typography variant="h5">
                    Personal Details:
                  </Typography>
                  age: {app.state.user.age}
                  <br />
                  gender: {app.state.user.gender}
                  <br />
                  city of residence: {app.state.user.city}
                  </Grid>
              </CardContent>
              <CardActions>
                  <Grid container justifyContent="center">
                  <Button variant="contained" color="primary" onClick={()=>history.push("/edit")}>Edit profile</Button>
                  </Grid>
              </CardActions>
          </Card>
      </Grid>
  );
}
