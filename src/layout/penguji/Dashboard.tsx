import React from 'react'
import user1 from '../../app-assets/user1.png';
import avatar from '../../app-assets/avatar.png';
import Penembak from '../pages/Penembak'

const Dashboard = () => {
    return (
        <Penembak>
            <div className='flex items-start justify-between w-full'>
                <section className='flex flex-col items-start'>
                    <h2>Halo, Penguji</h2>
                    <h5>Nama Penguji 1</h5>
                </section>
                <section>
                    <button>
                        <img src={avatar} />
                    </button>
                </section>
            </div>
        </Penembak>
    )
}

export default Dashboard