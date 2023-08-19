import React from 'react'
import { FormSuper } from '../../pages/Form'
import { useParams } from 'react-router-dom';

const Stage6 = () => {
    const { shooterid } = useParams();
    return (
        <FormSuper ujian='stage6' title='Stage #6' link={`/superadmin/tabs/admindashboard`} />
    )
}

export default Stage6