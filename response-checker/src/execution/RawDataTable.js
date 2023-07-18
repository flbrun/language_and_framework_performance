import React, { useState, useEffect } from 'react';
import Paper from "@mui/material/Paper";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import Button from "@mui/material/Button";

const columns = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'statusCode', label: 'Status Code', sortable: true },
    { id: 'duration', label: 'Response Time (ms)', sortable: true },
];

export const RawDataTable = ({ responses }) => {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [expandedRows, setExpandedRows] = useState([]);
    const [open, setOpen] = React.useState(false);

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

    const handleClickOpen = () => {
        setOpen(true);
    };
    const dialogField = (body) =>
    {
        if (!body || body.trim() === "") {
            body = "No Data";
        }

        return (
            <Dialog open={open}
                    onClose={handleClose}
                    scroll={"paper"}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description">
                <DialogTitle id="scroll-dialog-title">Request Body</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}>
                        {body}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

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

    const getRowBackgroundColor = (statusCode) => {
        if (statusCode >= 200 && statusCode <= 299) {
            return  "#eaffeb";
        } else if (statusCode >= 300 && statusCode <= 399) {
            return "#ebeaff";
        } else if (statusCode >= 400 && statusCode <= 499) {
            return "#fff6ea";
        } else if ((statusCode >= 500 && statusCode <= 599) || statusCode ==="Err") {
            return  "#ffebea";
        } else {
            return "inherit";
        }
    };

    const rowDetails = (row) =>
    {
        try {
            return (
                <div>
                    <Button variant="outlined" onClick={handleClickOpen}>Show Body</Button>
                    {dialogField(row.body)}
                        <Table size="small" sx={{ fontSize: '12px'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell key="header" colSpan={2}><b>Header</b></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell key="headerName"><b>Name</b></TableCell>
                                    <TableCell key="headerValue"><b>Value</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.headers.map((header, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{header.name}</TableCell>
                                        <TableCell sx={{ maxWidth: "350px", wordBreak: "break-word" }}>{header.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                </div>

            );
        }catch (err){ return <p>No Data {err}</p>}
    }

    return (
        <Paper sx={{ width: '500px',minHeight:'100px',  maxHeight: '500px',}}>
            <TableContainer sx={{width: '500px', maxHeight:'450px' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        cursor: column.sortable ? 'pointer' : 'default' }}
                                    onClick={() => handleSort(column.id)}
                                >
                                    {column.label}
                                    {column.sortable && (
                                        <span style={{
                                            marginLeft: '4px',
                                            display: 'inline-block',
                                            transform: sortField === column.id ? `rotate(${sortOrder === 'asc' ? '180deg' : '0deg'})` : 'rotate(0deg)',
                                            transition: 'transform 0.2s' }}>
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
                                        <TableRow hover tabIndex={-1} sx={{ backgroundColor: getRowBackgroundColor(row.statusCode)}}>
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
                                                    {rowDetails(row)}
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
                sx={{height:'60px'}}
                rowsPerPageOptions={[10, 25, 100, 1000, 5000]}
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
