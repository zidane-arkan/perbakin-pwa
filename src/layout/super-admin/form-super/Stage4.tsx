import React from 'react'
import { FormSuper } from '../../pages/Form'
import { useParams } from 'react-router-dom';

const Stage4 = () => {
    const { shooterid } = useParams();
    return (
        <FormSuper ujian='stage4' title='Stage #4' link={`stage5form`} />
    )
}

export default Stage4