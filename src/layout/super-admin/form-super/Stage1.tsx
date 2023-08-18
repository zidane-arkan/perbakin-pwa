import React from 'react'
import Form from '../../pages/Form'
import { useParams } from 'react-router-dom';

const Stage1 = () => {
    const { shooterid } = useParams();
    return (
        <Form ujian='stage1' title='Stage #1' link={`/penguji/stage1_konfirmasi/${shooterid}`} />
    )
}

export default Stage1