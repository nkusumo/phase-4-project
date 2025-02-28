import {useEffect, useState} from 'react'
import SongCard from './SongCard'
import AddSong from './AddSong'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function MySongs({user}) {
    document.title = "Songbook | My Songs"

    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3000/users/${user.id}/posts`)
            .then(res => res.json())
            .then(data => setMyPosts(data.reverse()))
        }
    },[user])

    function handleDeleteSong(id) {
        fetch(`http://localhost:3000/posts/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            let updatedPosts = myPosts.filter(post => post.id != id)
            setMyPosts(updatedPosts)
        })
    }

    const postArray = myPosts.map((post) => <SongCard key={post.id} {...post} user={user} handleDeleteSong={handleDeleteSong} />)

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
        <Container>
            <Row>
                <Col>
                    <AddSong handleAddSong={handleAddSong} />
                </Col>
                <Col>
                    {postArray}
                </Col>
            </Row>
        </Container>
    )
}

export default MySongs;