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
import arrowdown from '../../app-assets/arrowdown.png'
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
    {
        no: '3',
        nama: 'miller',
        pengprov: 'Sumsel',
        klub: 'Klub 2',
        status: 'Gagal',
    },
    {
        no: '4',
        nama: 'miller',
        pengprov: 'Sumsel',
        klub: 'Klub 2',
        status: 'Gagal',
    },
    {
        no: '5',
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
            <LayoutChild className='flex-col gap-4 h-auto'>
                <form className='flex w-full h-auto items-center justify-between'>
                    <div className="w-[80%] relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#1B79B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </span>
                        <input type="text" className="w-full py-3 pl-10 pr-4 shadow-md text-gray-700 bg-white border rounded-full focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Cari" />
                    </div>
                    <button type='button' className="flex items-center justify-center w-[15%] h-full rounded-full bg-[#1B79B8]">
                        <img src={arrowdown} alt='arrow-down' />
                    </button>
                </form>
                <TabelHasilUjian />
                <section className='flex w-full justify-between items-start'>
                    <div className='flex flex-col gap-4 items-start'>
                        <span className='flex gap-2 text-[#62DE5F]'>
                            <div className='w-[15px] h-[15px] rounded-md bg-[#62DE5F]'></div>
                            Sedang Aktif
                        </span>
                        <span className='flex gap-2 text-[#E9D528]'>
                            <div className='w-[15px] h-[15px] rounded-md bg-[#E9D528]'></div>
                            Akan Memulai
                        </span>
                    </div>
                    <div className='flex flex-col gap-4 items-start'>
                        <span className='flex gap-2 text-[#FC443E]'>
                            <div className='w-[15px] h-[15px] rounded-md bg-[#FC443E]'></div>
                            Gagal
                        </span>
                        <span className='flex gap-2 text-[#0047FF]'>
                            <div className='w-[15px] h-[15px] rounded-md bg-[#0047FF]'></div>
                            Lulus Ujian
                        </span>
                    </div>
                </section>
            </LayoutChild>
        </Layout>
    );
}
export default HasilUjian