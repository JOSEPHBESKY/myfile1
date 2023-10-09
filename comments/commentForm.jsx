import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Picker from 'emoji-picker-react';

// const onReplayClick = () => {
//   debugger;
//   setText("Test");
// };

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
  //initialPostId = "",
}) => {
  const [text, setText] = useState(initialText);
  //const [postId, setPostId] = useState(initialPostId);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    //debugger;
    event.preventDefault();
    handleSubmit(text);
    setText(""); // After click onSubmit Button set state is empty. Thats why its clear Text Area.
  };

  // When click on Replay Set the @User Name 
  // useEffect(() => {
  //   debugger;
  //   const sLabel=submitLabel;
  //   const iText=initialText;
  //   if(sLabel=="Reply")
  //   {
  //     setText("@" + iText);
  //   }
  // }, []);

  //const [inputStr, setInputStr] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setText(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <form className="form-style" onSubmit={onSubmit}>
      <div className="picker-container">
        <textarea
          className="input-style"
          //className="comment-form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <img
          className="emoji-icon"
          src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={() => setShowPicker(val => !val)} />
        {showPicker && <Picker
          pickerStyle={{ width: '100%' }}
          onEmojiClick={onEmojiClick} />}
      </div>
      { /* In this setText(e.target.value) - We are set the Text in State that we getting in comments.jsx => handleSubmit function */}
      <Stack direction='row' spacing={5}>
        <Button type="submit" variant="contained" size="small" className="comment-form-button" disabled={isTextareaDisabled}
        >{submitLabel}</Button>
        {hasCancelButton && (
          <Button type="button" variant="contained" size="small" className="comment-form-button comment-form-cancel-button" onClick={handleCancel}
          >Cancel</Button>
        )}
      </Stack>
    </form>
  );
};

export default CommentForm;
