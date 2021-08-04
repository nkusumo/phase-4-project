import {useEffect, useState} from 'react';
import SongCard from './SongCard';

function HomePage({user}) {

    const[posts, setPosts] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/posts")
        .then(resp => resp.json())
        .then(data => setPosts(data))
    },[])

    const postArray = posts.map((post) => <SongCard key={post.id} {...post} user={user} />)

    return (
        <>
        {postArray}
        </>
    )
}

export default HomePage;