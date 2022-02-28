import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function PlaylistImgMediaCard({playlist}) {


  // console.log("Playlist: ", playlist);



  return (
    
    <Card sx={{ maxWidth: 345}}>
      <CardMedia
        component="img"
        alt={playlist.name}
        height="140"
        image = {playlist.images[0].url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {playlist.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Owner: {playlist.owner.display_name}          
        </Typography>
      </CardContent>
      <CardActions>
      <Button size="small">Tracks</Button>     
      </CardActions>
    </Card>
  );
}