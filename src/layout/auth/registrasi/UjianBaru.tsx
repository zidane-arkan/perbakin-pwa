import React, { useContext, useState } from 'react'
import { Layout, LayoutChild } from '../../../components/Layout'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { HandlerResponse } from "../../../context/response";
import { Link } from 'react-router-dom'
import calenderExtraSmall from '../../../app-assets/calender_extrasmall.png';

interface CreateExamElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    location: HTMLInputElement;
    organizer: HTMLInputElement;
    begin: HTMLInputElement;
    finish: HTMLInputElement;
}

const UjianBaru = () => {
    const examContext = useContext(AuthContext)
    const navigate = useNavigate();
    const [formState, setFormState] = useState<[boolean, string]>([false, ""]); //buttonDisabled, stateMessage
    const [response, setResponse] = useState<HandlerResponse>({ message: "", error: false }); //responseMessage, isError
    const [showError, setShowError] = useState(true);

    const handleClose = () => {
        setShowError(false);
    };

    const createExamHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponse({ message: "", error: false })
        setFormState([true, "Loading..."])

        const elements = e.currentTarget.elements as CreateExamElements;

        const query =
            examContext &&
            examContext.createExam({
                name: elements.name.value,
                location: elements.location.value,
                organizer: elements.organizer.value,
                begin: elements.begin.value,
                finish: elements.finish.value,
            });

        query
            ?.then((res) => {
                setResponse(res);
                setFormState([false, ""]);
                if (!res.error) {
                    navigate("/superadmin/adminregis");
                }
            })
            .catch((err) => {
                setResponse(err);
                setFormState([false, ""]);
            });
    }
    return (
        <Layout className={'rounded-3xl mt-20 mb-[5%]'}>
            <LayoutChild className='flex-col'>
                <div className='max-w-full text-center text-[#036BB0]'>
                    <h1 className='pb-2 text-4xl font-extrabold'>Ujian Baru</h1>
                    <h4 className='text-base text-[#6A7682] font-normal'>Silahkan melakukan pengisian data untuk memulai ujian baru.</h4>
                </div>
                <form className='flex flex-col w-full h-auto justify-between gap-8 pt-14' onSubmit={createExamHandler}>
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
                                        className="text-red-700 hover:text-red-900"
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
                        <button type="submit" className="text-white rounded-lg text-base font-bold w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Selanjutnya</button>
                    </div>
                </form>
            </LayoutChild>
        </Layout>
    )
}

export default UjianBaru