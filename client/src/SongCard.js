function SongCard({id, likes_count, username, song, comments}) {
    
    
    return(
        <>
        <h4>{username}</h4>
        <img src={song.image} alt ="some image"/>
        <h5>title: {song.name}</h5>
        <h5>artist: {song.artist}</h5>
        <h5>likes: {likes_count}</h5>
        <p> comments: "love it"</p>


        </>
    )
}

export default SongCard;