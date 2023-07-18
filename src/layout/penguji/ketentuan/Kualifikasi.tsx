import React from 'react'
import KetentuanUmum from "../../pages/KetentuanUmum";
import { useLocation,useParams } from 'react-router-dom';

const Kualifikasi = () => {
    // const location = useLocation();
    // const { pathname } = location;

    // const getIdFromLink = () => {
    //     const segments = pathname.split('/');
    //     const id = segments[segments.length - 1];
    //     return id;
    // };

    // const id = getIdFromLink();
    const { id } = useParams();

    console.log(id); // Output: nilai ID dari URL
    console.log(id)
    return (
        <KetentuanUmum
            penembak="Penembak 1"
            pengprov="Kabutaen 1"
            klub="Klub Serikat 1"
            link={`/penguji/kualifikasi_aturan/${id}`}
        />
    )
}

export default Kualifikasi