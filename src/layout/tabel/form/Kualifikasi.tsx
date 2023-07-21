// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
import { AxiosError } from 'axios';

const Styles = styled.div`
  input{
    width: 2rem;
    text-align: center;
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button {  
    -webkit-appearance: "Always Show Up/Down Arrows";
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
    opacity: 1;
    text-align: center;
  }

  padding: 1rem 0;
  overflow : scroll;
  @media screen and (min-width: 600px){
    table{
      width: 100%;
    }
  input{
    width: 3rem;
    text-align: center;
  }
  }
  table {
    width: 100%;
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
      text-align: center;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 2px solid #D5E4F0;
      border-right: 2px solid #D5E4F0;
      border-left: 2px solid #D5E4F0;
    }
    td {
      text-align: center;
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

interface TableData {
  stage_0: {
    series_1: number[];
    series_2: number[];
    series_3: number[];
    series_4: number[];
    series_5: number[];
    checkmarks: boolean[];
  };
}
interface ApiData {
  series_1: number[];
  series_2: number[];
  series_3: number[];
  series_4: number[];
  series_5: number[];
  checkmarks: boolean[];
}
interface Percobaan1Props {
  kualifikasiData?: ApiData; // Assuming TableData is imported and defined here
}


const Percobaan1: React.FC<Percobaan1Props> = ({ kualifikasiData }) => {
  if (!kualifikasiData) {
    return <div className='pt-4 sm:pt-4'>Mengambil Data...</div>;
  }
  const seriesNames = ["1", "2", "3", "4", "5"];
  const [tableData, setTableData] = useState<TableData | any>({
    stage_0: {
      series_1: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      series_2: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      series_3: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      series_4: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      series_5: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      checkmarks: [false, false, false, false, false],
    },
  });
  const [isTimeoutCleared, setIsTimeoutCleared] = useState(true);
  
  const { shooterid } = useParams()
  // USE DATA FROM API
  useEffect(() => {
    if (kualifikasiData) {
      const formattedData: TableData = {
        stage_0: {
          series_1: kualifikasiData.series_1,
          series_2: kualifikasiData.series_2,
          series_3: kualifikasiData.series_3,
          series_4: kualifikasiData.series_4,
          series_5: kualifikasiData.series_5,
          checkmarks: kualifikasiData.checkmarks,
        },
      };
      setTableData(formattedData);
    }
  }, [kualifikasiData]);

  // API UPDATE
  const updateNilaiPerkeneaanBE = async (
    updatedData: ApiData,
    noBaris: number,
    stageKey: string
  ) => {
    try {
      const seriesKey = `series_${noBaris}`;
      const scores = updatedData[stageKey][seriesKey].slice(0, 11);
      // console.log(scores);
      // const scores = updatedData[stageKey][seriesKey].slice(0, 11);
      console.log(scores)
      const response = await api.put(
        `/scorer/shooter/${shooterid}/result/stage0/no/${noBaris}`,
        {
          scores: scores,
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

  const updateCheckmarksBE = async (
    updatedData: ApiData,
  ) => {
    try {
      const checkmarks = updatedData;
      console.log(checkmarks);
      const response = await api.put(
        `/scorer/shooter/${shooterid}/result/stage0/checkmarks`,
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


  // INPUT HANDLE
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    stageKey: string,
    seriesKey: string,
    index: number
  ) => {
    const { value } = e.target;
    setTableData((prevData: ApiData) => {
      const updatedData: ApiData = { ...prevData };
      const scoresData: number[] | undefined = updatedData?.[stageKey]?.[seriesKey];

      if (!scoresData) {
        console.error("Invalid data format");
        return updatedData;
      }

      scoresData[index] = parseInt(value, 10);
      const total = calculateTotal(scoresData.slice(0, 11));
      scoresData[11] = total;

      // console.log("Updated scores:", scoresData); // Add this line to see the scores before sending to the API

      if (isTimeoutCleared) {
        setIsTimeoutCleared(false);
        setTimeout(async () => {
          setIsTimeoutCleared(true);
          // Convert noBaris to the corresponding series number (1-5)
          const seriesNumber = parseInt(seriesKey.split("_")[1]);
          // Call the API to update the data
          await updateNilaiPerkeneaanBE(updatedData, seriesNumber, stageKey);
        }, 1000);
      }

      return updatedData;
    });
  };


  const handleCheckbox = (
    e: ChangeEvent<HTMLInputElement>,
    stageKey: string,
    index: number
  ) => {
    const { checked } = e.target;
    setTableData((prevData: any) => {
      const updatedData: any = { ...prevData };
      updatedData[stageKey].checkmarks[index] = checked;
      updateCheckmarksBE(updatedData.stage_0.checkmarks);
      return updatedData;
    });
  };

  const calculateTotal = (seriesValues: number[]) => {
    return seriesValues
      .slice(0, 11)
      .reduce((acc, cur, index) => acc + cur * index, 0);
  };

  const handleNextNo = async (currentNo: number) => {
    const nextNo = currentNo + 1;
    console.log(nextNo);
    const endpoint = `/scorer/shooter/${shooterid}/result/stage0/next`;
    const confirmMoveNext = window.confirm(
      `Apakah Anda yakin ingin pindah ke No Seri ${nextNo}?`
    );
    if (confirmMoveNext) {
      try {
        const response = await api.patch(endpoint);
        console.log(response.data);
        return {
          message: `Berhasil melanjutkan no  Stage Kualifikasi ke no ${nextNo}`,
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
    } else {
      return;
    }
  };

  // RENDER DATA
  const renderSeries = (stageKey: string | any) => {
    const stageData = tableData[stageKey];
    return Object.entries(stageData)
      .filter(([key]) => key !== "checkmarks")
      .map(([seriesKey, seriesValues], index) => {
        const total = calculateTotal(seriesValues as number[]);
        const isDisabled = total < 70;

        return (
          <React.Fragment key={seriesKey}>
            <tr>
              <td rowSpan={2}>{seriesNames[index]}</td>
              {(seriesValues as number[]).slice(0, 11).map((nilai: number, nilaiIndex: number) => (
                <td key={nilaiIndex}>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={nilai}
                    onChange={(e) =>
                      handleInputChange(e, stageKey, seriesKey, nilaiIndex)
                    }
                  />
                </td>
              ))}
              <td rowSpan={2}>{total}</td>
              <td rowSpan={2}>
                <input
                  type="checkbox"
                  id={`${stageKey}-seri-${index}`}
                  name={`${stageKey}-seri-${index}`}
                  value="benar"
                  checked={stageData.checkmarks[index]}
                  disabled={isDisabled}
                  onChange={(e) => handleCheckbox(e, stageKey, index)}
                />
              </td>
              <td rowSpan={2}>
                <button className='text-sm w-[60px] sm:w-[80px] border border-solid p-2 rounded-xl border-blue-400' onClick={() => handleNextNo(index + 1)}>Next No</button>
              </td>
            </tr>
            <tr>
              {(seriesValues as number[]).slice(0, 11).map((nilai: number, nilaiIndex: number) => (
                <td key={nilaiIndex}>{nilai}</td>
              ))}
            </tr>
          </React.Fragment>
        );
      });
  };

  return (
    <Styles>
      <table>
        <thead>
          <tr>
            <th colSpan={1}>Seri</th>
            <th colSpan={11}>Nilai Perkenaan</th>
            <th rowSpan={2}>Jumlah </th>
            <th rowSpan={2}>Hasil </th>
            <th rowSpan={3}>Aksi</th>
          </tr>
          <tr>
            <th>No Seri</th>
            <th>0</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
          </tr>
        </thead>
        <tbody>{renderSeries("stage_0")}</tbody>
      </table>
    </Styles>
  );
};

const Kualifikasi = () => {
  const { shooterid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [kualifikasiData, setKualifikasiData] = useState<TableData | undefined>();
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await api.get(`/scorer/shooter/${shooterid}/result/stage0`);
        const apiData = response.data;
        const stage0Data = apiData.data.stage_0;
        console.log(stage0Data)
        setKualifikasiData(stage0Data);
        setIsLoading(false); // Set isLoading to false after data is fetched and set to state
      } catch (error) {
        console.error(error);
        setIsLoading(false); // If there is an error while fetching data, set isLoading to false to show an error message
      }
    };

    fetchTableData();
  }, [shooterid]);
  return (
    <>
      <Percobaan1 kualifikasiData={kualifikasiData} />
    </>
  )
}

export default Kualifikasi

// Percobaan 1

// type kualifikasi20 = {
//   seri?: string;
//   '0': number;
//   '1': number;
//   '2': number;
//   '3': number;
//   '4': number;
//   '5': number;
//   '6': number;
//   '7': number;
//   '8': number;
//   '9': number;
//   '10': number;
//   total: number;
//   hasil: boolean;
// };
// const defaultData: kualifikasi20[] = [
//   {
//     seri: '1',
//     '0': 1,
//     '1': 1,
//     '2': 1,
//     '3': 1,
//     '4': 1,
//     '5': 1,
//     '6': 1,
//     '7': 1,
//     '8': 1,
//     '9': 1,
//     '10': 1,
//     total: 11,
//     hasil: false,
//   },
//   {
//     seri: '1',
//     '0': 1,
//     '1': 1,
//     '2': 1,
//     '3': 1,
//     '4': 1,
//     '5': 1,
//     '6': 1,
//     '7': 1,
//     '8': 1,
//     '9': 1,
//     '10': 1,
//     total: 11,
//     hasil: false,
//   },
//   {
//     seri: '2',
//     '0': 2,
//     '1': 2,
//     '2': 2,
//     '3': 2,
//     '4': 2,
//     '5': 2,
//     '6': 2,
//     '7': 2,
//     '8': 2,
//     '9': 2,
//     '10': 1,
//     total: 12,
//     hasil: false,
//   },
//   {
//     seri: '2',
//     '0': 2,
//     '1': 2,
//     '2': 2,
//     '3': 2,
//     '4': 2,
//     '5': 2,
//     '6': 2,
//     '7': 2,
//     '8': 2,
//     '9': 2,
//     '10': 1,
//     total: 12,
//     hasil: false,
//   },
//   {
//     seri: '3',
//     '0': 3,
//     '1': 4,
//     '2': 5,
//     '3': 6,
//     '4': 7,
//     '5': 8,
//     '6': 9,
//     '7': 10,
//     '8': 15,
//     '9': 16,
//     '10': 17,
//     total: 40,
//     hasil: false,
//   },
//   {
//     seri: '3',
//     '0': 3,
//     '1': 2,
//     '2': 2,
//     '3': 2,
//     '4': 2,
//     '5': 2,
//     '6': 2,
//     '7': 2,
//     '8': 2,
//     '9': 2,
//     '10': 1,
//     total: 12,
//     hasil: false,
//   },
// ];

// const columnHelper = createColumnHelper<kualifikasi20>();

// const EditableCell = ({ getValue, row, column, table }: any) => {
//   const initialValue = getValue();
//   const columnMeta = column.columnDef.meta;
//   const [value, setValue] = useState(initialValue);
//   useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);
//   const onBlur = () => {
//     table.options.meta?.updateData(row.index, column.id, value);
//   };
//   return columnMeta?.type === 'number' ? (
//     <input className='w-[30px] text-center'
//       min={0}
//       max={10}
//       type="number"
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//       onBlur={onBlur}
//     />
//   ) : (
//     <input className='w-[30px] text-center'
//       type={columnMeta?.type || "text"}
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//       onBlur={onBlur}
//     />
//   );
// }

// const columns = [
//   columnHelper.group({
//     id: 'seri',
//     header: () => <span>Seri</span>,
//     // footer: props => props.column.id,
//     columns: [
//       columnHelper.accessor('seri', {
//         id: 'seri',
//         header: () => <span>No Seri</span>,
//       }),
//     ]
//   }),
//   columnHelper.group({
//     id: 'nilaiPerkenaan',
//     header: () => <span>Nilai Perkenaan</span>,
//     // footer: props => props.column.id,
//     columns: [
//       columnHelper.accessor('0', {
//         id: '0',
//         header: () => <span>0</span>,
//         cell: EditableCell,
//         meta: {
//           type: 'number',
//         }
//       }),
//       columnHelper.accessor('1', {
//         id: '1',
//         header: () => <span>1</span>,
//         cell: EditableCell,
//         meta: {
//           type: 'number',
//         }
//       }),
//       columnHelper.accessor('2', {
//         id: '2',
//         header: () => <span>2</span>,
//         cell: EditableCell,
//         meta: {
//           type: 'number',
//         }
//       }),
//       columnHelper.accessor('3', {
//         id: '3',
//         header: () => <span>3</span>,
//         cell: EditableCell,
//         meta: {
//           type: 'number',
//         }
//       }),
//       columnHelper.accessor('4', {
//         id: '4',
//         header: () => <span>1</span>,
//         cell: EditableCell,
//         meta: {
//           type: 'number',
//         }
//       }),
//       columnHelper.accessor('5', {
//         id: '5',
//         header: () => <span>5</span>,
//         cell: EditableCell,
//         meta: {
//           type: 'number',
//         }
//       }),
//       columnHelper.accessor('6', {
//         id: '6',
//         header: () => <span>6</span>,
//         cell: EditableCell,
//         meta: {
//           type: 'number',
//         }
//       }),
//       columnHelper.accessor('7', {
//         id: '7',
//         header: () => <span>7</span>,
//         cell: EditableCell,
//         meta: {
//           type: 'number',
//         }
//       }),
//       columnHelper.accessor('8', {
//         id: '8',
//         header: () => <span>8</span>,
//         cell: EditableCell,
//         meta: {
//           type: 'number',
//         }
//       }),
//       columnHelper.accessor('9', {
//         id: '9',
//         header: () => <span>9</span>,
//         cell: EditableCell,
//         meta: {
//           type: 'number',
//         }
//       }),
//       columnHelper.accessor('10', {
//         id: '10',
//         header: () => <span>10</span>,
//         cell: EditableCell,
//         meta: {
//           type: 'number',
//         }
//       }),
//     ],
//   }),
//   columnHelper.group({
//     id: 'total',
//     header: () => <span>Total</span>,
//     // footer: props => props.column.id,
//     columns: [
//       columnHelper.accessor('total', {
//         id: 'total',
//         header: () => <span>Jumlah Total</span>,
//       }),
//     ]
//   }),
//   columnHelper.group({
//     id: 'hasil',
//     header: () => <span>Hasil</span>,
//     // footer: props => props.column.id,
//     columns: [
//       columnHelper.accessor('hasil', {
//         id: 'hasil',
//         header: () => <span>Hasil (Centang)</span>,
//         cell: EditableCell,
//         meta: {
//           type: 'checkbox',
//         }
//       }),
//     ]
//   }),
// ]

// const Kualifikasi = () => {
//   const [data, setData] = useState(() => [...defaultData])
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     meta: {
//       updateData: ({ rowIndex, columnId, value }: any) => {
//         setData((old) =>
//           old.map((row, index) => {
//             if (index === rowIndex) {
//               return {
//                 ...old[rowIndex],
//                 [columnId]: value,
//               };
//             }
//             return row;
//           })
//         );
//       },
//     },
//   });

//   return (
//     <Styles>
//       <table>
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id} colSpan={header.colSpan}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row, indexForRow) => (
//             // <tr key={row.id}>
//             //   {row.getVisibleCells().map((cell, row) => (
//             //     <td key={cell.id}>
//             //       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//             //     </td>
//             //   ))}
//             // </tr>
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell, indexForCell) => (
//                 <td rowSpan={parseInt(indexForRow % 2 === 0 && indexForCell === 0 ? "2" : "1", 10)} key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </Styles>
//   )
// }


// Percobaan 1
// const Percobaan1 = () => {
//   const [tableData, setTableData] = useState([
//     {
//       Seri: 1,
//       NilaiPerkenaan: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       Total: 0,
//       HasilSeri: false
//     },
//     {
//       Seri: 2,
//       NilaiPerkenaan: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       Total: 0,
//       HasilSeri: false
//     },
//     {
//       Seri: 3,
//       NilaiPerkenaan: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       Total: 0,
//       HasilSeri: false
//     },
//     {
//       Seri: 4,
//       NilaiPerkenaan: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       Total: 0,
//       HasilSeri: false
//     },
//     {
//       Seri: 5,
//       NilaiPerkenaan: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       Total: 0,
//       HasilSeri: false
//     }
//   ]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     seriIndex: number,
//     nilaiIndex: number
//   ) => {
//     const { value } = e.target;
//     const updatedData = [...tableData];
//     updatedData[seriIndex].NilaiPerkenaan[nilaiIndex] = parseInt(value, 10);

//     // Hitung hasil penjumlahan dari kolom nilai perkenaan
//     const total = updatedData[seriIndex].NilaiPerkenaan.reduce(
//       (acc, cur) => acc + cur,
//       0
//     );
//     updatedData[seriIndex].Total = total;

//     setTableData(updatedData);
//   };

//   const handleCheckbox = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     seriIndex: number
//   ) => {
//     const { checked } = e.target;
//     const updatedData = [...tableData];
//     updatedData[seriIndex].HasilSeri = checked;

//     // Periksa total skor seri sekarang
//     const totalSeri = updatedData[seriIndex].Total;

//     // Periksa apakah total skor mencapai 70 atau lebih
//     if (totalSeri >= 70) {
//       setTableData(updatedData);
//     } else {
//       // Jika total skor belum mencapai 70, set HasilSeri ke false
//       updatedData[seriIndex].HasilSeri = false;
//       setTableData(updatedData);
//       console.log('Total skor harus mencapai 70 atau lebih untuk menandai serinya.');
//     }
//   };
//   // const handleCheckbox = (
//   //   e: React.ChangeEvent<HTMLInputElement>,
//   //   seriIndex: number
//   // ) => {
//   //   const { checked } = e.target;
//   //   const updatedData = [...tableData];
//   //   updatedData[seriIndex].HasilSeri = checked;
//   //   setTableData(updatedData);
//   //   console.log(tableData);
//   // };

//   return (
//     <div className="App">
//       <table>
//         <thead>
//           <tr>
//             <th colSpan={1}>Seri</th>
//             <th colSpan={11}>Nilai Perkenaan</th>
//             <th colSpan={1}>Total</th>
//             <th colSpan={1}>Hasil Seri</th>
//           </tr>
//           <tr>
//             <th>No Seri</th>
//             <th>0</th>
//             <th>1</th>
//             <th>2</th>
//             <th>3</th>
//             <th>4</th>
//             <th>5</th>
//             <th>6</th>
//             <th>7</th>
//             <th>8</th>
//             <th>9</th>
//             <th>10</th>
//             <th>Jumlah</th>
//             <th>Hasil</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((row, index) => (
//             <React.Fragment key={index}>
//               <tr>
//                 <td rowSpan={2}>{row.Seri}</td>
//                 {row.NilaiPerkenaan.map((nilai, nilaiIndex) => (
//                   <td key={nilaiIndex}>
//                     <input
//                       className='w-12 h-8 text-black text-center opacity-100'
//                       type="number"
//                       min={0}
//                       max={10}
//                       value={nilai}
//                       onChange={(e) => handleInputChange(e, index, nilaiIndex)}
//                     />
//                   </td>
//                 ))}
//                 <td rowSpan={2}>{row.Total}</td>
//                 <td rowSpan={2}>
//                   <input
//                     type="checkbox"
//                     id={`seri-${index}`}
//                     name={`seri-${index}`}
//                     value="benar"
//                     checked={row.HasilSeri}
//                     onChange={(e) => handleCheckbox(e, index)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 {row.NilaiPerkenaan.map((nilai, nilaiIndex) => (
//                   <td key={nilaiIndex}>{nilai}</td>
//                 ))}
//               </tr>
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };