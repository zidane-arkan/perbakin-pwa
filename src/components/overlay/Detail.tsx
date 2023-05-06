import React from 'react'
import imgDetail1 from '../../app-assets/userdetail.png';
import close from '../../app-assets/close.png';
import { LayoutChild } from '../Layout';
const Detail = (props: any) => {
    return (
        <section className='flex flex-col w-full h-auto'>
            <div className='flex relative w-full h-[198px]'>
                <img src={imgDetail1} className='w-full h-full rounded-xl z-[-1]' />
                <button className='absolute z-10 top-4 right-4'>
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
                <div className='flex flex-col gap-6'>
                    <span className='px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-[#62DE5F] rounded'>
                        {props.stage}
                    </span>
                    <span>
                        <button>Mulai Ujian</button>
                    </span>
               </div>
            </LayoutChild>
        </section>
    )
}

export default Detail