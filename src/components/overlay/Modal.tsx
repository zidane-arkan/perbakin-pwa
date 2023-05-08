import React from 'react'
import classes from './Overlay.module.css';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
type Props = {
    children?: string | JSX.Element | React.ReactNode
}
const ModalOverlay = (props: Props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}

const portalElement = document.getElementById('overlays') as HTMLElement;
const Modal = (props: Props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop />, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </Fragment>
    )
}

export default Modal