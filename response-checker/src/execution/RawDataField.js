import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";

const columns = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'statusCode', label: 'Status Code', sortable: true },
    { id: 'duration', label: 'Response Time (ms)', sortable: true },
];

export const RawDataField = ({ responses }) => {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [expandedRows, setExpandedRows] = useState([]);

    const handleSort = (field) => {
        const column = columns.find((col) => col.id === field);
        if (column.sortable) {
            if (sortField === field) {
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            } else {
                setSortField(field);
                setSortOrder('asc');
            }
        }
    };

    useEffect(() => {
        let tempRows = responses.map((response, index) => ({
            id: index + 1,
            statusCode: response.responseStatus,
            duration: response.duration,
            headers: response.responseHeaders,
            body: response.responseBody,
        }));

        tempRows.sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];
            if (sortOrder === 'asc') {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }
        });

        setRows(tempRows);
    }, [responses, sortField, sortOrder]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const toggleRow = (id) => {
        const expandedRowsCopy = [...expandedRows];
        const index = expandedRowsCopy.indexOf(id);
        if (index > -1) {
            expandedRowsCopy.splice(index, 1);
        } else {
            expandedRowsCopy.push(id);
        }
        setExpandedRows(expandedRowsCopy);
    };

    return (
        <Paper sx={{ width: '500px', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, cursor: column.sortable ? 'pointer' : 'default' }}
                                    onClick={() => handleSort(column.id)}
                                >
                                    {column.label}
                                    {column.sortable && (
                                        <span style={{ marginLeft: '4px', display: 'inline-block', transform: sortField === column.id ? `rotate(${sortOrder === 'asc' ? '180deg' : '0deg'})` : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                                          ▼
                                        </span>
                                    )}
                                </TableCell>
                            ))}
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                const isRowExpanded = expandedRows.includes(row.id);
                                return (
                                    <React.Fragment key={row.id}>
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => toggleRow(row.id)}
                                                >
                                                    {isRowExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        {isRowExpanded && (
                                            <TableRow>
                                                <TableCell colSpan={columns.length + 1}>
                                                    <div>{row.body}, {row.headers}</div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};
