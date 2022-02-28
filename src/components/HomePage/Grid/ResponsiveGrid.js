import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AppContext from "../../../context/AppContext"
import { useContext } from 'react';
import SearchImgMediaCard from '../Cards/SearchCard';
import PlaylistImgMediaCard from '../Cards/PlaylistCard';
import ArtistImgMediaCard from '../Cards/ArtistCard';
import AlbumImgMediaCard from '../Cards/AlbumCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {  

  
  let {searchResultArtists, userPlaylists, userArtists, userAlbums, searchFlag, playlistFlag, artistFlag, albumFlag} = useContext(AppContext);
  
  

    if(searchFlag){

      return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(searchResultArtists).map((artist, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
              <Item><SearchImgMediaCard artist={artist} /></Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      )


    }else if(playlistFlag){

      return(

      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(userPlaylists).map((playList, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item style={{backgroundColor: 'transparent'}}><PlaylistImgMediaCard playlist={playList} /></Item>
          </Grid>
        ))}
      </Grid>
      </Box>
      )

    }else if(artistFlag){
      return(
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(userArtists).map((artist, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item style={{backgroundColor: 'transparent'}}><ArtistImgMediaCard artist={artist} /></Item>
          </Grid>
        ))}
      </Grid>
      </Box>
      )

    }else if(albumFlag){

      return(

      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(userAlbums).map((album, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item style={{backgroundColor: 'transparent'}}><AlbumImgMediaCard album={album} /></Item>
          </Grid>
        ))}
      </Grid>
      </Box>
      )

    }else{
      return(<div></div>)
    }

   
  
}