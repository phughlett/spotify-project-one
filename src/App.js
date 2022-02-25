import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import AppContext from './context/AppContext';
import {useEffect, useState} from 'react';
import axios from 'axios';
import SearchAppBar from './components/AppBar/AppBar';
import LogonPage from './components/LogonPage/LogonPage';
import HomePage from './components/HomePage/HomePage';



function App() {

  //states
  const [token, setToken] = useState( "" )
  const [searchKey, setSearchKey] = useState( "" )
  const [artists, setArtists] = useState( [] )

  let navigate = useNavigate();



  //Spotify API login information and Constants
  // const CLIENT_ID = "ac38f5f06516492a855d792e3a73b558" //protect this with your life
  // const REDIRECT_URI = "http://localhost:3000"
  // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  // const RESPONSE_TYPE = "token"
  const SEARCH_URL = "https://api.spotify.com/v1/search"

  //https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10

  //helper functions

  const search = async (e) => {
    // e.preventDefault();

    const {data} = await axios.get(SEARCH_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })
    console.log("DATA: ", data)
    setArtists(data.artists.items)
  }

  // const search = async (e) => {
  //   const headers = {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + token
  //   }
  //   const params = {
  //     q: searchKey,
  //     type: "artist",
  //     limit: 10
  //   }

    //this should work maybe
//   fetch(`https://api.spotify.com/v1/search?${fetchURL}&type=track`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`
//     },
//     params: {
//       q: searchKey,
//       type: "artist"
//     }
//   }
// )
  //   fetch(SEARCH_URL, { method: 'GET', headers, params })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log("DATA: ", data)
  //       setArtists(data.artists.items)
  //     })
  // }

  const renderTrack = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? <img width={"50%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
        {artist.name}
      </div>
    ))
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
    renderTrack,
    artists

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
