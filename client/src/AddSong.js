import { useState } from "react";
import SongChoice from './SongChoice'

function AddSong({handleAddSong}) {

    const [songSearch, setSongSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const key = "BQCdCCuTDqQdaBRTEQGG0MiGaU38ab9pVJ8AP_E71aiM5sd7TmYbsEhbqrvdGAGtEzTZMRqK8YOkYuOr69_4OLMIyDyw0TIQu6qAbsEvoEDx4b4OR-FrBxIDui7RUl_Ut0vveAcTMnMJ"

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
        .then(data => {
            console.log(data)
            setSearchResults(data.tracks.items)
        })
    }

    const songChoiceList = searchResults.map(result => <SongChoice song={result} handleAddSong={handleAddSong} setSearchResults={setSearchResults} />)

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