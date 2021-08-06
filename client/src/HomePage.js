import {useEffect, useState} from 'react';
import SongCard from './SongCard';
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'

function HomePage({user}) {
    document.title = "Songbook | Home"

    const[posts, setPosts] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/posts")
        .then(resp => resp.json())
        .then(data => setPosts(data.reverse()))
    },[])

    function handleDeleteSong(id) {
        fetch(`http://localhost:3000/posts/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            let updatedPosts = posts.filter(post => post.id != id)
            setPosts(updatedPosts)
        })
    }

    const postArray = posts.map((post) => <SongCard key={post.id} {...post} user={user} handleDeleteSong={handleDeleteSong}/>)

    return (
        <div id="homepage">
            {postArray}
        </div>
    )
}

export default HomePage;