import React, { useState, useContext } from 'react'
import { Layout, LayoutChild } from '../../../components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { HandlerResponse } from '../../../context/response'
import api from '../../../api/api'
import { ResponseData, GetExamsResponse } from '../../../context/response'
import { AxiosError } from 'axios'

interface CreateAdminElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
    name: HTMLInputElement;
}
const Admin = () => {
    const adminCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [formState, setFormState] = useState<[boolean, string]>([false, '']);
    const [response, setResponse] = useState<HandlerResponse>({ message: '', error: false });
    const [showError, setShowError] = useState<boolean>(true);

    const handleClose = () => {
        setShowError(false);
    };

    const getExamId = async (): Promise<string | null> => {
        try {
            const response = await api.get("/super/exam");
            console.log(response);
            const exams = response.data.data.exams;
            if (exams.length > 0) {
                const lastExam = exams[exams.length - 1]; 
                const lastExamId = lastExam.id; 

                return lastExamId;
            } else {
                return null; 
            }
        } catch (error) {
            const err = error as AxiosError<ResponseData<null>>;
            console.error("Error:", err);

            return null;
        }
    };

    const createAdminHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponse({ message: "", error: false })
        setFormState([true, "Loading..."])

        const elements = e.currentTarget.elements as CreateAdminElements;
        const examId = await getExamId();
        console.log(examId)
        const query =
            adminCtx &&
            adminCtx.createAdmin({
                examId: examId,
                name: elements.name.value,
                username: elements.username.value,
                password: elements.password.value
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
        <Layout className={'rounded-3xl mt-20 mb-[5%]'}>
            <LayoutChild className='flex-col'>
                <div className='max-w-full w-full text-center text-[#036BB0]'>
                    <h1 className='pb-2 text-4xl font-extrabold'>Admin</h1>
                    <h4 className='text-sm text-[#6A7682] font-normal'>Silahkan melakukan  registrasi sebagai Admin dan memberikan username password kepada Admin.</h4>
                </div>
                <form onSubmit={createAdminHandler} className='flex flex-col w-full h-auto justify-between gap-8 pt-14'>
                    <section>
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-900">Nama Lengkap</label>
                            <input name='name' type="text" id="name" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nama Lengkap Anda" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="username" className="block mb-2 text-sm font-bold text-gray-900">Username</label>
                            <input name='username' type="text" id="username" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@gmail.com" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900">Password</label>
                            <input
                                name='password'
                                type="password"
                                id="password"
                                className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="confirmpass" className="block mb-2 text-sm font-bold text-gray-900">Konfirmasi Password</label>
                            <input
                                name='confirmpass'
                                type="password"
                                id="confirmpass"
                                className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-blue-500 border border-gray-600 rounded focus:ring-3 focus:outline-none focus:bg-blue-500 focus:ring-blue-600" required />
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-600">Ingat Saya</label>
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
                        <button type="submit" className="text-white rounded-lg text-base font-bold w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Selanjutnya</button>
                    </div>
                </form>
            </LayoutChild>
        </Layout>
    )
}

export default Admin