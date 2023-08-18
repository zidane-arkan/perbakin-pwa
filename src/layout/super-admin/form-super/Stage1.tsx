import React from 'react'
import {FormSuper} from '../../pages/Form'
import { useParams } from 'react-router-dom';

const Stage1 = () => {
    const { shooterid } = useParams();
    return (
        <FormSuper ujian='stage1' title='Stage #1' link={`/penguji/stage1_konfirmasi/${shooterid}`} />
        // <h2>Oi</h2>
    )
}

export default Stage1