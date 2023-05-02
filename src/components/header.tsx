import React from 'react'
import avatar from '../app-assets/avatar.png';
import target from '../app-assets/target.png';

type customHeader = {
  isUseBg: boolean;
};
export const BgHeader: React.FC = () => {
  return (
    <header className='absolute w-full top-0 flex max-w-full px-10 pt-10 pb-20 bg-blue-600 z-[-1]'>
      <span
        style={{ backgroundImage: `url(${target})` }}
        className='absolute left-0'
      ></span>
      <section>
        <h2>Halo, Penguji</h2>
        <span>Nama Penguji 1</span>
      </section>
      <section>
        <button>
          <img src={avatar} />
        </button>
      </section>
    </header>
  )
}