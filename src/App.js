import './App.css';
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import AppContext from './context/AppContext';
import {useEffect, useState} from 'react';
import LogonPage from './components/LogonPage/LogonPage';
import HomePage from './components/HomePage/HomePage';




function App() {

  //states
  const [token, setToken] = useState( "" )
  const [searchKey, setSearchKey] = useState( "" )
  const [searchResultArtists, setSearchResultArtists] = useState( [] )
  const [searchResultAlbums, setSearchResultAlbums] = useState( [] )
  const [searchResultPlaylists, setSearchResultPlaylists] = useState([])
  const [searchResultTracks, setSearchResultTracks] = useState([])
  const [userPlaylists, setUserPlaylists] = useState( [] )
  const [userArtists, setUserArtists] = useState( [] )
  const [userAlbums, setUserAlbums] = useState( [] )
  const [searchFlag, setSearchFlag] = useState( false )
  const [playlistFlag, setPlaylistFlag] = useState( false )
  const [artistFlag, setArtistFlag] = useState( false )
  const [albumFlag, setAlbumFlag] = useState( false )


  let navigate = useNavigate();

  //helper functions

  const search = async (e) => {
    e.preventDefault();

    const query = encodeURIComponent(searchKey)
    const searchURL = `https://api.spotify.com/v1/search?q=${query}&type=track%2Cartist%2Calbum%2Cplaylist`

    fetch(searchURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      contentType: 'application/json',
      method: 'GET'
    })
    .then(response => response.json())
    .then((searchResults) => {
      console.log('SearchResults: ', searchResults)
      setSearchResultArtists(searchResults.artists.items)
      setSearchResultAlbums(searchResults.albums.items)
      setSearchResultPlaylists(searchResults.playlists.items)
      setSearchResultTracks(searchResults.tracks.items)
    })

    // console.log("SEARCH RESULTS: ", searchResults.items);

    setSearchFlag(true);
    setPlaylistFlag(false);
    setArtistFlag(false);
    setAlbumFlag(false);
  }

  const getUserPlaylists = async (e) => {
    e.preventDefault();

    const userPlaylistsSearchURL = "https://api.spotify.com/v1/me/playlists"

    fetch(userPlaylistsSearchURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      contentType: 'application/json',
      method: 'GET'
    })
    .then(response => response.json())
    .then(playlists => setUserPlaylists(playlists.items))

    //console.log("USER PLAYLISTS: ", userPlaylists)

    setSearchFlag(false);
    setPlaylistFlag(true);
    setArtistFlag(false);
    setAlbumFlag(false);
  }

  const getUserArtists = async (e) => {
    e.preventDefault();

    const userArtistsSearchURL = "https://api.spotify.com/v1/me/following?type=artist"

    fetch(userArtistsSearchURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      contentType: 'application/json',
      method: 'GET'
    })
    .then(response => response.json())
    .then(artists => setUserArtists(artists.artists.items))

    

    // console.log("USER ARTISTS: ", userArtists)

    setSearchFlag(false);
    setPlaylistFlag(false);
    setArtistFlag(true);
    setAlbumFlag(false);
  }

  const getUserAlbums = async (e) => {
    e.preventDefault();

    const userAlbumsSearchURL = "https://api.spotify.com/v1/me/albums"

    fetch(userAlbumsSearchURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      contentType: 'application/json',
      method: 'GET'
    })
    .then(response => response.json())
    .then(albums => setUserAlbums(albums.items))

    //console.log("USER ALBUMS: ", userAlbums)

    setSearchFlag(false)
    setPlaylistFlag(false)
    setArtistFlag(false)
    setAlbumFlag(true)
  }


  const favorite = (type, id) => {
    console.log("ID: ", id)
    
    if (type === "artist") {
      fetch(`https://api.spotify.com/v1/me/following?type=${type}&ids=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        contentType: 'application/json',
        method: 'PUT'
      })
    }
    else if (type === "playlist") {
      fetch(`https://api.spotify.com/v1/playlists/${id}/followers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        contentType: 'application/json',
        method: 'PUT'
      })
    }
    else if (type === "album") {

    }
    
    else {
      console.log("We do not handle the following type: ", type)
    }


  }

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1)
                  .split("&")
                  .find(elem => elem.startsWith("access_token"))
                  .split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
    navigate('/', { replace: false})
  }

  function NoMatch() {
    return (
      <div>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    )
  }

  let contextObj = {
    search,
    setSearchKey,
    logout,
    searchResultArtists,
    searchResultAlbums,
    searchResultTracks,
    searchResultPlaylists,
    getUserArtists,
    getUserPlaylists,
    getUserAlbums,
    userPlaylists,
    userArtists,
    userAlbums,
    searchFlag,
    playlistFlag,
    artistFlag,
    albumFlag,
    favorite
  }

  return (
    <AppContext.Provider value={contextObj}>
      <Routes>
        <Route path="/" element={<LogonPage />} />
        <Route path="homepage" element={<HomePage />} />        
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
