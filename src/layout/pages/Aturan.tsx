import React from 'react'
import { HeaderBlue } from '../../components/Header';
import { Layout, LayoutChild } from '../../components/Layout'
import { Card, CardText } from '../../components/ui/Card'
import jarak from '../../app-assets/jarak.png';
const Aturan = (props: any) => {
    return (
        <Layout className={'rounded-3xl mt-28 pt-[10%]'}>
            <HeaderBlue>
                <div className='flex flex-row justify-between w-full '>
                    <button type='button'>{'<'}</button>
                    <h2>{props.title}</h2>
                    <span></span>
                </div>
            </HeaderBlue>
            <LayoutChild>
                <section className='flex justify-between w-full gap-4'>
                    <Card className='w-[160px] pr-4 pl-6 py-2 gap-4 rounded-xl items-start shadow-custom  bg-[#F3FAFF]'>
                        <img className='mt-1 w-[20px] h-[20px]' src={jarak} />
                        <div>
                            <h6>Jarak</h6>
                            <p>20 Meter</p>
                        </div>
                    </Card>
                    <Card className='w-[160px] pr-4 pl-6 py-2 gap-4 rounded-xl items-start shadow-custom  bg-[#F3FAFF]'>
                        <img className='mt-1 w-[20px] h-[20px]' src={jarak} />
                        <div>
                            <h6>Jarak</h6>
                            <p>20 Meter</p>
                        </div>
                    </Card>
                </section>
                <section className='flex justify-between w-full gap-4'>
                    <Card className='w-[160px] pr-4 pl-6 py-2 gap-4 rounded-xl items-start shadow-custom  bg-[#F3FAFF]'>
                        <img className='mt-1 w-[20px] h-[20px]' src={jarak} />
                        <div>
                            <h6>Jarak</h6>
                            <p>20 Meter</p>
                        </div>
                    </Card>
                    <Card className='w-[160px] pr-4 pl-6 py-2 gap-4 rounded-xl items-start shadow-custom  bg-[#F3FAFF]'>
                        <img className='mt-1 w-[20px] h-[20px]' src={jarak} />
                        <div>
                            <h6>Jarak</h6>
                            <p>20 Meter</p>
                        </div>
                    </Card>
                </section>
                <CardText title='Ketentuan Umum'>
                    <p>Berdiri tegak menghadap sasaran, senjata dan magasin berada dalam holster atau diletakkan diatas meja</p>
                </CardText>
                <CardText title='Prosedur'>
                    <ol className='flex flex-col gap-2 pl-4 text-black list-decimal'>
                        <li>Penguji berhak untuk menghentikan peserta dari ujian apabila menganggap perlengkapan peserta tidak memenuhi prosedur keamanan.</li>
                        <li>Minimal 50% tembakan pada setiap sasaran (target) mengenai bidang “A” dan tidak ada tembakan yang tidak mengenai sasaran (miss).</li>
                        <li>Peserta boleh menembak lebih pada sasaran penilaian apabila jumlah tembakan pada bidang “A” kurang dari yang ditentukan diatas dan selama waktu yang diberikan masih mencukupi. </li>
                        <li>Peserta boleh menembak lebih pada sasaran penilaian apabila jumlah tembakan pada bidang “A” kurang dari yang ditentukan diatas dan selama waktu yang diberikan masih mencukupi. </li>
                        <li>Jari harus berada di luar pengaman picu pada saat melakukan pergerakkan (perpindahan posisi)/mengganti magasin atau memperbaiki senjata dan arah laras senjata harus selalu mengarah ke downrange. </li>
                    </ol>
                </CardText>
                <CardText>
                    <button className='w-full px-4 py-4 text-white bg-[#036BB0] rounded-lg' type='button'>Mulai Pengujian</button>
                </CardText>
            </LayoutChild>
        </Layout>
    )
}

export default Aturan