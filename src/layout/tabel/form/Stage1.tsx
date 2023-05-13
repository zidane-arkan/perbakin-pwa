import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTable, useGroupBy } from 'react-table';
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components';
import Percobaan from './Percobaan';
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
type STAGE1 = {
  seri: string;
  A: number;
  B: number;
  C: number;
  waktu: string;
  hasil: boolean;
};
const defaultData: STAGE1[] = [
  {
    seri: '1',
    A: 1,
    B: 2,
    C: 3,
    waktu: '00:00',
    hasil: false,
  },
  {
    seri: '2',
    A: 1,
    B: 2,
    C: 3,
    waktu: '00:00',
    hasil: false,
  },
  {
    seri: '3',
    A: 1,
    B: 2,
    C: 3,
    waktu: '00:00',
    hasil: false,
  },
  {
    seri: '4',
    A: 1,
    B: 2,
    C: 3,
    waktu: '00:00',
    hasil: false,
  },
];
const columnHelper = createColumnHelper<STAGE1>();

const EditableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };
  return columnMeta?.type === 'number' ? (
    <input className='w-[30px] text-center'
      min={0}
      max={10}
      type="number"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  ) : (
    <input className='w-[100px] text-center'
      min='00:00'
      max='00:55'
      type={columnMeta?.type || "text"}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
}

const columns1 = [
  columnHelper.group({
    header: 'Percobaan 1',
    columns: [
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
          columnHelper.accessor('A', {
            id: 'A',
            header: () => <span>A</span>,
            cell: EditableCell,
            meta: {
              type: 'number',
            }
          }),
          columnHelper.accessor('B', {
            id: 'B',
            header: () => <span>B</span>,
            cell: EditableCell,
            meta: {
              type: 'number',
            }
          }),
          columnHelper.accessor('C', {
            id: 'C',
            header: () => <span>C</span>,
            cell: EditableCell,
            meta: {
              type: 'number',
            }
          }),
        ],
      }),
      columnHelper.group({
        id: 'waktu',
        header: () => <span>Waktu</span>,
        // footer: props => props.column.id,
        columns: [
          columnHelper.accessor('waktu', {
            id: 'waktu',
            header: () => <span>Hasil Waktu</span>,
            cell: EditableCell,
            meta: {
              type: 'time',
            }
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
            cell: EditableCell,
            meta: {
              type: 'checkbox',
            }
          }),
        ]
      }),
    ]
  })
]
const columns2 = [
  columnHelper.group({
    header: 'Percobaan 2',
    columns: [
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
          columnHelper.accessor('A', {
            id: 'A',
            header: () => <span>A</span>,
            cell: EditableCell,
            meta: {
              type: 'number',
            }
          }),
          columnHelper.accessor('B', {
            id: 'B',
            header: () => <span>B</span>,
            cell: EditableCell,
            meta: {
              type: 'number',
            }
          }),
          columnHelper.accessor('C', {
            id: 'C',
            header: () => <span>C</span>,
            cell: EditableCell,
            meta: {
              type: 'number',
            }
          }),
        ],
      }),
      columnHelper.group({
        id: 'waktu',
        header: () => <span>Waktu</span>,
        // footer: props => props.column.id,
        columns: [
          columnHelper.accessor('waktu', {
            id: 'waktu',
            header: () => <span>Hasil Waktu</span>,
            cell: EditableCell,
            meta: {
              type: 'time',
            }
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
            cell: EditableCell,
            meta: {
              type: 'checkbox',
            }
          }),
        ]
      }),
    ]
  })
]

const Table1 = () => {
  const [data, setData] = useState(() => [...defaultData])
  const table = useReactTable({
    data,
    columns: columns1,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: ({ rowIndex, columnId, value }: any) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });
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
const Table2 = () => {
  const columns = [
    {
      Header: 'No',
      accessor: 'no',
      groupBy: true,
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    // Kolom-kolom lainnya
  ];
  const [data, setData] = useState(() => [...defaultData])
  const table = useReactTable({
    data,
    columns: columns2,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: ({ rowIndex, columnId, value }: any) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });
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
const Stage1 = () => {
  return (
    <section className='flex flex-col gap-5'>
      <Table1 />
      <Table2 />
      {/* <Percobaan /> */}
    </section>
  )
}

export default Stage1