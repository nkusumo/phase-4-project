import {useState} from 'react';
import Comment from './Comment'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function SongCard({id, username, song, comments, likes, user}) {

    const likers = likes.map(like => like.user_id)
    const liked = () => {
        if (user) {
            return likers.includes(user.id)
        } else {
            return false
        }
    }
    
    const [isLiked, setIsLiked] = useState(liked)
    const [postLikes, setPostLikes] = useState(likes)
    const [postComments, setPostComments] = useState(comments)
    const [userComment, setUserComment] = useState('')
    const [showComments, setShowComments] = useState(false)

    const commentArray = postComments.map((comment) => {
        return <Comment 
            key={comment.id}
            {...comment}
            user={user}
            handleDeleteComment={handleDeleteComment}
        />
    })

    function handleDeleteComment(deleteId) {
        fetch(`http://localhost:3000/comments/${deleteId}`, {
            method: "DELETE"
        })
        .then(() => {
            let updatedComments = postComments.filter(comment => comment.id !== deleteId)
            setPostComments(updatedComments)
        })

    }

    function handleComment(e) {
        e.preventDefault()

        const commentData = {
            user_id: user.id,
            post_id: id,
            content: userComment
        }
        console.log(commentData)
        fetch("http://localhost:3000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentData),
        })
        .then((r) => r.json())
        .then(data => {
            console.log(data)
            let updatedComments = [...postComments, data]
            setPostComments(updatedComments)
        });
    } 
    

    function handleLike() {
        setIsLiked(!isLiked)
        let likeData = {user_id: user.id, post_id: id}

        fetch("http://localhost:3000/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(likeData),
        })
        .then((r) => r.json())
        .then(data => {
            console.log(data)
            let updatedLikes = [...postLikes, data]
            setPostLikes(updatedLikes)
        });
    } 

    function handleRemoveLike() {
        setIsLiked(!isLiked)
        let like_id = postLikes.find(like => like.user_id === user.id).id

        fetch(`http://localhost:3000/likes/${like_id}`, {
            method: "DELETE"
        })
        .then(() => {
            let updatedLikes = postLikes.filter(like => like.id !== like_id)
            setPostLikes(updatedLikes)
        })
    }

    return(
        <div id="song-card">
        <br/>
        <Card text="light" style={{ width: '22rem', boxShadow: 'rgb(3, 3, 3) 5px 4px 6px', backgroundColor: 'rgb(51, 50, 50)' }}>
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <iframe src={`https://open.spotify.com/embed/track/${song.spotifyID}`} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" title={song.spotifyID}></iframe>
            {user ? 
            !isLiked ? <Button classname="like-button" variant="success" onClick={handleLike}> ♡ {postLikes.length} </Button> : <Button classname="like-button" variant="success" onClick={handleRemoveLike}> ♥ {postLikes.length} </Button>
            :<label style={{margin: "10px"}}> ♥ {postLikes.length} </label>}
            &nbsp;&nbsp;<Button variant="success" onClick={() => setShowComments(!showComments)}> {showComments ? 'Hide' : 'Show' } Comments </Button>
            {showComments ? 
            user ?
            <>
            <hr/>
            <ul>{commentArray}</ul>
            <form onSubmit={handleComment}>
                <input style={{borderRadius: "5px", marginRight: "5px", height: "35px", paddingLeft:"5px"}} placeholder="Add Comment" type="text" value={userComment} onChange={e => setUserComment(e.target.value)}/>
                <Button style={{height: "32px", padding:"1px", paddingLeft: "6px", paddingRight: "6px"}}
                 variant="success"type="submit">Submit</Button>
            </form>
            </>
            : <><hr/><ul>{commentArray}</ul></>
            : null}
            </Card.Body>
        </Card>
        </div>
    )
}

export default SongCard;