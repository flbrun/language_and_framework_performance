import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Box } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID'},
    { field: 'statusCode', headerName: 'Status Code'},
    { field: 'duration', headerName: 'Response Time', width: 300 },
];

export const RawDataField = ({ responses }) => {
    const [rows, setRows] = useState([]);
    const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] = useState([]);

    useEffect(() => {
        let tempRows = responses.map((response, index) => ({
            id: index + 1,
            statusCode: response.responseStatus,
            duration: response.duration,
            // headers: response.responseHeaders,
            // body: response.responseBody,
        }));

        setRows(tempRows);
    }, [responses]);

    const handleDetailPanelExpandedRowIdsChange = useCallback((newIds) => {
        setDetailPanelExpandedRowIds(newIds);
    }, []);

    return (
        <Box sx={{ width: '450px' }}>
            <Box sx={{ height: 400, mt: 1 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowThreshold={0}
                    getDetailPanelContent={({ row }) => <Box sx={{ p: 2 }}>{`Order #${row.id}`}</Box>}
                    getDetailPanelHeight={() => 50}
                    detailPanelExpandedRowIds={detailPanelExpandedRowIds}
                    onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
                />
            </Box>
        </Box>
    );
};
