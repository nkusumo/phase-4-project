function SongCard({id, likes_count, username, song, comments}) {
    
    console.log(song)

    return(
        <>
        <br/>
        <h4>{username}</h4>
        <iframe src={`https://open.spotify.com/embed/track/${song.spotifyID}`} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media" title={song.spotifyID}></iframe>
        <h5>likes: {likes_count}</h5>
        <p> comments: "love it"</p>
        </>
    )
}

export default SongCard;