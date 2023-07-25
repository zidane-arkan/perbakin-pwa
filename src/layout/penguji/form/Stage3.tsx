import React from 'react'
import Form from '../../pages/Form'
import { useParams } from 'react-router-dom';

const Stage3 = () => {
    const { shooterid } = useParams();
    return (
        <Form ujian='stage3' title='Stage #3' link={`/penguji/stage3_konfirmasi/${shooterid}`} />
    )
}

export default Stage3