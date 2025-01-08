import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { inventory } from '../SampleData';

export default function InventoryList() {

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Edition</TableCell>
                <TableCell>Quantity</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {inventory.map((item) => (
                <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.edition}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
    }