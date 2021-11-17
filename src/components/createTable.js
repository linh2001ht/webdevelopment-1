import React, { useState } from 'react';
import "../App.css"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useContext } from 'react';
import { UserContext } from './Authentication/UserContext';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllUser } from '../services/userService';

const columns = [
    { id: 'no', label: 'ID User', minWidth: 50 },
    { id: 'username', label: 'Username', minWidth: 150, align: 'center' },
    { id: 'email', label: 'Email', minWidth: 200, align: 'center' },
    { id: 'detail', label: 'Detail', minWidth: 150, align: 'center' }
]
const createData = (no, username, email, detail) => {
    return {no, username, email, detail };
}


const DetailButton = ({userID}) => {
    const [ profile, setProfile ] = useState({
        username: "",
        email: "",
        sex: "",
        age: 1
    });
    let history = useHistory()
    // khi kích vào nút này -> dựa vào userID để hiện thị lên cái profile của người đó 
    return <button 
                className="detail-button" 
                onClick={ async () => {
                    let res = await getAllUser(userID)
                    console.log("userID", userID)
                    console.log("res: " + res.users.id)
                    
                    history.push("/managerprofile")
                }}
            >Detail</button>
}

var isDone = false
const rows = []


function DataTable() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { username, password } = useContext(UserContext);
    let history = useHistory();

    const [row, setRow] = useState([])
    
    const getData = async () => {
        let response = await getAllUser("ALL")
        if(response && response.errCode === 0) {
            const data = response.users
            if(isDone === false) {
                console.log("run")
                data.forEach( (item) => {
                    if(item.role===0)
                        rows.push(createData(item.id, item.username, item.email, <DetailButton userID={item.id} />))
                })
                isDone = true
                setRow(rows)
                // return;
            } else {
                return;
            }
        }
    }

    getData()

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    return (
        <Paper className="paper-container" sx={{ width: '80%', overflow: 'hidden', margin: '20px auto'}}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} >
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id}
                                    align={column.align}
                                    >
                                    {value}
                                    </TableCell>
                                );
                                } 

                                )}
                            </TableRow>
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
}

export default DataTable;