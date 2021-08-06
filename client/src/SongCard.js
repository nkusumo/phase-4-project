import {useState} from 'react';
import Comment from './Comment'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'


function SongCard({id, username, song, comments, likes, user, handleDeleteSong}) {

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
            setUserComment('')
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
        <Card text="light" style={{ padding: "10px", width: '480px', boxShadow: 'rgb(3, 3, 3) 5px 4px 6px', backgroundColor: 'rgb(51, 50, 50)' }}>
            <Card.Body>
                {user ? username === user.username ? <CloseButton variant="white" style={{float: "right", fontSize: "10px"}} onClick={()=>handleDeleteSong(id)} />
                :null :null}
                <Card.Title style={{color: "rgb(30, 197, 30)", fontWeight: "bolder", marginBottom:"15px", textShadow: 'rgb(3, 3, 3) 3px 2px 3px'}}>{username}</Card.Title>
                <iframe src={`https://open.spotify.com/embed/track/${song.spotifyID}`} width="425" height="505" frameBorder="0" allowtransparency="true" allow="encrypted-media" title={song.spotifyID} style={{marginBottom: "10px"}}></iframe>
            {user ? 
            !isLiked ? <Button style={{boxShadow: 'rgb(3, 3, 3) 3px 3px 4px'}} classname="like-button" variant="success" onClick={handleLike}> ♡ {postLikes.length} </Button> : <Button style={{boxShadow: 'rgb(3, 3, 3) 5px 4px 6px'}} classname="like-button" variant="success" onClick={handleRemoveLike}> ♥ {postLikes.length} </Button>
            :<label style={{margin: "10px"}}> ♥ {postLikes.length} </label>}
            &nbsp;&nbsp;<Button style={{boxShadow: 'rgb(3, 3, 3) 3px 3px 4px'}} variant="success" onClick={() => setShowComments(!showComments)}> {showComments ? 'Hide' : 'Show' } Comments </Button>
            {showComments ? 
            user ?
            <>
            <hr/>
            <ul>{commentArray}</ul>
            <form onSubmit={handleComment}>
                <input style={{borderWidth: "1px", borderRadius: "5px", marginLeft: "10px", marginRight: "7px", height: "35px", width: "330px", paddingLeft:"5px"}} placeholder="Add Comment" type="text" value={userComment} onChange={e => setUserComment(e.target.value)}/>
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