import React from 'react'
import { BgHeaderProfile } from '../../../components/Header'
import { LayoutAdmin,LayoutChild } from '../../../components/Layout'
import avatar from '../../../app-assets/avatar.png'
const Penembak = () => {
    return (
        <LayoutAdmin className={'rounded-3xl mt-[19rem] pt-[10%]'}>
            <BgHeaderProfile title='Tambah Penembak'>
                <div className='flex items-center justify-between w-full'>
                    <section className='flex flex-col items-start'>
                        <h2>Halo, Admin</h2>
                    </section>
                    <section>
                        <button>
                            <img src={avatar} />
                        </button>
                    </section>
                </div>
            </BgHeaderProfile>
            <LayoutChild>
                <div>1</div>
            </LayoutChild>
        </LayoutAdmin>
    )
}

export default Penembak