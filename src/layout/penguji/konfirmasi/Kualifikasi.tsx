import React from 'react'
import TandaTangan from '../../pages/TandaTangan'
import { useParams } from 'react-router-dom';

const Kualifikasi = () => {
    const { shooterid } = useParams();

    console.log(shooterid); // Output: nilai ID dari URL
    return (
        <TandaTangan stage={'stage0'} title='Ujian Kualifikasi 20 Meter' link={`/penguji/stage1_aturan/${shooterid}`} />
    )
}

export default Kualifikasi