import React from 'react';
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

const columns = [
    { id: 'no', label: 'No.', minWidth: 50 },
    { id: 'username', label: 'Username', minWidth: 150, align: 'center', },
    { id: 'email', label: 'Email', minWidth: 200, align: 'center', },
    { id: 'detail', label: 'Detail', minWidth: 150, align: 'center',}
]
const createData = (no, username, email, detail) => {
    return {no, username, email, detail };
}


const DetailButton = () => {
    let history = useHistory()
    return <button 
                className="detail-button" 
                onClick={() => history.push("/managerprofile")}
            >Detail</button>
}
//data này sau sẽ lấy về từ backend
const data = [
    {
        username: "user01",
        email: "user01@gmail.com"
    },
    {
        username: "user02",
        email: "user02@gmail.com"
    },
    {
        username: "user03",
        email: "user03@gmail.com"
    },
    {
        username: "user04",
        email: "user04@gmail.com"
    },
    {
        username: "user05",
        email: "user05@gmail.com"
    },
    {
        username: "user06",
        email: "user06@gmail.com"
    },
    {
        username: "user07",
        email: "user07@gmail.com"
    },
    {
        username: "user08",
        email: "user08@gmail.com"
    },
    {
        username: "user09",
        email: "user09@gmail.com"
    },
    {
        username: "user10",
        email: "user10@gmail.com"
    },
    {
        username: "user11",
        email: "user11@gmail.com"
    },
    {
        username: "user12",
        email: "user12@gmail.com"
    },
    {
        username: "user13",
        email: "user13@gmail.com"
    },
    {
        username: "user14",
        email: "user14@gmail.com"
    },
    {
        username: "user15",
        email: "user15@gmail.com"
    },
]
var isDone = false
const rows = []
const addData = () => {
    if(isDone === false) {  // ngăn auto insert data mỗi lần chuyển trang
        let i = 0;
        while (i < data.length) {
            let stt = i + 1
            console.log(stt)
            rows.push(createData(stt.toString(), data[i].username, data[i].email, <DetailButton /> ))
            console.log(rows[i])
            i += 1
        }
        isDone = true
    }
    else return ;
}

function DataTable() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { username, password } = useContext(UserContext);
    let history = useHistory();
    addData();

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
                            console.log(column.id)
                            return (
                                <TableCell key={column.id}
                                 align={column.align}
                                 >
                                 {value}
                                {/* {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value} */}
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