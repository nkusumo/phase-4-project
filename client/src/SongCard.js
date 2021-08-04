import {useState} from 'react';

function SongCard({id, likes_count, username, song, comments, likes, user}) {
   
    const likers = likes.map(like =>  like.user_id)
    const liked = () => {
        
        if (user) {
          return  likers.includes(user.id)
        } 
        else {
           return false
        }
     }
    
    
    const [likePost, setLikePost] = useState(liked)

    const commentArray = comments.map((comment) => <li key={comment.id}> {comment.username}: {comment.content}</li>)

    function handleLike() {
        setLikePost(!likePost)

        let likeData = {
            user_id: user.id,
            post_id: id
            }

        fetch("http://localhost:4000/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(likeData),
        })
        .then((r) => r.json())
        .then((data) => console.log(data));

    } 

    return(
        <>
        <br/>
        <h4>{username}</h4>
        <iframe src={`https://open.spotify.com/embed/track/${song.spotifyID}`} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media" title={song.spotifyID}></iframe>
        {!likePost ?
        <button onClick={handleLike}> ♡ </button>
        :
        <button onClick={handleLike}>❤️</button>
        }
        
       
        <h5>likes: {likes_count}</h5>
        <ul> Comments: {commentArray}</ul>
        </>
    )
}

export default SongCard;