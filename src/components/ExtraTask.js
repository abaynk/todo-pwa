import React, { useState } from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CheckIcon from "@material-ui/icons/Check";
import { ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "90%",
      color: "red",
    },
  },
  clear: {
    color: 'gray'
  },
  list: {
    overflow: 'scroll',
    scrollbarWidth: 'none'
  }
}));

const ExtraTask = (props) => {
  const [checked, setChecked] = useState(false);
  const iconArray = [<CheckIcon />, <ChevronRightIcon />];
  const classes = useStyles();

  const toggleIcon = () => {
    setChecked(!checked);
  };

  const onDeleteExtraTask = (e, id) => {
    e.stopPropagation();
    e.preventDefault(); 

    axios.delete('http://localhost:5000/extraTasks/'+id)
      .then(res => console.log(res.data))
      .catch(err => console.log(`Something went wrong with deleting Extra Task! ${err}`));
  };
  
  return (
    <ListItem role={undefined} button onClick={toggleIcon}>
      <ListItemIcon>{checked ? iconArray[0] : iconArray[1]}</ListItemIcon>
      <ListItemText className={classes.list} primary={props.task} />
      <ClearOutlinedIcon className='clear' onClick={(e) => onDeleteExtraTask(e, props.id)} />
    </ListItem>
  );
};

export default ExtraTask;
