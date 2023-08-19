import React from 'react'
import { FormSuper } from '../../pages/Form'
import { useParams } from 'react-router-dom';
const Stage2 = () => {
    const { shooterid } = useParams();
    return (
        <FormSuper ujian='stage2' title='Stage #2' link={`stage3form`} />
    )
}

export default Stage2