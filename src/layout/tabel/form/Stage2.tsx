import React, { useEffect, useMemo, useState } from 'react'
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

interface Percobaan1Props {
    // stage2Data: {
    //   [key: string]: {
    //     scores: number[];
    //     duration: number[];
    //   } & {
    //     checkmarks: boolean[];
    //   }
    // },
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
const Percobaan1: React.FC<Percobaan1Props> = ({ shooterid }: any) => {
    const [tableData, setTableData] = useState<TableDataItem[]>([]);
    // const [isTimeoutCleared, setIsTimeoutCleared] = useState(true);
    // STATUS INPUT
    const [status, setStatus] = useState<number>(0);

    // CONVERT DATA FROM API TO TABLE DATA
    // Fetch data from API and update tableData
    useEffect(() => {
        const fetchTry1Data = async () => {
            try {
                const response = await api.get(
                    `/scorer/shooter/${shooterid}/result/stage2`
                );
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
                }).filter(Boolean);

                setTableData(updatedTableData);
            } catch (error) {
                console.error(error);
            }
        };

        // Cleanup function to reset tableData before fetching new data
        setTableData([]); // Clear existing tableData
        fetchTry1Data();
    }, [shooterid]);

    const isReadOnly = (id: number) => {
        return status !== 0 && id !== status;
    };

    // BACKEND HANDLER
    // NILAI
    const updateNilaiPerkeneaanBE = async (updatedData: TableDataItem, noBaris: number) => {
        console.log(updatedData);
        try {
            const response = await api.put(
                `/scorer/shooter/${shooterid}/result/stage2/1/no/${noBaris}`,
                {
                    scores: [
                        updatedData.nilaiPerkenaanA,
                        updatedData.nilaiPerkenaanC,
                        updatedData.nilaiPerkenaanD
                    ],
                    duration: [
                        parseInt(updatedData.waktu.minute),
                        parseInt(updatedData.waktu.second),
                        parseInt(updatedData.waktu.millisecond)
                    ]
                }
            );
            console.log(response.data);
            return {
                message: response.data.message,
                error: false,
                response: response
            };
        } catch (error) {
            const err = error as AxiosError<any>;
            console.error(err);
            return {
                message:
                    "Error: " + err.response?.status + ": " + err.response?.data.message,
                error: true
            };
        }
    };
    // CHECKMARS
    interface UpdateHasilResponse {
        message: string;
        error: boolean;
        response?: any;
    }
    const updateCheckmarksBE = async (updatedCheckmarks: boolean[]): Promise<UpdateHasilResponse> => {
        try {
            const checkmarks = updatedCheckmarks;
            console.log(checkmarks);
            const response = await api.put(
                `/scorer/shooter/${shooterid}/result/stage2/1/checkmarks`,
                {
                    checkmarks: checkmarks,
                }
            );
            console.log(response.data);
            return {
                message: response.data.message,
                error: false,
                response: response,
            };
        } catch (error) {
            const err = error as AxiosError<any>;
            console.error(err);
            return {
                message:
                    "Error: " + err.response?.status + ": " + err.response?.data.message,
                error: true,
            };
        }
    };
    // GANTI KE NO SELANJUTNYA
    const handleNextNo = async (currentNo: number) => {
        const nextNo = currentNo + 1;

        // Show confirmation dialog
        const confirmMessage = `Apakah anda yakin ingin pindah nomor ke ${nextNo}?`;
        const confirmed = window.confirm(confirmMessage);

        if (confirmed) {
            console.log(nextNo);
            const endpoint = `/scorer/shooter/${shooterid}/result/stage2/1/next`;

            try {
                const response = await api.patch(endpoint);
                console.log(`Berhasil melanjutkan no stage 1 percobaan 1 ke no ${nextNo}`)
                // Set status to the next number and trigger data refresh
                setStatus(nextNo);
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


    // HANDLE DATA
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
            // WAIT UNTIL USER FINISH
            // setIsTimeoutCleared(true);
            updateNilaiPerkeneaanBE(updatedRow, id);
        }
    };

    const handleTimeChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number,
        field: keyof TableDataItem["waktu"]
    ) => {
        const { value } = e.target;
        let updatedValue = value;
        if (value.length === 1) {
            updatedValue = "0" + value;
        }

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

        const updatedData = updatedTableData.find((data) => data.id === id);
        if (updatedData) {
            const { id, nilaiPerkenaanA, nilaiPerkenaanC, nilaiPerkenaanD, waktu, hasil } = updatedData;
            updateNilaiPerkeneaanBE(
                {
                    id,
                    nilaiPerkenaanA,
                    nilaiPerkenaanC,
                    nilaiPerkenaanD,
                    waktu,
                    hasil,
                },
                id
            );
        }
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

        const updatedCheckmarks = updatedTableData.map((data) => data.hasil);
        updateCheckmarksBE(updatedCheckmarks);
    };

    return (
        <section>
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
                        <th rowSpan={2}>Aksi</th>
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
                                    readOnly={isReadOnly(data.id)} // Set readOnly based on the "status"
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
                                    readOnly={isReadOnly(data.id)} // Set readOnly based on the "status"
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
                                    readOnly={isReadOnly(data.id)} // Set readOnly based on the "status"
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
                                        readOnly={isReadOnly(data.id)} // Set readOnly based on the "status"
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
                                        readOnly={isReadOnly(data.id)} // Set readOnly based on the "status"
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
                                        readOnly={isReadOnly(data.id)} // Set readOnly based on the "status"
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
                            <td rowSpan={2}>
                                <button
                                    className='text-sm w-[60px] sm:w-[80px] border border-solid p-2 rounded-xl border-blue-400'
                                    onClick={() => handleNextNo(data.id)}
                                >
                                    Next No
                                </button>
                            </td>
                        </tr>
                        <tr></tr>
                    </tbody>
                ))}
            </table>
        </section>
    );
};

const Stage2 = () => {
    const { shooterid } = useParams();
    return (
        <Styles>
            <Percobaan1 shooterid={shooterid} />
            {/* <Percobaan2 /> */}
        </Styles>
    );
}


export default Stage2