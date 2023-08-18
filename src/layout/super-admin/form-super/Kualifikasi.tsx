import React from 'react'
import { FormSuper } from "../../pages/Form";
import { useParams } from 'react-router-dom';

const Kualifikasi = () => {
    const { examid, scorerid, shooterid } = useParams();

    console.log(shooterid); // Output: nilai ID dari URL
    return (
        <FormSuper ujian='kualifikasi' title='Ujian Kualifikasi 20 Meter' link={`stage1form`} />
        // <h1>Hai</h1>
    )
}
// link = {`/penguji/kualifikasi_konfirmasi/${shooterid}`}

export default Kualifikasi