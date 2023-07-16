import React, { useState, useContext } from 'react'
import { Layout, LayoutChild } from '../../../components/Layout'
import { HeaderWhiteCustom } from '../../../components/Header'
import { CardText } from '../../../components/ui/Card'
import { useNavigate } from 'react-router-dom'
import calenderExtraSmall from '../../../app-assets/calender_extrasmall.png';
import { BgHeaderProfile } from '../../../components/Header'
import { AuthContext } from '../../../context/AuthContext'
import { HandlerResponse } from '../../../context/response'
import api from '../../../api/api'
import { ResponseData, GetExamsResponse } from '../../../context/response'
import { AxiosError } from 'axios'
import arrowLeft from '../../../app-assets/arrowleftblack.png';


interface UpdateExamElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    location: HTMLInputElement;
    organizer: HTMLInputElement;
    begin: HTMLInputElement;
    finish: HTMLInputElement;
}

const Ujian = () => {
    const examContext = useContext(AuthContext)
    const navigate = useNavigate();
    const [formState, setFormState] = useState<[boolean, string]>([false, ""]); //buttonDisabled, stateMessage
    const [response, setResponse] = useState<HandlerResponse>({ message: "", error: false }); //responseMessage, isError
    const [showError, setShowError] = useState(true);

    const handleClose = () => {
        setShowError(false);
    };


    const getExamId = async (): Promise<string | null> => {
        try {
            let latestExamId: string | null = null;
            const response = await api.get("/super/exam");
            const exams = response.data.data.exams;
            if (exams.length > 0) {
                const lastExam = exams[exams.length - 1];
                latestExamId = lastExam.id;
            }

            if (examContext?.getExamId) {
                const examId = await examContext.getExamId(null);
                return examId ?? latestExamId;
            } else {
                return latestExamId;
            }
        } catch (error) {
            const err = error as AxiosError<ResponseData<null>>;
            console.error("Error:", err);

            return null;
        }
    };

    const updateExamHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponse({ message: "", error: false })
        setFormState([true, "Loading..."])

        const elements = e.currentTarget.elements as UpdateExamElements;
        const examId = await getExamId();
        const query =
            examContext &&
            examContext.updateExam({
                examId: examId,
                Name: elements.name.value,
                Location: elements.location.value,
                Organizer: elements.organizer.value,
                Begin: elements.begin.value,
                Finish: elements.finish.value,
            });

        query
            ?.then((res) => {
                setResponse(res);
                setFormState([false, ""]);
                if (!res.error) {
                    navigate("/superadmin/tabs/admindashboard");
                }
            })
            .catch((err) => {
                setResponse(err);
                setFormState([false, ""]);
            });
    }
    return (
        <Layout className={'rounded-3xl gap-8 mt-28 pt-[2%] overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='returnblack' title='Edit Tentang ujian' />
            <LayoutChild className='flex-col gap-4 h-[750px] justify-between'>
                <form className='flex flex-col w-full h-auto justify-between gap-8 pt-14' onSubmit={updateExamHandler}>
                    <section>
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-900">Nama</label>
                            <input name='name' type="text" id="name" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="location" className="block mb-2 text-sm font-bold text-gray-900">Lokasi</label>
                            <input name='location' type="text" id="location" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="organizer" className="block mb-2 text-sm font-bold text-gray-900">Organizer</label>
                            <input name='organizer' type="text" id="organizer" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="flex gap-2 flex-col mb-4">
                            <div className='flex w-full justify-between'>
                                <label htmlFor="begin" className="block text-sm font-bold text-gray-900">Waktu</label>
                                <img className='w-[23px] h-[24px]' src={calenderExtraSmall} alt='Calender-Small' />
                            </div>
                            <div className='flex w-full justify-between items-center gap-2'>
                                <input type="date" id="begin" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                <span className='w-[12px] border border-black/30 rounded-full'></span>
                                <input type="date" id="finish" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                            </div>
                        </div>

                    </section>
                    {showError &&
                        response.message && (
                            <div className="fixed inset-0 flex items-center justify-center">
                                <div className="fixed z-0 inset-0 bg-gray-900 opacity-75"></div>
                                <div
                                    className={
                                        response.error
                                            ? "bg-red-50 z-10 border-2 border-red-300 text-red-700 text-sm rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500 p-2.5"
                                            : "bg-gray-50 z-10 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                    }
                                >
                                    {response.message}
                                    <button
                                        className="text-red-700 z-10 hover:text-red-900"
                                        onClick={handleClose}
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    <div className='flex flex-col gap-4'>
                        {formState[1] && (
                            <div className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                {formState[1]}
                            </div>
                        )}
                        <CardText>
                            <button className='capitalize w-full px-4 py-4 text-white text-center bg-[#036BB0] rounded-lg' type='submit'>
                                submit
                            </button>
                        </CardText>
                    </div>
                </form>
               
            </LayoutChild>
        </Layout>
    )
}

export default Ujian