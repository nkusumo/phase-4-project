import {useEffect, useState} from 'react'
import SongCard from './SongCard'
import AddSong from './AddSong'

function MySongs() {

    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/users/3/posts') //change this to dynamic later
        .then(res => res.json())
        .then(data => setMyPosts(data))
    },[])

    const postArray = myPosts.map((post) => <SongCard key={post.id} {...post} />)

    function handleAddSong(song) {
        console.log(song)
        let songObj = {
            name: song.name, 
            spotifyID: song.id, 
            artist: song.artists[0].name,
            album: song.album.name,
            image: song.album.images[0].url,
            year: song.album.release_date.slice(0,3),
            user_id: 7

        }

        fetch('http://localhost:3000/new_post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(songObj)
        })
        .then(resp => resp.json())
        .then(console.log)
    }

    return(
        <>
        <AddSong handleAddSong={handleAddSong} />
        {postArray}
        </>
    )
}

export default MySongs;