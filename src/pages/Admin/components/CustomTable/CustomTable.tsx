import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  useTheme,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Column {
  id: string;
  label: string;
  align?: "right" | "center" | "left";
  width?: string | number;
}

interface Data {
  [key: string]: any;
  id: null | number;
}

interface CustomTableProps {
  columns: Column[];
  data: Data[];
  page: number;
  rowsPerPage: number;
  onChangePage: (newPage: number) => void;
  onChangeRowsPerPage: (newRowsPerPage: number) => void;
  onEdit: (item: Data) => void;
  onDelete: (item: Data) => void;
  loading: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onEdit,
  onDelete,
  loading,
}) => {
  const theme = useTheme();
  const currentData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      sx={{
        width: "100%",
        height: "auto",
        marginTop: "20px",
        "@media (max-width: 1000px)": {
          width: "80vw",
        },
        "@media (max-width: 700px)": {
          width: "75vw",
        },
      }}
    >
      <TableContainer
        sx={{
          height: 400,
          overflowY: "auto",
          minWidth: 300,
          minHeight: 425,
          "@media (max-width: 600px)": {
            height: "calc(100% - 48px)",
          },
        }}
      >
        <Table stickyHeader aria-label="custom table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "center"}
                  sx={{
                    height: 50,
                    width: column.width || "auto",
                    maxHeight: 50,
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                key="actions"
                align="center"
                sx={{
                  height: 50,
                  backgroundColor:theme.palette.primary.main 
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          {loading ? (
            <div
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
                width: "95%",
              }}
            >
              <CircularProgress />
            </div>
          ) : data.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  No data available
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {currentData.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} sx={{ height: 50 }}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "center"}
                      sx={{
                        height: 50,
                        width: "auto",
                        maxWidth: column.width || "auto",
                        lineHeight: "1.2em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        overflowWrap: "break-word",
                        "@media (max-width: 600px)": {
                          maxHeight: "3.6em",
                          textWrap: "nowrap",
                        },
                      }}
                    >
                      {typeof row[column.id] === "boolean"
                        ? row[column.id]
                          ? "Available"
                          : "Unavailable"
                        : row[column.id]}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => onEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete(row)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => onChangePage(newPage)}
        onRowsPerPageChange={(event) =>
          onChangeRowsPerPage(parseInt(event.target.value, 10))
        }
        sx={{
          backgroundColor: theme.palette.primary.main,
          paddingLeft: { sx: 0, sm: "auto" },
          paddingRight: { sx: 0, sm: "auto" },
          "p.MuiTablePagination-selectLabel": {
            display: { xs: "none", sm: "block" },
          },
        }}
      />
    </Paper>
  );
};

export default CustomTable;
