import React, {useState } from "react";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CustomTable from "pages/Admin/components/CustomTable";
import ConfirmDialog from "../ConfirmDialog";
import { showSuccessSnackbar } from "utils/snackbarUtils";

interface Column {
  id: string;
  label: string;
  [key: string]: any;
}

interface Data {
  [key: string]: any;
  id: null | number;
}

interface TablePageProps<T extends Data> {
  title: string;
  data: any;
  onAddNewItem: () => void;
  columns: Column[];
  onEditItem: (item: Data) => void;
  onDeleteItem: (item: Data) => void;
  searchValue: string;
  handleSearch: (item: string) => void;
  loading:boolean;
}

const TablePage = <T extends Data>({
  title,
  data,
  onAddNewItem,
  columns,
  onEditItem,
  onDeleteItem,
  searchValue,
  handleSearch,
  loading,
}: TablePageProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Data | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
    setTimeout(() => {
      setPage(0);
    }, 650);
  };
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleDelete = (item: Data) => {
    setItemToDelete(item);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onDeleteItem(itemToDelete);

      setItemToDelete(null);
    }
    setConfirmDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setConfirmDialogOpen(false);
    showSuccessSnackbar(
      "Deletion canceled",
      "The deletion action has been canceled."
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column"}}>
      <TextField
        label={`Search ${title}`}
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ marginBottom: 2, width:{xs:"85%" , sm:450}}}
        value={searchValue}
        onChange={handleSearchChange}
      />
      <LoadingButton
        variant="contained"
        color="primary"
        sx={{
          marginTop: "10px",
          width: "200px",
          height: "50px",
          alignSelf: "flex-end",
        }}
        onClick={onAddNewItem}
      >
        Add New {title}
      </LoadingButton>
      <CustomTable
        columns={columns}
        data={data}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onEdit={onEditItem}
        onDelete={handleDelete}
        loading={loading}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        title={`Confirm Delete`}
        description={`Are you sure you want to delete this ${title.toLowerCase()}?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  );
};

export default TablePage;
