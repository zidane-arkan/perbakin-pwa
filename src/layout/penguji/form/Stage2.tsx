import React from 'react'
import Form from '../../pages/Form'
import { useParams } from 'react-router-dom';
const Stage2 = () => {
    const { shooterid } = useParams();
    return (
        <Form ujian='stage2' title='Stage #2' link={`/penguji/stage2_konfirmasi/${shooterid}`} />
    )
}

export default Stage2