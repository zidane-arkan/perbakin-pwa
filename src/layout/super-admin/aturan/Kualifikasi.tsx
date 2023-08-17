import React from 'react'
import Aturan from '../../pages/Aturan'
import { useParams } from 'react-router-dom';

const Kualifikasi = () => {
    const { shooterid } = useParams();

    console.log(shooterid); // Output: nilai ID dari URL
    return (
        <Aturan
            title="Ujian Kualifikasi 20 Meter"
            jarak="8"
            waktu="3"
            sasaran="1"
            tembakMaks='5'
            link={`kualifikasi_form/${shooterid}`}
            posisiAwal='Berdiri tegak menghadap sasaran, senjata dan magasin berada dalam holster atau diletakkan diatas meja'
        >
            <li>Penguji berhak untuk menghentikan peserta dari ujian apabila menganggap perlengkapan peserta tidak memenuhi prosedur keamanan.</li>
            <li>Minimal 50% tembakan pada setiap sasaran (target) mengenai bidang “A” dan tidak ada tembakan yang tidak mengenai sasaran (miss).</li>
            <li>Peserta boleh menembak lebih pada sasaran penilaian apabila jumlah tembakan pada bidang “A” kurang dari yang ditentukan diatas dan selama waktu yang diberikan masih mencukupi. </li>
            <li>Peserta boleh menembak lebih pada sasaran penilaian apabila jumlah tembakan pada bidang “A” kurang dari yang ditentukan diatas dan selama waktu yang diberikan masih mencukupi. </li>
            <li>Jari harus berada di luar pengaman picu pada saat melakukan pergerakkan (perpindahan posisi)/mengganti magasin atau memperbaiki senjata dan arah laras senjata harus selalu mengarah ke downrange. </li>
        </Aturan>
    )
}

export default Kualifikasi