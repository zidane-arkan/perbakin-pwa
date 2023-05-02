import React from 'react'

type Props = {
    title? : string
    children?: string | JSX.Element | React.ReactNode
    className?: string
}
export const Card = (props: Props) => {
    const customClass = `${props.className} flex max-w-full`;
    return (
        <section className={customClass}>
            {props.children}
        </section>
    )
}

export const CardText = (props: Props) => {
    const customClass = `${props.className} flex flex-col gap-2 w-[345px] items-start`;
    return (
        <section className={customClass}>
            <h4>{props.title}</h4>
            {props.children}
        </section>
    )
}