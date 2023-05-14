import React from 'react'
import imgDetail1 from '../../app-assets/userdetail.png';
import close from '../../app-assets/close.png';
import Modal from './Modal';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutChild } from '../Layout';

export const Detail = (props: any) => {
    return (
        <Modal shownCardHandler={props.shownCardHandler}>
            <section className='flex flex-col w-full h-auto'>
                <div className='flex relative w-full h-[198px]'>
                    <img src={imgDetail1} className='w-full h-full rounded-xl z-[-1]' />
                    <button onClick={props.shownCardHandler} className='absolute z-10 top-4 right-4'>
                        <img src={close} />
                    </button>
                </div>
                <LayoutChild className='flex-col w-full gap-6 py-8'>
                    <h2>{props.penembak}</h2>
                    <div className='flex flex-col w-full gap-4'>
                        <span className='flex justify-between w-full'>
                            <h6>PengProv</h6>
                            <h4>: {props.pengprov}</h4>
                        </span>
                        <span className='flex justify-between w-full'>
                            <h6>Asal Klub</h6>
                            <h4>: {props.klub}</h4>
                        </span>
                        <span className='flex justify-between w-full'>
                            <h6>Penguji</h6>
                            <h4>: {props.penguji}</h4>
                        </span>
                    </div>
                    <div className='flex w-full items-start flex-col gap-6'>
                        <span className='max-w-full px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-[#62DE5F] rounded'>
                            {props.stage}
                        </span>
                        <Link to={'kualifikasi_ketentuan'} className='w-full items-center text-center px-4 py-3 text-white bg-[#036BB0] rounded-lg' >Mulai Ujian</Link>
                    </div>
                </LayoutChild>
            </section>
        </Modal>
    )
}

export const DetailAdmin = (props: any) => {
    const navigate = useNavigate();
    return (
        <Modal shownCardHandler={props.shownCardHandler}>
            <section className='flex flex-col w-full h-auto'>
                <div className='flex relative w-full h-[198px]'>
                    <img src={imgDetail1} className='w-full h-full rounded-xl z-[-1]' />
                    <button onClick={props.shownCardHandler} className='absolute z-10 top-4 right-4'>
                        <img src={close} />
                    </button>
                </div>
                <LayoutChild className='flex-col w-full gap-6 py-8'>
                    <h2>{props.penembak}</h2>
                    <div className='flex flex-col w-full gap-4'>
                        <span className='flex justify-between w-full'>
                            <h6>PengProv</h6>
                            <h4>: {props.pengprov}</h4>
                        </span>
                        <span className='flex justify-between w-full'>
                            <h6>Asal Klub</h6>
                            <h4>: {props.klub}</h4>
                        </span>
                        <span className='flex justify-between w-full'>
                            <h6>Penguji</h6>
                            <h4>: {props.penguji}</h4>
                        </span>
                    </div>
                    <div className='flex w-full items-start flex-col gap-6'>
                        <span className='max-w-full px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-[#62DE5F] rounded'>
                            {props.stage}
                        </span>
                        <div className='flex w-full items-center gap-4 justify-between'>
                            <button onClick={() => navigate(-1)} className='w-[55%] items-center text-sm text-center font-semibold px-2 py-3 text-[#FC443E] border border-red-500 bg-transparent rounded-lg' >Hapus Penembak</button>
                            <Link to={'/admin/penembak/editpenembak'} className='w-[45%] text-sm items-center text-center px-4 py-3 text-white bg-[#036BB0] rounded-lg' >Edit Profile</Link>
                            {/* <Link to={'editpenembak'} className='w-[45%] text-sm items-center text-center px-4 py-3 text-white bg-[#036BB0] rounded-lg' >Edit Profile</Link> */}
                        </div>
                    </div>
                </LayoutChild>
            </section>
        </Modal>
    )
}