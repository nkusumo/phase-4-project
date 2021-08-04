function Comment({content, id, username, user, handleDeleteComment}) {
    
    return (
    
    <li key={id}> {username}: {content}
    
    {user ? username === user.username ?
    <button onClick={() => handleDeleteComment(id)}>delete</button> : null
    : null}
    </li>
    
    )
}

export default Comment;