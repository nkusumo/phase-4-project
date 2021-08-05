import Button from 'react-bootstrap/Button'

function SongChoice({song, handleAddSong, setSearchResults}) {

    function handleClick() {
        handleAddSong(song)
        setSearchResults([])
    }

    console.log(song)
    return (
        <div style={{marginLeft: "-20px"}}>
        <iframe src={`https://open.spotify.com/embed/track/${song.id}`} width="330" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media" title={song.spotifyID}></iframe><br />
        <Button variant="success" onClick={handleClick} style={{fontSize:"11px", padding: "3px 6px"}}>Add to My Songs</Button><br /><br /><br />
        </div>
    )
}

export default SongChoice