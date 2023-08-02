import React, { useEffect, useState } from 'react'
import api from '../../api/api';
import { AxiosError } from 'axios';
import { HeaderWhiteCustom } from '../../components/Header'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardText } from '../../components/ui/Card';
import { Link } from 'react-router-dom';
import Kualifikasi from '../tabel/form/Kualifikasi';
import { ResponseData } from '../../context/response';
import Stage1 from '../tabel/form/Stage1';
import Stage2 from '../tabel/form/Stage2';
import Stage3 from '../tabel/form/Stage3';
import Stage4 from '../tabel/form/Stage4';
import Stage5 from '../tabel/form/Stage5';
import Stage6 from '../tabel/form/Stage6';
import { useParams } from 'react-router-dom';

type Penembak = {
    scorer_id: string;
    id: string;
    name: string;
    stage: string;
    club: string;
    province: string;
    scorer: string;
}
type PropsForm = {
    ujian?: string
};
export const JenisTabel: string | any = {
    'kualifikasi': '#FFFFFF',
    'white': '#000000',
    'blur': '#000000',
    'transparent': '#FFFFFF',
};
const FormTable = (props: PropsForm) => {
    return (
        <>
            {
                props.ujian == 'kualifikasi' &&
                <Kualifikasi />
            }
            {
                props.ujian == 'stage1' &&
                <Stage1 />
            }
            {
                props.ujian == 'stage2' &&
                <Stage2 />
            }
            {
                props.ujian == 'stage3' &&
                <Stage3 />
            }
            {
                props.ujian == 'stage4' &&
                <Stage4 />
            }
            {
                props.ujian == 'stage5' &&
                <Stage5 />
            }
            {
                props.ujian == 'stage6' &&
                <Stage6 />
            }
        </>
    );
}
const Form = (props: any) => {
    const { shooterid } = useParams();
    const [loading, setLoading] = useState(true);
    const [shooter, setShooter] = useState<Penembak>();

    const classname = `${props.classname} rounded-3xl`;

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
        <Layout className={'rounded-3xl h-auto gap-8 mt-28 pb-10 pt-[2%] justify-evenly overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='close' title={props.title} />
            <LayoutChild className='flex-col gap-0'>
                <h6 className='text-black/60'>Nama Penembak</h6>

                {!loading ? (
                    <h4>{shooter?.name}</h4>

                ) : (
                    <div className="flex mt-2 p-4 text-[.8rem] font-bold w-auto sm:w-[35%] animate-pulse  bg-gray-200 rounded-md">Loading Nama Penembak...</div>
                )}
            </LayoutChild>
            <LayoutChild className='flex-col h-full gap-4 justify-between'>
                <div className='flex-col gap-4'>
                    <section className='flex flex-col gap-2'>
                        <h2>Peserta:</h2>
                        <p className='text-[#000]/60'>Isi kolom berikut dengan tanda tangan.</p>
                    </section>
                    <FormTable ujian={props.ujian} />
                </div>
                <CardText>
                    <Link to={`${props.link}`} className='w-full px-4 py-4 text-white text-center bg-[#036BB0] rounded-lg' type='button'>
                        Selanjutnya
                    </Link>
                </CardText>
            </LayoutChild>
        </Layout>
    )
}

export default Form