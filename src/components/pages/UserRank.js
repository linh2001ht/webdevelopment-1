import * as React from "react";
import { getAllUser } from "../../services/userService"
import { UserContext } from "../Authentication/UserContext"
import { useContext } from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import NavigationBar from "../navigationBar";

const columns = [
  {
    id: "no",
    label: "Rank No.",
    minWidth: 70,
    align: "center",
    format: (value) => value.toLocaleString("en-US")
  },
  {
    id: "username",
    label: "Username",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US")
  },
  {
    id: "score",
    label: "Score",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US")
  }
];

const createData = (no, username, score) => {
  return {no, username, score};
}

const rows = []
var isDone = false 

const DefaultRows = [
  { no: 1, name: "Player 1", score: 100 },
  { no: 2, name: "Player 2", score: 99 },
  { no: 3, name: "Player 3", score: 98 },
  { no: 4, name: "Player 4", score: 95 },
  { no: 5, name: "Player 5", score: 93 },
  { no: 6, name: "Player 6", score: 92 },
  { no: 7, name: "Player 7", score: 91 },
  { no: 8, name: "Player 8", score: 90 },
  { no: 9, name: "Player 9", score: 88 },
  { no: 10, name: "Player 10", score: 85 },
  { no: 11, name: "Player 11", score: 83 },
  { no: 12, name: "Player 12", score: 82 },
  { no: 13, name: "Player 13", score: 80 },
  { no: 14, name: "Player 14", score: 79 },
  { no: 15, name: "Player 15", score: 77 },
  { no: 16, name: "Player 6", score: 72 },
  { no: 17, name: "Player 7", score: 71 },
  { no: 18, name: "Player 8", score: 70 },
  { no: 19, name: "Player 9", score: 68 },
  { no: 20, name: "Player 10", score: 65 }
];


export default function UserRank() {

  console.log("render")

  const { username, userID, profile, setUsername, setProfile, highScore, setHighScore } = useContext(UserContext)
  const [row, setRow] = React.useState([]);
  const [searched, setSearched] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState(null);

  

  const getData = async () => {
    let response = await getAllUser("ALL")
    if(response && response.errCode === 0) {
        const data = response.users
        if(isDone === false) {
            console.log("run")
            data.forEach((item, index) => {
                if(item.role===0)
                    rows.push(createData(index, item.username, item.score))
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

    console.log(row)

    // let your_rank = row.find((r) => {
    //   return r.username === username;
    // });

    const your_rank = { no: 1, username: "player11", score: 96 }


  const onSearch = (event) => {
    let str = event === undefined ? "" : event.target.value;
    setSearched(str);
    const filteredRows = row.filter((r) => {
      return r.username.toLowerCase().includes(str.toLowerCase());
    });
    setRow(filteredRows);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("BEFORe onserach", row)

    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box sx={{ flexGrow: 1 }}>
      <NavigationBar />
      </Box>
      <Typography my={2} variant="h5" style={{ textAlign: "center" }}>
        LEADERBOARD
      </Typography>
      <Toolbar>
        <TextField onChange={onSearch} value={searched} />
      </Toolbar>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ fontWeight: "bold", minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              <TableCell
                align="center"
                style={{ top: 57, backgroundColor: "skyblue" }}
              >
                YOU #{your_rank.no}
              </TableCell>
              <TableCell
                align="center"
                style={{ top: 57, backgroundColor: "skyblue" }}
              >
                {your_rank.username}
              </TableCell>
              <TableCell
                align="center"
                style={{ top: 57, backgroundColor: "skyblue" }}
              >
                {your_rank.score}
              </TableCell>
            </TableRow>
          </TableHead>

          {console.log("HAHAHA", row)}

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((r) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={r.code}>
                    {columns.map((column) => {
                      const value = r[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
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
