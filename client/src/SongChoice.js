function SongChoice({song, handleAddSong, setSearchResults}) {

    function handleClick() {
        handleAddSong(song)
        setSearchResults([])
    }

    console.log(song)
    return (
        <>
        <iframe src={`https://open.spotify.com/embed/track/${song.id}`} width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media" title={song.spotifyID}></iframe>
        <button onClick={handleClick}>Add to My Songs</button><br /><br />
        </>
    )
}

export default SongChoice