import React from 'react'
import KetentuanUmum from "../../pages/KetentuanUmum";
import { useLocation, useParams } from 'react-router-dom';

const Kualifikasi = () => {
    // const location = useLocation();
    // const { pathname } = location;

    // const getIdFromLink = () => {
    //     const segments = pathname.split('/');
    //     const id = segments[segments.length - 1];
    //     return id;
    // };

    // const id = getIdFromLink();
    const { shooterid } = useParams();

    console.log(shooterid); // Output: nilai ID dari URL
    return (
        <KetentuanUmum
            penembak="Penembak 1"
            pengprov="Kabutaen 1"
            klub="Klub Serikat 1"
            link={`/penguji/kualifikasi_aturan/${shooterid}`}
        />
    )
}

export default Kualifikasi