import './logonpage.css';
import logonpage_img from './ReactifyLogo.png';

export default function LogonPage() {

  //Spotify API login information and Constants
  const CLIENT_ID = "ac38f5f06516492a855d792e3a73b558" //protect this with your life
  const REDIRECT_URI = "https://main.d2tu0flixpgcms.amplifyapp.com/homepage"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = "playlist-read-private playlist-read-collaborative user-follow-read user-follow-modify user-library-read"

  const scope_url = encodeURIComponent(SCOPE)

    return (
      <body>
        <div className="logonpage-content">
          <div className="logonpage-body">
            <h1 className="logonpage-logo"> Reactify </h1>
            <p className="logonpage-slogan"><i> Spotify, but in React.js </i></p>
            <br />
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${scope_url}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
              className="login-button"
            > Login to Spotify </a>
          </div>
          <img className="logonpage-image" src={logonpage_img} alt="logonpage-image" />
        </div>
      </body>
    )
}
