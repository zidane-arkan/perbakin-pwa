import React from 'react'
import TandaTangan from './TandaTangan'
import user1 from '../../app-assets/userbig1.png';
import { LayoutChild } from '../../components/Layout';
const SelesaiPengujian = (props: any) => {
    return (
        <TandaTangan title='Selesai Pengujian' link={'/penguji/'}>
            <LayoutChild>
                <section className='w-full flex flex-row items-center justify-between gap-4'>
                    <div className='flex flex-col gap-2'>
                        <span>
                            <h4>Nama Lengkap</h4>
                            {/* <h5>{props.penembak}</h5> */}
                            <h5>Abdiansyah CS</h5>
                        </span>
                        <span>
                            <h4>PengProv</h4>
                            {/* <h5>{props.pengprov}</h5> */}
                            <h5>Sumatera Selatan</h5>
                        </span>
                        <span>
                            <h4>Klub Menembak</h4>
                            {/* <h5>{props.klub}</h5> */}
                            <h5>PSS</h5>
                        </span>
                    </div>
                    <div>
                        <img className='w-full h-auto' src={user1} alt='user profile' />
                    </div>
                </section>
            </LayoutChild>
        </TandaTangan>
    )
}

export default SelesaiPengujian
