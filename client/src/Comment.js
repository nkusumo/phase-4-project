import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'

function Comment({content, id, username, user, handleDeleteComment}) {
    
    return (
    <div className="comment-section">
    <small style={{fontWeight: 'bolder'}}> {username}</small> 
    {user ? username === user.username ?
    <CloseButton variant="white" style={{float: "right", fontSize: "7px"}} onClick={() => handleDeleteComment(id)} /> : null
    : null}
    <li>{content}</li>
    <br/>
    </div>
    
    )
}

export default Comment;