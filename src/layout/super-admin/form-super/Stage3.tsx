import React from 'react'
import { FormSuper } from '../../pages/Form'
import { useParams } from 'react-router-dom';

const Stage3 = () => {
    const { shooterid } = useParams();
    return (
        <FormSuper ujian='stage3' title='Stage #3' link={`stage4form`} />
    )
}

export default Stage3