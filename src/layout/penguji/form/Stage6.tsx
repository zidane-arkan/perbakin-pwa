import React from 'react'
import Form from '../../pages/Form'
import { useParams } from 'react-router-dom';

const Stage6 = () => {
    const { shooterid } = useParams();
    return (
        <Form ujian='stage6' title='Stage #6' link={`/penguji/stage6_konfirmasi/${shooterid}`} />
    )
}

export default Stage6