// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';


const Styles = styled.div`
  padding: 1rem 0;
  overflow : scroll;
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

const Kualifikasi = () => {

  return (
    <Styles>
      <Percobaan1 />
    </Styles>
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