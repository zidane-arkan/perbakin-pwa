import React from 'react'
import { LayoutAdmin, LayoutChild } from '../../components/Layout'
import { BgHeader } from '../../components/Header'
import Tabs from '../../components/ui/Tabs'
import { Outlet } from 'react-router-dom'
import avatar from '../../app-assets/avatar.png'
import { Link } from 'react-router-dom'
const Dashboard = () => {
    return (
        <>
            <LayoutAdmin className={'rounded-3xl mt-36 pt-[10%]'}>
                <BgHeader>
                    <div className='flex items-center justify-between w-full'>
                        <section className='flex flex-col items-start'>
                            <h2>Halo, Admin</h2>
                        </section>
                        <section>
                            <Link to={'admindashboard/editprofile'}>
                                <img src={avatar} />
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