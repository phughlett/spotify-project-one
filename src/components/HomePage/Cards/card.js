import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppContext from "../../../context/AppContext"
import { useContext } from 'react';

export default function ImgMediaCard({artist}) {

  console.log('URL', artist.images[0].url);



  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={artist.name}
        height="140"
        image = {artist.images[0].url} ? {artist.images[0].url} : {https://www.rit.edu/nsfadvance/sites/rit.edu.nsfadvance/files/default_images/photo-unavailable.png}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Album Name: {artist.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Placeholder text
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Favorite</Button>
        <Button size="small">Add to Playlist</Button>
      </CardActions>
    </Card>
  );
}