import React from 'react'
import Aturan from '../../pages/Aturan'
const Stage2 = () => {
    return (
        <Aturan
            title="Stage #2"
            jarak="7"
            waktu="6"
            sasaran="1"
            tembakMaks='18'
            link='stage2_form'
            posisiAwal='Berdiri rileks menghadap sasaran, kedua tangan disamping.'
        >
            <li>Cabut senjata dan tembak 6 kali, kemudian kunci dan sarungkan.</li>
            <li>Lakukan sebanyak 3 kali.</li>
            <li>Tembakan yang tidak mengenai sasaran (MISS) berarti gagal dalam seri tersebut.</li>
            <li>Pelanggaran keamanan/safety akan <b>didiskualifikasi</b> dan dinyatakan <b>TIDAK LULUS</b> dari Ujian Sertifikasi dan tidak dapat mengulang pada ujian kali ini.</li>
        </Aturan>
    )
}

export default Stage2