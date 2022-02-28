import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AppContext from "../../context/AppContext"
import { useContext } from 'react';
import { ButtonGroup, Button } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const reactifyTheme = createTheme({
  palette: {
    primary: {
      main: '#1DB954',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff'
    }
  }
})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {

  let {setSearchKey, search, getUserArtists, getUserPlaylists, getUserAlbums} = useContext(AppContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: "#1DB954"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
          <ThemeProvider theme={reactifyTheme}>
            <ButtonGroup 
              variant="contained" 
              aria-label="outlined primary button group"
            >
              <Button onClick={getUserPlaylists}>Playlists</Button>
              <Button onClick={getUserArtists}>Artists</Button>
              <Button onClick={getUserAlbums}>Albums</Button>
            </ButtonGroup>
          </ThemeProvider>
          </IconButton>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, font: 'sans-serif' }}
          >

          </Typography> */}
            <Search onChange={e => setSearchKey(e.target.value)}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <form onSubmit={e => search(e)}>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'sans-serif-label': 'search' }}
                >
              </StyledInputBase>
              </form>
            </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}