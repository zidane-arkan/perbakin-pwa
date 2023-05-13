import React from 'react'
import { useTable, Column } from 'react-table'

interface Data {
    no: number;
    nama: string;
    umur: number;
}
const data: Data[] = [
    { no: 1, nama: 'John', umur: 25 },
    { no: 2, nama: 'Mike', umur: 30 },
    { no: 2, nama: 'Lisa', umur: 32 },
    { no: 4, nama: 'Alex', umur: 27 },
    { no: 5, nama: 'Alex', umur: 27 },
];

const Percobaan: React.FC<{ data: Data[] }> = () => {
    const columns: Column<Data>[] = React.useMemo(
        () => [
            {
                Header: 'No',
                accessor: 'no',
                groupBy: true,
            },
            {
                Header: 'Nama',
                accessor: 'nama',
                Cell: ({ cell }) => (
                    <input
                        type="text"
                        value={cell.value}
                        onChange={(e) => {
                            cell.row.values.nama({ value: e.target.value });
                        }}
                    />
                ),
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
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell, cellIndex) => (
                                <td
                                    {...cell.getCellProps()}
                                    style={{
                                        border: 'solid 1px #ccc',
                                        padding: '8px',
                                        textAlign: 'left',
                                    }}
                                    rowSpan={
                                        cellIndex === 0 && rowIndex > 0 && row.cells[cellIndex].value === rows[rowIndex - 1].cells[cellIndex].value
                                            ? 0
                                            : 1
                                    }
                                    key={cellIndex}
                                >
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default Percobaan