import React from 'react'

type Props = {
    children?: string | JSX.Element | React.ReactNode
    className?: string
}
const Card = (props: Props) => {
    const customClass = `${props.className} flex flex-col max-w-full gap-4 px-8`;
    return (
        <section className={customClass}>
            {props.children}
        </section>
    )
}

export default Card