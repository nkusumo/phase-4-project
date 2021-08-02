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
        // let songObj = 

        // fetch('http://localhost:3000/posts', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(songObj)
        // })
    }

    return(
        <>
        <AddSong handleAddSong={handleAddSong} />
        {postArray}
        </>
    )
}

export default MySongs;