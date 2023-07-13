// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// import { useTable, useGroupBy } from 'react-table';
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components';


const Styles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0;
  overflow : scroll;
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

const Percobaan1 = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00"
      },
      hasil: false
    },
    {
      id: 2,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00"
      },
      hasil: false
    },
    {
      id: 3,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00"
      },
      hasil: false
    },
    {
      id: 4,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00"
      },
      hasil: false
    },
    {
      id: 5,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00"
      },
      hasil: false
    },
    {
      id: 6,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00"
      },
      hasil: false
    }
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | number,
    field: "nilaiPerkenaanA" | "nilaiPerkenaanC" | "nilaiPerkenaanD"
  ) => {

    const { value } = e.target;

    const updatedTableData = tableData.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          [field]: +value
        };
      }
      return data;
    });

    const totalAlpha = updatedTableData.reduce(
      (sum, data) => sum + data.nilaiPerkenaanA,
      0
    );
    const totalCharlie = updatedTableData.reduce(
      (sum, data) => sum + data.nilaiPerkenaanC,
      0
    );
    const totalDelta = updatedTableData.reduce(
      (sum, data) => sum + data.nilaiPerkenaanD,
      0
    );

    if (totalAlpha <= 12 && totalCharlie <= 12 && totalDelta <= 12) {
      setTableData(updatedTableData);
      console.log(updatedTableData); // Cetak data tabel ke konsol
    }
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | number,
    field: "minute" | "second" | "millisecond"
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
            [field]: updatedValue
          }
        };
      }
      return data;
    });

    setTableData(updatedTableData);
    console.log(updatedTableData); // Cetak data tabel ke konsol
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: string | number) => {
    const { checked } = e.target;

    const updatedTableData = tableData.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          hasil: checked
        };
      }
      return data;
    });

    setTableData(updatedTableData);
    console.log(updatedTableData); // Cetak data tabel ke konsol
  };

  return (
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
  );
};

const Percobaan2 = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00"
      },
      hasil: false
    },
    {
      id: 2,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00"
      },
      hasil: false
    },
    {
      id: 3,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00"
      },
      hasil: false
    },
    {
      id: 4,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00"
      },
      hasil: false
    },
    {
      id: 5,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00"
      },
      hasil: false
    },
    {
      id: 6,
      nilaiPerkenaanA: 0,
      nilaiPerkenaanC: 0,
      nilaiPerkenaanD: 0,
      waktu: {
        minute: "00",
        second: "00",
        millisecond: "00"
      },
      hasil: false
    }
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | number,
    field: "nilaiPerkenaanA" | "nilaiPerkenaanC" | "nilaiPerkenaanD"
  ) => {

    const { value } = e.target;

    const updatedTableData = tableData.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          [field]: +value
        };
      }
      return data;
    });

    const totalAlpha = updatedTableData.reduce(
      (sum, data) => sum + data.nilaiPerkenaanA,
      0
    );
    const totalCharlie = updatedTableData.reduce(
      (sum, data) => sum + data.nilaiPerkenaanC,
      0
    );
    const totalDelta = updatedTableData.reduce(
      (sum, data) => sum + data.nilaiPerkenaanD,
      0
    );

    if (totalAlpha <= 12 && totalCharlie <= 12 && totalDelta <= 12) {
      setTableData(updatedTableData);
      console.log(updatedTableData); // Cetak data tabel ke konsol
    }
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | number,
    field: "minute" | "second" | "millisecond"
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
            [field]: updatedValue
          }
        };
      }
      return data;
    });

    setTableData(updatedTableData);
    console.log(updatedTableData); // Cetak data tabel ke konsol
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: string | number) => {
    const { checked } = e.target;

    const updatedTableData = tableData.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          hasil: checked
        };
      }
      return data;
    });

    setTableData(updatedTableData);
    console.log(updatedTableData); // Cetak data tabel ke konsol
  };

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={6}>Percobaan 2</th>
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
                .
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
  );
};

const Stage1 = () => {
  return (
    <Styles>
      <Percobaan1 />
      <Percobaan2 />
    </Styles>
  );
}


export default Stage1

// Perobaan 1

// type STAGE1 = {
//   seri: string;
//   A: number;
//   B: number;
//   C: number;
//   waktu: string;
//   hasil: boolean;
// };
// const defaultData: STAGE1[] = [
//   {
//     seri: '1',
//     A: 1,
//     B: 2,
//     C: 3,
//     waktu: '00:00',
//     hasil: false,
//   },
//   {
//     seri: '2',
//     A: 1,
//     B: 2,
//     C: 3,
//     waktu: '00:00',
//     hasil: false,
//   },
//   {
//     seri: '3',
//     A: 1,
//     B: 2,
//     C: 3,
//     waktu: '00:00',
//     hasil: false,
//   },
//   {
//     seri: '4',
//     A: 1,
//     B: 2,
//     C: 3,
//     waktu: '00:00',
//     hasil: false,
//   },
// ];
// const columnHelper = createColumnHelper<STAGE1>();

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
//     <input className='w-[120px] text-center'
//       min='00:00:00'
//       step={'1'}
//       type={columnMeta?.type || "text"}
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//       onBlur={onBlur}
//     />
//   );
// }

