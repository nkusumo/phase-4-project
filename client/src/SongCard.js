import {useState} from 'react';
import Comment from './Comment'

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
    const [userComment, setUserComment] =useState('')

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
        <>
        <br/>
        <h4>{username}</h4>
        <iframe src={`https://open.spotify.com/embed/track/${song.spotifyID}`} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" title={song.spotifyID}></iframe>
        {user ? 
        !isLiked ? <button onClick={handleLike}> ♡ </button> : <button onClick={handleRemoveLike}> ❤️ </button>
        : null}
        <h5>likes: {postLikes.length}</h5>
        <ul>Comments: {commentArray}</ul>
        {user ?
        <form onSubmit={handleComment}>
            <input placeholder="Add Comment" type="text" value={userComment} onChange={e => setUserComment(e.target.value)}/>
            <button type="submit">Submit</button>
        </form> :
        null}
        </>
    )
}

export default SongCard;