import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
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

const Percobaan1 = (props : any) => {
    const [data, setData] = useState([
        {
            no: "1A",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "1B",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "2A",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "2B",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "3A",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        },
        {
            no: "3B",
            nilaiPerkenaanA: 0,
            nilaiPerkenaanC: 0,
            nilaiPerkenaanD: 0,
            waktu: {
                minutes: "00",
                seconds: "00",
                milliseconds: "00"
            },
            hasil: false
        }
    ]);
    // API HANDLE
  


    // INPUT HANDLE
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, field: string) => {
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

    const handleWaktuChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof DataItem["waktu"]) => {
        const { value } = e.target;
        let updatedValue = value;

        if (value.length === 1) {
            updatedValue = "0" + value;
        }

        const updatedData = [...data];
        updatedData[index].waktu[field] = updatedValue;
        // Set waktu dan hasil yang sama untuk pasangan nomor seri
        if (index % 2 === 0) {
            updatedData[index + 1].waktu[field] = value;
            updatedData[index + 1].hasil = updatedData[index].hasil;
        } else {
            updatedData[index - 1].waktu[field] = value;
            updatedData[index - 1].hasil = updatedData[index].hasil;
        }
        setData(updatedData);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { checked } = e.target;
        const updatedData = [...data];
        updatedData[index].hasil = checked;
        // Set nilai checkbox yang sama untuk pasangan nomor seri
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


const Stage4 = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [try1Data, setTry1Data] = useState();


    const [try2Data, setTry2Data] = useState({
        scores: [],
        duration: [],
        checkmarks: [],
    });

    const { shooterid } = useParams();

    useEffect(() => {
        const fetchTry1Data = async () => {
            try {
                const response = await api.get(
                    `/scorer/shooter/${shooterid}/result/stage4`
                );
                const apiData = response.data;
                const try1Data = apiData.data.stage_4.try_1;
                setTry1Data(try1Data);
                // console.log(try1Data)
                setIsLoading(false); // Setelah data berhasil diambil dan diatur ke state, ubah isLoading menjadi false
            } catch (error) {
                console.error(error);
                setIsLoading(false); // Jika terjadi kesalahan saat mengambil data, tetap ubah isLoading menjadi false agar pesan error ditampilkan
            }
        };

        fetchTry1Data();
    }, [shooterid]);

    // Jika isLoading masih true, tampilkan pesan pemuatan atau animasi pemuatan
    if (isLoading) {
        return <div>Loading...</div>; // Gantilah ini dengan komponen pemuatan yang sesuai
    }

  // Jika data masih kosong, tampilkan pesan bahwa data belum tersedia
    return (
        <Styles>
            {try1Data ? (
                <Percobaan1 shooterid={shooterid} try1Data={try1Data} />
            ) : (
                <div>Data belum tersedia.</div>
            )}
        </Styles>
    )
}

export default Stage4
// useEffect(() => {
//     // Extract the try1 data from the API response
//     if (props.try1data) {
//         // Convert the API data format to the DataItem format
//         const newData: DataItem[] = Object.keys(props.try1data).map((key) => {
//             if (key.startsWith("no_")) {
//                 const no = key.split("_")[1];
//                 const { scores_a, scores_b, duration } = props.try1data[key];
//                 return {
//                     no,
//                     nilaiPerkenaanA: scores_a[0] || 0,
//                     nilaiPerkenaanC: scores_a[1] || 0,
//                     nilaiPerkenaanD: scores_a[2] || 0,
//                     waktu: {
//                         minutes: duration[0]?.toString().padStart(2, "0") || "00",
//                         seconds: duration[1]?.toString().padStart(2, "0") || "00",
//                         milliseconds: duration[2]?.toString().padStart(2, "0") || "00",
//                     },
//                     hasil: props.try1data.checkmarks[parseInt(no) - 1] || false,
//                 };
//             }
//             return null;
//         }).filter(Boolean);

