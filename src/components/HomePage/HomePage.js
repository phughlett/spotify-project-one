export default function HomePage() {
    return (
        <button className="logout-button" onClick={logout}>Logout</button>}

        <SearchAppBar/>

        {renderTrack()}
    )
}