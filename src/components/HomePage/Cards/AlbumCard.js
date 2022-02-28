import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function AlbumImgMediaCard({album}) {

  
  // console.log('album: ',album)


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={album.album.name}
        height="140"
        image = {album.album.images[0].url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {album.album.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Label: {album.album.label}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Tracks</Button>        
      </CardActions>
    </Card>
  );
}