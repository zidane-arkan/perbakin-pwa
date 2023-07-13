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
    width: 400px;
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
      Seri: 1,
      NilaiPerkenaan: [2, 1, 3, 4, 2, 1, 3, 4, 2, 1, 3],
      Total: 0,
      HasilSeri: false
    },
    {
      Seri: 2,
      NilaiPerkenaan: [2, 1, 3, 4, 2, 1, 3, 4, 2, 1, 3],
      Total: 0,
      HasilSeri: false
    }
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    seriIndex: number,
    nilaiIndex: number
  ) => {
    const { value } = e.target;
    const updatedData = [...tableData];
    updatedData[seriIndex].NilaiPerkenaan[nilaiIndex] = parseInt(value, 10);

    // Hitung hasil penjumlahan dari kolom nilai perkenaan
    const total = updatedData[seriIndex].NilaiPerkenaan.reduce(
      (acc, cur) => acc + cur,
      0
    );
    updatedData[seriIndex].Total = total;

    setTableData(updatedData);
  };

  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    seriIndex: number
  ) => {
    const { checked } = e.target;
    const updatedData = [...tableData];
    updatedData[seriIndex].HasilSeri = checked;
    setTableData(updatedData);
    console.log(tableData);
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th colSpan={1}>Seri</th>
            <th colSpan={11}>Nilai Perkenaan</th>
            <th colSpan={1}>Total</th>
            <th colSpan={1}>Hasil Seri</th>
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
            <th>Jumlah</th>
            <th>Hasil</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <React.Fragment key={index}>
              <tr>
                <td rowSpan={2}>{row.Seri}</td>
                {row.NilaiPerkenaan.map((nilai, nilaiIndex) => (
                  <td key={nilaiIndex}>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={nilai}
                      onChange={(e) => handleInputChange(e, index, nilaiIndex)}
                    />
                  </td>
                ))}
                <td rowSpan={2}>{row.Total}</td>
                <td rowSpan={2}>
                  <input
                    type="checkbox"
                    id={`seri-${index}`}
                    name={`seri-${index}`}
                    value="benar"
                    checked={row.HasilSeri}
                    onChange={(e) => handleCheckbox(e, index)}
                  />
                </td>
              </tr>
              <tr>
                {row.NilaiPerkenaan.map((nilai, nilaiIndex) => (
                  <td key={nilaiIndex}>{nilai}</td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
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