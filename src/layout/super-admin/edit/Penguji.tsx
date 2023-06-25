import React, { useState, useEffect, useContext } from 'react'
import { HeaderWhiteEdit } from '../../../components/Header'
import { LayoutAdmin, LayoutChild } from '../../../components/Layout'
import { AuthContext } from '../../../context/AuthContext';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { HandlerResponse, ResponseData } from '../../../context/response';
import api from '../../../api/api';
import { AxiosError } from 'axios'

interface PostPengujilements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    name: HTMLInputElement;
    password: HTMLInputElement;
}

const Penguji = () => {
    const scorerCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [formState, setFormState] = useState<[boolean, string]>([false, '']);
    const [response, setResponse] = useState<HandlerResponse>({ message: '', error: false });
    const [showError, setShowError] = useState<boolean>(true);

    const data = useLocation();
    const { id: scorerId } = useParams();

    const handleClose = () => {
        setShowError(false);
    };

    const getExamId = async (): Promise<string | null> => {
        try {
            const response = await api.get("/super/exam");
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
    const updateScorerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponse({ message: "", error: false })
        setFormState([true, "Loading..."])

        const elements = e.currentTarget.elements as PostPengujilements;
        const examId = await getExamId();

        const query =
            scorerCtx &&
            scorerCtx.updateScorer({
                examId: examId,
                scorer_id : scorerId,
                username: elements.username.value,
                name: elements.name.value,
                password: elements.password.value,
            });

        query
            ?.then((res) => {
                console.log(res);
                setResponse(res);
                setFormState([false, ""]);
                if (!res.error) {
                    navigate(-1);
                }
            })
            .catch((err) => {
                setResponse(err);
                setFormState([false, ""]);
            });
    }
    return (
        <LayoutAdmin className={'rounded-3xl mt-[8rem] pt-[0]'}>
            <HeaderWhiteEdit title='Edit Penguji' typeIcon='returnblack' />
            <LayoutChild className='justify-between'>
                <form onSubmit={updateScorerHandler} className='flex flex-col w-full h-auto justify-between gap-8'>

                    <section>
                        <div className="mb-6">
                            <label htmlFor="username" className="block mb-2 text-sm font-bold text-gray-900">Username</label>
                            <input name='username' type="text" id="username" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Username baru Anda" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-900">Nama Anda</label>
                            <input name='name' type="text" id="name" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900">Password Baru</label>
                            <input
                                name='password'
                                type="password"
                                id="password"
                                className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            />
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
                        <button type="submit" className="text-white rounded-lg text-base font-bold w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Simpan</button>
                    </div>
                </form>
            </LayoutChild>
        </LayoutAdmin>
    )
}

export default Penguji;