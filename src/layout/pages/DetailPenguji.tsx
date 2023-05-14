import React from 'react'
import { CardPenembakAdmin } from '../../components/ui/Card'
import { Layout, LayoutChild } from '../../components/Layout'
import { HeaderWhiteCustom } from '../../components/Header'
import { CardText } from '../../components/ui/Card'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import user2 from '../../app-assets/user2.png';

const DetailPenguji = (props: any) => {
    const data = useLocation();
    console.log(data)
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <Layout className={'rounded-3xl mt-28 pt-[2%] overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='returnblack' title='Detail Penguji' />
            <LayoutChild>
                <section className="flex w-full items-center gap-4 ">
                    <div className="flex shadow-md rounded-xl items-center w-1/6">
                        <img className='min-w-[65px] ' src={user2} />
                    </div>
                    <div className="flex flex-col w-4/6 gap-1 pl-6 md:p-4">
                        <h1 className="text-base font-bold text-gray-800">Nama Lengkap</h1>
                        <p className="text-sm text-gray-600 ">{data.state}</p>
                    </div>
                </section>
            </LayoutChild>
            <LayoutChild className='flex-col gap-4 h-[750px]'>
                <span className='inline text-left'>
                    <h3 className='text-lg font-bold'>Penembak Yang Diuji :</h3>
                </span>
                <CardPenembakAdmin penembak="Testing 1" klub="Asal Klub 1" stage={'Stage #2'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                <CardPenembakAdmin penembak="Testing 2" klub="Asal Klub 2" stage={'Gagal'} pengprov={'Pengprov 1'} penguji={'Penguji 1'} />
                <CardPenembakAdmin penembak="Testing 3" klub="Asal Klub 3" stage={'Stage #3'} pengprov={'Pengprov 1'} penguji={'Penguji 2'} />
            </LayoutChild>
        </Layout>
    )
}

export default DetailPenguji