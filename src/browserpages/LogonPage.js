export default function LogonPage() {
    return (
        <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        className="login-button"
      >
        Login to Spotify
      </a>
    )
}