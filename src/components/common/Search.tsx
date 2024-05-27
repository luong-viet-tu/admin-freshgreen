import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, memo, useCallback } from "react";

interface SearchProps {
  placeholder: string;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

const SearchForm = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "max-content",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(1),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50ch",
    },
  },
}));

const Search = memo((props: SearchProps) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      props.setSearchQuery(e.target.value);
    },
    [props]
  );

  return (
    <Box>
      <SearchForm>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={`Search ${props.placeholder}...`}
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
        />
      </SearchForm>
    </Box>
  );
});

export default Search;
