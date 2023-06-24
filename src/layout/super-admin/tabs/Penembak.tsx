import React, { useState, useEffect } from 'react'
import { PenembakAdmin } from '../../pages/Penembak'
import api from '../../../api/api'
import { AxiosError } from 'axios'
import { ResponseData } from '../../../context/response'

const Penembak = () => {
    const [shooters, setShooters] = useState<string[]>([]);
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
        const fetchShooters = async () => {
            try {
                const examId = await getExamId();
                const response = await api.get(`/super/exam/${examId}/shooter`);
                const shooters = response.data.data.shooters;
                setShooters(shooters);
            } catch (error) {
                const err = error as AxiosError<ResponseData<null>>;
                console.error("Error:", err);
            }
        };

        fetchShooters();
    }, []);

    return (
        <PenembakAdmin shooters={shooters} />
    )
}

export default Penembak