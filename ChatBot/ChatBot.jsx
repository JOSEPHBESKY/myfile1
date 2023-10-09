import React, { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton, Menu, Stack, Typography } from '@mui/material';
import ErrorBoundary from '../../common/errorboundary';
import Logger from './../../common/logger';

import { postAPI, postAPIMySQL } from "../../services/apicall";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import SWAlert from "sweetalert2";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'
import HeaderForm from "../saucerView/components/header/index";
import Switch from '@mui/material/Switch';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch } from "react-redux";
import { FromHomeOrSetup } from "../../stateManagement/action";
import Loading from '../../loadingScr';
import { roleAcess } from '../../common/UseAuth';
import { getCookie } from '../../common/cks';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './ChatBot.css';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import iSaucer from "../../../src/assets/images/icon_is1.png";
import LinearProgress from '@mui/material/LinearProgress';
import PartialLoader from '../../loadingScr/PartialLoader';

function ChatBot() {
    const dispatch = useDispatch();
    const [arrAddOnData, setArrAddOnData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loginedAsiSA, setLoginedAsiSA] = useState(false);
    const [EDvalue, setEDvalue] = useState();

    //const classes = useStyles();
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const chatHistoryRef = useRef(null);
    const [dateTime, setDateTime] = useState(new Date());
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        //debugger
        chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }, [chatHistory]);

    const handleClickFunction = (fromWhere) => {
        dispatch(FromHomeOrSetup(fromWhere)); // If fromWhere == Home || fromWhere == Setup
    }

    const handleSendClick = (event) => {
        event.preventDefault();
        if (message.trim() == '') {
            SWAlert.fire({
                position: 'center',
                icon: 'info',
                showConfirmButton: true,
                text: "Please ask a question.",
            });
            return;
        }

        GetResponseForRequest(message);
    };

    async function GetResponseForRequest(message) {
        try {
            //debugger;
            setLoading(true);
            let Req = {
                "Req": {
                    "Type": "GDAD",
                    "CRUD": "UL",
                    "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
                    "DevID": "",
                    "UID": "",
                    "OID": "",
                    "Query": message
                }
            };

            let reqDateTime = (new Date(dateTime).toLocaleString('en-US', options));
            const resp = await postAPIMySQL(Req, true);
            //debugger;
            let response = JSON.parse(JSON.parse(resp));
            setLoading(false);
            if (response.Resp.Sts == '1') {
                debugger;
                let resDateTime = (new Date(dateTime).toLocaleString('en-US', options));
                let dsc = response.Resp.Desc;
                //setChatHistory([...chatHistory, { text: message, isUser: true, curDate: (new Date(dateTime).toLocaleString('en-US', options)) }, { text: dsc, isUser: false, curDate: '' }]);
                setChatHistory([...chatHistory, { text: message, isUser: true, curDate: reqDateTime }, { text: dsc, isUser: false, curDate: resDateTime }]);
                setMessage('');
            }
            else {

            }
        } catch (err) {
            setLoading(false);
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            Logger.errorLog(err.message ?? err, '', '//pages//WebEditor//Components//DraggableCart//CartComponent.jsx', 'getAllTree');
        }
    }


    return (
        <>
            <ErrorBoundary>
                <HeaderForm clickFunction={handleClickFunction} />
                <Stack sx={{ marginTop: '80px' }}>
                    <Stack direction='row' alignItems='center' sx={{ width: '50%', height: '40px', backgroundColor: 'white', borderRadius: '10px 10px 0px 0px' }}>
                        <Stack alignItems='center' sx={{ height: '35px', backgroundColor: '#898BD6', borderRadius: '0px 0px 10px 10px', marginLeft: '15px', position: 'relative', bottom: '3px' }} >
                            <label style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginLeft: "10px", marginRight: "10px", position: 'relative', top: '3px' }}>ChatBot</label>
                        </Stack>
                    </Stack>
                </Stack>
                <Box sx={{ width: '100%', }}>
                    {/* <Paper sx={{ width: '100%', mb: 2 }}> */}
                    <>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <h2>Chat with ChatBot</h2></div>
                        <div className="root">
                            <PartialLoader style={{
                                display: loading ? "flex" : "none"
                            }} loading={loading} />
                            <List className="chat-history" ref={chatHistoryRef}>
                                {chatHistory.map((chat, index) => (
                                    <>
                                        <ListItem key={index} style={{ paddingBottom: '0px' }}>
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
                            <div className="message-input" style={{ maxWidth: '100%' }}>
                                <TextField rows='2' style={{ maxWidth: '100%', width: '100%', flexGrow: 1 }}
                                    label="Message"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    multiline
                                    onKeyPress={(e) => {
                                        if (e.key == "Enter") {
                                            handleSendClick(e);
                                        }
                                    }}
                                />
                                <Button onClick={handleSendClick} type="submit" variant="contained" style={{ height: '78px' }} disabled={loading}>
                                    Send
                                </Button>
                            </div>
                        </div>
                    </>
                    {/* </Paper> */}
                </Box>
            </ErrorBoundary>
        </>
    );
}

export default ChatBot