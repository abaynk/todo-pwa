import { List, ListItem, ListItemText, makeStyles, TextField, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../App.css";
import axios from 'axios';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

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
      scrollbarWidth: 'none',
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

const Evaluate = () => {
    const [input, setInput] = useState("");
    const [grate, setGrate] = useState([]);
    const [inputAchiev, setInputAchiev] = useState("");
    const [achiev, setAchiev] = useState([]);
    const classes = useStyles();

    useEffect(()=>{
      axios.get('http://localhost:5000/gratefullness')
        .then(response=>{
          setGrate(response.data);
        })
        .catch(err => console.log(`Something went wrong with fetching Gratefullness list! ${err}`));
    },[grate]);
    
    useEffect(()=>{
      axios.get('http://localhost:5000/achievements')
        .then(response=>{
          setAchiev(response.data);
        })
        .catch(err => console.log(`Something went wrong with fetching Achievements list! ${err}`));
    },[achiev]);
    
    const addGrate = (e) => {
        e.preventDefault();
        const grate = {
          gratefullness: input
        };
        axios.post('http://localhost:5000/gratefullness/add', grate)
          .then(res => console.log(res.data))
          .catch(err => console.log(`Something went wrong with adding Gratefullness! ${err}`));
        setInput('');
    };
    const addAchiev = (e) => {
        e.preventDefault();
        const achiev = {
          achievement: inputAchiev
        };
        axios.post('http://localhost:5000/achievements/add', achiev)
          .then(res => console.log(res.data))
          .catch(err => console.log(`Something went wrong with adding Achievement! ${err}`));
        setInputAchiev('');
    };

    const onDeleteGratefullness = (e, id) => {
      e.stopPropagation();
      e.preventDefault(); 
  
      axios.delete(`http://localhost:5000/gratefullness/${id}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(`Something went wrong with deleting Gratefullness! ${err}`));
    };
    const onDeleteAchievement = (e, id) => {
      e.stopPropagation();
      e.preventDefault(); 
  
      axios.delete(`http://localhost:5000/achievements/${id}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(`Something went wrong with deleting Achievement! ${err}`));
    };

    return (
        <div className="Evaluate" id='evaluate'>
            <div className='Achiev box'>
                <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={addAchiev}
                >
                <CssTextField
                    id="standard-basic"
                    label="Today I have achieved 👌:"
                    value={inputAchiev}
                    onChange={(e) => setInputAchiev(e.target.value)}
                />
                </form>
                <List>
                {achiev.map((task, index) => {
                    return (
                    <ListItem key={index} role={undefined} button>
                        <ListItemText className={classes.list} primary={`🤙    ${task.achievement}`}/>
                        <ClearOutlinedIcon className='clear' onClick={(e) => onDeleteAchievement(e, task._id)} />
                    </ListItem>
                    );
                })}
                </List>
            </div>
            <div className="Gratefullness box">
                <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={addGrate}
                >
                <CssTextField
                    id="standard-basic"
                    label="Today I am gratefull for 🙏:"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                </form>
                <List>
                {grate.map((task, index) => {
                    return (
                    <ListItem key={index} role={undefined} button>
                        <ListItemText className={classes.list} primary={`🧡    ${task.gratefullness}`}/>
                        <ClearOutlinedIcon className='clear' onClick={(e) => onDeleteGratefullness(e, task._id)} />
                    </ListItem>
                    );
                })}
                </List>
            </div>
        </div>
    )
};

export default Evaluate;
