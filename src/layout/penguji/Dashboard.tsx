import React, { useEffect, useState } from 'react'
import avatar from '../../app-assets/avatar.png';
import { Penembak } from '../pages/Penembak'
import { Layout } from '../../components/Layout';
import { BgHeader } from '../../components/Header';
import { ResponseData } from '../../context/response';
import api from '../../api/api';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom'

const Dashboard = () => {


    return (
        <>
            <BgHeader>
                <div className='flex items-start justify-between w-full'>
                    <section className='flex flex-col items-start'>
                        <h2>Halo, Penguji</h2>
                        <h5>Nama Penguji 1</h5>
                    </section>
                    <section>
                        <Link to={'penguji/editprofile'}>
                            <img src={avatar} />
                        </Link>
                    </section>
                </div>
            </BgHeader>

            <Penembak classname='mt-36 pt-[10%]' />

        </>
    )
}

export default Dashboard