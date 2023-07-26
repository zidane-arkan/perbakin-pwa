import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import api from "../../../api/api";

const Styles = styled.div`
  input[type="number"] {
    text-align: center;
    width: 3rem;
    height: 2rem;
  }
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0;
  overflow: scroll;
  @media (min-width: 600px) {
    table {
      width: 800px !important;
    }
  }
  table {
    width: 500px;
    text-align: center;
    border-spacing: 0;
    border-right: 2px solid #d5e4f0;
    border-left: 2px solid #d5e4f0;
    border-bottom: 2px solid #d5e4f0;
    border-radius: 12px;
    tr {
      :last-child {
        tr {
          text-align: center;
          border-bottom: 0;
        }
        td {
          border-bottom: 0;
        }
      }
    }
    thead {
      color: white;
      background-color: #036bb0;
    }
    th {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 2px solid #d5e4f0;
      border-right: 2px solid #d5e4f0;
      border-left: 2px solid #d5e4f0;
    }
    td {
      margin: 0;
      padding: 0.3rem;
      border-bottom: 2px solid #d5e4f0;
      border-right: 2px solid #d5e4f0;
      border-left: 2px solid #d5e4f0;
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
`;

interface DataItem {
    no: string;
    nilaiPerkenaanA: number;
    nilaiPerkenaanC: number;
    nilaiPerkenaanD: number;
    waktu: {
        minutes: string;
        seconds: string;
        milliseconds: string;
    };
    hasil: boolean;
}

interface APIDataItem {
    scores_a: number[];
    scores_b: number[];
    duration: number[];
}

interface APIResponse {
    [key: string]: APIDataItem | boolean[];
}

