import { useState } from "react";
import SongChoice from './SongChoice'
import Button from 'react-bootstrap/Button'

function AddSong({handleAddSong}) {

    const [songSearch, setSongSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    function handleChange(e) {
        setSongSearch(e.target.value)
    }

    function searchSong(e) {
        e.preventDefault()
        let songName = songSearch
        setSongSearch('')
        fetch(`/spotify_search/${songName}`)
        .then(res => res.json())
        .then(data => setSearchResults(data))
    }

    const songChoiceList = searchResults.map(result => <SongChoice song={result} handleAddSong={handleAddSong} setSearchResults={setSearchResults} />)

    return(
        <>
        <form onSubmit={searchSong} style={{marginTop: '20px', marginBottom: '40px', verticalAlign: "middle"}}>
            <input type="text" placeholder="Search for a song" onChange={handleChange} value={songSearch} style={{borderWidth: "1px", borderRadius: "5px", marginTop:"1px", marginLeft: "10px", marginRight: "7px", height: "37px", width: "330px", paddingLeft:"5px"}}></input>
            <Button type="submit" value="Search Song" variant="success">Search</Button>
        </form>
        <ul>{songChoiceList}</ul>
        </>
    )
}

export default AddSong;