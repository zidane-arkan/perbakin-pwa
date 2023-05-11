import React, { useEffect, useMemo, useState } from 'react'
import { Layout, LayoutChild } from '../../components/Layout'
import { HeaderWhiteCustom } from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import styled from 'styled-components';
// Gambar
// import avatar from '../../../app-assets/avatar.png';
import targetWhite from '../../../app-assets/targetwhite.png'
import mapPin from '../../../app-assets/map_pin.png'
import clock from '../../../app-assets/clock.png'
import peluruBulat from '../../../app-assets/pelurubulat.png';
import tambahPenguji from '../../../app-assets/tambahpenguji.png'
// react router dom
import { Link } from 'react-router-dom';

type HasilUjian = {
    no: string
    nama: string
    pengprov: string
    klub: string
    status: string
}
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
        font-size: 1rem;
        color : white;
        background-color : #036BB0;
    }
    th{
        font-size: 1rem;
        margin: 0;
        padding: 0.5rem;
        border-bottom: 2px solid #D5E4F0;
        border-right: 2px solid #D5E4F0;
        border-left: 2px solid #D5E4F0;
    }
    td {
        font-size: .9rem;
        margin: 0;
        padding: 0.3rem;
        border-bottom: 2px solid #D5E4F0;
        border-right: 2px solid #D5E4F0;
        border-left: 2px solid #D5E4F0;
        z-index: -1;
    }
    }

    .pagination {
    padding: 0.5rem;
    }
`
const defaultData: HasilUjian[] = [
    {
        no: '1',
        nama: 'linsley',
        pengprov: 'Sumsel',
        klub: 'Klub 1',
        status: 'Stage 2',
    },
    {
        no: '2',
        nama: 'miller',
        pengprov: 'Sumsel',
        klub: 'Klub 2',
        status: 'Gagal',
    },
];
const columnHelper = createColumnHelper<HasilUjian>()
const columns = [
    columnHelper.accessor('no', {
        cell: info => info.getValue(),
        header: () => <span>No</span>,
    }),
    columnHelper.accessor('nama', {
        cell: info => info.getValue(),
        header: () => <span>Nama</span>,
    }),
    columnHelper.accessor('pengprov', {
        cell: info => info.getValue(),
        header: () => <span>Pengprov</span>,
    }),
    columnHelper.accessor('klub', {
        cell: info => info.getValue(),
        header: () => <span>Klub</span>,
    }),
    columnHelper.accessor('status', {
        cell: info => info.getValue(),
        header: () => <span>Status</span>,
    }),
];
const TabelHasilUjian = () => {
    const [data, setData] = React.useState(() => [...defaultData])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <Styles>
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
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
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Styles>
    );
}
const HasilUjian = () => {
    const navigate = useNavigate();
    return (
        <Layout className={'rounded-3xl gap-8 mt-28 pt-[2%] overflow-hidden'}>
            <HeaderWhiteCustom typeIcon='returnblack' title='Hasil Ujian' />
            <LayoutChild className='flex-col gap-0 h-auto'>
                <form className='flex flex-col w-full h-auto justify-between'>
                    <div className="mb-6">
                        <input type="password" id="passlama" className="bg-gray-50 border-2 border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                </form>
                <TabelHasilUjian />
                <section></section>
            </LayoutChild>
        </Layout>
    );
}
export default HasilUjian