const Percobaan1 = ({ apiData, shooterid }) => {
    // CHANGE API DATA TO TABLE DATA
    const mapAPIToDataItem = (
        apiItem: APIDataItem,
        index: number
    ): DataItem[] => {
        const no = index + 1;
        const scores_a = apiItem.scores_a;
        const scores_b = apiItem.scores_b;

        const dataItemA: DataItem = {
            no: `${no}A`,
            nilaiPerkenaanA: scores_a[0],
            nilaiPerkenaanC: scores_a[1],
            nilaiPerkenaanD: scores_a[2],
            waktu: {
                minutes: apiItem.duration[0].toString().padStart(2, "0"),
                seconds: apiItem.duration[1].toString().padStart(2, "0"),
                milliseconds: apiItem.duration[2].toString().padStart(2, "0")
            },
            hasil: apiData.checkmarks[index]
        };

        const dataItemB: DataItem = {
            no: `${no}B`,
            nilaiPerkenaanA: scores_b[0],
            nilaiPerkenaanC: scores_b[1],
            nilaiPerkenaanD: scores_b[2],
            waktu: {
                minutes: apiItem.duration[0].toString().padStart(2, "0"),
                seconds: apiItem.duration[1].toString().padStart(2, "0"),
                milliseconds: apiItem.duration[2].toString().padStart(2, "0")
            },
            hasil: apiData.checkmarks[index]
        };

        return [dataItemA, dataItemB];
    };

    const [data, setData] = useState<DataItem[]>(() => {
        const dataArray: DataItem[] = [];
        apiData.checkmarks.forEach((_, index) => {
            if (typeof apiData[`no_${index + 1}`] !== "boolean") {
                const dataItems = mapAPIToDataItem(
                    apiData[`no_${index + 1}`] as APIDataItem,
                    index
                );
                dataArray.push(...dataItems);
            }
        });
        return dataArray;
    });

    // API HANDLE

    // INPUT HANDLE
    const handleInputChange = (e, id, field) => {
        const { value } = e.target;

        const updatedData = data.map((item) => {
            if (item.no === id) {
                return {
                    ...item,
                    [field]: +value
                };
            }
            return item;
        });

        const totalAlpha = updatedData.reduce(
            (sum, item) => sum + item.nilaiPerkenaanA,
            0
        );
        const totalCharlie = updatedData.reduce(
            (sum, item) => sum + item.nilaiPerkenaanC,
            0
        );
        const totalDelta = updatedData.reduce(
            (sum, item) => sum + item.nilaiPerkenaanD,
            0
        );

        if (totalAlpha <= 12 && totalCharlie <= 12 && totalDelta <= 12) {
            setData(updatedData);
            console.log(updatedData); // Cetak data tabel ke konsol
        }
    };

    const handleWaktuChange = (e, index, field) => {
        const { value } = e.target;
        let updatedValue = value;

        if (value.length === 1) {
            updatedValue = "0" + value;
        }

        const updatedData = [...data];
        updatedData[index].waktu[field] = updatedValue;

        if (index % 2 === 0) {
            updatedData[index + 1].waktu[field] = value;
            updatedData[index + 1].hasil = updatedData[index].hasil;
        } else {
            updatedData[index - 1].waktu[field] = value;
            updatedData[index - 1].hasil = updatedData[index].hasil;
        }
        setData(updatedData);
    };

    const handleCheckboxChange = (e, index) => {
        const { checked } = e.target;
        const updatedData = [...data];
        updatedData[index].hasil = checked;

        if (index % 2 === 0) {
            updatedData[index + 1].hasil = checked;
        } else {
            updatedData[index - 1].hasil = checked;
        }
        setData(updatedData);
    };

    return (
        <table>
            <thead>
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
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td rowSpan={1}>{item.no}</td>
                        <td>
                            <input
                                type="number"
                                min={0}
                                max={2 - item.nilaiPerkenaanC - item.nilaiPerkenaanD}
                                value={item.nilaiPerkenaanA}
                                onChange={(e) =>
                                    handleInputChange(e, item.no, "nilaiPerkenaanA")
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min={0}
                                max={2 - item.nilaiPerkenaanA - item.nilaiPerkenaanD}
                                value={item.nilaiPerkenaanC}
                                onChange={(e) =>
                                    handleInputChange(e, item.no, "nilaiPerkenaanC")
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                min={0}
                                max={2 - item.nilaiPerkenaanA - item.nilaiPerkenaanC}
                                value={item.nilaiPerkenaanD}
                                onChange={(e) =>
                                    handleInputChange(e, item.no, "nilaiPerkenaanD")
                                }
                            />
                        </td>
                        {item.no !== "1B" && item.no !== "2B" && item.no !== "3B" && (
                            <>
                                <td rowSpan={2}>
                                    <div className="stopwatch">
                                        <input
                                            type="number"
                                            name="minute"
                                            max="59"
                                            min="0"
                                            placeholder="menit"
                                            value={item.waktu.minutes}
                                            onChange={(e) => handleWaktuChange(e, index, "minutes")}
                                        />
                                        :
                                        <input
                                            type="number"
                                            name="second"
                                            max="59"
                                            min="0"
                                            placeholder="detik"
                                            value={item.waktu.seconds}
                                            onChange={(e) => handleWaktuChange(e, index, "seconds")}
                                        />
                                        :
                                        <input
                                            type="number"
                                            name="millisecond"
                                            max="99"
                                            min="0"
                                            placeholder="milid"
                                            value={item.waktu.milliseconds}
                                            onChange={(e) =>
                                                handleWaktuChange(e, index, "milliseconds")
                                            }
                                        />
                                    </div>
                                </td>
                                <td rowSpan={2}>
                                    <input
                                        type="checkbox"
                                        id={`hasil-${index}`}
                                        name="hasil"
                                        checked={item.hasil}
                                        onChange={(e) => handleCheckboxChange(e, index)}
                                    />
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// Render the Percobaan1 component with the API data
const Stage4 = () => {
    const { shooterid } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [stage4Data, setStage1Data] = useState();
    const [try2Status, setTry2Status] = useState(false);

    const fetchTry1Data = async () => {
        try {
            const response = await api.get(`/scorer/shooter/${shooterid}/result/stage4`);
            const apiData = response.data;
            const stage4Data = apiData.data.stage_4;
            setStage1Data(stage4Data);
            setTry2Status(stage4Data.is_try_2);
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
            const endpoint = `/scorer/shooter/${shooterid}/result/stage4/2`;
            setIsLoading(true);
            try {
                const response = await api.post(endpoint);
                setIsLoading(false);
                // Perform a browser refresh after finishing the function
                window.location.reload();
                return {
                    message: response.data.message,
                    status: 200,
                    data: null,
                };
            } catch (error: any) {
                console.error(error);
                setIsLoading(false);
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
    return (
        <Styles>
            <Percobaan1 apiData={stage4Data.try_1} shooterid={shooterid} />
            {!try2Status ?
                <div className='flex items-center justify-center'>
                    <button onClick={() => { finishPercobaan1() }} className='items-center text-white sm:w-[40%] px-2 py-4 bg-blue-400 rounded-xl'>Buat Percobaan 2</button>
                </div> :
                <></>
            }
            {/* {try2Status ?
                <Percobaan2 shooterid={shooterid} /> :
                <p>Tabel Percobaan 2 Belum Dibuat</p>
            } */}
        </Styles>
    );
};

export default Stage4;