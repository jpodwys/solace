import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, InputAdornment, TextField } from "@mui/material";

interface SearchInputProps {
  query: string;
  reset: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ query, reset, onChange }: SearchInputProps) => {
  return (
    <TextField
      fullWidth
      id="search"
      label="Search"
      variant="outlined"
      onChange={onChange}
      value={query}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={reset} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchInput;
