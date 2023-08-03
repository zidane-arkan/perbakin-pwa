import React, { useState, useContext, useEffect } from 'react'
import { Layout, LayoutChild } from '../../components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { HandlerResponse } from '../../context/response'
import api from '../../api/api'
import { ResponseData, GetExamsResponse } from '../../context/response'
import { AxiosError } from 'axios'

// interface GetExamId extends HTMLFormControlsCollection {
//     username: HTMLInputElement;
//     password: HTMLInputElement;
//     name: HTMLInputElement;
// }
const PilihUjian = () => {
    const superAdminCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [formState, setFormState] = useState<[boolean, string]>([false, '']);
    const [response, setResponse] = useState<HandlerResponse>({ message: '', error: false });
    const [showError, setShowError] = useState<boolean>(true);


    const [examList, setExamList] = useState<any[]>([]);
    const [selectedExamId, setSelectedExamId] = useState("");
    console.log(selectedExamId)

    const handleClose = () => {
        setShowError(false);
    };

    const getExamList = async () => {
        try {
            // const examId = await getExamId();
            const response = await api.get(`/super/exam`);
            const exams = response.data.data.exams;
            console.log(response)
            if (exams.length > 0) {
                const formattedExams = exams.map((exam: any) => ({
                    id: exam.id,
                    name: exam.name,
                }));
                setExamList(formattedExams);
            }
        } catch (error) {
            const err = error as AxiosError<ResponseData<null>>;
            console.error("Error:", err);
        }
    };

    useEffect(() => {
        getExamList();
    }, []);

    const getIdExam = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponse({ message: "", error: false })
        setFormState([true, "Loading..."])

        // const elements = e.currentTarget.elements;
        // const examId = await getExamList();
        // console.log(typeof selectedExamId)
        // console.log(selectedExamId)
        setFormState([false, ""])
        const query =
            superAdminCtx &&
            superAdminCtx.selectExam(selectedExamId);
        query
            ?.then((res) => {
                const response: HandlerResponse = {
                    message: res !== null ? res : "Exam ID is null",
                    error: false,
                };
                setResponse(response);
                setFormState([false, ""]);
                if (!response.error) {
                    navigate("/superadmin/tabs/admindashboard");
                }
            })
            .catch((err) => {
                const errorResponse: HandlerResponse = {
                    message: err.message || "An error occurred",
                    error: true,
                };
                setResponse(errorResponse);
                setFormState([false, ""]);
            });

    }

    return (
        <Layout className={'rounded-3xl mt-20 mb-[5%]'}>
            <LayoutChild className='flex-col'>
                <div className='max-w-full w-full text-center text-[#036BB0]'>
                    <h1 className='pb-2 text-4xl font-extrabold'>Pilih Ujian</h1>
                    <h4 className='text-sm text-[#6A7682] font-normal'>Silahkan melakukan  registrasi sebagai Admin dan memberikan username password kepada Admin.</h4>
                </div>
                <form onSubmit={getIdExam} className='flex flex-col w-full h-auto justify-between gap-8 pt-4 sm:pt-8'>
                    <section>
                        <div className="mb-6">
                            <label htmlFor="exam" className="block mb-2 text-sm font-bold text-gray-900">Pilih Ujian</label>
                            <select
                                id="exam"
                                name="exam"
                                className='w-full flex p-2 rounded-lg bg-gray-50 border-2 border-gray-300'
                                value={selectedExamId}
                                onChange={(e) => setSelectedExamId(e.target.value)}
                                required
                            >
                                <option disabled={true} value="">List Ujian</option>
                                {examList.map((exam) => (
                                    <option className='capitalize' key={exam.id} value={exam.id}>
                                        {exam.name}
                                    </option>
                                ))}
                            </select>
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
                                        className="text-red-700 z-10 pb-8 hover:text-red-900"
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

export default PilihUjian