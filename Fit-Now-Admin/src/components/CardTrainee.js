import React,{useState, useContext} from 'react';
import { AppContext } from '../index';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";
import { setId } from '../global/Reducer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  columnname:{
    flexBasis:'20%',
  },
  columnside: {
    flexBasis: '33.33%',
    display: 'flex',
    flexDirection:'column',
    justifyContent:"flex-start",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  red: {
    color: '#ff1744'
  },
  green: {
    color: '#00e676'
  }
}));

export default function CardTrainee({trainer}) {
  const app = useContext(AppContext);
  const classes = useStyles();
  const [like, setlike] = useState(false);
  const [dislike, setdislike] = useState(false);
  const [l, setl] = useState(trainer.likes);
  const [d, setd] = useState(trainer.dislikes);
  const history = useHistory();

  function clicktrainee(id){
    app.dispatch(setId(id));
    console.log(id)
    history.push("/account-trainee")
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
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          
          <div className={classes.columnside}>
          <Typography variant="h5">{trainer.name}</Typography>
          <Typography variant="h6">email:{trainer.email}</Typography>
          <Typography variant="h6">phone no:{trainer.ph_no}</Typography>
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              age:{trainer.age}
              <br />
              gender:{trainer.gender}
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
        <Button onClick={() => clicktrainee(trainer._id)}>Manage</Button>
        </AccordionActions>
      </Accordion>
  );
}