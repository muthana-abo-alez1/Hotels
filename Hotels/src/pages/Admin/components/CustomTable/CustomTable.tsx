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
  onDelete: (item: Data, event: React.MouseEvent) => void;
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
        minWidth: 300,
        height: "auto",
        marginTop: "20px",
        marginBottom: "20px",
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
                  backgroundColor: theme.palette.primary.main,
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
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  sx={{ height: 50, cursor: "pointer" }}
                  onClick={() => onEdit(row)}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "center"}
                      sx={{
                        height: 73.5,
                        width: "auto",
                        maxWidth: column.width,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflowWrap: "normal",
                        "@media (max-width: 600px)": {
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: "50px",
                        },
                        "@media (max-width: 900px)": {
                          maxWidth: "70px",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        },
                        "@media (max-width: 1000px)": {
                          maxWidth: "80px",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
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
                  <TableCell align="center" sx={{ minWidth: "150px" }}>
                    <IconButton
                      color="primary"
                      onClick={(event) => onEdit(row)}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(1, 187, 255, 0.1)", 
                          borderRadius: "50%", 
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={(event) => onDelete(row, event)}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(255, 0, 0, 0.1)", 
                          borderRadius: "50%", 
                        },
                      }}
                    >
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