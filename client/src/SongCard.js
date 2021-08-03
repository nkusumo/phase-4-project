function SongCard({id, likes_count, username, song, comments}) {
    
    
    return(
        <>
        {/* <iframe src={`https://open.spotify.com/embed/track/${song.id}`} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */}
        <h4>{username}</h4>
        <img src={song.image} alt={song.name}/>
        <h5>title: {song.name}</h5>
        <h5>artist: {song.artist}</h5>
        <h5>likes: {likes_count}</h5>
        <p> comments: "love it"</p>
        </>
    )
}

export default SongCard;