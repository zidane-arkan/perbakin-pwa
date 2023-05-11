import React from 'react'
import PengujiAdmin from '../../pages/Penguji'

const Penguji = (props : any) => {
    return (
        <PengujiAdmin userPenguji={props.userPenguji} />
    )
}

export default Penguji