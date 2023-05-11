import React from 'react'
import { LayoutAdmin, LayoutChild } from '../../../components/Layout'
import avatar from '../../../app-assets/avatar.png';
import targetWhite from '../../../app-assets/targetwhite.png'
import mapPin from '../../../app-assets/map_pin.png'
import clock from '../../../app-assets/clock.png'
import peluruBulat from '../../../app-assets/pelurubulat.png';
import tambahPenguji from '../../../app-assets/tambahpenguji.png'
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
                <section className='relative shadow-md overflow-hidden flex bg-[#F3FAFF] flex-col gap-4 items-start rounded-xl px-4 py-4'>
                    <div className='flex gap-2 items-start'>
                        <img className='pt-[2px]' src={mapPin} />
                        <div className='flex flex-col items-start'>
                            <h3 className='font-bold'>Lokasi</h3>
                            <p>Sumatera Selatan</p>
                        </div>
                    </div>
                    <div className='flex gap-2 items-start'>
                        <img className='pt-[2px]' src={clock} />
                        <div>
                            <h3 className='font-bold'>Waktu</h3>
                            <p>24 - 25 Mei 2023</p>
                        </div>
                    </div>
                    <span className='absolute top-[-3rem] right-[-4rem]'>
                        <img src={targetWhite} />
                    </span>
                </section>
                <section className='flex items-center gap-6'>
                    <Link className='flex pl-1 bg-white shadow-md pr-16 py-2 rounded-full' to='tambahpenembak'>
                        <div className='flex gap-2 items-center'>
                            <img src={peluruBulat} />
                            <span className='font-xl'>Tambah Penembak</span>
                        </div>
                    </Link>
                    <Link className='flex pl-1 bg-white shadow-md pr-16 py-2 rounded-full' to='tambahpenguji'>
                        <div className='flex gap-2 items-center'>
                            <img src={tambahPenguji} />
                            <span className='font-xl'>Tambah Penguji</span>
                        </div>
                    </Link>
                </section>
                <section>
                    <div className='flex w-full justify-between items-center'>
                        <h2 className='font-bold'>Hasil Ujian</h2>
                        <Link to='hasilujian'>
                            <span className='text-[#1B79B8]' >Lihat Selengkapnya</span>
                        </Link>
                    </div>
                    <div></div>
                </section>
            </LayoutChild>
        </>
    )
}

export default Admin