import { useState, useContext } from "react";
import { useTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  InputAdornment,
  TextField,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import InfluencerContext from "../hooks/SelectContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

type TablePaginationActionsProps = {
  count: number;
  onPageChange: (...args: any[]) => any;
  page: number;
  rowsPerPage: number;
};

const TablePaginationActions: React.FC<TablePaginationActionsProps> = (props: {
  count: any;
  page: any;
  rowsPerPage: any;
  onPageChange: any;
}) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;
  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };
  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };
  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };
  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

export default function DataList({ type, data }: any) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { setSelected } = useContext(InfluencerContext);

  const handleSelected = (id: string) => {
    fetch(`https://takumi-frontend-express-server.vercel.app/${type}/${id}`)
      .then((response) => response.json())
      .then((data) => setSelected(data));
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: {
    target: {
      value: string;
    };
  }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TextField
        id="search"
        type="search"
        label="Search ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ width: "100%", my: 3 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">{type} Name</StyledTableCell>
              <StyledTableCell align="right">ID</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row: any) => {
              if (
                searchTerm === "" ||
                row.id.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return (
                  <StyledTableRow
                    key={row.id}
                    onClick={() => handleSelected(row.id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <StyledTableCell align="left">
                      <Stack
                        direction="row"
                        spacing={3}
                        sx={{
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Avatar
                          src={
                            (type === "Brands" && row.logo) ||
                            (type === "Influencers" && row.avatar) ||
                            (type === "Campaigns" && row.coverImage)
                          }
                          sx={{ width: 32, height: 32, mr: 2 }}
                        />
                        {row.firstName && row.firstName + " " + row.lastName}
                        {row.name && row.name}
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.id}</StyledTableCell>
                  </StyledTableRow>
                );
              }
              return null;
            })}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
