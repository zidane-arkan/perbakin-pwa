import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react'

import styled from 'styled-components';
const Styles = styled.div`
  padding: 1rem 0;
  overflow : scroll;
  table {
    border-spacing: 0;
    border: 1px solid black;
    border-radius : 12px
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

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
type kualifikasi20 = {
  seri: string;
  '0': number;
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  '6': number;
  '7': number;
  '8': number;
  '9': number;
  '10': number;
  total: number;
  hasil: boolean;
};
const defaultData: kualifikasi20[] = [
  {
    seri: '1',
    '0': 1,
    '1': 1,
    '2': 1,
    '3': 1,
    '4': 1,
    '5': 1,
    '6': 1,
    '7': 1,
    '8': 1,
    '9': 1,
    '10': 1,
    total: 11,
    hasil: false,
  },
  {
    seri: '2',
    '0': 2,
    '1': 2,
    '2': 2,
    '3': 2,
    '4': 2,
    '5': 2,
    '6': 2,
    '7': 2,
    '8': 2,
    '9': 2,
    '10': 1,
    total: 12,
    hasil: false,
  },
];

const columnHelper = createColumnHelper<kualifikasi20>();
const columns = [
  columnHelper.group({
    id: 'seri',
    header: () => <span>Seri</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor('seri', {
        id: 'seri',
        header: () => <span>No Seri</span>,
      }),
    ]
  }),
  columnHelper.group({
    id: 'nilaiPerkenaan',
    header: () => <span>Nilai Perkenaan</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor('0', {
        id: '0',
        header: () => <span>0</span>,
      }),
      columnHelper.accessor('1', {
        id: '1',
        header: () => <span>1</span>,
      }),
      columnHelper.accessor('2', {
        id: '2',
        header: () => <span>2</span>,
      }),
      columnHelper.accessor('3', {
        id: '3',
        header: () => <span>3</span>,
      }),
      columnHelper.accessor('4', {
        id: '4',
        header: () => <span>1</span>,
      }),
      columnHelper.accessor('5', {
        id: '5',
        header: () => <span>5</span>,
      }),
      columnHelper.accessor('6', {
        id: '6',
        header: () => <span>6</span>,
      }),
      columnHelper.accessor('7', {
        id: '7',
        header: () => <span>7</span>,
      }),
      columnHelper.accessor('8', {
        id: '8',
        header: () => <span>8</span>,
      }),
      columnHelper.accessor('9', {
        id: '9',
        header: () => <span>9</span>,
      }),
      columnHelper.accessor('10', {
        id: '10',
        header: () => <span>10</span>,
      }),
    ],
  }),
  columnHelper.group({
    id: 'total',
    header: () => <span>Total</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor('total', {
        id: 'total',
        header: () => <span>Jumlah Total</span>,
      }),
    ]
  }),
  columnHelper.group({
    id: 'hasil',
    header: () => <span>Hasil</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor('hasil', {
        id: 'hasil',
        header: () => <span>Hasil (Centang)</span>,
      }),
    ]
  }),
]

const Kualifikasi = () => {
  const [data, setData] = useState(() => [...defaultData])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <Styles>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Styles>
  )
}

export default Kualifikasi