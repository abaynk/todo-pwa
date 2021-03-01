import React, { useState } from 'react';
import '../App.css';
import '../useWindowDimension';
import useWindowDimensions from '../useWindowDimension';

const Navbar = () => {
    const {width} = useWindowDimensions();
    const [counter, setCounter] = useState(1);

    const setCount = (num) => {
        setCounter(num);
        console.log(num);
    }
    if (width<1050) {
        return(
        <div className='Navbar'>
            <h1 className='header'>Set your goals 🚀</h1>
            <div className='navbar-links'>
            <a href='#tasks' style={{color: counter === 1 ? 'red' : 'black'}} onClick={()=>setCount(1)}>tasks</a>|
            <a href='#schedule' style={{color: counter === 2 ? 'red' : 'black'}} onClick={()=>setCount(2)}>schedule</a>|
            <a href='#evaluate' style={{color: counter === 3 ? 'red' : 'black'}} onClick={()=>setCount(3)}>evaluate</a>
            </div>
        </div>
        )
    } else {
        return <div className='Navbar'><h1>SET YOUR GOALS 🚀</h1></div>
    }
}

export default Navbar;