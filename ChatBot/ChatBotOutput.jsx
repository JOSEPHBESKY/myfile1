import React, { useRef, useState, useEffect } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from "@mui/material";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import iSaucer from "../../../src/assets/images/icon_is1.png";
import './ChatBot.css';
import logger from "../../common/logger";
import SWAlert from "sweetalert2";

import BusinessInfo from './BusinessInfo';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ChatBotOutput = React.forwardRef((props, ref) => {
    const {
        ChatMessages,
        CurrentMessage,
    } = props;
    //debugger;

    const chatHistoryRef = useRef(null);
    // const [dateTime, setDateTime] = useState(new Date());
    // const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };

    // const [chatMessages, setChatMessages] = useState([]);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setDateTime(new Date());
    //     }, 1000);

    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, []);

    useEffect(() => {
        debugger
        chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }, [ChatMessages]);


    // React.useImperativeHandle(ref, () => ({
    //     HandleMessageSubmit: HandleMessageSubmit
    // }));


    // const HandleMessageSubmit = (e) => {
    //     debugger;
    //     e.preventDefault();
    //     if (props.Message.trim() == '') {
    //         SWAlert.fire({
    //             position: 'center',
    //             icon: 'info',
    //             showConfirmButton: true,
    //             text: "Please ask a question.",
    //         });
    //         return;
    //     }

    //     props.handleMessageSubmit()

    //     GetResponseForRequest(props.Message);
    // };

    // async function GetResponseForRequest(Message) {
    //     try {
    //         //debugger;
    //         // setLoading(true);
    //         // let Req = {
    //         //     "Req": {
    //         //         "Type": "GDAD",
    //         //         "CRUD": "UL",
    //         //         "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
    //         //         "DevID": "",
    //         //         "UID": "",
    //         //         "OID": "",
    //         //         "Query": message
    //         //     }
    //         // };

    //         let reqDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    //         //const resp = await postAPIMySQL(Req, true);
    //         //let response = JSON.parse(JSON.parse(resp));
    //         //setLoading(false);
    //         //if (response.Resp.Sts == '1') {
    //         debugger;
    //         let resDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    //         let dsc = 'Hello, I am the AI ChatBot!'; //response.Resp.Desc;
    //         setChatMessages([...chatMessages, { text: Message, isUser: true, curDate: reqDateTime }, { text: dsc, isUser: false, curDate: resDateTime }]);

    //         //setMessage('');

    //         // }
    //         // else {

    //         // }
    //     } catch (err) {
    //         //setLoading(false);
    //         SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
    //         logger.errorLog(err.message ?? err, '', '//pages//WebEditor//Components//DraggableCart//CartComponent.jsx', 'getAllTree');
    //     }
    // }

    React.useImperativeHandle(ref, () => ({
        myFunction: myFunction
    }));


    const [biShow, setBIShow] = useState(false);
    function myFunction() {
        debugger;
        //alert(ChatMessages[ChatMessages.length - 1].text);
        if (ChatMessages[ChatMessages.length - 1]) {
            if (ChatMessages[ChatMessages.length - 1].text == 'Your Business Information Form is to fill.') {
                //alert(ChatMessages[ChatMessages.length - 1].text);
                setBIShow(true);
            }
        }
    }


    const handleClose = () => {
        setBIShow(false);
      };

    return (
        <>
            <List className="chat-history" ref={chatHistoryRef} style={{ maxHeight: '100%', width: '100%' }}  >
                {ChatMessages.map((chat, index) => (
                    <>
                        <ListItem key={index} style={{ paddingBottom: '0px' }} >
                            <ListItemAvatar>
                                <Avatar>
                                    {chat.isUser ? 'U' : <img src={iSaucer} width="40" height="40" />}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={chat.text}
                                className={chat.isUser ? 'request-message' : 'response-message'}
                            />
                        </ListItem>
                        {chat.isUser ?
                            <ListItem key={index.id} style={{ fontFamily: 'cursive', fontSize: '12px', fontStyle: 'italic', paddingTop: '0px', paddingBottom: '0px', justifyContent: 'flex-end' }} >
                                <p style={{ color: 'blue' }}>{chat.curDate}</p>
                            </ListItem>
                            : <ListItem key={index.id} style={{ fontFamily: 'cursive', fontSize: '12px', fontStyle: 'italic', paddingTop: '0px', paddingBottom: '0px', justifyContent: 'flex-start' }} >
                                <p style={{ color: 'red' }}>{chat.curDate}</p>
                            </ListItem>}
                    </>
                ))}
            </List>

            {/* <BusinessInfo BIOpen={biShow} />  */}

            <div>
                <Dialog
                    open={biShow}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Business Information"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose}>Agree</Button>
                    </DialogActions>
                </Dialog>
            </div>

        </>
    );
});

export default ChatBotOutput;