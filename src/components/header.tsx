import React from 'react'
import target from '../app-assets/target.png';

type Props = {
  children?: string | JSX.Element | React.ReactNode
  className?: string
}
type customHeader = {
  isUseBg: boolean;
};
export const BgHeader = (props: Props) => {
  return (
    <header className='absolute w-full top-0 flex text-white max-w-full px-10 pt-14 pb-20 bg-[#036BB0] z-[-1]'>
      <span
        style={{ backgroundImage: `url(${target})` }}
        className='absolute left-0'
      ></span>
      {props.children}
    </header>
  )
}

export const HeaderBlue = (props: Props) => {
  return (
    <header className='absolute w-full top-0 flex text-white max-w-full px-10 pt-14 pb-20 bg-[#036BB0] z-[-1]'>
      {props.children}
    </header>
  )
}