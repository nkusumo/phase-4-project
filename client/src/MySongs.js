import {useEffect, useState} from 'react'
import SongCard from './SongCard'
import AddSong from './AddSong'

function MySongs({user}) {

    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/users/${user.id}/posts`)
        .then(res => res.json())
        .then(data => setMyPosts(data))
    },[])

    const postArray = myPosts.map((post) => <SongCard key={post.id} {...post} user={user} />)

    function handleAddSong(song) {
        console.log(song)
        let songObj = {
            spotifyID: song.id, 
            user_id: user.id
        }

        fetch('http://localhost:3000/new_post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(songObj)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            if (data.id) {
                let updatedArray = [data, ...myPosts]
                setMyPosts(updatedArray)
            } else {
                alert('You already added this song!')
            }
        })
    }

    return(
        <>
        <AddSong handleAddSong={handleAddSong} />
        {postArray}
        </>
    )
}

export default MySongs;