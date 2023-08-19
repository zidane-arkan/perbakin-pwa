import React, { useEffect, useRef, useState, Dispatch, SetStateAction } from 'react'
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import api from '../../../api/api';
import styled from 'styled-components';


const Styles = styled.div`
input[type='number']{
    text-align: center;
    width: 3rem;
    height: 2rem;
} 
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0;
  overflow : scroll;
@media (min-width : 600px) {
    table {
      width: 800px !important;
    }
  }
  table {
    width: 500px;
    text-align: center;
    border-spacing: 0;
    border-right: 2px solid #D5E4F0;
    border-left: 2px solid #D5E4F0;
    border-bottom: 2px solid #D5E4F0;
    border-radius : 12px;
    tr {
      :last-child {
        tr{
            text-align: center;
          border-bottom: 0;
        }
        td {
          border-bottom: 0;
        }
      }
    }
    thead{
      color : white;
      background-color : #036BB0;
    }
    th{
      margin: 0;
      padding: 0.5rem;
      border-bottom: 2px solid #D5E4F0;
      border-right: 2px solid #D5E4F0;
      border-left: 2px solid #D5E4F0;
    }
    td {
      margin: 0;
      padding: 0.3rem;
      border-bottom: 2px solid #D5E4F0;
      border-right: 2px solid #D5E4F0;
      border-left: 2px solid #D5E4F0;
      z-index: -1;

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

interface PercobaanStage2Props {
    // stage2Data: {
    //   [key: string]: {
    //     scores: number[];
    //     duration: number[];
    //   } & {
    //     checkmarks: boolean[];
    //   }
    // },
    setStageTry1?: Dispatch<SetStateAction<any>>;
    setStageTry2?: Dispatch<SetStateAction<any>>;
    shooterid: string | undefined;
}

interface TableDataItem {
    id: number;
    nilaiPerkenaanA: number;
    nilaiPerkenaanC: number;
    nilaiPerkenaanD: number;
    waktu: {
        minute: string;
        second: string;
        millisecond: string;
    };
    hasil: boolean;
}

// PERCOBAAN 1
const Percobaan1: React.FC<PercobaanStage2Props> = (props: any) => {
    const [tableData, setTableData] = useState<TableDataItem[]>([]);
    // const [isTimeoutCleared, setIsTimeoutCleared] = useState(true);
    // STATUS INPUT
    const [status, setStatus] = useState<number>(0);
    const { examid, scorerid, shooterid } = useParams();
    // Fetch data from API and update tableData
    useEffect(() => {
        const fetchTry1Data = async () => {
            try {
                const response = await api.get(`/super/exam/${examid}/scorer/${scorerid}/shooter/${shooterid}/result/stage2`);
                const apiData = response.data;
                const stage2Data = apiData.data.stage_2.try_1;
                setStatus(parseInt(stage2Data.status, 10));

                const updatedTableData = Object.keys(stage2Data).map((key) => {
                    if (key.startsWith("no_")) {
                        const rowData = stage2Data[key];
                        const { scores, duration } = rowData;
                        const id = parseInt(key.split("_")[1]);

                        if (scores && duration) {
                            const updatedScores = scores || [0, 0, 0];
                            const updatedDuration = duration || [0, 0, 0];

                            return {
                                id,
                                nilaiPerkenaanA: updatedScores[0] || 0,
                                nilaiPerkenaanC: updatedScores[1] || 0,
                                nilaiPerkenaanD: updatedScores[2] || 0,
                                waktu: {
                                    minute: updatedDuration[0]?.toString().padStart(2, "0") || "00",
                                    second: updatedDuration[1]?.toString().padStart(2, "0") || "00",
                                    millisecond: updatedDuration[2]?.toString().padStart(2, "0") || "00",
                                },
                                hasil: stage2Data.checkmarks[id - 1] || false,
                            };
                        }
                    }
                    return null;
                }).filter(Boolean) as TableDataItem[];

                setTableData(updatedTableData);
            } catch (error) {
                console.error(error);
            }
        };

        // Cleanup function to reset tableData before fetching new data
        setTableData([]); // Clear existing tableData
        fetchTry1Data();
    }, [shooterid]);

    // Create a ref to store the timeout ID
    // const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // BACKEND HANDLER
    const handleUpdateValues = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedData: any = {
                status: '2',
                checkmarks: tableData.map(data => data.hasil),
            };

            for (let i = 1; i <= tableData.length; i++) {
                const key = `no_${i}`;
                updatedData[key] = {
                    scores: [
                        tableData[i - 1].nilaiPerkenaanA,
                        tableData[i - 1].nilaiPerkenaanC,
                        tableData[i - 1].nilaiPerkenaanD,
                    ],
                    duration: [
                        parseInt(tableData[i - 1].waktu.minute),
                        parseInt(tableData[i - 1].waktu.second),
                        parseInt(tableData[i - 1].waktu.millisecond),
                    ],
                };
            }

            props.setStageTry1(updatedData);
            // console.log(updatedData)
        } catch (error) {
            const err = error as AxiosError<any>;
            console.error(err);
        }
    };

    // HANDLE DATA REACT
    const handleInputChange = <K extends keyof TableDataItem>(e: React.ChangeEvent<HTMLInputElement>, id: number, field: K) => {
        const { value } = e.target;

        const updatedTableData = [...tableData];
        const updatedRow = updatedTableData.find((data) => data.id === id);

        if (updatedRow) {
            updatedRow[field] = +value as TableDataItem[K];

            const updatedDuration = updatedTableData.map((data) => [
                parseInt(data.waktu.minute, 10),
                parseInt(data.waktu.second, 10),
                parseInt(data.waktu.millisecond, 10)
            ]);

            setTableData(updatedTableData);
            // // Clear existing timeout (if any) before setting a new one
            // if (timeoutRef.current) {
            //     clearTimeout(timeoutRef.current);
            // }

            // // Set a new timeout to update the backend data after 500ms of inactivity
            // timeoutRef.current = setTimeout(() => {
            //     updateNilaiPerkeneaanBE(updatedRow, id);
            // }, 500);
        }
    };

    const handleTimeChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number,
        field: keyof TableDataItem["waktu"]
    ) => {
        const { value } = e.target;
        let updatedValue = value;
        // if (value.length === 1) {
        //     updatedValue = "0" + value;
        // }
        const updatedTableData = tableData.map((data) => {
            if (data.id === id) {
                return {
                    ...data,
                    waktu: {
                        ...data.waktu,
                        [field]: updatedValue,
                    },
                };
            }
            return data;
        });

        setTableData(updatedTableData);
    };

    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number
    ) => {
        const { checked } = e.target;

        const updatedTableData = tableData.map((data) => {
            if (data.id === id) {
                return {
                    ...data,
                    hasil: checked,
                };
            }
            return data;
        });

        setTableData(updatedTableData);
    };

    return (
        <section className='flex flex-col gap-4'>
            <table>
                <thead>
                    <tr>
                        <th colSpan={7}>Percobaan 1</th>
                    </tr>
                    <tr>
                        <th rowSpan={2}>No</th>
                        <th colSpan={3}>Nilai Perkenaan</th>
                        <th rowSpan={2}>Waktu</th>
                        <th rowSpan={2}>Hasil</th>
                    </tr>
                    <tr>
                        <th>A</th>
                        <th>C</th>
                        <th>D</th>
                    </tr>
                </thead>
                {tableData.map((data) => (
                    <tbody key={data.id}>
                        <tr>
                            <td rowSpan={2}>{data.id}</td>
                            <td>
                                <input
                                    type="number"
                                    min={0}
                                    max={2 - data.nilaiPerkenaanC - data.nilaiPerkenaanD}
                                    value={data.nilaiPerkenaanA}
                                    onChange={(e) =>
                                        handleInputChange(e, data.id, "nilaiPerkenaanA")
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min={0}
                                    max={2 - data.nilaiPerkenaanA - data.nilaiPerkenaanD}
                                    value={data.nilaiPerkenaanC}
                                    onChange={(e) =>
                                        handleInputChange(e, data.id, "nilaiPerkenaanC")
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min={0}
                                    max={2 - data.nilaiPerkenaanA - data.nilaiPerkenaanC}
                                    value={data.nilaiPerkenaanD}
                                    onChange={(e) =>
                                        handleInputChange(e, data.id, "nilaiPerkenaanD")
                                    }
                                />
                            </td>
                            <td rowSpan={2}>
                                <div className="stopwatch">
                                    <input
                                        id={`minutes-${data.id}`}
                                        type="number"
                                        name="minute"
                                        max="59"
                                        min="00"
                                        placeholder="mm"
                                        value={data.waktu.minute}
                                        onChange={(e) => handleTimeChange(e, data.id, "minute")}
                                    />
                                    :
                                    <input
                                        id={`seconds-${data.id}`}
                                        type="number"
                                        name="second"
                                        max="59"
                                        min="00"
                                        placeholder="ss"
                                        value={data.waktu.second}
                                        onChange={(e) => handleTimeChange(e, data.id, "second")}
                                    />
                                    :
                                    <input
                                        id={`milliseconds-${data.id}`}
                                        type="number"
                                        name="millisecond"
                                        max="99"
                                        min="00"
                                        placeholder="SS"
                                        value={data.waktu.millisecond}
                                        onChange={(e) => handleTimeChange(e, data.id, "millisecond")}
                                    />
                                </div>
                            </td>
                            <td rowSpan={2}>
                                <input
                                    type="checkbox"
                                    id={`seri-${data.id}`}
                                    name="seri"
                                    value="benar"
                                    checked={data.hasil}
                                    onChange={(e) => handleCheckboxChange(e, data.id)}
                                />
                            </td>
                        </tr>
                        <tr></tr>
                    </tbody>
                ))}
            </table>
            <form onSubmit={handleUpdateValues}>
                <button className='w-full py-4 text-[#1B79B8] border text-center bg-[#fff] border-[#036BB0] rounded-lg' type='submit' >
                    Update Try 1
                </button>
            </form>
        </section>
    );
};

// PERCOBAAN 2
const Percobaan2: React.FC<PercobaanStage2Props> = (props: any) => {
    const [tableData, setTableData] = useState<TableDataItem[]>([]);
    // const [isTimeoutCleared, setIsTimeoutCleared] = useState(true);
    // STATUS INPUT
    const [status, setStatus] = useState<number>(0);
    const { examid, scorerid, shooterid } = useParams();
    // Fetch data from API and update tableData
    useEffect(() => {
        const fetchTry1Data = async () => {
            try {
                const response = await api.get(`/super/exam/${examid}/scorer/${scorerid}/shooter/${shooterid}/result/stage2`);
                const apiData = response.data;
                const stage2Data = apiData.data.stage_2.try_2;
                setStatus(parseInt(stage2Data.status, 10));

                const updatedTableData = Object.keys(stage2Data).map((key) => {
                    if (key.startsWith("no_")) {
                        const rowData = stage2Data[key];
                        const { scores, duration } = rowData;
                        const id = parseInt(key.split("_")[1]);

                        if (scores && duration) {
                            const updatedScores = scores || [0, 0, 0];
                            const updatedDuration = duration || [0, 0, 0];

                            return {
                                id,
                                nilaiPerkenaanA: updatedScores[0] || 0,
                                nilaiPerkenaanC: updatedScores[1] || 0,
                                nilaiPerkenaanD: updatedScores[2] || 0,
                                waktu: {
                                    minute: updatedDuration[0]?.toString().padStart(2, "0") || "00",
                                    second: updatedDuration[1]?.toString().padStart(2, "0") || "00",
                                    millisecond: updatedDuration[2]?.toString().padStart(2, "0") || "00",
                                },
                                hasil: stage2Data.checkmarks[id - 1] || false,
                            };
                        }
                    }
                    return null;
                }).filter(Boolean) as TableDataItem[];

                setTableData(updatedTableData);
            } catch (error) {
                console.error(error);
            }
        };

        // Cleanup function to reset tableData before fetching new data
        setTableData([]); // Clear existing tableData
        fetchTry1Data();
    }, [shooterid]);

    // BACKEND HANDLER
    const handleUpdateValues = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedData: any = {
                status: '2',
                checkmarks: tableData.map(data => data.hasil),
            };

            for (let i = 1; i <= tableData.length; i++) {
                const key = `no_${i}`;
                updatedData[key] = {
                    scores: [
                        tableData[i - 1].nilaiPerkenaanA,
                        tableData[i - 1].nilaiPerkenaanC,
                        tableData[i - 1].nilaiPerkenaanD,
                    ],
                    duration: [
                        parseInt(tableData[i - 1].waktu.minute),
                        parseInt(tableData[i - 1].waktu.second),
                        parseInt(tableData[i - 1].waktu.millisecond),
                    ],
                };
            }

            props.setStageTry2(updatedData);
            // console.log(updatedData)
        } catch (error) {
            const err = error as AxiosError<any>;
            console.error(err);
        }
    };

    // HANDLE DATA REACT
    const handleInputChange = <K extends keyof TableDataItem>(e: React.ChangeEvent<HTMLInputElement>, id: number, field: K) => {
        const { value } = e.target;

        const updatedTableData = [...tableData];
        const updatedRow = updatedTableData.find((data) => data.id === id);

        if (updatedRow) {
            updatedRow[field] = +value as TableDataItem[K];

            const updatedDuration = updatedTableData.map((data) => [
                parseInt(data.waktu.minute, 10),
                parseInt(data.waktu.second, 10),
                parseInt(data.waktu.millisecond, 10)
            ]);

            setTableData(updatedTableData);
        }
    };

    const handleTimeChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number,
        field: keyof TableDataItem["waktu"]
    ) => {
        const { value } = e.target;
        let updatedValue = value;
        // if (value.length === 1) {
        //     updatedValue = "0" + value;
        // }
        const updatedTableData = tableData.map((data) => {
            if (data.id === id) {
                return {
                    ...data,
                    waktu: {
                        ...data.waktu,
                        [field]: updatedValue,
                    },
                };
            }
            return data;
        });

        setTableData(updatedTableData);
    };

    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number
    ) => {
        const { checked } = e.target;

        const updatedTableData = tableData.map((data) => {
            if (data.id === id) {
                return {
                    ...data,
                    hasil: checked,
                };
            }
            return data;
        });

        setTableData(updatedTableData);
    };

    return (
        <section className='flex flex-col gap-4'>
            <table>
                <thead>
                    <tr>
                        <th colSpan={7}>Percobaan 2</th>
                    </tr>
                    <tr>
                        <th rowSpan={2}>No</th>
                        <th colSpan={3}>Nilai Perkenaan</th>
                        <th rowSpan={2}>Waktu</th>
                        <th rowSpan={2}>Hasil</th>
                    </tr>
                    <tr>
                        <th>A</th>
                        <th>C</th>
                        <th>D</th>
                    </tr>
                </thead>
                {tableData.map((data) => (
                    <tbody key={data.id}>
                        <tr>
                            <td rowSpan={2}>{data.id}</td>
                            <td>
                                <input
                                    type="number"
                                    min={0}
                                    max={2 - data.nilaiPerkenaanC - data.nilaiPerkenaanD}
                                    value={data.nilaiPerkenaanA}
                                    onChange={(e) =>
                                        handleInputChange(e, data.id, "nilaiPerkenaanA")
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min={0}
                                    max={2 - data.nilaiPerkenaanA - data.nilaiPerkenaanD}
                                    value={data.nilaiPerkenaanC}
                                    onChange={(e) =>
                                        handleInputChange(e, data.id, "nilaiPerkenaanC")
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min={0}
                                    max={2 - data.nilaiPerkenaanA - data.nilaiPerkenaanC}
                                    value={data.nilaiPerkenaanD}
                                    onChange={(e) =>
                                        handleInputChange(e, data.id, "nilaiPerkenaanD")
                                    }
                                />
                            </td>
                            <td rowSpan={2}>
                                <div className="stopwatch">
                                    <input
                                        id={`minutes-${data.id}`}
                                        type="number"
                                        name="minute"
                                        max="59"
                                        min="00"
                                        placeholder="mm"
                                        value={data.waktu.minute}
                                        onChange={(e) => handleTimeChange(e, data.id, "minute")}
                                    />
                                    :
                                    <input
                                        id={`seconds-${data.id}`}
                                        type="number"
                                        name="second"
                                        max="59"
                                        min="00"
                                        placeholder="ss"
                                        value={data.waktu.second}
                                        onChange={(e) => handleTimeChange(e, data.id, "second")}
                                    />
                                    :
                                    <input
                                        id={`milliseconds-${data.id}`}
                                        type="number"
                                        name="millisecond"
                                        max="99"
                                        min="00"
                                        placeholder="SS"
                                        value={data.waktu.millisecond}
                                        onChange={(e) => handleTimeChange(e, data.id, "millisecond")}
                                    />
                                </div>
                            </td>
                            <td rowSpan={2}>
                                <input
                                    type="checkbox"
                                    id={`seri-${data.id}`}
                                    name="seri"
                                    value="benar"
                                    checked={data.hasil}
                                    onChange={(e) => handleCheckboxChange(e, data.id)}
                                />
                            </td>
                        </tr>
                        <tr></tr>
                    </tbody>
                ))}
            </table>
            <form onSubmit={handleUpdateValues}>
                <button className='w-full py-4 text-[#1B79B8] border text-center bg-[#fff] border-[#036BB0] rounded-lg' type='submit' >
                    Update Try 2
                </button>
            </form>
        </section>
    );
};

const Stage2 = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isErrorOverlay, setIsErrorOverlay] = useState(false);
    const [stageTry1, setStageTry1] = useState();
    const [stageTry2, setStageTry2] = useState();
    const [try2Status, setTry2Status] = useState(false);

    const { examid, scorerid, shooterid } = useParams();
    // HANLDE DATA
    // console.log(stageTry1)
    // BACKEND HANDLER
    const handleUpdateValues = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSaving(true); // Start loading

            const stagesData: {
                try_1?: any;
                try_2?: any;
            } = {};

            if (stageTry1) {
                stagesData.try_1 = stageTry1;
            }

            // Only include try_2 if try2Status is true
            if (try2Status && stageTry2 !== undefined) {
                stagesData.try_2 = stageTry2;
            }
            console.log(stagesData)
            const response = await api.put(
                `/super/exam/${examid}/scorer/${scorerid}/shooter/${shooterid}/result/stage2`,
                stagesData
            );
            // const response2 = await api.patch(
            //     `/super/exam/${examid}/scorer/${scorerid}/shooter/${shooterid}/result/stage2`
            // );

            console.log(response.data);
            setIsSaving(false); // Stop loading
            return {
                message: response.data.message,
                error: false,
                response: [response],
            };
        } catch (error) {
            const err = error as AxiosError<any>;
            console.error(err);
            setIsSaving(false); // Stop loading
            // Show error overlay for 422 status
            if (err.response?.status === 422) {
                setIsErrorOverlay(true);
            }
        }

    };

    const fetchTry1Data = async () => {
        try {
            const response = await api.get(`/super/exam/${examid}/scorer/${scorerid}/shooter/${shooterid}/result/stage2`);
            const apiData = response.data;
            const stage2Data = apiData.data.stage_2;
            // setstage2Data(stage2Data);
            // console.log(stage2Data.is_try_2)
            if (stage2Data.is_try_2) {
                // console.log(1)
                setTry2Status(stage2Data.is_try_2);
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

    // SELESAIKAN PERCOBAAN 1
    const finishPercobaan1 = async () => {

        // Show confirmation dialog
        const confirmMessage = `Apakah anda yakin Membuat Percobaan 2 ?`;
        const confirmed = window.confirm(confirmMessage);

        if (confirmed) {
            const endpoint = `/super/exam/${examid}/scorer/${scorerid}/shooter/${shooterid}/result/stage2/2`;

            try {
                const response = await api.post(endpoint);
                location.reload();
                return {
                    message: response.data.message,
                    status: 200,
                    data: null,
                };
            } catch (error: any) {
                console.error(error);
                return {
                    message: "Error: " + error.message,
                    status: error.response?.status,
                    data: null,
                };
            }
        }
    };

    // Jika isLoading masih true, tampilkan pesan pemuatan atau animasi pemuatan
    if (isLoading) {
        return (
            <div className='flex flex-col w-full p-4 gap-4 border border-solid border-blue-500 rounded-xl mt-4'>
                <h2 className="mb-2 text-lg font-semibold text-gray-900">Mengambil data tabel:</h2>
                <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
                    <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        Menghubungkan dengan database
                    </li>
                    <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        Mengubah Bentuk data
                    </li>
                    <li className="flex items-center">
                        <div role="status">
                            <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        Memasukkan Data kedalam Tabel
                    </li>
                </ul>
            </div>
        )
    }

    // Jika data masih kosong, tampilkan pesan bahwa data belum tersedia
    return (
        <section className='flex flex-col gap-8'>
            {isSaving ? (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#1B79B8]"></div>
                </div>
            ) : null}
            {isErrorOverlay ? (
                <div className="fixed inset-0 bg-red-500 bg-opacity-75 flex flex-col items-center justify-center z-50">
                    <p className="text-white font-semibold text-lg">
                        Tolong Pastikan Try 1 atau Try 2 Sudah diupdate
                    </p>
                    <button
                        className="mt-4 py-2 px-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
                        onClick={() => setIsErrorOverlay(false)}
                    >
                        Tutup
                    </button>
                </div>
            ) : null}
            <Styles>
                <Percobaan1 setStageTry1={setStageTry1} shooterid={shooterid} />
                {!try2Status ?
                    <div className='flex items-center justify-center'>
                        <button onClick={() => { finishPercobaan1() }} className='items-center text-white sm:w-[40%] px-2 py-4 bg-blue-400 rounded-xl'>Buat Percobaan 2</button>
                    </div> :
                    null
                }

                {try2Status ?
                    <Percobaan2 setStageTry2={setStageTry2} shooterid={shooterid} /> :
                    <p>Tabel Percobaan 2 Belum Dibuat</p>
                }
            </Styles>
            <form onSubmit={handleUpdateValues}>
                <button
                    className={`w-full py-4 text-[#1B79B8] border text-center bg-[#fff] border-[#036BB0] rounded-lg ${isSaving || stageTry1 === undefined ? 'cursor-not-allowed opacity-60' : ''}`}
                    type='submit'
                    disabled={isSaving || stageTry1 === undefined}
                >
                    {isSaving ? 'Menyimpan...' : 'Simpan Stage 2'}
                </button>
            </form>
        </section>
    );
};


export default Stage2