import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  TextField,
  withStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import "../App.css";
import axios from 'axios';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '50%',
    },
    input: {
        width: "90%",
        marginTop: '20px',
        color: 'black'
    },
    button: {
        marginBottom: '10px',
    },
    clear: {
      color: 'gray',
    },
    list: {
      overflow: 'scroll',
      scrollbarWidth: 'none',
      borderBottom: "1px solid black",
    }
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

const Schedule = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState('06:00');
  const [task, setTask] = React.useState('');
  const [tasks, setTasks] = React.useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/schedule')
      .then(response =>{
        setTasks(response.data.sort((a, b) => a.time.slice(0,2) - b.time.slice(0,2)));
      })
      .catch(err => console.log(`Something went wrong with fetching Scheduled Tasks! ${err}`));
  }, [tasks]);

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = (e) => {
      e.preventDefault();
      setOpen(false);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const schedule = {
        schedule: task,
        time: time
      };
      axios.post('http://localhost:5000/schedule/add', schedule)
        .then(res => console.log(res.data))
        .catch(err => console.log(`Something went wrong with adding Scheduled task! ${err}`));
      setTime('06:00');
      setTask('');
      setOpen(false);
  };

  const onDelete = (id) => {

    axios.delete(`http://localhost:5000/schedule/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(`Something went wrong with deleting Scheduled Task! ${err}`));
  };

  return (
    <div className="Schedule" id='schedule'>
        <Button variant ='contained' onClick={handleClickOpen}>
            Schedule your day 📆
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Set time and task ⏰</DialogTitle>
            <DialogContent>
                <form id='schedule-form' className={classes.container} noValidate onSubmit={handleSubmit}>
                    <TextField
                        id="schedule-time"
                        label="set time"
                        type="time"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <CssTextField
                        id='schedule-task'
                        label='set task'
                        variant='outlined'
                        size='small'
                        className={classes.input}
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    dismiss
                </Button>
                <Button type='submit' form='schedule-form' onCLick={handleSubmit}>
                    submit
                </Button>
            </DialogActions>
        </Dialog>
        <div className='schedule-list box'>
        <List>
          {
            tasks.map((timeTask, index) => {
            return (
              <ListItem key={index} role={undefined} button >
                <ListItemIcon>
                    {timeTask.time}
                </ListItemIcon>
                <ListItemText className={classes.list} primary={timeTask.schedule} />
                <ClearOutlinedIcon className='clear' onClick={() => onDelete(timeTask._id)} />
              </ListItem>
            );
          })}
        </List>
        </div>
    </div>
  );
};

export default Schedule;
