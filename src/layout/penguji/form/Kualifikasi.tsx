import React from 'react'
import Form from "../../pages/Form";
import { useParams } from 'react-router-dom';

const Kualifikasi = () => {
    const { shooterid } = useParams();

    console.log(shooterid); // Output: nilai ID dari URL
    return (
        <Form ujian='kualifikasi' title='Ujian Kualifikasi 20 Meter' link={`/penguji/kualifikasi_konfirmasi/${shooterid}`} />
    )
}

export default Kualifikasi