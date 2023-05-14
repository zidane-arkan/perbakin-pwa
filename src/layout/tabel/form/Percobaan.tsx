import React from 'react'
import { useTable, Column } from 'react-table'

interface Data {
    no: number;
    nama: string;
    umur: number;
}
const data: Data[] = [
    { no: 1, nama: 'John', umur: 25 },
    { no: 1, nama: 'Mike', umur: 30 },
    { no: 2, nama: 'Lisa', umur: 32 },
    { no: 2, nama: 'Alex', umur: 27 },
    { no: 3, nama: 'Alex', umur: 27 },
];

const Percobaan: React.FC<{ data: Data[] }> = () => {
    const columns: Column<Data>[] = React.useMemo(
        () => [
            {
                Header: 'No',
                accessor: 'no',
                groupBy: true,
                Cell: ({ row }) => {
                    return row.subRows && row.subRows.length > 1 ? null : (<span>row.original.no</span>);
                },
            },
            {
                Header: 'Nama',
                accessor: 'nama',
                Cell: ({ row }) => {
                    return row.subRows && row.subRows.length > 1 ? null : (<span>row.original.nama</span>);
                },
            },
            {
                Header: 'Umur',
                accessor: 'umur',
            },
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<Data>({ columns, data });

    return (
        <table {...getTableProps()} style={{ borderCollapse: 'collapse' }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: 'solid 1px #ccc',
                                    padding: '8px',
                                    textAlign: 'left',
                                }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                    prepareRow(row);
                    return (
                        <React.Fragment key={rowIndex}>
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell, cellIndex) => (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            border: 'solid 1px #ccc',
                                            padding: '8px',
                                            textAlign: 'left',
                                        }}
                                        rowSpan={rowIndex === 0 ? row.subRows.length : 1}
                                        key={cellIndex}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                            {row.subRows && row.subRows.length > 1 && (
                                <tr>
                                    {row.cells.map((cell, cellIndex) => (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{
                                                border: 'solid 1px #ccc',
                                                padding: '8px',
                                                textAlign: 'left',
                                            }}
                                            key={cellIndex}
                                        ></td>
                                    ))}
                                </tr>
                            )}
                        </React.Fragment>
                    );
                })}
            </tbody>
        </table>
    )
}

export default Percobaan