import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardList from "./CardList";
import Typography from "@material-ui/core/Typography";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import { Grid } from "@material-ui/core";
import { ReactComponent as Weightlifting } from "../assets/weightlifting.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "85%",
    padding: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
  },
}));

function Weight({ trainers }) {
  const classes = useStyles();
  const robots = trainers.filter((robot) => {
    return (
      robot.specialization.toLowerCase().includes("strength") ||
      robot.specialization.toLowerCase().includes("weight") ||
      robot.specialization.toLowerCase().includes("body building")
    );
  });

  return (
    <Grid container justifyContent="center">
      <Typography className={classes.title} variant="h4">
        Best in town strength and weight trainers
      </Typography>
      <Weightlifting />
      <div className={classes.root}>
        {robots.length ? (
          <CardList robots={robots} />
        ) : (
          <Grid container justifyContent="center">
            <NotInterestedIcon />
            <Typography variant="subtitle1">No results</Typography>
          </Grid>
        )}
      </div>
    </Grid>
  );
}

export default Weight;
