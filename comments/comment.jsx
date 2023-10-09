import { Avatar, Button, Stack, Typography } from "@mui/material";
import CommentForm from "./commentForm";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useState } from "react";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  PUID = null,
  currentUserId,
  backendComments, // Added for Recursive
  //postId,
}) => {

  replies = backendComments.filter((backendComments) => backendComments.CTID === comment.CID); // Added for Recursive

  const isEditing =
    activeComment &&
    activeComment.CID === comment.CID &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.CID === comment.CID &&
    activeComment.type === "replying";
  const fiveMinutes = 30000;   // This is 5 Mins. Before 5 Mins user can Edit/Delete their Comment they newly added.  
  const timePassed = new Date() - new Date(comment.DT) > fiveMinutes;
  const canDelete = currentUserId === comment.PUID && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canLike = Boolean(currentUserId);
  const canEdit = currentUserId === comment.PUID && !timePassed;
  const replyId = PUID ? PUID : comment.CID;
  const DT = new Date(comment.DT).toLocaleDateString();

  const [clicked, setClicked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const handleLikeClick = (LC) => {
    //debugger;
    if (clicked){
      setLikeCount(likeCount+1)
    }
    else{
      setLikeCount(likeCount-1)
    }

    setClicked(!clicked);

   // change <AddCircleIcon /> to <BlockIcon /> at "id"
  }

  return (
    <div key={comment.CID} className="comment">
      <Avatar><img src={comment.PP} width="50" height="50" /></Avatar>
      <div className="comment-right-part">
        <div className="comment-content">
          <p style={{ float: "left" }} className="comment-author">{comment.NM}</p>
          {/* <p style={{ float: "right" }} className="comment-date">{DT}</p> */}
          <br /> 
          <div>
            {!isEditing && <div className="comment-text">{comment.MSG}</div>}
          </div>
        </div>
        <div className="comment-subcommend">
          {isEditing && (
            < CommentForm
              submitLabel="Update"
              hasCancelButton
              initialText={comment.MSG}
              handleSubmit={(text) => updateComment(text, comment.CID)}
              handleCancel={() => {
                setActiveComment(null);
              }}
            />
          )}
        </div>
        <Stack direction='row' spacing={5}>
          {canReply && (
            <Button variant="contained" size="small" className="comment-action" 
              onClick={() => setActiveComment({ CID: comment.CID, type: "replying" })}>Reply</Button>
          )}
          {canLike && (
            <Button variant="contained" size="small" className="comment-action" startIcon={clicked ? <ThumbUpIcon />: <ThumbUpOffAltIcon /> }  
              onClick={() => handleLikeClick(comment.LC)}>{comment.LC}</Button>
          )}
          {canEdit && (
            <Button variant="contained" size="small" className="comment-action" 
              onClick={() => setActiveComment({ CID: comment.CID, type: "editing" })}>Edit</Button>
          )}
          {canDelete && (
            <Button variant="contained" size="small" className="comment-action" 
              onClick={() => deleteComment(comment.CID)}>Delete</Button>
          )}
        </Stack>
        {isReplying && (
          <CommentForm 
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
            initialText={"@" + comment.NM + " "}
          />
        )}
        {replies.length > 0 && (
          
          <div className="replies">
            {/* This is our comments recrusive which are the replays */}
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.CID}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.CID}
                replies={[]}
                currentUserId={currentUserId}
                backendComments={backendComments} // Added for Recursive
                //postId={postId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
