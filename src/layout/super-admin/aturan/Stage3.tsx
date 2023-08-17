import React from 'react'
import Aturan from '../../pages/Aturan'
import { useParams } from 'react-router-dom';

const Stage3 = () => {
    const { shooterid } = useParams();
    return (
        <Aturan
            title="Stage #3"
            jarak="15"
            waktu="4"
            sasaran="1"
            tembakMaks='12'
            link={`stage3_form/${shooterid}`}
            posisiAwal='Berdiri rileks menghadap sasaran, kedua tangan disamping.'
        >
            <li>Cabut senjata dan tembak 2 kali, kemudian kunci dan sarungkan.</li>
            <li>Lakukan sebanyak 6 kali.</li>
            <li>Tembakan yang tidak mengenai sasaran (MISS) berarti gagal dalam seri tersebut.</li>
            <li>Pelanggaran keamanan/safety akan <b>didiskualifikasi</b> dan dinyatakan <b>TIDAK LULUS</b> dari Ujian Sertifikasi dan tidak dapat mengulang pada ujian kali ini.</li>
        </Aturan>
    )
}

export default Stage3