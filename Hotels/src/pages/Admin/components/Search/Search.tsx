import React, { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
interface SearchProps {
  onImageUpload: (url: string) => void;
  url: string; 
}
const Search: React.FC <SearchProps>= (title) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };


  return (
    <TextField
      label={`Search ${title}`}
      variant="outlined"
      value={searchQuery}
      onChange={handleSearchChange}
      fullWidth
      sx={{ maxWidth: 400 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
