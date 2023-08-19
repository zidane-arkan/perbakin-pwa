import React from 'react'
import { FormSuper } from '../../pages/Form'
import { useParams } from 'react-router-dom';
const Stage5 = () => {
    const { shooterid } = useParams();
    return (
        <FormSuper ujian='stage5' title='Stage #5' link={`/penguji/stage5_konfirmasi/${shooterid}`} />
    )
}

export default Stage5