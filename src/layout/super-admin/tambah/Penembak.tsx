import React, { useState, useContext, useEffect } from 'react'
import { BgHeaderProfile } from '../../../components/Header'
import { LayoutAdmin, LayoutChild } from '../../../components/Layout'
import avatar from '../../../app-assets/avatar.png'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { CreateShooterResponse, HandlerResponse } from '../../../context/response'
import api from '../../../api/api'
import { ResponseData, GetExamsResponse } from '../../../context/response'
import { AxiosError } from 'axios'

interface CreateShooterElements extends HTMLFormControlsCollection {
    fullname: HTMLInputElement;
    province: HTMLInputElement;
    club: HTMLInputElement;
}


const Penembak = () => {
    const penembakCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [formState, setFormState] = useState<[boolean, string]>([false, '']);
    const [response, setResponse] = useState<HandlerResponse>({ message: '', error: false });
    const [showError, setShowError] = useState<boolean>(true);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [pengujiList, setPengujiList] = useState<any[]>([]);
    const [selectedPengujiId, setSelectedPengujiId] = useState("");

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

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
            if (penembakCtx?.getExamId) {
                const examId = await penembakCtx.getExamId(null);
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

    const getPengujiList = async () => {
        try {
            const examId = await getExamId();
            const response = await api.get(`super/exam/${examId}/scorer`);
            const scorers = response.data.data.scorers;
            if (scorers.length > 0) {
                const formattedScorers = scorers.map((scorer: any) => ({
                    id: scorer.id,
                    name: scorer.name,
                }));
                setPengujiList(formattedScorers);
            }
        } catch (error) {
            const err = error as AxiosError<ResponseData<null>>;
            console.error("Error:", err);
        }
    };

    useEffect(() => {
        getPengujiList();
    }, []);

    // const getPengujiId = async (): Promise<string | null> => {
    //     try {
    //         const examId = await getExamId();
    //         const response = await api.get(`/super/exam/${examId}/scorer`);
    //         const scorers = response.data.data.scorers;
    //         if (scorers.length > 0) {
    //             const latestScorer = scorers[scorers.length - 1];
    //             const latestScorerId = latestScorer.id;
    //             console.log(latestScorerId);
    //             return latestScorerId;
    //         } else {
    //             return null;
    //         }
    //     } catch (error) {
    //         const err = error as AxiosError<ResponseData<null>>;
    //         console.error("Error:", err);

    //         return null;
    //     }
    // };
    const createShooterHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponse({ message: "", error: false })
        setFormState([true, "Loading..."])

        const elements = e.currentTarget.elements as CreateShooterElements;
        const examId = await getExamId();
        // const pengujiId = await getPengujiId();

        const query =
            penembakCtx &&
            penembakCtx.createShooter({
                examId: examId,
                scorer_id: selectedPengujiId,
                name: elements.fullname.value,
                province: elements.province.value,
                club: elements.club.value,
                image_path: selectedImage,
            });

        query
            ?.then((res) => {
                console.log(res);
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
        <LayoutAdmin className={'rounded-3xl mt-[19rem] pt-[10%]'}>
            <BgHeaderProfile title='Tambah Penembak'>
                {previewImage ?
                    (
                        <div className="mb-0">
                            <img src={previewImage} alt="Preview" className="rounded-full w-[150px] h-[150px] sm:w-[170px] sm:h-[170px]" />
                        </div>
                    )
                    :
                    (
                        <button className='rounded-full bg-white w-[120px] h-[120px] sm:h-[170px] sm:w-[170px]'></button>
                    )
                }

            </BgHeaderProfile>
            <LayoutChild className='justify-between'>
                <form onSubmit={createShooterHandler} className='flex flex-col w-full h-auto justify-between gap-8'>
                    <section>
                        <div className="mb-6">
                            <label htmlFor="image" className="block mb-2 text-sm font-bold text-gray-900">Upload Gambar</label>
                            <input
                                name="image"
                                type="file"
                                id="image"
                                accept="image/*"
                                className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="penguji" className="block mb-2 text-sm font-bold text-gray-900">Pilih Penguji</label>
                            <select
                                id="penguji"
                                name="penguji"
                                className='w-full flex p-2 rounded-lg bg-gray-50 border-2 border-gray-300'
                                value={selectedPengujiId}
                                onChange={(e) => setSelectedPengujiId(e.target.value)}
                                required
                            >
                                <option disabled={true} value="">Pilih Penguji</option>
                                {pengujiList.map((penguji) => (
                                    <option className='capitalize' key={penguji.id} value={penguji.id}>
                                        {penguji.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="fullname" className="block mb-2 text-sm font-bold text-gray-900">Nama Lengkap</label>
                            <input name='fullname' type="text" id="fullname" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nama Lengkap Anda" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="province" className="block mb-2 text-sm font-bold text-gray-900">Pengprov</label>
                            <input name='province' type="text" id="province" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-0">
                            <label htmlFor="club" className="block mb-2 text-sm font-bold text-gray-900">Klub</label>
                            <input
                                name='club'
                                type="text"
                                id="club"
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
                        <button type="submit" className="text-white rounded-lg text-base font-bold w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Selanjutnya</button>
                    </div>
                </form>
            </LayoutChild>
        </LayoutAdmin>
    )
}

export default Penembak