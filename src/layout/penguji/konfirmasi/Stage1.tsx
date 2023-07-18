import React from 'react'
import TandaTangan from '../../pages/TandaTangan'
import { useParams } from 'react-router-dom';

const Stage1 = () => {
    const { shooterid } = useParams();

    console.log(shooterid); 
    return (
        <TandaTangan title='Stage 1' link={`/penguji/stage2_aturan/${shooterid}`} />
    )
}

export default Stage1