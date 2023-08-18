import React from 'react'
import Aturan from '../../pages/Aturan'
import { useParams } from 'react-router-dom';

const Stage4 = () => {
    const { shooterid } = useParams();
    return (
        <Aturan
            title="Stage #4"
            jarak="10"
            waktu="15"
            sasaran="2"
            tembakMaks='12'
            link={`stage4_form/${shooterid}`}
            posisiAwal='Berdiri rileks menghadap sasaran, kedua tangan disamping.'
        >
            <li>Cabut senjata dan tembak 2 kali pada sasaran Pertama dengan tangan kuat (strong hand), pindahkan ke tangan lemah (weak hand) dan tembakan dua kali pada
                sasaran berikutnya.</li>
            <li>Lakukan sebanyak 3 kali.</li>
            <li>Tembakan yang tidak mengenai sasaran (MISS) berarti gagal dalam seri tersebut.</li>
            <li>Pelanggaran keamanan/safety akan <b className='text-gray-600'>didiskualifikasi</b> dan dinyatakan <b className='text-gray-600'>TIDAK LULUS</b> dari Ujian Sertifikasi dan tidak dapat mengulang pada ujian kali ini.</li>
        </Aturan>

    )
}

export default Stage4