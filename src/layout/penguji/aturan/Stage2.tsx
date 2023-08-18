import React from 'react'
import Aturan from '../../pages/Aturan'
import { useParams } from 'react-router-dom';

const Stage2 = () => {
    const { shooterid } = useParams();
    return (
        <Aturan
            title="Stage #2"
            jarak="7"
            waktu="6"
            sasaran="1"
            tembakMaks='18'
            link={`stage2_form/${shooterid}`}
            posisiAwal='Berdiri rileks menghadap sasaran, kedua tangan disamping.'
        >
            <li>Cabut senjata dan tembak 6 kali, kemudian kunci dan sarungkan.</li>
            <li>Lakukan sebanyak 3 kali.</li>
            <li>Tembakan yang tidak mengenai sasaran (MISS) berarti gagal dalam seri tersebut.</li>
            <li>Pelanggaran keamanan/safety akan <b className='text-gray-600'>didiskualifikasi</b> dan dinyatakan <b className='text-gray-600'>TIDAK LULUS</b> dari Ujian Sertifikasi dan tidak dapat mengulang pada ujian kali ini.</li>
        </Aturan>
    )
}

export default Stage2