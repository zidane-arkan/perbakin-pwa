import React, { useState, useEffect } from 'react'
import { LayoutAdmin, LayoutChild } from '../../components/Layout'
import { BgHeader } from '../../components/Header'
import Tabs from '../../components/ui/Tabs'
import { Outlet } from 'react-router-dom'
import perbakinLogo from '../../app-assets/perbakin-logo.png'
import { Link } from 'react-router-dom'
import { AxiosError } from 'axios'
import api from '../../api/api'
import { ResponseData } from '../../context/response'

type Admin = {
    id: string;
    exam_id: string;
    user_id: string;
    username: string;
    name: string;
    created_at: string;
}

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState<Admin>();

    useEffect(() => {
        const fetchInitialAdmin = async () => {
            try {
                const response = await api.get(`/admin`);
                const admin = response.data.data.admin;
                setAdmin(admin);
            } catch (error) {
                const err = error as AxiosError<ResponseData<null>>;
                console.error("Error:", err);
            }
            setLoading(false);
        };

        fetchInitialAdmin();
    }, []);
    return (
        <>
            <LayoutAdmin className={'rounded-3xl mt-36 pt-[10%]'}>
                <BgHeader>
                    <div className='flex items-center justify-between w-full'>
                        <section className='flex flex-col items-start'>
                            <h2>Halo,
                                {loading ? 'Loading...' : `${admin?.name}`}
                            </h2>
                        </section>
                        <section>
                            <Link to={'admindashboard/editprofile'}>
                                <img className='w-[45px] sm:w-[60px]' src={perbakinLogo}  / >
                            </Link>
                        </section>
                    </div>
                </BgHeader>
                <Outlet />
                <Tabs />
            </LayoutAdmin>
        </>
    )
}

export default Dashboard