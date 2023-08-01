import React, { useEffect, useState } from 'react'
import TandaTangan from '../../pages/TandaTangan'
import { useParams } from 'react-router-dom';
import api from '../../../api/api';


const Stage5 = () => {
    const { shooterid } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    // const [stage5Data, setStage1Data] = useState();
    const [try2Status, setTry2Status] = useState('1');
    const fetchTry1Data = async () => {
        try {
            const response = await api.get(`/scorer/shooter/${shooterid}/result/stage5`);
            const apiData = response.data;
            const stage5Data = apiData.data.stage_5;
            // setStage1Data(stage5Data);
            if (stage5Data.is_try_2) {
                setTry2Status('2');
            } else {
                setTry2Status('1');
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTry1Data(); // Memanggil fungsi fetchTry1Data untuk mengambil data awal saat komponen dipasang
    }, []);

    // useEffect untuk mendeteksi perubahan pada try2Status
    useEffect(() => {
        // Lakukan sesuatu ketika try2Status berubah
        console.log('1 oi')
        // Misalnya, panggil fungsi fetchTry1Data untuk memperbarui data dari server
        fetchTry1Data();
    }, [try2Status]);

    // Jika isLoading masih true, tampilkan pesan pemuatan atau animasi pemuatan
    if (isLoading) {
        return (
            <div id="defaultModal" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-full max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Data Sedang Diambil, Mohon tunggu
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <TandaTangan stage={`stage5/${try2Status}`} title='Stage 6' link={`/penguji/stage6_aturan/${shooterid}`} />
    )
}

export default Stage5