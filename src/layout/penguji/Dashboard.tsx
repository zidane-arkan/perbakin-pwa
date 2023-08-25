import React, { useEffect, useState } from 'react'
import perbakinLogo from '../../app-assets/perbakin-logo.png';
import { Penembak } from '../pages/Penembak'
import { Layout } from '../../components/Layout';
import { BgHeader } from '../../components/Header';
import { ResponseData } from '../../context/response';
import api from '../../api/api';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom'

type Penguji = {
    id: string;
    exam_id: string;
    image_path: string;
    user_id: string;
    username: string;
    name: string;
}
const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [penguji, setPenguji] = useState<Penguji>();

    useEffect(() => {
        const fetchInitialPenguji = async () => {
            try {
                const response = await api.get(`/scorer`);
                const penguji = response.data.data.scorer;
                console.log(penguji)
                setPenguji(penguji);
            } catch (error) {
                const err = error as AxiosError<ResponseData<null>>;
                console.error("Error:", err);
            }
            setLoading(false);
        };

        fetchInitialPenguji();
    }, []);

    return (
        <>
            <BgHeader>
                <div className='flex items-start sm:items-end justify-between w-full'>
                    <section className='flex flex-col items-start'>
                        <h2>Halo, Penguji</h2>
                        <h5>{loading ? 'Loading...' : `${penguji?.name}`}</h5>
                    </section>
                    <section>
                        <Link to={'penguji/editprofile'}>
                            <img className='w-[45px] sm:w-[60px]' src={perbakinLogo} />
                        </Link>
                    </section>
                </div>
            </BgHeader>

            <Penembak classname='mt-36 pt-[10%]' />

        </>
    )
}

export default Dashboard