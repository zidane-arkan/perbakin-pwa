import React from 'react'
import { PenembakAdmin } from '../../pages/Penembak'
const Penembak = (props: any) => {
    return (
        <PenembakAdmin statusAuth={props.statusAuth} />
    )
}

export default Penembak