import React from 'react'
import { FormSuper } from '../../pages/Form'
import { useParams } from 'react-router-dom';

const Stage4 = () => {
    const { shooterid } = useParams();
    return (
        <FormSuper ujian='stage4' title='Stage #4' link={`/penguji/stage4_konfirmasi/${shooterid}`} />
    )
}

export default Stage4