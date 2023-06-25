import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, LayoutAdmin, LayoutChild } from '../../../components/Layout'
import { HeaderWhiteCustom } from '../../../components/Header'
import addUser from '../../../app-assets/adduser.png'
import { CardAdmin } from '../../../components/ui/Card'
import api from '../../../api/api'
import { AxiosError } from 'axios'
import { ResponseData } from '../../../context/response'

type Admin = {
    id: string;
    name: string;
    username: string;
}


const SuperAdmin: React.FC = () => {

    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);
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
    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const examId = await getExamId();
                const response = await api.get(`/super/exam/${examId}/admin`);
                console.log(response)
                const admins = response.data.data.admins;
                console.log(admins)
                setAdmins(admins);
            } catch (error) {
                const err = error as AxiosError<ResponseData<null>>;
                console.error("Error:", err);
            }
            setLoading(false);
        };

        fetchAdmins();
    }, []);

    return (
        <Layout className={'rounded-3xl mt-28 pt-[2%] overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='returnblack' title='Kelola Admin' />
            <LayoutChild className='relative flex-col gap-4 h-[750px]'>
                <span className='inline text-left'>
                    <h3 className='text-lg font-bold'>List Admin :</h3>
                </span>
                {/* <CardAdmin penguji='Admin 1' /> */}
                {loading &&
                    <section className='flex w-full px-8'>
                        <div className="relative items-center block w-full p-6 bg-white border border-gray-100 rounded-lg shadow-md">
                            <h5 className="mb-2 text-center text-lg font-bold tracking-tight text-gray-900 opacity-50">Data Anda sedang dimuat</h5>
                            <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </section>

                }
                {!loading &&
                    admins.map((admin: Admin, index: number) => (
                        <CardAdmin
                            key={index}
                            id={admin.id}
                            admin={admin.name}
                            usrname={admin.username}
                        />
                    ))}
                <NavLink to="/superadmin/tabs/admindashboard/tambahadmin" className="absolute leading-[3.25rem] z-10 right-8 rounded-full bottom-8 w-[60px] h-[60px] justify-center bg-[#1B79B8] text-center focus:text-royal hover:text-royal hover:bg-blue-600" >
                    <img className='inline-block w-[30px] h-[30px]' src={addUser} alt="Add user" />
                </NavLink>
            </LayoutChild>
        </Layout>
    )
}

export default SuperAdmin