//         setData(newData);
//     }
// }, [props.try1data]);


// BACKUP JIKA DIATAS GAGAL

// interface DataItem {
//     no: string;
//     nilaiPerkenaanA: number;
//     nilaiPerkenaanC: number;
//     nilaiPerkenaanD: number;
//     waktu: {
//         minutes: string;
//         seconds: string;
//         milliseconds: string;
//     };
//     hasil: boolean;
// }

// const Percobaan1 = () => {
//     const [data, setData] = useState([
//         {
//             no: "1A",
//             nilaiPerkenaanA: 0,
//             nilaiPerkenaanC: 0,
//             nilaiPerkenaanD: 0,
//             waktu: {
//                 minutes: "00",
//                 seconds: "00",
//                 milliseconds: "00"
//             },
//             hasil: false
//         },
//         {
//             no: "1B",
//             nilaiPerkenaanA: 0,
//             nilaiPerkenaanC: 0,
//             nilaiPerkenaanD: 0,
//             waktu: {
//                 minutes: "00",
//                 seconds: "00",
//                 milliseconds: "00"
//             },
//             hasil: false
//         },
//         {
//             no: "2A",
//             nilaiPerkenaanA: 0,
//             nilaiPerkenaanC: 0,
//             nilaiPerkenaanD: 0,
//             waktu: {
//                 minutes: "00",
//                 seconds: "00",
//                 milliseconds: "00"
//             },
//             hasil: false
//         },
//         {
//             no: "2B",
//             nilaiPerkenaanA: 0,
//             nilaiPerkenaanC: 0,
//             nilaiPerkenaanD: 0,
//             waktu: {
//                 minutes: "00",
//                 seconds: "00",
//                 milliseconds: "00"
//             },
//             hasil: false
//         },
//         {
//             no: "3A",
//             nilaiPerkenaanA: 0,
//             nilaiPerkenaanC: 0,
//             nilaiPerkenaanD: 0,
//             waktu: {
//                 minutes: "00",
//                 seconds: "00",
//                 milliseconds: "00"
//             },
//             hasil: false
//         },
//         {
//             no: "3B",
//             nilaiPerkenaanA: 0,
//             nilaiPerkenaanC: 0,
//             nilaiPerkenaanD: 0,
//             waktu: {
//                 minutes: "00",
//                 seconds: "00",
//                 milliseconds: "00"
//             },
//             hasil: false
//         }
//     ]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, field: string) => {
//         const { value } = e.target;

//         const updatedData = data.map((item) => {
//             if (item.no === id) {
//                 return {
//                     ...item,
//                     [field]: +value
//                 };
//             }
//             return item;
//         });

//         const totalAlpha = updatedData.reduce(
//             (sum, item) => sum + item.nilaiPerkenaanA,
//             0
//         );
//         const totalCharlie = updatedData.reduce(
//             (sum, item) => sum + item.nilaiPerkenaanC,
//             0
//         );
//         const totalDelta = updatedData.reduce(
//             (sum, item) => sum + item.nilaiPerkenaanD,
//             0
//         );

//         if (totalAlpha <= 12 && totalCharlie <= 12 && totalDelta <= 12) {
//             setData(updatedData);
//             console.log(updatedData); // Cetak data tabel ke konsol
//         }
//     };

//     const handleWaktuChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof DataItem["waktu"]) => {
//         const { value } = e.target;
//         let updatedValue = value;

//         if (value.length === 1) {
//             updatedValue = "0" + value;
//         }

//         const updatedData = [...data];
//         updatedData[index].waktu[field] = updatedValue;
//         // Set waktu dan hasil yang sama untuk pasangan nomor seri
//         if (index % 2 === 0) {
//             updatedData[index + 1].waktu[field] = value;
//             updatedData[index + 1].hasil = updatedData[index].hasil;
//         } else {
//             updatedData[index - 1].waktu[field] = value;
//             updatedData[index - 1].hasil = updatedData[index].hasil;
//         }
//         setData(updatedData);
//     };

