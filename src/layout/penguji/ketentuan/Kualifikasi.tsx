import React, { useState, useEffect } from 'react'
import KetentuanUmum from "../../pages/KetentuanUmum";
import { useLocation, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ResponseData } from '../../../context/response';
import api from '../../../api/api';


type Penembak = {
    scorer_id: string;
    id: string;
    name: string;
    stage: string;
    club: string;
    province: string;
    scorer: string;
}

const Kualifikasi = () => {
    const { shooterid } = useParams();
    const [shooter, setShooter] = useState<Penembak>();
    const [loading, setLoading] = useState(true);

    console.log(shooterid); // Output: nilai ID dari URL
    useEffect(() => {
        const fetchInitialShooters = async () => {
            try {
                const response = await api.get(`/scorer/shooter/${shooterid}`);
                const shooter = response.data.data.shooter;
                setShooter(shooter);
                // setInitialFetchDone(true);
            } catch (error) {
                const err = error as AxiosError<ResponseData<null>>;
                console.error("Error:", err);
            }
            setLoading(false);
        };

        fetchInitialShooters();
    }, []);

    return (
        <KetentuanUmum
            penembak={shooter?.name ? shooter?.name : 'Loading...' }
            pengprov={shooter?.province ? shooter?.province : 'Loading...'}
            klub={shooter?.club ? shooter?.club : 'Loading...'}
            link={`/penguji/kualifikasi_aturan/${shooterid}`}
        />
    )
}

export default Kualifikasi
        

        // const location = useLocation();
        // const { pathname } = location;
    
        // const getIdFromLink = () => {
        //     const segments = pathname.split('/');
        //     const id = segments[segments.length - 1];
        //     return id;
        // };
    
        // const id = getIdFromLink();