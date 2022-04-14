import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  columnname: {
    flexBasis: "20%",
  },
  columnside: {
    flexBasis: "33.33%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  red: {
    color: "#ff1744",
  },
  green: {
    color: "#00e676",
  },
}));

export default function TCard({ trainer }) {
  const classes = useStyles();
  const [like, setlike] = useState(false);
  const [dislike, setdislike] = useState(false);
  const [l, setl] = useState(trainer.likes);
  const [d, setd] = useState(trainer.dislikes);

  function likeguy() {
    if (!like) {
      fetch(`http://127.0.0.1:5001/trainers/like/${trainer._id}/1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "liked") {
            setlike(true);
            setl(data.likes);
          } else {
            alert(data.message);
          }
        });
    } else {
      fetch(`http://127.0.0.1:5001/trainers/like/${trainer._id}/-1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "liked") {
            setlike(false);
            setl(data.likes);
          } else {
            alert(data.message);
          }
        });
    }
  }

  function dislikeguy() {
    if (!dislike) {
      fetch(`http://127.0.0.1:5001/trainers/dislike/${trainer._id}/1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "disliked") {
            setdislike(true);
            setd(data.dislikes);
          } else {
            alert(data.message);
          }
        });
    } else {
      fetch(`http://127.0.0.1:5001/trainers/dislike/${trainer._id}/-1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "disliked") {
            setdislike(false);
            setd(data.dislikes);
          } else {
            alert(data.message);
          }
        });
    }
  }

  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className={classes.columnname}>
          <Typography className={classes.heading}>{trainer.name}</Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>
            {trainer.specialization}
          </Typography>
        </div>
        <ButtonGroup
          variant="text"
          color="inherit"
          aria-label="likes and dislikes"
          className={classes.column}
        >
          <Button className={classes.green}>{l}</Button>
          <Button>
            <ThumbsUpDownIcon />
          </Button>
          <Button className={classes.red}>{d}</Button>
        </ButtonGroup>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <div className={classes.column}>
          <img
            src={trainer.photo}
            alt="trainer's face"
            width="150"
            height="auto"
          />
        </div>
        <div className={classes.columnside}>
          <Typography variant="h5">{trainer.name}</Typography>
          <Typography variant="h6">email:{trainer.email}</Typography>
          <Typography variant="h6">phone no:{trainer.ph_no}</Typography>
        </div>
        <div className={clsx(classes.column, classes.helper)}>
          <Typography variant="caption">
            from {trainer.city}
            <br />
            age:{trainer.age}
            <br />
            gender:{trainer.gender}
          </Typography>
        </div>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Tooltip title="Like">
          <IconButton className={classes.green} onClick={likeguy}>
            {like ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Dislike">
          <IconButton className={classes.red} onClick={dislikeguy}>
            {dislike ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
          </IconButton>
        </Tooltip>
      </AccordionActions>
    </Accordion>
  );
}
