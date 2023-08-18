import React from 'react'
import Form from '../../pages/Form'
import { useParams } from 'react-router-dom';

const Stage4 = () => {
    const { shooterid } = useParams();
    return (
        <Form ujian='stage4' title='Stage #4' link={`/penguji/stage4_konfirmasi/${shooterid}`} />
    )
}

export default Stage4