import React from 'react'
import { Layout, LayoutChild } from '../../components/Layout'
import { CardPenguji } from '../../components/ui/Card'

type Props = {
    classname?: string | any;
    statusAuth?: boolean;
}

type Scorer = {
    name: string;
    id: string;
}
interface PengujiAdminProps {
    scorers: string[];
}

const Penguji: React.FC<PengujiAdminProps> = (props: any) => {
    const classname = `${props.classname} rounded-3xl`;
    return (
        <>
            <Layout className={classname}>
                <LayoutChild className='flex-col pb-[10rem] gap-4'>
                    <span className='inline text-left'>
                        <h3 className='text-lg font-bold'>List Penguji</h3>
                    </span>
                    {/* <CardPenguji penguji={'Penguji 1'} />
                    <CardPenguji penguji={'Penguji 2'} /> */}
                    {props.scorers.map((scorer: Scorer, index: string) => (
                        <CardPenguji
                            key={index}
                            id={scorer.id}
                            penguji={scorer.name}
                        />
                    ))}
                    {/* {props.userPenguji?.map((penguji: any) => {
                        return (
                            <CardPenguji key={penguji.id} id={penguji.id} penguji={penguji.penguji} />
                        )
                    })} */}
                </LayoutChild>
            </Layout>
        </>
    )
}

const PengujiAdmin: React.FC<PengujiAdminProps> = (props: any) => {
    const classname = `${props.classname} rounded-3xl`;
    return (
        <>
            <Layout className={classname}>
                <LayoutChild className='flex-col pb-[10rem] gap-4'>
                    <span className='inline text-left'>
                        <h3 className='text-lg font-bold'>List Penguji</h3>
                    </span>
                    {/* <CardPenguji penguji={'Penguji 1'} />
                    <CardPenguji penguji={'Penguji 2'} /> */}
                    {props.scorers.map((scorer: Scorer, index: string) => (
                        <CardPenguji
                            key={index}
                            id={scorer.id}
                            penguji={scorer.name}
                        />
                    ))}
                    {/* {props.userPenguji?.map((penguji: any) => {
                        return (
                            <CardPenguji key={penguji.id} id={penguji.id} penguji={penguji.penguji} />
                        )
                    })} */}
                </LayoutChild>
            </Layout>
        </>
    )
}

export default Penguji