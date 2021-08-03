import { useState } from "react";
import SongChoice from './SongChoice'

function AddSong({handleAddSong}) {

    const [songSearch, setSongSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const key = "BQAQ3wdG2m9JHNf4shgMz5xukDiRrz6ojx0XhiCOr8LdI3TO4Uqb6jjF08La9S_HaLgN3k2Q-0Wj8tgHdi1al2qO1DB9_TBPtElA8iElrh24rxm9YiopalExUtOS_T3NTMs8koLjHh5b"

    function handleChange(e) {
        setSongSearch(e.target.value)
    }

    function searchSong(e) {
        e.preventDefault()
        let songName = songSearch
        setSongSearch('')
        let songString = songName.replace(" ","%20")
        console.log(songString)
        fetch(`https://api.spotify.com/v1/search?q=${songString}&type=track&market=US&limit=3`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${key}`
            }
        })
        .then(res => res.json())
        .then(data => setSearchResults(data.tracks.items))
    }

    const songChoiceList = searchResults.map(result => <SongChoice song={result} handleAddSong={handleAddSong} />)

    return(
        <>
        <form onSubmit={searchSong}>
            <input type="text" onChange={handleChange} value={songSearch}></input>
            <input type="submit" value="Search Song"></input>
        </form>
        <ul>{songChoiceList}</ul>
        </>
    )
}

export default AddSong;