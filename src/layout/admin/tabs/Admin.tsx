import React from 'react'
import { LayoutAdmin, LayoutChild } from '../../../components/Layout'
import avatar from '../../../app-assets/avatar.png';
import targetWhite from '../../../app-assets/targetwhite.png'
import mapPin from '../../../app-assets/map_pin.png'
import clock from '../../../app-assets/clock.png'
import { Link } from 'react-router-dom';

const Admin = (props: any) => {
    return (
        <>
            <LayoutChild className='flex-col gap-8'>
                <section className='flex items-center w-full justify-between'>
                    <h2 className='font-bold'>Tentang Ujian</h2>
                    <Link to='editujian'>
                        <span className='text-[#1B79B8]' >Edit Ujian</span>
                    </Link>
                </section>
                <section className='relative overflow-hidden flex bg-[#F3FAFF] flex-col gap-4 items-start rounded-xl px-4 py-4'>
                    <div className='flex gap-2 items-start'>
                        <img className='pt-[2px]' src={mapPin} />
                        <span className='flex flex-col items-start'>
                            <h3 className='font-bold'>Lokasi</h3>
                            <p>Sumatera Selatan</p>
                        </span>
                    </div>
                    <div className='flex gap-2 items-start'>
                        <img className='pt-[2px]' src={clock} />
                        <span>
                            <h3 className='font-bold'>Waktu</h3>
                            <p>24 - 25 Mei 2023</p>
                        </span>
                    </div>
                    <span className='absolute top-[-3rem] right-[-4rem]'>
                        <img src={targetWhite} />
                    </span>
                </section>
                <section></section>
                <section>
                    <div></div>
                    <div></div>
                </section>
            </LayoutChild>
        </>
    )
}

export default Admin