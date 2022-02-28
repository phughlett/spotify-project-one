import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function ArtistImgMediaCard({artist}) {

  let url = "";

  // console.log("userartist: ", artist);

  if(artist.images.length === 0){
    url ="https://www.rit.edu/nsfadvance/sites/rit.edu.nsfadvance/files/default_images/photo-unavailable.png"
  }else{
    url = artist.images[0].url
  }

  
  
 

  // console.log('URL', url);


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={artist.name}
        height="140"
        image = {url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {artist.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Followers: {artist.followers.total}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Favorite</Button>
        <Button size="small">Add to Playlist</Button>
      </CardActions>
    </Card>
  );
}