import React from 'react'

type Props = {
    children?: string | JSX.Element | React.ReactNode
    className?: string
}
const Card = (props: Props) => {
    return (
        <section className='flex flex-col max-w-full gap-4 px-8'>
            {props.children}
        </section>
    )
}

export default Card