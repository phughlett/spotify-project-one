import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import SearchAppBar from '../../AppBar/AppBar';
import AppContext from "../../../context/AppContext"
import ResponsiveGrid from './ResponsiveGrid';
import ReactifyLogo from '../../LogonPage/ReactifyLogo.png'
import '../homepage.css'

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: 'transparent',
        // bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        // border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function GridTemplateRows() {

  let {renderTrack, logout} = useContext(AppContext);

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}>
        <Item style={{font: "sans-serif"}} className="homepage-toprow">
            <div className="logo-and-icon">
              <img src={ReactifyLogo} className="homepage-icon" />
              <span><h1 className="homepage-logo">Reactify</h1></span>
            </div>
            <button className="logout-button" onClick={logout}>Logout</button>
        </Item>
        <Item className="homepage-appbar"><SearchAppBar/></Item>
        <Item className="homepage-content"><ResponsiveGrid /></Item>
      </Box>
    </div>
  );
}