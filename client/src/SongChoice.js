function SongChoice({song, handleAddSong}) {

    // function handleClick() {
    //     let songObj = {name: song.name, artist: song.artists[0].name}
    //     handleAddSong(songObj)
    // }

    console.log(song)
    return (
        <>
        <iframe src={`https://open.spotify.com/embed/track/${song.id}`} width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        <button onClick={() => handleAddSong(song)}>Add to My Songs</button><br /><br />
        </>
    )
}

export default SongChoice