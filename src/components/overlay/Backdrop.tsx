import React from 'react'
import classes from './Overlay.module.css';
const Backdrop = (props : any) => {
    return (
        <div onClick={props.shownCardHandler} className={classes.backdrop}></div>
    )
}

export default Backdrop