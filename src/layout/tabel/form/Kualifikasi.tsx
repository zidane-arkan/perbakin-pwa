import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react'

import styled from 'styled-components';
const Styles = styled.div`
  padding: 1rem;

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
    total: 10,
    hasil: false,
  },
];

const columnHelper = createColumnHelper<kualifikasi20>();
const columns = [
  columnHelper.accessor('seri', {
    header: 'Seri',
  }),
  columnHelper.group({
    id: 'hello',
    header: () => <span>Hello</span>,
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
        header: () => <span>1</span>,
      }),
      columnHelper.accessor('3', {
        id: '3',
        header: () => <span>1</span>,
      }),
      columnHelper.accessor('4', {
        id: '4',
        header: () => <span>1</span>,
      }),
      columnHelper.accessor('5', {
        id: '5',
        header: () => <span>1</span>,
      }),
      columnHelper.accessor('6', {
        id: '6',
        header: () => <span>1</span>,
      }),
      columnHelper.accessor('7', {
        id: '7',
        header: () => <span>1</span>,
      }),
      columnHelper.accessor('8', {
        id: '8',
        header: () => <span>1</span>,
      }),
      columnHelper.accessor('9', {
        id: '9',
        header: () => <span>1</span>,
      }),
      columnHelper.accessor('10', {
        id: '10',
        header: () => <span>1</span>,
      }),
    ],
  }),
  columnHelper.accessor('total', {
    header: 'Total',
  }),
  columnHelper.accessor('hasil', {
    header: 'Hasil',
  }),
]
const Kualifikasi = () => {

  return (
    <Styles>

    </Styles>
  )
}

export default Kualifikasi