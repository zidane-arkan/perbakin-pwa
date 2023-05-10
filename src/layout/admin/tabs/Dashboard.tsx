import React from 'react'
import { Layout, LayoutChild } from '../../../components/Layout'
import { BgHeader } from '../../../components/Header'
import { Outlet } from 'react-router-dom'
const Dashboard = (props: any) => {
    return (
        <Layout className={'rounded-3xl mt-36 pt-[10%]'}>
            <BgHeader>
                <div className='flex items-start justify-between w-full'>
                    <section className='flex flex-col items-start'>
                        <h2>Halo, Admin</h2>
                        <h3>s</h3>
                    </section>
                </div>
            </BgHeader>
            <Outlet />
        </Layout>
    )
}

export default Dashboard