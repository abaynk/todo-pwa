import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  TextField,
  withStyles,
} from "@material-ui/core";
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import React, { useEffect } from "react";
import { useState } from "react";
import "../App.css";
import ExtraTask from "./ExtraTask";
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
  },
}));
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);


const Tasks = () => {
  const [inputMain, setInputMain] = useState("");
  const [tasksMain, setTasksMain] = useState([]);
  const [inputExtra, setInputExtra] = useState("");
  const [tasksExtra, setTasksExtra] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    axios.get('http://localhost:5000/mainTasks/')
      .then((response) => {
          setTasksMain(response.data);
      })
      .catch(err => console.log(`Something went wrong with fetching MainTasks! ${err}`));
  },[tasksMain]);
  useEffect(() => {
      axios.get('http://localhost:5000/extraTasks/')
        .then(response => {
            setTasksExtra(response.data);
        })
        .catch(err => console.log(`Something went wrong with fetching ExtraTasks! ${err}`));
  },[tasksExtra]);
  
  const addTaskMain = (e) => {
    e.preventDefault();

    const mainTask = {
      mainTask: inputMain,
    }
    axios.post('http://localhost:5000/mainTasks/add', mainTask)
      .then(res => console.log(res.data))
      .catch(err => console.log(`Something went wrong with adding Main Task! ${err}`));
    setInputMain('');
    console.log(tasksMain);
  };
  const addTaskExtra = (e) => {
    e.preventDefault();

    const extraTask = {
      extraTask: inputExtra,
    }
    axios.post('http://localhost:5000/extraTasks/add', extraTask)
      .then(res => console.log(res.data))
      .catch(err => console.log(`Something went wrong with adding Extra Task! ${err}`));
    setInputExtra('');
    console.log(tasksExtra);
  };
   
  const onDeleteMainTask = (e, id) => {
    e.stopPropagation();
    e.preventDefault(); 

    axios.delete('http://localhost:5000/mainTasks/'+id)
      .then(res => console.log(res.data))
      .catch(err => console.log(`Something went wrong with deleting Main Task! ${err}`));
  };

  return (
    <div className="Tasks" id='tasks'>
      <div className="main-tasks box">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={addTaskMain}
        >
          <CssTextField
            id="standard-basic"
            label="Main tasks for the Day ⭐:"
            value={inputMain}
            onChange={(e) => setInputMain(e.target.value)}
          />
        </form>
        <List>
          {tasksMain.map((task, index) => {
            return (
              <ListItem key={index} role={undefined}  button>
                <ListItemIcon>
                  <Checkbox color="default" />
                </ListItemIcon>
                <ListItemText className={classes.list} primary={task.mainTask} />
                <ClearOutlinedIcon className='clear' onClick={(e) => onDeleteMainTask(e, task._id)} />
              </ListItem>
            );
          })}
        </List>
      </div>
      <div className="extra-tasks box">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={addTaskExtra}
        >
          <CssTextField
            id="standard-basic"
            label="Extra tasks for the Day 📌:"
            value={inputExtra}
            onChange={(e) => setInputExtra(e.target.value)}
          />
        </form>
        <List>
          {tasksExtra.map((task, index) => {
            return <ExtraTask task={task.extraTask} key={index} id={task._id} />;
          })}
        </List>
      </div>
    </div>
  );
};

export default Tasks;
