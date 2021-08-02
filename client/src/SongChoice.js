function SongChoice({song, handleAddSong}) {

    // function handleClick() {
    //     let songObj = {name: song.name, artist: song.artists[0].name}
    //     handleAddSong(songObj)
    // }

    return (
        <>
        <img src={song.album.images[2].url} alt={song.album.name} />
        <p>{song.name} - {song.artists[0].name}</p>
        <button onClick={() => handleAddSong(song)}>Add to My Songs</button><br /><br />
        </>
    )
}

export default SongChoice