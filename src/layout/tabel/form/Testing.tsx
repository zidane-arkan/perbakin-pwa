import * as React from "react";
import { useTable, useRowState } from "react-table";

type Data = {
    actor: string;
    movie: string;
};

const borderStyle = {
    border: "1px solid gray",
    padding: "8px 10px"
};

function useInstance(instance) {
    const { allColumns } = instance;

    let rowSpanHeaders = [];

    allColumns.forEach((column, i) => {
        const { id, enableRowSpan } = column;

        if (enableRowSpan !== undefined) {
            rowSpanHeaders = [
                ...rowSpanHeaders,
                { id, topCellValue: null, topCellIndex: 0 }
            ];
        }
    });

    Object.assign(instance, { rowSpanHeaders });
}

const Testing = () => {
    const origData = [
        {
            actor: "Johnny Depp",
            movies: [
                {
                    name: "Pirates of the Carribean 1"
                },
                {
                    name: "Pirates of the Carribean 2"
                },
                {
                    name: "Pirates of the Carribean 3"
                },
                {
                    name: "Pirates of the Carribean 4"
                }
            ]
        }
    ];
    const newData: Array<Data> = [];
    origData.forEach(actorObj => {
        actorObj.movies.forEach(movie => {
            newData.push({
                actor: actorObj.actor,
                movie: movie.name
            });
        });
    });
    const data = React.useMemo(() => newData, []);
    const columns = React.useMemo(
        () => [
            {
                Header: "Actor",
                accessor: "actor",
                enableRowSpan: true
            },
            {
                Header: "Movies",
                accessor: "movie",
                Cell: ({ cell }) => {
                    return <input value={cell.value} onChange={(e) => cell.setValue(e.target.value)} />;
                }
            }
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        rowSpanHeaders
    } = useTable({ columns, data }, hooks => {
        hooks.useInstance.push(useInstance);
    });
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} style={borderStyle}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);

                    for (let j = 0; j < row.allCells.length; j++) {
                        let cell = row.allCells[j];
                        let rowSpanHeader = rowSpanHeaders.find(
                            x => x.id === cell.column.id
                        );

                        if (rowSpanHeader !== undefined) {
                            if (
                                rowSpanHeader.topCellValue === null ||
                                rowSpanHeader.topCellValue !== cell.value
                            ) {
                                cell.isRowSpanned = false;
                                rowSpanHeader.topCellValue = cell.value;
                                rowSpanHeader.topCellIndex = i;
                                cell.rowSpan = 1;
                            } else {
                                rows[rowSpanHeader.topCellIndex].allCells[j].rowSpan++;
                                cell.isRowSpanned = true;
                            }
                        }
                    }
                    return null;
                })}
                {rows.map(row => {
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                if (cell.isRowSpanned) return null;
                                else
                                    return (
                                        <td
                                            style={borderStyle}
                                            rowSpan={cell.rowSpan}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Testing