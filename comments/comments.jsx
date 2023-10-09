import { useState, useEffect } from "react";
import CommentForm from "./commentForm";
import Comment from "./comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../../services/apicall";

import { Box, AppBar, Button, IconButton, Toolbar } from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';
import ShareIcon from '@mui/icons-material/Share';
import RedoIcon from '@mui/icons-material/Redo';
import StarIcon from '@mui/icons-material/Star';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { postAPI } from '../../services/apicall';

const Comments = ({ commentsUrl, currentUserId }) => {
  //debugger;
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(15);
  const [start, setStart] = useState(1);
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [itemscount, setItemscount] = useState('');
  const [rerender, setRerender] = useState(false);

  //const [pId, setpId] = useState(postId);
  const [backendComments, setBackendComments] = useState([]);  // Data get from API and put it into this state in UseEffect
  //console.log('backendComments', backendComments)
  const [activeComment, setActiveComment] = useState(null); // For we are in Replay State Or Edit State Ex. {type: 'editing', id: '1'} OR {type: 'replying', id: '1'} 
  
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.CTID === null || backendComment.CTID === ""
  ); // This is our Root Comment which parentId is null 
 
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.CTID === commentId)
      .sort(
        (a, b) =>
          new Date(a.DT).getTime() - new Date(b.DT).getTime()
      ); // This is the Replies Comment of the Parent Comment by passing Parent Id

  const addComment = (text, parentId) => {
    //debugger;
    //console.log(pId);
    createCommentApi(text, parentId);
    // createCommentApi(text, parentId).then((comment) => {
    //   setBackendComments([comment, ...backendComments]); // After Add we must refresh the state of array. So that it will reflect in screen. Also this line will add our comment on top of the comment.
    //   setActiveComment(null);
    // });
  };

  async function createCommentApi(text, parentId, comment) {
    setActiveComment(null);
    sethasMoreItems(true);

    //debugger
    try {
      const req = {
        "Req": {
          "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
          "Type": "CUMC",
          "CRUD": "",
          "CC": {
            "CID": '',
            "PUID": "210",
            "NM": "James",
            "CTID": parentId,
            "MSG": text,
            "DT": new Date().toISOString(),
            "PP": "https://cdn-icons-png.flaticon.com/512/147/147144.png"
          }
        }
      };
      const resp = await postAPI(req);
      let response = JSON.parse(resp)
      if (response.Resp.Sts == 1) {
        if (itemscount <= count) {
          setRerender(!rerender);
        }
        getCommentsApi(); // Pull from DB
        //setBackendComments([comment, ...backendComments]); // After Add we must refresh the state of array. So that it will reflect in screen. Also this line will add our comment on top of the comment.
        setActiveComment(null);
        sethasMoreItems(true);
        // alert('Successfully Created')
        //Swal.fire({ text: 'Successfully Created', });
      } else {
        //alert("Creation Failed")
        //Swal.fire({ text: 'Creation Failed', });
      }
      //GetCity();

    } catch (err) {
      console.error(`GET error: ${err}`);
    }
  }

  const updateComment = (text, commentId) => {
    //debugger;
    updateCommentApi(text, commentId);
    // updateCommentApi(text).then(() => {
    //   const updatedBackendComments = backendComments.map((backendComment) => {
    //     if (backendComment.CID === commentId) {
    //       return { ...backendComment, MSG: text };
    //     }
    //     return backendComment;
    //   });
    //   setBackendComments(updatedBackendComments);
    //   setActiveComment(null);
    // });
  };

  async function updateCommentApi(text, commentId) {
    //debugger
    try {
      const req = {
        "Req": {
          "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
          "Type": "UUMC",
          "CRUD": "",
          "CC": {
            "CID": commentId,
            "MSG": text,
            "DT": new Date().toISOString()
          }
        }
      };
      const resp = await postAPI(req);
      let response = JSON.parse(resp)
      if (response.Resp.Sts == 1) {
        if (itemscount <= count) {
          setRerender(!rerender);
        }

        getCommentsApi(); // Pull from DB
        //setBackendComments(updatedBackendComments);
        setActiveComment(null);
        sethasMoreItems(true);
        // alert('Successfully Created')
        //Swal.fire({ text: 'Successfully Created', });
      } else {
        //alert("Creation Failed")
        //Swal.fire({ text: 'Creation Failed', });
      }
      //GetCity();

    } catch (err) {
      console.error(`GET error: ${err}`);
    }
  }

  const deleteComment = (commentId) => {
    //debugger;
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(commentId);
      // deleteCommentApi().then(() => {
      //   const updatedBackendComments = backendComments.filter(
      //     (backendComment) => backendComment.CID !== commentId
      //   ); // Here we removing record from State and Set the updated state as new state
      //   setBackendComments(updatedBackendComments);
      // });
    }
  };

  async function deleteCommentApi(commentId) {
    try{
        const req={
          "Req": {
            "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
            "Type": "DUMC",
            "CRUD": "",
            "CC": {
              "CID": commentId,
              "ST": 0,
              "DT": new Date().toISOString()
            }
          }
        };
        const resp = await postAPI(req);
        let response = JSON.parse(resp);
        if(response.Resp.Sts==1){
            //alert("Successfully Deleted")
            getCommentsApi(); // Pull from DB
          }else{
            //alert("delection Failed")
            //Swal.fire({ text: 'delection Failed', });
          }
          sethasMoreItems(true);
    }catch(err){
        console.error(`GET error: ${err}`);
    }
        }

  //Get Comments
  async function getCommentsApi() {
    try {
      setLoading(true);
      //debugger
      const req = {
        "Req": {
          "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
          "CRUD": "",
          "Type": "GUMC",
          "ID": "",
          "UID": "",
          "TP": "",
          "SBY": "",
          "FD": "",
          "TD": ""
        }
      }
      const res = await postAPI(req);
      let resp = JSON.parse(res)
      var val = JSON.parse(resp.Resp.Result)
      //debugger
      if (resp.Resp.Sts == 1) {
        setLoading(false);
        if (val.length == 0 || val.length < 15) {
          sethasMoreItems(false);
        }
        if (start == 1) {
          setItemscount(val.length);
          setBackendComments(val);
        }
        else {
          setItemscount(val.length);
          setBackendComments(backendComments.concat(val));
        }
      } else {
        setLoading(false);
      }
      //console.log(resp)
    } catch (err) {
      console.error(`GET error: ${err}`);
      setLoading(false);
    }

  }

  useEffect(() => {
    getCommentsApi();
    // getCommentsApi().then((data) => {
    //   setBackendComments(data);
    // });
  }, [start, rerender]);

  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
  };

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.CID}
            comment={rootComment}
            replies={getReplies(rootComment.CID)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
            backendComments={backendComments} // Added for Recursive
          //postId={postId}
          />
        ))}
      </div>
      <div>
        <button onClick={handleClick}>Click</button>
        {isShown && <BoxBar />}
      </div>
    </div>
  );
};

const buttonClick = event => {
  //debugger;
  alert("Test");
};

function BoxBar() {
  return (
    <div>
      <Box sx={{ flexGrow: 1, height: "1px" }}>
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "right", minHeight: "10px" }}>
            <IconButton area-aria-label="backward" onClick={() => buttonClick()}><UndoIcon sx={{ color: "orange", "&:hover": { color: "red" } }} /></IconButton>
            <IconButton area-aria-label="share" onClick={() => buttonClick()}><ShareIcon sx={{ color: "white" }} /></IconButton>
            <IconButton area-aria-label="forward" onClick={() => buttonClick()}><RedoIcon sx={{ color: "orange" }} /></IconButton>
            <IconButton area-aria-label="favourite" onClick={() => buttonClick()}><StarIcon sx={{ color: "gold" }} /></IconButton>
            <Button color="inherit" onClick={() => buttonClick()}>Monitor</Button>
            <IconButton area-aria-label="delete" onClick={() => buttonClick()}><DeleteForeverRoundedIcon sx={{ color: "orange" }} /></IconButton>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
              <MenuItem ></MenuItem>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> News</Typography>
            <Button color="inherit" onClick={() => buttonClick()}>Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Comments;
