import {useEffect, useState} from 'react'
import SongCard from './SongCard'
import AddSong from './AddSong'

function MySongs({user}) {

    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3000/users/${user.id}/posts`)
            .then(res => res.json())
            .then(data => setMyPosts(data.reverse()))
        }
    },[user])

    function handleDeleteSong(e) {
        fetch(`http://localhost:3000/posts/${e.target.id}`, {
            method: "DELETE"
        })
        .then(() => {
            let updatedPosts = myPosts.filter(post => post.id != e.target.id)
            setMyPosts(updatedPosts)
        })
    }

    const postArray = myPosts.map((post) => {
        return <div key={post.id}>
            <SongCard {...post} user={user} />
            <button id={post.id} onClick={handleDeleteSong}>Delete Song</button>
        </div>
    })

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