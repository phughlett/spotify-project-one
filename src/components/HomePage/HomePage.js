import SearchAppBar from "../AppBar/AppBar"
import AppContext from "../../context/AppContext"
import { useContext } from 'react';
import "./homepage.css"
import GridTemplateRows from './/Grid/gridrows'


export default function HomePage() {

    let {renderTrack, logout} = useContext(AppContext);

    return (
        
        <GridTemplateRows />
    )
}

//<button className="logout-button" onClick={logout}>Logout</button>

//  <SearchAppBar/>

//{renderTrack()}