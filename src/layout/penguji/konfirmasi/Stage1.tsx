import React from 'react'
import TandaTangan from '../../pages/TandaTangan'
import { useParams } from 'react-router-dom';

const Stage1 = () => {
    const { shooterid } = useParams();

    return (
        <TandaTangan stage={'stage1/2'} title='Stage 1' link={`/penguji/stage2_aturan/${shooterid}`} />
    )
}

export default Stage1