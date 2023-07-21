// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// import { useTable, useGroupBy } from 'react-table';
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AxiosError } from 'axios';
import api from '../../../api/api';

const Styles = styled.div`
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
  try1Data: {
    [key: string]: {
      scores: number[];
      duration: number[];
    } & {
      checkmarks: boolean[];
    }
  },
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

const Percobaan1: React.FC<Percobaan1Props> = ({ try1Data, shooterid } : any) => {
  const [tableData, setTableData] = useState<TableDataItem[]>([
    {
      id: 1,
      nilaiPerkenaanA: 1,
      nilaiPerkenaanC: 1,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "02",
        second: "03",
        millisecond: "00",
      },
      hasil: false,
    },
    {
      id: 2,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00",
      },
      hasil: false,
    },
    {
      id: 3,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00",
      },
      hasil: false,
    },
    {
      id: 4,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00",
      },
      hasil: false,
    },
    {
      id: 5,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00",
      },
      hasil: false,
    },
    {
      id: 6,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00",
      },
      hasil: false,
    },
  ]);


  useEffect(() => {
    console.log(try1Data);

    if (try1Data && Object.keys(try1Data).length > 0) {
      const updatedTableData = Object.keys(try1Data).map((key) => {
        if (key.startsWith("no_")) {
          const rowData = try1Data[key];
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
              hasil: try1Data.checkmarks[id - 1] || false, // Get the corresponding checkmark value
            };
          }
        }
        return null; // Skip other keys like "checkmarks"
      }).filter(Boolean);

      setTableData(updatedTableData);
    }
  }, [try1Data]);

  // BACKEND HANDLER
  const updateNilaiPerkeneaanBE = async (updatedData: TableDataItem, noBaris: number) => {
    console.log(updatedData);
    try {
      const response = await api.put(
        `/scorer/shooter/${shooterid}/result/stage1/1/no/${noBaris}`,
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

  const updateHasilBE = async (updatedCheckmarks: boolean[]): Promise<UpdateHasilResponse> => {
    console.log(updatedCheckmarks);
    const endpoint = `/scorer/shooter/${shooterid}/result/stage1/1/finish`
    const requestBody = {
      checkmarks: updatedCheckmarks,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(data);

      return {
        message: "Checkmarks updated successfully",
        error: false,
        response: data,
      };
    } catch (error) {
      console.error(error);

      return {
        message: "Error updating checkmarks",
        error: true,
      };
    }
  };


  const handleNextNo = async (currentNo: number) => {
    const nextNo = currentNo + 1;
    console.log(nextNo);
    const endpoint = `/scorer/shooter/${shooterid}/result/stage1/1/next`;

    try {
      const response = await api.patch(endpoint);
      console.log(response.data);

      // const newTableData: TableDataItem = {
      //   id: nextNo,
      //   nilaiPerkenaanA: 0,
      //   nilaiPerkenaanC: 0,
      //   nilaiPerkenaanD: 0,
      //   waktu: {
      //     minute: "00",
      //     second: "00",
      //     millisecond: "00",
      //   },
      //   hasil: false,
      // };

      // const rowIndex = tableData.findIndex((data) => data.id === currentNo);
      // if (rowIndex !== -1) {
      //   const updatedTableData = [...tableData];
      //   updatedTableData.splice(rowIndex + 1, 0, newTableData);
      //   setTableData(updatedTableData);
      // }

      return {
        message: `Berhasil melanjutkan no stage 1 percobaan 1 ke no ${nextNo}`,
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
  };


  // INPUT HANDLE
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
      updateNilaiPerkeneaanBE(
        {
          ...updatedRow,
          waktu: {
            ...updatedRow.waktu,
            [field]: +value,
          },
        },
        id
      );
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
    updateHasilBE(updatedCheckmarks);
  };

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th colSpan={6}>Percobaan 1</th>
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
      <button>Buat Percobaan 2</button>
    </section>
  );
};



const Stage1 = () => {
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
          `/scorer/shooter/${shooterid}/result/stage1`
        );
        const apiData = response.data;
        const try1Data = apiData.data.stage_1.try_1;
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
  );
};


export default Stage1




// PERCOBAAN 2
// const Percobaan2 = () => {
//   const [tableData, setTableData] = useState([
//     {
//       id: 1,
//       nilaiPerkenaanA: 0,
//       nilaiPerkenaanC: 0,
//       nilaiPerkenaanD: 0,
//       waktu: {
//         minute: "00",
//         second: "00",
//         millisecond: "00"
//       },
//       hasil: false
//     },
//     {
//       id: 2,
//       nilaiPerkenaanA: 0,
//       nilaiPerkenaanC: 0,
//       nilaiPerkenaanD: 0,
//       waktu: {
//         minute: "00",
//         second: "00",
//         millisecond: "00"
//       },
//       hasil: false
//     },
//     {
//       id: 3,
//       nilaiPerkenaanA: 0,
//       nilaiPerkenaanC: 0,
//       nilaiPerkenaanD: 0,
//       waktu: {
//         minute: "00",
//         second: "00",
//         millisecond: "00"
//       },
//       hasil: false
//     },
//     {
//       id: 4,
//       nilaiPerkenaanA: 0,
//       nilaiPerkenaanC: 0,
//       nilaiPerkenaanD: 0,
//       waktu: {
//         minute: "00",
//         second: "00",
//         millisecond: "00"
//       },
//       hasil: false
//     },
//     {
//       id: 5,
//       nilaiPerkenaanA: 0,
//       nilaiPerkenaanC: 0,
//       nilaiPerkenaanD: 0,
//       waktu: {
//         minute: "00",
//         second: "00",
//         millisecond: "00"
//       },
//       hasil: false
//     },
//     {
//       id: 6,
//       nilaiPerkenaanA: 0,
//       nilaiPerkenaanC: 0,
//       nilaiPerkenaanD: 0,
//       waktu: {
//         minute: "00",
//         second: "00",
//         millisecond: "00"
//       },
//       hasil: false
//     }
//   ]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     id: string | number,
//     field: "nilaiPerkenaanA" | "nilaiPerkenaanC" | "nilaiPerkenaanD"
//   ) => {

//     const { value } = e.target;

//     const updatedTableData = tableData.map((data) => {
//       if (data.id === id) {
//         return {
//           ...data,
//           [field]: +value
//         };
//       }
//       return data;
//     });

//     const totalAlpha = updatedTableData.reduce(
//       (sum, data) => sum + data.nilaiPerkenaanA,
//       0
//     );
//     const totalCharlie = updatedTableData.reduce(
//       (sum, data) => sum + data.nilaiPerkenaanC,
//       0
//     );
//     const totalDelta = updatedTableData.reduce(
//       (sum, data) => sum + data.nilaiPerkenaanD,
//       0
//     );

//     if (totalAlpha <= 12 && totalCharlie <= 12 && totalDelta <= 12) {
//       setTableData(updatedTableData);
//       console.log(updatedTableData); // Cetak data tabel ke konsol
//     }
//   };

//   const handleTimeChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     id: string | number,
//     field: "minute" | "second" | "millisecond"
//   ) => {
//     const { value } = e.target;

//     let updatedValue = value;
//     if (value.length === 1) {
//       updatedValue = "0" + value;
//     }

//     const updatedTableData = tableData.map((data) => {
//       if (data.id === id) {
//         return {
//           ...data,
//           waktu: {
//             ...data.waktu,
//             [field]: updatedValue
//           }
//         };
//       }
//       return data;
//     });

//     setTableData(updatedTableData);
//     console.log(updatedTableData); // Cetak data tabel ke konsol
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: string | number) => {
//     const { checked } = e.target;

//     const updatedTableData = tableData.map((data) => {
//       if (data.id === id) {
//         return {
//           ...data,
//           hasil: checked
//         };
//       }
//       return data;
//     });

//     setTableData(updatedTableData);
//     console.log(updatedTableData); // Cetak data tabel ke konsol
//   };

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th colSpan={6}>Percobaan 2</th>
//         </tr>
//         <tr>
//           <th rowSpan={2}>No</th>
//           <th colSpan={3}>Nilai Perkenaan</th>
//           <th rowSpan={2}>Waktu</th>
//           <th rowSpan={2}>Hasil</th>
//         </tr>
//         <tr>
//           <th>A</th>
//           <th>C</th>
//           <th>D</th>
//         </tr>
//       </thead>
//       {tableData.map((data) => (
//         <tbody key={data.id}>
//           <tr>
//             <td rowSpan={2}>{data.id}</td>
//             <td>
//               <input
//                 type="number"
//                 min={0}
//                 max={2 - data.nilaiPerkenaanC - data.nilaiPerkenaanD}
//                 value={data.nilaiPerkenaanA}
//                 onChange={(e) =>
//                   handleInputChange(e, data.id, "nilaiPerkenaanA")
//                 }
//               />
//             </td>
//             <td>
//               <input
//                 type="number"
//                 min={0}
//                 max={2 - data.nilaiPerkenaanA - data.nilaiPerkenaanD}
//                 value={data.nilaiPerkenaanC}
//                 onChange={(e) =>
//                   handleInputChange(e, data.id, "nilaiPerkenaanC")
//                 }
//               />
//             </td>
//             <td>
//               <input
//                 type="number"
//                 min={0}
//                 max={2 - data.nilaiPerkenaanA - data.nilaiPerkenaanC}
//                 value={data.nilaiPerkenaanD}
//                 onChange={(e) =>
//                   handleInputChange(e, data.id, "nilaiPerkenaanD")
//                 }
//               />
//             </td>
//             <td rowSpan={2}>
//               <div className="stopwatch">
//                 <input
//                   id={`minutes-${data.id}`}
//                   type="number"
//                   name="minute"
//                   max="59"
//                   min="00"
//                   placeholder="mm"
//                   value={data.waktu.minute}
//                   onChange={(e) => handleTimeChange(e, data.id, "minute")}
//                 />
//                 :
//                 <input
//                   id={`seconds-${data.id}`}
//                   type="number"
//                   name="second"
//                   max="59"
//                   min="00"
//                   placeholder="ss"
//                   value={data.waktu.second}
//                   onChange={(e) => handleTimeChange(e, data.id, "second")}
//                 />
//                 .
//                 <input
//                   id={`milliseconds-${data.id}`}
//                   type="number"
//                   name="millisecond"
//                   max="99"
//                   min="00"
//                   placeholder="SS"
//                   value={data.waktu.millisecond}
//                   onChange={(e) => handleTimeChange(e, data.id, "millisecond")}
//                 />
//               </div>
//             </td>
//             <td rowSpan={2}>
//               <input
//                 type="checkbox"
//                 id={`seri-${data.id}`}
//                 name="seri"
//                 value="benar"
//                 checked={data.hasil}
//                 onChange={(e) => handleCheckboxChange(e, data.id)}
//               />
//             </td>
//           </tr>
//           <tr></tr>
//         </tbody>
//       ))}
//     </table>
//   );
// };
// // PERCOBAAN 1 BERHASIL
// const Percobaan1 = () => {
//   const [tableData, setTableData] = useState([
//     {
//       id: 1,
//       nilaiPerkenaanA: 0,
//       nilaiPerkenaanC: 0,
//       nilaiPerkenaanD: 0,
//       waktu: {
//         minute: "00",
//         second: "00",
//         millisecond: "00"
//       },
//       hasil: false
//     },
//     {
//       id: 2,
//       nilaiPerkenaanA: 0,
//       nilaiPerkenaanC: 0,
//       nilaiPerkenaanD: 0,
//       waktu: {
//         minute: "00",
//         second: "00",
//         millisecond: "00"
//       },
//       hasil: false
//     },
//     {
//       id: 3,
//       nilaiPerkenaanA: 0,
//       nilaiPerkenaanC: 0,
//       nilaiPerkenaanD: 0,
//       waktu: {
//         minute: "00",
//         second: "00",
//         millisecond: "00"
//       },
//       hasil: false
//     },
//     {
//       id: 4,
//       nilaiPerkenaanA: 0,
//       nilaiPerkenaanC: 0,
//       nilaiPerkenaanD: 0,
//       waktu: {
//         minute: "00",
//         second: "00",
//         millisecond: "00"
//       },
//       hasil: false
//     },
//     {
//       id: 5,
//       nilaiPerkenaanA: 0,
//       nilaiPerkenaanC: 0,
//       nilaiPerkenaanD: 0,
//       waktu: {
//         minute: "00",
//         second: "00",
//         millisecond: "00"
//       },
//       hasil: false
//     },
//     {
//       id: 6,
//       nilaiPerkenaanA: 0,
//       nilaiPerkenaanC: 0,
//       nilaiPerkenaanD: 0,
//       waktu: {
//         minute: "00",
//         second: "00",
//         millisecond: "00"
//       },
//       hasil: false
//     }
//   ]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     id: string | number,
//     field: "nilaiPerkenaanA" | "nilaiPerkenaanC" | "nilaiPerkenaanD"
//   ) => {

//     const { value } = e.target;

//     const updatedTableData = tableData.map((data) => {
//       if (data.id === id) {
//         return {
//           ...data,
//           [field]: +value
//         };
//       }
//       return data;
//     });

//     const totalAlpha = updatedTableData.reduce(
//       (sum, data) => sum + data.nilaiPerkenaanA,
//       0
//     );
//     const totalCharlie = updatedTableData.reduce(
//       (sum, data) => sum + data.nilaiPerkenaanC,
//       0
//     );
//     const totalDelta = updatedTableData.reduce(
//       (sum, data) => sum + data.nilaiPerkenaanD,
//       0
//     );

//     if (totalAlpha <= 12 && totalCharlie <= 12 && totalDelta <= 12) {
//       setTableData(updatedTableData);
//       console.log(updatedTableData); // Cetak data tabel ke konsol
//     }
//   };

//   const handleTimeChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     id: string | number,
//     field: "minute" | "second" | "millisecond"
//   ) => {
//     const { value } = e.target;

//     let updatedValue = value;
//     if (value.length === 1) {
//       updatedValue = "0" + value;
//     }

//     const updatedTableData = tableData.map((data) => {
//       if (data.id === id) {
//         return {
//           ...data,
//           waktu: {
//             ...data.waktu,
//             [field]: updatedValue
//           }
//         };
//       }
//       return data;
//     });

//     setTableData(updatedTableData);
//     console.log(updatedTableData); // Cetak data tabel ke konsol
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: string | number) => {
//     const { checked } = e.target;

//     const updatedTableData = tableData.map((data) => {
//       if (data.id === id) {
//         return {
//           ...data,
//           hasil: checked
//         };
//       }
//       return data;
//     });

//     setTableData(updatedTableData);
//     console.log(updatedTableData); // Cetak data tabel ke konsol
//   };

//   return (
    // <table>
    //   <thead>
    //     <tr>
    //       <th colSpan={6}>Percobaan 1</th>
    //     </tr>
    //     <tr>
    //       <th rowSpan={2}>No</th>
    //       <th colSpan={3}>Nilai Perkenaan</th>
    //       <th rowSpan={2}>Waktu</th>
    //       <th rowSpan={2}>Hasil</th>
    //     </tr>
    //     <tr>
    //       <th>A</th>
    //       <th>C</th>
    //       <th>D</th>
    //     </tr>
    //   </thead>
    //   {tableData.map((data) => (
    //     <tbody key={data.id}>
    //       <tr>
    //         <td rowSpan={2}>{data.id}</td>
    //         <td>
    //           <input
    //             type="number"
    //             min={0}
    //             max={2 - data.nilaiPerkenaanC - data.nilaiPerkenaanD}
    //             value={data.nilaiPerkenaanA}
    //             onChange={(e) =>
    //               handleInputChange(e, data.id, "nilaiPerkenaanA")
    //             }
    //           />
    //         </td>
    //         <td>
    //           <input
    //             type="number"
    //             min={0}
    //             max={2 - data.nilaiPerkenaanA - data.nilaiPerkenaanD}
    //             value={data.nilaiPerkenaanC}
    //             onChange={(e) =>
    //               handleInputChange(e, data.id, "nilaiPerkenaanC")
    //             }
    //           />
    //         </td>
    //         <td>
    //           <input
    //             type="number"
    //             min={0}
    //             max={2 - data.nilaiPerkenaanA - data.nilaiPerkenaanC}
    //             value={data.nilaiPerkenaanD}
    //             onChange={(e) =>
    //               handleInputChange(e, data.id, "nilaiPerkenaanD")
    //             }
    //           />
    //         </td>
    //         <td rowSpan={2}>
    //           <div className="stopwatch">
    //             <input
    //               id={`minutes-${data.id}`}
    //               type="number"
    //               name="minute"
    //               max="59"
    //               min="00"
    //               placeholder="mm"
    //               value={data.waktu.minute}
    //               onChange={(e) => handleTimeChange(e, data.id, "minute")}
    //             />
    //             :
    //             <input
    //               id={`seconds-${data.id}`}
    //               type="number"
    //               name="second"
    //               max="59"
    //               min="00"
    //               placeholder="ss"
    //               value={data.waktu.second}
    //               onChange={(e) => handleTimeChange(e, data.id, "second")}
    //             />
    //             :
    //             <input
    //               id={`milliseconds-${data.id}`}
    //               type="number"
    //               name="millisecond"
    //               max="99"
    //               min="00"
    //               placeholder="SS"
    //               value={data.waktu.millisecond}
    //               onChange={(e) => handleTimeChange(e, data.id, "millisecond")}
    //             />
    //           </div>
    //         </td>
    //         <td rowSpan={2}>
    //           <input
    //             type="checkbox"
    //             id={`seri-${data.id}`}
    //             name="seri"
    //             value="benar"
    //             checked={data.hasil}
    //             onChange={(e) => handleCheckboxChange(e, data.id)}
    //           />
    //         </td>
    //       </tr>
    //       <tr></tr>
    //     </tbody>
    //   ))}
    // </table>
//   );
// };