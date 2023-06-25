import React, { useEffect, useMemo, useState } from 'react'
import { LayoutAdmin, LayoutChild } from '../../../components/Layout'
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
        <section>
            <div className='flex w-full justify-between items-center'>
                <h2 className='font-bold'>Hasil Ujian</h2>
                <Link to='hasilujian'>
                    <span className='text-[#1B79B8]' >Lihat Selengkapnya</span>
                </Link>
            </div>
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
        </section>
    );
}
const Admin = (props: any) => {
    return (
        <>
            <LayoutChild className='flex-col gap-8'>
                <section className='flex items-center w-full justify-between'>
                    <h2 className='font-bold'>Tentang Ujian</h2>
                    {/* <Link to='editujian'>
                        <span className='text-[#1B79B8]' >Edit Ujian</span>
                    </Link> */}
                </section>
                <section className='relative shadow-md overflow-hidden flex bg-[#F3FAFF] flex-col gap-4 items-start rounded-xl px-4 py-4'>
                    <div className='flex gap-2 items-start'>
                        <img className='pt-[2px]' src={mapPin} />
                        <div className='flex flex-col items-start'>
                            <h3 className='font-bold'>Lokasi</h3>
                            <p>Sumatera Selatan</p>
                        </div>
                    </div>
                    <div className='flex gap-2 items-start'>
                        <img className='pt-[2px]' src={clock} />
                        <div>
                            <h3 className='font-bold'>Waktu</h3>
                            <p>24 - 25 Mei 2023</p>
                        </div>
                    </div>
                    <span className='absolute top-[-3rem] right-[-4rem]'>
                        <img src={targetWhite} />
                    </span>
                </section>
                <section className='flex items-center gap-6'>
                    <Link className='flex pl-1 bg-white shadow-md pr-16 py-2 rounded-full' to='tambahpenembak'>
                        <div className='flex gap-2 items-center'>
                            <img src={peluruBulat} />
                            <span className='font-xl'>Tambah Penembak</span>
                        </div>
                    </Link>
                    <Link className='flex pl-1 bg-white shadow-md pr-16 py-2 rounded-full' to='tambahpenguji'>
                        <div className='flex gap-2 items-center'>
                            <img src={tambahPenguji} />
                            <span className='font-xl'>Tambah Penguji</span>
                        </div>
                    </Link>
                </section>
                <TabelHasilUjian />
            </LayoutChild>
        </>
    )
}

export default Admin