//     const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//         const { checked } = e.target;
//         const updatedData = [...data];
//         updatedData[index].hasil = checked;
//         // Set nilai checkbox yang sama untuk pasangan nomor seri
//         if (index % 2 === 0) {
//             updatedData[index + 1].hasil = checked;
//         } else {
//             updatedData[index - 1].hasil = checked;
//         }
//         setData(updatedData);
//     };

//     return (
//         <table>
//             <thead>
//                 <tr>
//                     <th rowSpan={2}>No</th>
//                     <th colSpan={3}>Nilai Perkenaan</th>
//                     <th rowSpan={2}>Waktu</th>
//                     <th rowSpan={2}>Hasil</th>
//                 </tr>
//                 <tr>
//                     <th>A</th>
//                     <th>C</th>
//                     <th>D</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {data.map((item, index) => (
//                     <tr key={index}>
//                         <td rowSpan={1}>{item.no}</td>
//                         <td>
//                             <input
//                                 type="number"
//                                 min={0}
//                                 max={2 - item.nilaiPerkenaanC - item.nilaiPerkenaanD}
//                                 value={item.nilaiPerkenaanA}
//                                 onChange={(e) =>
//                                     handleInputChange(e, item.no, "nilaiPerkenaanA")
//                                 }
//                             />
//                         </td>
//                         <td>
//                             <input
//                                 type="number"
//                                 min={0}
//                                 max={2 - item.nilaiPerkenaanA - item.nilaiPerkenaanD}
//                                 value={item.nilaiPerkenaanC}
//                                 onChange={(e) =>
//                                     handleInputChange(e, item.no, "nilaiPerkenaanC")
//                                 }
//                             />
//                         </td>
//                         <td>
//                             <input
//                                 type="number"
//                                 min={0}
//                                 max={2 - item.nilaiPerkenaanA - item.nilaiPerkenaanC}
//                                 value={item.nilaiPerkenaanD}
//                                 onChange={(e) =>
//                                     handleInputChange(e, item.no, "nilaiPerkenaanD")
//                                 }
//                             />
//                         </td>
//                         {item.no !== "1B" && item.no !== "2B" && item.no !== "3B" && (
//                             <>
//                                 <td rowSpan={2}>
//                                     <div className="stopwatch">
//                                         <input
//                                             type="number"
//                                             name="minute"
//                                             max="59"
//                                             min="0"
//                                             placeholder="menit"
//                                             value={item.waktu.minutes}
//                                             onChange={(e) => handleWaktuChange(e, index, "minutes")}
//                                         />
//                                         :
//                                         <input
//                                             type="number"
//                                             name="second"
//                                             max="59"
//                                             min="0"
//                                             placeholder="detik"
//                                             value={item.waktu.seconds}
//                                             onChange={(e) => handleWaktuChange(e, index, "seconds")}
//                                         />
//                                         :
//                                         <input
//                                             type="number"
//                                             name="millisecond"
//                                             max="99"
//                                             min="0"
//                                             placeholder="milid"
//                                             value={item.waktu.milliseconds}
//                                             onChange={(e) =>
//                                                 handleWaktuChange(e, index, "milliseconds")
//                                             }
//                                         />
//                                     </div>
//                                 </td>
//                                 <td rowSpan={2}>
//                                     <input
//                                         type="checkbox"
//                                         id={`hasil-${index}`}
//                                         name="hasil"
//                                         checked={item.hasil}
//                                         onChange={(e) => handleCheckboxChange(e, index)}
//                                     />
//                                 </td>
//                             </>
//                         )}
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };


// const Stage4 = () => {
//     return (
//         <Styles>
//             <Percobaan1 />
//         </Styles>
//     )
// }

// export default Stage4