import React from 'react'
import avatar from '../app-assets/avatar.png';
import target from '../app-assets/target.png';

type customHeader = {
  isUseBg: boolean;
};
export const BgHeader: React.FC = () => {
  return (
    <header className='absolute w-full top-0 flex text-white max-w-full px-10 pt-10 pb-20 bg-[#036BB0] z-[-1]'>
      <span
        style={{ backgroundImage: `url(${target})` }}
        className='absolute left-0'
      ></span>
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
    </header>
  )
}