// const columns1 = [
//   columnHelper.group({
//     header: 'Percobaan 1',
//     columns: [
//       columnHelper.group({
//         id: 'seri',
//         header: () => <span>Seri</span>,
//         // footer: props => props.column.id,
//         columns: [
//           columnHelper.accessor('seri', {
//             id: 'seri',
//             header: () => <span>No Seri</span>,
//           }),
//         ]
//       }),
//       columnHelper.group({
//         id: 'nilaiPerkenaan',
//         header: () => <span>Nilai Perkenaan</span>,
//         // footer: props => props.column.id,
//         columns: [
//           columnHelper.accessor('A', {
//             id: 'A',
//             header: () => <span>A</span>,
//             cell: EditableCell,
//             meta: {
//               type: 'number',
//             }
//           }),
//           columnHelper.accessor('B', {
//             id: 'B',
//             header: () => <span>B</span>,
//             cell: EditableCell,
//             meta: {
//               type: 'number',
//             }
//           }),
//           columnHelper.accessor('C', {
//             id: 'C',
//             header: () => <span>C</span>,
//             cell: EditableCell,
//             meta: {
//               type: 'number',
//             }
//           }),
//         ],
//       }),
//       columnHelper.group({
//         id: 'waktu',
//         header: () => <span>Waktu</span>,
//         // footer: props => props.column.id,
//         columns: [
//           columnHelper.accessor('waktu', {
//             id: 'waktu',
//             header: () => <span>Hasil Waktu</span>,
//             cell: EditableCell,
//             meta: {
//               type: 'time',
//             }
//           }),
//         ]
//       }),
//       columnHelper.group({
//         id: 'hasil',
//         header: () => <span>Hasil</span>,
//         // footer: props => props.column.id,
//         columns: [
//           columnHelper.accessor('hasil', {
//             id: 'hasil',
//             header: () => <span>Hasil (Centang)</span>,
//             cell: EditableCell,
//             meta: {
//               type: 'checkbox',
//             }
//           }),
//         ]
//       }),
//     ]
//   })
// ]
// const columns2 = [
//   columnHelper.group({
//     header: 'Percobaan 2',
//     columns: [
//       columnHelper.group({
//         id: 'seri',
//         header: () => <span>Seri</span>,
//         // footer: props => props.column.id,
//         columns: [
//           columnHelper.accessor('seri', {
//             id: 'seri',
//             header: () => <span>No Seri</span>,
//           }),
//         ]
//       }),
//       columnHelper.group({
//         id: 'nilaiPerkenaan',
//         header: () => <span>Nilai Perkenaan</span>,
//         // footer: props => props.column.id,
//         columns: [
//           columnHelper.accessor('A', {
//             id: 'A',
//             header: () => <span>A</span>,
//             cell: EditableCell,
//             meta: {
//               type: 'number',
//             }
//           }),
//           columnHelper.accessor('B', {
//             id: 'B',
//             header: () => <span>B</span>,
//             cell: EditableCell,
//             meta: {
//               type: 'number',
//             }
//           }),
//           columnHelper.accessor('C', {
//             id: 'C',
//             header: () => <span>C</span>,
//             cell: EditableCell,
//             meta: {
//               type: 'number',
//             }
//           }),
//         ],
//       }),
//       columnHelper.group({
//         id: 'waktu',
//         header: () => <span>Waktu</span>,
//         // footer: props => props.column.id,
//         columns: [
//           columnHelper.accessor('waktu', {
//             id: 'waktu',
//             header: () => <span>Hasil Waktu</span>,
//             cell: EditableCell,
//             meta: {
//               type: 'time',
//             }
//           }),
//         ]
//       }),
//       columnHelper.group({
//         id: 'hasil',
//         header: () => <span>Hasil</span>,
//         // footer: props => props.column.id,
//         columns: [
//           columnHelper.accessor('hasil', {
//             id: 'hasil',
//             header: () => <span>Hasil (Centang)</span>,
//             cell: EditableCell,
//             meta: {
//               type: 'checkbox',
//             }
//           }),
//         ]
//       }),
//     ]
//   })
// ]

// const Table1 = () => {
//   const [data, setData] = useState(() => [...defaultData])
//   const table = useReactTable({
//     data,
//     columns: columns1,
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
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>
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
// const Table2 = () => {
//   const columns = [
//     {
//       Header: 'No',
//       accessor: 'no',
//       groupBy: true,
//     },
//     {
//       Header: 'Name',
//       accessor: 'name',
//     },
//     // Kolom-kolom lainnya
//   ];
//   const [data, setData] = useState(() => [...defaultData])
//   const table = useReactTable({
//     data,
//     columns: columns2,
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
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>
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
// interface Data {
//   no: number;
//   nama: string;
//   umur: number;
// }
// const data: Data[] = [
//   { no: 2, nama: 'Jane Doe', umur: 30 },
//   { no: 3, nama: 'Alice Smith', umur: 35 },
//   { no: 4, nama: 'Emily Brown', umur: 45 },
//   { no: 5, nama: 'Michael Davis', umur: 50 },
// ];
// const Stage1 = () => {
//   return (
//     <section className='flex flex-col gap-5'>
//       <Table1 />
//       <Table2 />
//       {/* <Percobaan data={data} /> */}
//     </section>
//   )
// }