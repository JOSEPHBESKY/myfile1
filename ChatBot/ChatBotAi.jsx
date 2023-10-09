import React, { useState, useEffect, useLayoutEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from '@mui/icons-material/Close';
import './ChatBot.css'
import { getCookie } from "../..//common/cks";
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import StarsIcon from '@mui/icons-material/Stars';
import GridViewIcon from '@mui/icons-material/GridView';
import { Slide } from '@material-ui/core';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import Languageai from "./Languageai";
import { Radio, RadioGroup, FormControlLabel, Card, CardHeader } from '@mui/material';
import Box from "@mui/material/Box";
import { Avatar, ListItemAvatar, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import { connect, useSelector, useDispatch } from "react-redux";
import HeaderForm from "../saucerView/components/header/AiModalheader";
import { AddToCartCounter, FromHomeOrSetup } from "../../stateManagement/action";
import { Stack } from "@mui/system";
// import Intents from './Intent/index'
import theme, { Colors } from "../../styles/theme";
import search from "../../assets/images/searchBlue.png";
import TimelineIcon from '@mui/icons-material/Timeline';
import { useNavigate, useLocation, useSearchParams, createSearchParams } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Popper, MenuList, ClickAwayListener } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MessageIcon from '@mui/icons-material/Message';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Tooltip from '@mui/material/Tooltip';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import star from '../../assets/images/rateStar.png'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import "../../assets/SaucerStyle/style-mobile.css"
import {
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // Paper,
  // Button,
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogContentText,
  // TextField,
  // DialogActions,
  List,
  AppBar,
  Toolbar,
  Input,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  InputBase, ListItemIcon, Drawer,
  Divider, Grid, Typography, Paper, Menu
} from "@mui/material";
import { Transition } from 'react-transition-group';
// import {   useDispatch } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { Inthideshow } from "../../stateManagement/action";
import AttachedIcon from '@mui/icons-material/AttachFile';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import GalleryIcon from '@mui/icons-material/PhotoLibrary';
import LocationIcon from '@mui/icons-material/LocationOn';
import ContactIcon from '@mui/icons-material/PermContactCalendar';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import { MenuItem } from "react-contextmenu";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CopyIcon from '@mui/icons-material/ContentCopy';
import ReplyIcon from '@mui/icons-material/Reply';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import logger from "../../common/logger";
import SWAlert from "sweetalert2";
import { useRef } from "react";
// import iSaucer from "../../../src/assets/images/icon_is1.png";
import iSaucer from "../../../src/assets/images/B-IT-chatico.png";
import ChatBotOutput from "./ChatBotOutput";
import BusinessInfo from "./BusinessInfo";
import { Closeicon, DiaBtn2, StyledCard, StyledMore } from "../../styles/common";
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import TranslateIcon from '@mui/icons-material/Translate';

import Loading from "../../loadingScr";
import { postAPICHAT } from "../../services/apicall";
import { x64 } from "crypto-js";
import { isMobile } from "../WebEditor/utils/helpers";

const ariaLabel = { 'aria-label': 'description' };

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 200,
  height: 50,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 7,
    transform: 'translateX(1px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(102px)',
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: 'red',
    }
  },
  '& .MuiSwitch-thumb': {
    width: 90,
    height: 40,
    padding: 5,
    borderRadius: 50 / 2,
  },
  '& .MuiSwitch-track': {
    borderRadius: 50 / 2,
    backgroundColor: 'orange',
    //opacity: 2,
    opacity: "10 !important",
    "&:after": {
      color: "green",
      fontSize: "16px",
      position: "absolute",
      top: "15px",
      content: "'Private'",
      left: "20px",
      //padding: 90,

    },
    "&:before": {
      color: "white",
      fontSize: "16px",
      position: "absolute",
      top: "15px",
      content: "'Public'",
      right: "20px",
      //padding: 15,

    }
  },
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: 'green',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'pink',
    opacity: 2,
  },
}));

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),

  },

  chatContainer: {
    height: "70vh",
    overflowY: "scroll",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    "&::-webkit-scrollbar": {
      borderRadius: '10px',
      width: "10px", /* Width of the scrollbar */

    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#002a3a", /* Thumb color */
      borderRadius: '10px',
      height: '5px'
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#dae1e9", /* Track background color */
    },
  },

  chatBubble: {
    display: "inline-block",
    maxWidth: "90%",
    borderRadius: "15px",
    padding: "1.5%",
    color: '#002a3a',
    backgroundColor: "white",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.3)",
    marginBottom: "1.5%",
    fontSize: "14px",
    fontWeight: 'bold'
  },
  userBubble: {
    backgroundColor: "#002a3a",
    border: '1.5px solid #002a3a',
    float: "right",
    maxWidth: "70%",
    fontSize: '14px',
    color: 'white',
    fontWeight: 'bold'
  },
  botBubble: {
    backgroundColor: "#FFFFFF'",
    color: '#002a3a',
    fontWeight: 'bold',
    float: "left",
    maxWidth: "70%",

  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    width: "5%", // Decrease size for smaller screens
    height: "5%", // Decrease size for smaller screens
    fontSize: "1rem",
    marginRight: "1.5%",
  },

  // Media query for mobile screens
  '@media (min-width: 300px) and (max-width: 650px)': {
    paper: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1),
  
    },
    chatContainer: {
      height: "90vh",
      overflowY: "scroll",
      padding: "1%",
      backgroundColor: '#f4f7f9',

    },
    chatBubble: {
      maxWidth: "70%",
      padding: "1%",
      marginTop:'10px',
      marginBottom:'10px',
      fontSize: "1rem",

    },
    userBubble: {
      backgroundColor: "#002a3a",
      border: '1.5px solid #002a3a',
      float: "right",
      maxWidth: "70%",
      fontSize: '14px',
      padding:'3%',
      color: 'white',
      fontWeight: 'bold'
    },
    botBubble: {
      maxWidth: "70%",
      marginTop:'10px',
      marginBottom:'10px',
    },
    avatar: {
      width: "7%",
      height: "7%",
      fontSize: "1rem",
      marginRight: "1%",
    },
    button: {
      margin: theme.spacing(1),
    },
    menuContainer: {
      position: 'relative',
    },
    menu: {
      position: 'absolute',
      bottom: '',
      left: '-150px',
      top: '',
      width: '100%',
      height: "80vh",
      maxHeight: '800px',
      overflowY: 'auto',
      transition: 'max-height 0.5s ease',
      marginBottom: "10px"
    },
    menuOpen: {
      maxHeight: '800px',
      top: '',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  menuContainer: {
    position: 'relative',
  },
  menu: {
    position: 'absolute',
    bottom: '0%',
    left: '-150px',
    top: -110,
    width: '70%',
    height: "50vh",
    maxHeight: '800px',
    overflowY: 'auto',
    transition: 'max-height 0.5s ease',
    marginBottom: "10px"
  },
  menuOpen: {
    maxHeight: '800px',
    top: '-110%',
  },
  '@media (max-width: 600px)': {

    button: {

      width: '10px'
    },
    menu: {
      position: 'absolute',
      bottom: '0%',
      left: '-150px',
      top: -110,
      width: '200%',
      height: "50vh",
      maxHeight: '800px',
      overflowY: 'auto',
      transition: 'max-height 0.5s ease',
      marginBottom: "10px"
    },
  }
}));
const PresentDropdown = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <div onMouseEnter={handleToggle} onMouseLeave={handleClose}>
      <Tooltip title="Presents" placement="top" arrow>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
        >
          <FilePresentIcon />
        </IconButton>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="left"
        disablePortal={false}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow">
              <MenuItem onClick={handleClose}>Grid</MenuItem>
              <MenuItem onClick={handleClose}>Leaf</MenuItem>

            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
};

function ChatBotAi(props) {
  const userBubbleRef = useRef(null);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('')
  const [btnshow, setBtnshow] = useState(false)
  const [addsavebtnhide, setAddsavebtnhide] = useState(false)
  const [intenthide, setintenthide] = useState(true)
  // const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  let inthideshow = useSelector((state) => state.Inthideshow)
  const classes = useStyles();
  var UserID = getCookie("roleId");
  const [value, setValue] = useState('public');
  const [state, setState] = React.useState(false);
  //const [chatMessages, setChatMessages] = useState([]);
  const [chatMessages, setChatMessages] = useState([{
    "text": "Welcome to B-IT AI. Please note that the AI is still under training",
    "isUser": false,
    "curDate": "Oct 3, 12:08 PM"
  }]);
  const [message, setMessage] = useState("");
  const [curMessage, setCurMessage] = useState("");
  const [messageSubmitClicked, setMessageSubmitClicked] = useState(false);
  const [bussinfoshow, setbussinfoshow] = useState([]);
  const [swtvalue, setSwtvalue] = useState(false);
  //   const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const ariaLabel = { 'aria-label': 'Type your message here' };
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchOpen1, setSearchOpen1] = useState(false);
  const [openStack, setOpenStack] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverDelete1, setHoverDelete1] = useState(false);
  const [hoverMore1, setHoverMore1] = useState(false);
  const [hoverDelete, setHoverDelete] = useState(false);
  const [hoverMore, setHoverMore] = useState(false);
  const [searchParams] = useSearchParams();
  const Fjid = searchParams.get("vid");
  const cname = searchParams.get("cname");
  const avid = searchParams.get("avid");
  const tvid = searchParams.get("tvid");
  const accid = searchParams.get("accid");
  const queryStrChatBot = searchParams.get("cbt");
  const [dateTime, setDateTime] = useState(new Date());
  const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  const [count, setCount] = useState([]);
  const [showButtons, setShowButtons] = useState(false);

  React.useEffect(() => {
    const savedCounts = localStorage.getItem('chatproductcount');
    if (savedCounts) {
      setCount(JSON.parse(savedCounts));
    }
  }, [props]);
  React.useEffect(() => {
    localStorage.setItem('chatproductcount', JSON.stringify(count));

  }, [count]);

  React.useEffect(() => {


    const savedCounts = JSON.parse(localStorage.getItem('chatproductcount')) || [];
    if (savedCounts?.length > 0) {
      setCount(savedCounts);
    }
    else {
      const savedCounts = JSON.parse(localStorage.getItem('carticonclick1')) || "";
      if (savedCounts == "1") {
        setCount([]);

        localStorage.setItem('carticonclick1', '0')
      }
      localStorage.setItem('carticonclick1', '0')
      //setCounts([]);
      // loadData();
      // setCounts(JSON.parse(localStorage.getItem('pcounts')));
    }

  }, [props.LocalStorageISCart]);
  React.useEffect(() => {
    if (userBubbleRef.current) {
      userBubbleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleAdd = (product) => {
    //


    const productIndex = count.findIndex(item => item.PID === product.PID);
    if (productIndex > -1) {
      setCount(count.map(item => item.PID === product.PID ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCount([...count, { PID: product.PID, NM: product.NM, quantity: 1, ProdPrice: product.FPP, cby: getCookie("roleId") }]);
    }
  };

  const handleMinus = (PID) => {
    try {

      setCount(count.map(item => item.PID === PID ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item).filter(item => item.quantity > 0));

    } catch (error) {

    }
  };

  const handleAddCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [anchorEl2, setAnchorEl2] = useState(null);
  const [menuOpen1, setMenuOpen1] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isHovering1, setIsHovering1] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const handleMouseEnter1 = () => {
    setIsHovering1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovering1(false);
  };
  const handleMouseEnter2 = () => {
    setIsHovering2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovering2(false);
  };
  const handleOpenMenu3 = (event) => {
    setAnchorEl2(event.currentTarget);
    setMenuOpen1(true);
  };

  const handleMoreHorizClick = () => {
    setOpenStack(!openStack);
  };
  const handleMenuClick = () => {
    setMenuOpen(true);
  };
  const handleClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl1(null);
  };
  const handleMenuClose = () => {
    setMenuOpen(false);
  };
  const handleSearchClick = () => {
    setSearchOpen(!searchOpen)
  };
  const handleSearchClick1 = () => {
    setSearchOpen1(!searchOpen1)
  };

  const handleAttachedClick = () => {
    console.log("Attached clicked");
  };

  const handleCameraClick = () => {
    console.log("Camera clicked");
  };

  const handleGalleryClick = () => {
    console.log("Gallery clicked");
  };

  const handleAudioClick = () => {
    console.log("Audio clicked");
  };

  const handleLocationClick = () => {
    console.log("Location clicked");
  };

  const handleContactClick = () => {
    console.log("Contact clicked");
  };
  const [date, setDate] = useState("");

  const [activeIndex, setActiveIndex] = React.useState(0);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };
  const handleCloseMenu3 = () => {
    setAnchorEl2(null);
    setMenuOpen1(false);
  };
  const Ordernow = (i) => {
    //
    if (userBubbleRef.current) {
      userBubbleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    let m1 = i.text
    let arr = []
    let arr1 = []
    const savedCounts = JSON.parse(localStorage.getItem('chatproductcount')) || [];
    // savedCounts.map((item) => {
    //   const { PID, quantity, ProdPrice } = item;
    //   arr.push({
    //     id: PID,
    //     count: quantity.toString(),
    //     price: ProdPrice.toString(),
    //   });
    // });

    savedCounts.forEach((item) => {
      const { PID, quantity, ProdPrice } = item;

      if (m1.some((array1Item) => array1Item.PID === PID)) {
        arr.push({
          id: PID,
          count: quantity.toString(),
          price: ProdPrice.toString(),
        });
      }
    });
    setCount([])
    if (arr.length > 0) {
      GetResponseForOrdernow(i.nextquery, i.rest_id, "order", arr)
    } else {
      let reqDateTime = (new Date(dateTime).toLocaleString('en-US', options));
      let resDateTime = (new Date(dateTime).toLocaleString('en-US', options));
      setChatMessages([...chatMessages, { text: "Order", isUser: true, curDate: reqDateTime }, { text: "I apologize, but I'm having trouble processing your request. Could you try asking in a different way?.", isUser: false, curDate: resDateTime }]);
    }

  }
  // [{id:'2023052400007202305240002',"count":"2","price":"1526.0"},{id:'2023052400007202305240001',"count":"2","price":"1526.0"}]

  const handleMouseUp = () => {
    setDate(new Date().toLocaleDateString());
  };
  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <ListItemText primary="Item 1" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Item 2" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary="Item 3" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Item 4" />
        </ListItem>
      </List>
    </div>
  );
  const handleChange = (val) => {

    setValue(val);
    handleClose();
  };
  const handleListItemClick0 = (event, index) => {

    setBtnshow(false)
    setActiveIndex(index);

    setintenthide(true)
    setAddsavebtnhide(false)

    document.querySelector('.hide1').click();
  };
  const handleListItemClick1 = (event, index) => {
    setActiveIndex(index);
    setintenthide(false)
    setBtnshow(false)
  };
  const renderIntents = () => (

    <div
      className="int1"
      onClick={(e) => handleListItemClick0(e, 0)}
      onMouseUp={handleMouseUp}
      style={{
        background: activeIndex === 0 ? "#C18B37" : "",
        color: activeIndex === 0 ? "white" : "gray",
        height: "40px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        paddingLeft: "10px",
      }}
    >
      <span style={{ marginRight: "auto", marginLeft: "10px", fontSize: '14px' }}>Isaucer Response</span>
      {activeIndex === 0 ? (
        <div style={{ display: "flex", alignItems: "center" }}>

          <IconButton
            sx={{
              color: activeIndex === 0 ? "black" : "gray",
              marginLeft: "10px",
            }}
            onMouseEnter={() => setHoverMore1(true)}
            onMouseLeave={() => setHoverMore1(false)}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </div>
      ) : (
        <>    {date && <span style={{ marginLeft: "10px" }}>{date}</span>}</>
      )}

    </div>
  );

  const renderTest = () => (
    <div
      className="int1"
      onClick={(e) => handleListItemClick1(e, 1)}
      onMouseUp={handleMouseUp}
      style={{
        background: activeIndex === 1 ? "#C18B37" : "",
        color: activeIndex === 1 ? "white" : "gray",
        height: "40px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        paddingLeft: "10px",
      }}
    >
      <span style={{ marginRight: "auto", marginLeft: "10px", fontSize: '14px' }}>Food Order Response</span>
      {activeIndex === 1 ? (
        <div style={{ display: "flex", alignItems: "center" }}>

          <IconButton
            sx={{
              color: activeIndex === 1 ? "black" : "gray",
              marginLeft: "10px",
            }}
            onMouseEnter={() => setHoverMore(true)}
            onMouseLeave={() => setHoverMore(false)}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </div>
      ) : (
        <>  {date && <span style={{ marginLeft: "10px" }}>{date}</span>}</>
      )}

    </div>

  );
  const handleClickFunction = (fromWhere) => {
    dispatch(FromHomeOrSetup(fromWhere)); // If fromWhere == Home || fromWhere == Setup
  }

  const chatBotOutputRef = useRef();

  // const chatHistoryRef = useRef(null);
  // useEffect(() => {
  //   //
  //   chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
  // }, [chatMessages]);

  const handleMessageSubmit = (e) => {
    //
    e.preventDefault();
    if (userBubbleRef.current) {
      userBubbleRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    if (message.trim() == '') {
      SWAlert.fire({
        position: 'center',
        icon: 'info',
        showConfirmButton: true,
        text: "Please ask a question.",
      });
      return;
    }
    // window.scrollTo({ bottom: 0, behavior: 'smooth' })
    if (UserID == "null" || UserID == '' || UserID == null || UserID == undefined) {
      // SWAlert.fire({
      //   position: 'center',
      //   icon: 'info',
      //   showConfirmButton: true,
      //   text: "Please SignIn.",
      // });
      // return;
      SWAlert.fire({
        position: 'center',
        icon: 'info',
        text: 'Please SignIn.',

        confirmButtonColor: '#3899ec',

        confirmButtonText: 'Ok',

      }).then((result) => {
        if (result.isConfirmed) {
          nav("/login");
        }
      });

    } else {


      setMessage('')
      setMessageSubmitClicked(true);


      if (chatBotOutputRef.current) {
        chatBotOutputRef.current.myFunction();
      }

      // const childComponent = document.querySelector('#childComponent');
      // childComponent.childFunction('parameter1', 'parameter2');

      GetResponseForRequest(message);
    }
    // e.preventDefault();
    // if (!message) return;
    // setChatMessages([...chatMessages, { text: message, isUser: true }]);
    // // Perform API request or other logic to generate bot's response
    // const botResponse = "Hello, I am the chatbot! ";
    // setChatMessages([...chatMessages, { text: botResponse, isUser: false }]);
    // setMessage("");openRestaurentMenu
  };

  async function GetResponseForRequest(message) {



    setLoading(true);
    let Req =
    // { "message": message, "sender": UserID }
    // Asking types for membership 

    {
      "sender": UserID,
      "message": message,
      "metadata": {
        "fjid": Fjid,
        "sender": UserID
      }
    }

    let reqDateTime = (new Date(dateTime).toLocaleString('en-US', options));

    const jsonString = JSON.stringify(Req)
    const cleanedJsonString = jsonString.replace(/'/g, '');


    const resp = await postAPICHAT(cleanedJsonString);
    let jsonObject = JSON.stringify(resp);

    let resDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    const welcomeMessage = JSON.parse(jsonObject)[0].text
    if (userBubbleRef.current) {
      userBubbleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setLoading(false);
    
    if (welcomeMessage != undefined) { // normal text inside her
      setbussinfoshow([])
      setChatMessages([...chatMessages, { text: message, isUser: true, curDate: reqDateTime }, { text: welcomeMessage, isUser: false, curDate: resDateTime }]);
    } else if (JSON.parse(jsonObject)[0].custom.Resp.Result.Req_Type === 'MSPS') {  // bussines oriented text inside her
      const bussinfo = JSON.parse(jsonObject)[0].custom.Resp.Result.MembershipType
      const Next_Query = JSON.parse(jsonObject)[0].custom.Resp.Result.Next_query
      setbussinfoshow([JSON.parse(jsonObject)[0].custom.Resp.Result.Req_Type])
      setChatMessages([...chatMessages, { text: message, isUser: true, curDate: reqDateTime }, { text: bussinfo, checkvalue: JSON.parse(jsonObject)[0].custom.Resp.Result.Req_Type, nextquery: Next_Query, isUser: false, curDate: resDateTime }]);
    }




  }

  const openRestaurentMenu = (item, i) => {
    //
    // setMessage(i.nextquery.replace('{rest_name}', item.BNM))
    if (userBubbleRef.current) {
      userBubbleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setCount([])
    GetResponseForRest_Menu(i.nextquery.replace('{rest_name}', item.BNM), item.ViewID, item.BNM)
  }
  async function GetResponseForRest_Menu(message, viewid, name) {
    //

    // {"sender": "ISU202305200001", "message": "I want menu of SS Hyderabad", "metadata": {"rest_id": "2023052000125"}}
    setLoading(true);
    let Req =
      { "sender": UserID, "message": message, "metadata": { "rest_id": viewid } }

    let reqDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    //
    const jsonString = JSON.stringify(Req)
    const cleanedJsonString = jsonString.replace(/'/g, '');


    const resp = await postAPICHAT(cleanedJsonString);
    let jsonObject = JSON.stringify(resp);
    let resDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    const welcomeMessage = JSON.parse(jsonObject)[0].text
    if (userBubbleRef.current) {
      userBubbleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setLoading(false);
    //
    if (welcomeMessage != undefined) {
      setbussinfoshow([])
      setChatMessages([...chatMessages, { text: message, isUser: true, curDate: reqDateTime }, { text: welcomeMessage, isUser: false, curDate: resDateTime }]);
    } else if (JSON.parse(jsonObject)[0].custom.Req_Type === 'FR') {
      const bussinfo = JSON.parse(jsonObject)[0].custom.Restaurants
      const Next_Query = JSON.parse(jsonObject)[0].custom.Next_query
      setbussinfoshow([JSON.parse(jsonObject)[0].custom.Req_Type])
      setChatMessages([...chatMessages, { text: message, isUser: true, curDate: reqDateTime }, { text: bussinfo, nextquery: Next_Query, isUser: false, curDate: resDateTime }]);
    } else if (JSON.parse(jsonObject)[0].custom.Req_Type === 'SR') {
      const parsedObject = JSON.parse(jsonObject)[0].custom.Restaurants.menu
      const Next_Query = JSON.parse(jsonObject)[0].custom.Next_query
      const menus = [];

      for (const item of parsedObject) {
        menus.push(...item.objects);
      }
      setChatMessages([...chatMessages, { text: name, isUser: true, curDate: reqDateTime }, { text: menus, checkvalue: JSON.parse(jsonObject)[0].custom.Req_Type, rest_id: JSON.parse(jsonObject)[0].custom.Restaurants.ViewID, nextquery: Next_Query, isUser: false, curDate: resDateTime }]);

    }
  }
  async function GetResponseForOrdernow(message, viewid, name, product) {
    //
    // { "sender": UserID, "message": message, "metadata": { "rest_id": viewid } }
    // {"sender": "ISU202305200001", "message": "I want menu of SS Hyderabad", "metadata": {"rest_id": "2023052000125"}}
    setLoading(true);
    let Req =

    // {
    //   "sender": UserID,
    //    "message": UserID, 
    //    "rest_id": viewid,
    //    "product_id":product
    //   //  [{id:'2023052400007202305240002',"count":"2","price":"1526.0"},{id:'2023052400007202305240001',"count":"2","price":"1526.0"}]
    //   } 
    {

      "sender": UserID,

      "message": message,

      "metadata": {

        "rest_id": viewid,

        "product_info": product
      }

    }
    let reqDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    //
    const jsonString = JSON.stringify(Req)
    const cleanedJsonString = jsonString.replace(/'/g, '');


    const resp = await postAPICHAT(cleanedJsonString);
    let jsonObject = JSON.stringify(resp);
    let resDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    const welcomeMessage = JSON.parse(jsonObject)[0].text
    if (userBubbleRef.current) {
      userBubbleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setLoading(false);
    //
    if (welcomeMessage != undefined) {
      setbussinfoshow([])
      setChatMessages([...chatMessages, { text: message, isUser: true, curDate: reqDateTime }, { text: welcomeMessage, isUser: false, curDate: resDateTime }]);
    } else if (JSON.parse(jsonObject)[0].custom.Req_Type === 'FR') {
      const bussinfo = JSON.parse(jsonObject)[0].custom.Restaurants
      const Next_Query = JSON.parse(jsonObject)[0].custom.Next_query
      setbussinfoshow([JSON.parse(jsonObject)[0].custom.Req_Type])
      setChatMessages([...chatMessages, { text: message, isUser: true, curDate: reqDateTime }, { text: bussinfo, nextquery: Next_Query, isUser: false, curDate: resDateTime }]);
    } else if (JSON.parse(jsonObject)[0].custom.Req_Type === 'SR') {
      const parsedObject = JSON.parse(jsonObject)[0].custom.Restaurants.menu
      const Next_Query = JSON.parse(jsonObject)[0].custom.Next_query
      const menus = [];

      for (const item of parsedObject) {
        menus.push(...item.objects);
      }
      setChatMessages([...chatMessages, { text: name, isUser: true, curDate: reqDateTime }, { text: menus, checkvalue: JSON.parse(jsonObject)[0].custom.Req_Type, rest_id: JSON.parse(jsonObject)[0].custom.Restaurants.ViewID, nextquery: Next_Query, isUser: false, curDate: resDateTime }]);

    } else if (JSON.parse(jsonObject)[0].custom.Req_Type === 'PO') {
      const productlist = JSON.parse(jsonObject)[0].custom.Order_Info.prod_list
      const Next_Query = JSON.parse(jsonObject)[0].custom.Next_query

      setChatMessages([...chatMessages, { text: name, isUser: true, curDate: reqDateTime }, { text: productlist, checkvalue: JSON.parse(jsonObject)[0].custom.Req_Type, rest_id: JSON.parse(jsonObject)[0].custom.Order_Info.rest_id, nextquery: Next_Query, totalamt: JSON.parse(jsonObject)[0].custom.Order_Info.total_amount, totalqty: JSON.parse(jsonObject)[0].custom.Order_Info.total_prds, isUser: false, curDate: resDateTime }]);

    }
  }
  const handleChangeradio = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleConfirmOrder = (items) => {
    //
    if (paymentMethod === 'cash') {
      let ps = []
      items.text[0].text.map((item) => {
        const { pid, qty } = item;
        ps.push({
          odi: "",
          pid: pid,
          qty: qty,
          pn: "",
          op: "",
          tx: ""
        });
      });
      GetResponseForOrderconfirm("payment process", items.rest_id, "Yes Confirm", ps, items.totalqty)
    } else {
      let array1 = []
      array1.push(items)
      let reqDateTime = (new Date(dateTime).toLocaleString('en-US', options));
      let resDateTime = (new Date(dateTime).toLocaleString('en-US', options));
      setChatMessages([...chatMessages, { text: "Please Select Payment", isUser: true, curDate: reqDateTime },
      { text: array1, checkvalue: "PM", nextquery: "Payment", totalamt: items.totalamt, rest_id: items.rest_id, totalqty: items.totalqty, isUser: false, curDate: resDateTime }]);

    }

  }
  const handleOrdernew = (items) => {
    //
    let array1 = []
    array1.push(items)
    let reqDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    let resDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    setChatMessages([...chatMessages, { text: "Please Select Payment", isUser: true, curDate: reqDateTime },
    { text: array1, checkvalue: "PM", nextquery: "Payment", totalamt: items.totalamt, rest_id: items.rest_id, totalqty: items.totalqty, isUser: false, curDate: resDateTime }]);

  }
  async function GetResponseForOrderconfirm(message, viewid, name, product, qty) {
    //
    setLoading(true);
    let Req =
    {
      "sender": UserID,
      "message": message,
      "metadata": {
        "rest_id": viewid,
        "rkid": viewid,
        "bid": "",
        "id": "",
        "od": "",
        "gid": "",
        "os": "1",
        "isc": "1",
        "cid": UserID,
        "cn": "",
        "sid": "",
        "pt": "2002",
        "pts": "",
        "dyt": "",
        "tn": "",
        "atb": "0",
        "dtb": "",
        "dya": "",
        "cby": UserID,
        "ps": {
          "oi": product
        },
        "qty": qty,
        "pn": "",
        "op": "",
        "tx": ""
      }

    }
    let reqDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    //
    const jsonString = JSON.stringify(Req)
    const cleanedJsonString = jsonString.replace(/'/g, '');


    const resp = await postAPICHAT(cleanedJsonString);
    let jsonObject = JSON.stringify(resp);
    let resDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    const welcomeMessage = JSON.parse(jsonObject)[0].text
    if (userBubbleRef.current) {
      userBubbleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setLoading(false);
    //
    if (welcomeMessage != undefined) {
      setbussinfoshow([])
      setChatMessages([...chatMessages, { text: message, isUser: true, curDate: reqDateTime }, { text: welcomeMessage, isUser: false, curDate: resDateTime }]);
    } else if (JSON.parse(jsonObject)[0].custom.Req_Type === 'FR') {
      const bussinfo = JSON.parse(jsonObject)[0].custom.Restaurants
      const Next_Query = JSON.parse(jsonObject)[0].custom.Next_query
      setbussinfoshow([JSON.parse(jsonObject)[0].custom.Req_Type])
      setChatMessages([...chatMessages, { text: message, isUser: true, curDate: reqDateTime }, { text: bussinfo, nextquery: Next_Query, isUser: false, curDate: resDateTime }]);
    } else if (JSON.parse(jsonObject)[0].custom.Req_Type === 'SR') {
      const parsedObject = JSON.parse(jsonObject)[0].custom.Restaurants.menu
      const Next_Query = JSON.parse(jsonObject)[0].custom.Next_query
      const menus = [];

      for (const item of parsedObject) {
        menus.push(...item.objects);
      }
      setChatMessages([...chatMessages, { text: name, isUser: true, curDate: reqDateTime }, { text: menus, checkvalue: JSON.parse(jsonObject)[0].custom.Req_Type, rest_id: JSON.parse(jsonObject)[0].custom.Restaurants.ViewID, nextquery: Next_Query, isUser: false, curDate: resDateTime }]);

    } else if (JSON.parse(jsonObject)[0].custom.Req_Type === 'PO') {
      const productlist = JSON.parse(jsonObject)[0].custom.Order_Info.prod_list
      const Next_Query = JSON.parse(jsonObject)[0].custom.Next_query

      setChatMessages([...chatMessages, { text: name, isUser: true, curDate: reqDateTime }, { text: productlist, checkvalue: JSON.parse(jsonObject)[0].custom.Req_Type, rest_id: JSON.parse(jsonObject)[0].custom.Order_Info.rest_id, nextquery: Next_Query, totalamt: JSON.parse(jsonObject)[0].custom.Order_Info.total_amount, totalqty: JSON.parse(jsonObject)[0].custom.Order_Info.total_prds, isUser: false, curDate: resDateTime }]);

    } else if (JSON.parse(jsonObject)[0].custom.Req_Type === 'CCSO') {
      let array1 = []
      const productlist = JSON.parse(jsonObject)[0].custom.Order_Info
      const Next_Query = JSON.parse(jsonObject)[0].custom.Next_query
      array1.push(productlist.AMT, productlist.CUSID, productlist.RKID,);

      setChatMessages([...chatMessages, { text: name, isUser: true, curDate: reqDateTime }, { text: array1, checkvalue: JSON.parse(jsonObject)[0].custom.Req_Type, rest_id: JSON.parse(jsonObject)[0].custom.Order_Info.BID, nextquery: Next_Query, totalamt: JSON.parse(jsonObject)[0].custom.Order_Info.AMT, isUser: false, curDate: resDateTime }]);

    }
  }
  function handleMessageChange(e) {
    setMessage(e.target.value);
    setCurMessage(e.target.value);
  }
  const handelClickSubscriped = (x) => {
    setLoading(true);
    var arrAddToCart = JSON.parse(localStorage.getItem('pcounts')) || [];
    const LogedInUserId = getCookie('roleId');
    if (LogedInUserId == 'null') {
      const params = { righttreeid: props.RightTreeID, comingfrom: 'Subscription' };
      nav(`/login?${createSearchParams(params)}`);
    }
    else {
      if (x.pkgtypeid != null && x.pkgtypeid != '1') { // Subscribe only Personal Training Package Or InBody Assessment
        if (x.vsub == '0') {
          SWAlert.fire({
            position: 'center',
            icon: 'info',
            title: 'Subscribe...',
            showConfirmButton: true,
            text: "Please subscribe the gym package first to buy the Training/InBody Assessment...",
          });
          setLoading(false);
          return;
        }
      }

      const AllParams = {
        do: '1',

        cname: cname,
        vid: Fjid,
        avid: avid,
        tvid: tvid,
        accid: accid,
        ptypeid: x.pkgtypeid,
        cbt: '1'
      };


      if (arrAddToCart.length > 0) {

        if (x.pkgtypeid == '1') {
          SWAlert.fire({
            text: 'Your cart have items from diffrent Vendor/Add On Service/User. Are you sure want to clear your cart?',
            showCancelButton: true,
            confirmButtonColor: '#3899ec',
            cancelButtonColor: '#d33',
            focusCancel: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel'
          }).then((result) => {

            if (result.isConfirmed) {
              localStorage.setItem('pcounts', JSON.stringify([{ BID: Fjid, KID: Fjid, PID: x.PlanID, NM: x.PlanName, quantity: 1, ProdPrice: x.Amount + (x.IsJoinfee == '1' ? x.JoinFee : 0), IsJoinfee: x.IsJoinfee, JoinFee: x.JoinFee, Tax: x.tax, cby: getCookie("roleId"), FJTypeID: tvid, PackageTypeID: x.pkgtypeid, RedirectParam: AllParams }]));
              dispatch(AddToCartCounter(1));
              HandleSubscripeclicked(x)
              // Update state to force re-render
              // This triggers a re-render
            }
            else {
              setLoading(false)
            }
          });
        }
        else {
          const localstorageData = JSON.parse(localStorage.getItem('pcounts')) || [];
          const newData = { BID: Fjid, KID: Fjid, PID: x.PlanID, NM: x.PlanName, quantity: 1, ProdPrice: x.Amount + (x.IsJoinfee == 1 ? x.JoinFee : 0), IsJoinfee: x.IsJoinfee, JoinFee: x.JoinFee, Tax: x.tax, cby: getCookie("roleId"), FJTypeID: tvid, PackageTypeID: x.pkgtypeid, RedirectParam: AllParams };
          localstorageData.push(newData);
          localStorage.setItem('pcounts', JSON.stringify(localstorageData));

          dispatch(AddToCartCounter(localstorageData.length));
          HandleSubscripeclicked(x)
            // Update state to force re-render
            ; // This triggers a re-render
        }
      }
      else {

        localStorage.setItem('pcounts', JSON.stringify([{ BID: Fjid, KID: Fjid, PID: x.PlanID, NM: x.PlanName, quantity: 1, ProdPrice: x.Amount + (x.IsJoinfee == 1 ? x.JoinFee : 0), IsJoinfee: x.IsJoinfee, JoinFee: x.JoinFee, Tax: x.tax, cby: getCookie("roleId"), FJTypeID: tvid, PackageTypeID: x.pkgtypeid, RedirectParam: AllParams }]));
        dispatch(AddToCartCounter(1));
        HandleSubscripeclicked(x)
          // Update state to force re-render
          ; // This triggers a re-render
      }
      // setLoading(false);
    }
  }
  async function HandleSubscripeclicked(e) {

    setLoading(true);
    let Req = {
      "sender": UserID,
      "message": "I want to subscribe",
      "metadata": {
        "fjid": Fjid,
        "sender": UserID
      },
      "membership_data": [
        {
          "BID": e.BID,
          "KID": e.KID,
          "PID": e.PID,
          "NM": e.NM,
          "quantity": e.quantity,
          "ProdPrice": e.ProdPrice,
          "IsJoinfee": e.IsJoinfee,
          "JoinFee": e.JoinFee,
          "Tax": e.Tax,
          "cby": e.cby,
          "FJTypeID": e.FJTypeID,
          "PackageTypeID": e.PackageTypeID,
          "RedirectParam": {
            "do": "1",
            "cname": cname,
            "vid": Fjid,
            "avid": avid,
            "tvid": tvid,
            "accid": accid,
            "ptypeid": e.pkgtypeid,
            "cbt": '1'
          }
        }
      ]
    }
    let reqDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    //
    const jsonString = JSON.stringify(Req)
    const cleanedJsonString = jsonString.replace(/'/g, '');


    const resp = await postAPICHAT(cleanedJsonString);
    let jsonObject = JSON.stringify(resp);
    let resDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    const welcomeMessage = JSON.parse(jsonObject)[0].text
    if (userBubbleRef.current) {
      userBubbleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setLoading(false);
    //
    if (welcomeMessage != undefined) {
      setbussinfoshow([])
      setChatMessages([...chatMessages, { text: 'Subscribed', isUser: true, curDate: reqDateTime }, { text: welcomeMessage, isUser: false, curDate: resDateTime }]);
    }
  }

  async function HandleCheckoutclick() {
    
    setLoading(true);
    const localstorageData = JSON.parse(localStorage.getItem('Chatbotcheckout')) || [];
    let Req = {
      "sender": UserID,
      "message": "I want to checkout",
      "metadata": {
        "Req": {
          "Type": "MUSS",
          "CRUD": "C",
          "Rsk": "UnEuNhoKLZBdIcLjKILZg==",
          "DevID": "",
          "PlanID": localstorageData[0].PID,
          "UserID": UserID,
          "ViewID": Fjid,
          "GWID": localstorageData[1]
        }
      }
    }
    
    let reqDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    //
    const jsonString = JSON.stringify(Req)
    const cleanedJsonString = jsonString.replace(/'/g, '');


    const resp = await postAPICHAT(cleanedJsonString);
    let jsonObject = JSON.stringify(resp);
    
    let resDateTime = (new Date(dateTime).toLocaleString('en-US', options));
    const welcomeMessage = JSON.parse(jsonObject)[0].text

    if (userBubbleRef.current) {
      userBubbleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setLoading(false);
    //
    if (welcomeMessage != undefined) {
      setbussinfoshow([])
      setChatMessages([...chatMessages, { text: 'checkout', isUser: true, curDate: reqDateTime }, { text: welcomeMessage, isUser: false, curDate: resDateTime }]);
    }

  }

  const handleContextMenuClose = () => {
    setAnchorEl(null);
  };

  // const handleMessageSubmit = (e) => {
  //   e.preventDefault();
  //   if (!message) return;
  //   setChatMessages([...chatMessages, { text: message, isUser: true }]);
  //   // Perform API request or other logic to generate bot's response
  //   const botResponse = "Hello, I am the chatbot! ";
  //   setChatMessages([...chatMessages, { text: botResponse, isUser: false }]);
  //   setMessage("");
  // };
  // const handleContextMenuClose = () => {
  //   setAnchorEl(null);
  // };

  const handleContextMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <div className="App formentrygrid111" >

        <Loading style={{
          display: loading ? "flex" : "none"
        }} loading={loading} />

        {/* <HeaderForm clickFunction={handleClickFunction} /> */}
        <div style={{ display: 'none' }} className="HandleCheckoutclick" onClick={HandleCheckoutclick}></div>
        {isSmallScreen ?
          <>
            <div style={{ marginTop: '10px' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>



              </Stack>


              <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
                <div>
                  <Stack direction="row" spacing={100}>
                    <h4 style={{ color: "black", marginTop: '15px', marginLeft: '20px' }}>Chat</h4>

                    <AddIcon style={{ backgroundColor: '#EC6331', marginTop: '15px', color: 'white' }} />
                  </Stack>
                  <div style={{ display: 'flex', width: '280px', marginLeft: '20px', alignItems: 'center', backgroundColor: '#F6F6F6', borderRadius: '4px', padding: '2px', marginTop: '20px' }}>

                    <InputBase placeholder="Search..." style={{ flex: 1, fontSize: '14px' }} />
                    <IconButton size="small">
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  </div>
                  <Stack marginTop={'30px'}>
                    <h4 style={{ color: "black", marginLeft: '20px' }}>History</h4>

                  </Stack>
                  <Stack marginTop="20px">
                    {renderIntents()}
                    {renderTest()}
                  </Stack>
                  <Divider sx={{ marginTop: '220px' }}></Divider>
                  <Stack direction="column" spacing={10} alignItems="flex-start" marginTop="5px" marginLeft="20px">
                    <Stack direction="row" alignItems="center">
                      <AddShoppingCartIcon fontSize="small" />
                      <Typography variant="caption" sx={{ marginLeft: '10px' }}>Order</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                      <BookmarkBorderIcon fontSize="small" />
                      <Typography variant="caption" sx={{ marginLeft: '10px' }}>BookMark</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                      <SettingsIcon fontSize="small" />
                      <Typography variant="caption" sx={{ marginLeft: '10px' }}>Settings</Typography>
                    </Stack>

                  </Stack>

                </div>
              </Drawer>
            </div>
            <div className="div3" style={{
              width: '110%', boxSizing: 'border-box', color: 'black', height: 'auto',
              backgroundColor: '#dae1e9',marginTop:'3%',marginBottom:'10%'
            }}>
              <div >
                <Paper id="id_ChatBot" className={classes.chatContainer}>

                  <Stack direction="column" >
                    {chatMessages.map((chatMessage, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        justifyContent={chatMessage.isUser && 'flex-end'}
                      >
                        {!chatMessage.isUser ?
                          <IconButton sx={{ bottom: '10px', paddingLeft: '35px' }} disableRipple >
                            <img src={iSaucer} width="40" height="40" style={{ marginRight: '10px', marginTop: '10px', marginleft: '10px' }} />
                          </IconButton> : <></>
                          //  :   <IconButton onClick={handleContextMenuClick} sx={{ bottom: '10px', }} disableRipple>
                          //       <MoreVertIcon sx={{ marginTop: '8px' }} />
                          //     </IconButton>
                        }

                        {Array.isArray(chatMessage.text) ? (
                          chatMessage.checkvalue === 'MSPS' ? (
                            <Grid container spacing={3} className="gridViewChatBot" style={{ marginBottom:   chatMessage.checkvalue === 'MSPS' ?'40%':'5%', marginTop: '10px', backgroundColor: '#002a3a' ,maxHeight:'1000vh',height:'auto'}} ref={userBubbleRef}>

                              {chatMessage.text.map((item, itemIndex) => (
                                <Grid key={itemIndex} item md={12} xs={12} sm={12} style={{ marginTop: '35px', position: 'relative', marginBottom: '110px', marginTop: '25px' }} className='maingrid1' direction='row'>
                                  {/* Image Stack with absolute positioning */}

                                  <Stack className='SubstackPublicmpchat'>

                                  </Stack>
                                  <Stack className='addmorebuttonsubscriptionchat' direction='row'>

                                    <MoreHorizIcon sx={{ backgroundColor: '#dae1e9', borderRadius: '100px' }}></MoreHorizIcon>
                                    <h5 style={{ cursor: 'pointer', color: '#002a3a', fontSize: '12px', alignItems: 'center', justifyContent: 'center', marginTop: '3px', marginLeft: '3px' }}>
                                      Know more
                                    </h5>
                                  </Stack>
                                  <Stack className='Substack5Publicchat' sx={{ marginTop: '10px' }}>
                                    <div>  <span >Membership Price:</span>
                                      <span >{new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.Amount)}</span></div>
                                    {item.IsJoinfee == 1 &&
                                      <div> <span>Joining Fee :</span><span>{item.IsJoinfee === 1
                                        ? new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.JoinFee)
                                        : ''}</span></div>}
                                    <div> <span> VAT </span>: <span> {new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.tax)}</span></div>
                                    {item.Discount != null && (item.IsDiscFlat == 0 ? <div><span>Discount:</span><span> {item.Discount}  %</span></div> : <div><span>Discount:</span><span> {item.Discount} Flat</span></div>)}
                                    {item.isfreez_avl == '1' && <div><span>Freez Amt:</span><span>{item.freez_fees}  </span></div>}
                                    <div><span>Package Validity :</span><span>{item.Duration} Days </span></div>
                                  </Stack>
                                  <Stack className='Substack1Publicchat'>
                                    {
                                      item.Icon === ""
                                        ? <img src='https://tnbdemo.barrlasystems.com/ifs/is/user.png' className='imgtagpublic' ></img>
                                        : <img src={item.Icon} className='imgtagpublic' ></img>
                                    }
                                  </Stack>
                                  <Stack className='Substack6Publicchat'>
                                    {matches ? (item.PlanDesc != "" ? (item.PlanDesc.length > 15 ? item.PlanDesc.substring(0, 15) + "..." : item.PlanDesc) : "") : (item.PlanDesc != "" ? (item.PlanDesc.length > 15 ? item.PlanDesc.substring(0, 15) + "..." : item.PlanDesc) : "")}
                                  </Stack>
                                  {/* Display name and email if they exist */}
                                  <Stack className='Substack3Publicchat'>
                                    {matches ? (item.PlanName != "" ? (item.PlanName.length > 10 ? item.PlanName.substring(0, 10) + "..." : item.PlanName) : "") : (item.PlanName != "" ? (item.PlanName.length > 25 ? item.PlanName.substring(0, 25) + "..." : item.PlanName) : "")}
                                  </Stack>
                                  <Stack className='Substack4Publicchat'>
                                    {item.IsJoinfee === 1 ? (
                                      <div  >
                                        {item.Discount == null ? (
                                          <div style={{ textAlign: 'center' }}>{new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.Amount + item.JoinFee + item.tax)}</div>
                                        ) : (
                                          <Stack direction='row' spacing={5} marginTop='10px'>
                                            <div style={{ textDecoration: 'line-through red', fontSize: '14px', marginLeft: '10px', color: 'red' }}>
                                              {new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.Amount + item.JoinFee + item.tax)}
                                            </div>
                                            <Divider orientation="vertical" flexItem sx={{ borderColor: 'black', borderWidth: '1px', width: '1px' }} />
                                            <div style={{ fontSize: '16px' }}>
                                              {new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.Amount + item.JoinFee + item.tax - item.Discount)}
                                            </div>
                                          </Stack>
                                        )}
                                      </div>
                                    ) : (
                                      <div  >
                                        {item.Discount == null ? (
                                          <div style={{ textAlign: 'center' }}>{new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.Amount + item.tax)}</div>
                                        ) : (
                                          <Stack direction='row' spacing={5} marginTop='10px'>
                                            <div style={{ textDecoration: 'line-through red', fontSize: '14px', marginLeft: '10px', color: 'red' }}>
                                              {new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.Amount + item.tax)}
                                            </div>
                                            <Divider orientation="vertical" flexItem sx={{ borderColor: 'black', borderWidth: '1px', width: '1px' }} />
                                            <div style={{ fontSize: '16px' }}>
                                              {new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.Amount + item.tax - item.disc_amount)}
                                            </div>
                                          </Stack>
                                        )}
                                      </div>
                                    )}
                                  </Stack>

                                  <Stack className='Substack2Publicchat'>

                                    <DiaBtn2
                                      variant='outlined'
                                      style={{ backgroundColor: 'green', color: 'white', height: '25px' }}
                                      className='savemenu1'
                                      onClick={(e) => handelClickSubscriped(item)}
                                    >
                                      Subscribe Now
                                    </DiaBtn2>

                                  </Stack>


                                  {/* Grid containing the other details */}
                                  <Grid className='subgridpublicmobile' >

                                  </Grid>
                                </Grid>
                              ))}</Grid>) : chatMessage.checkvalue === 'SR' ? (

                                <Grid container spacing={3} className="gridViewChatBot" ref={userBubbleRef}>
                                  {chatMessage.text.map((x, idx) => (

                                    <Grid item xs={12} sm={6} md={4} lg={3} key={x}>
                                      <Box sx={{ boxShadow: 2, padding: 3 }}>
                                        <img src={'https://tnbdemo.barrlasystems.com/ifs/is/MB.jpg'} alt={x.NM} style={{ width: "100%", height: '160px' }} />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                          <Typography style={{ fontWeight: 'bolder', fontSize: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} component="div">
                                            {x.NM}
                                          </Typography>

                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, height: '35px' }}>
                                          {x.FPP != x.FDPP ?
                                            <>
                                              <Box sx={{ display: 'flex', alignItems: 'left', }}>
                                                <Typography variant="body2" style={{ marginLeft: '5px', fontSize: 12, fontWeight: 'bold', textDecoration: 'line-through', color: 'red' }}>₹ {x.FPP}</Typography>
                                                <Typography style={{ fontSize: 12, fontWeight: 'bold', marginLeft: '5px' }} >  ₹ {x.FDPP}</Typography>
                                              </Box>
                                            </> : <>

                                              <Typography style={{ fontSize: 12, fontWeight: 'bold', marginLeft: '5px' }} >  ₹ {x.FDPP}</Typography>
                                            </>
                                          }
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                            {count.find(item => item.PID === x.PID) ? (
                                              <>
                                                <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: '0px 3px 6px #B1B2BB', border: '0px solid #B1B2BB', justifyContent: 'center', backgroundColor: '#f5f5f5', padding: '1px', borderRadius: '5px' }}>
                                                  <Button style={{ backgroundColor: '#D9534F', fontWeight: 'bolder', padding: '4px 8px', minWidth: '30px', fontSize: '0.625rem' }} variant="contained" size="small" onClick={() => handleMinus(x.PID)}>
                                                    -
                                                  </Button>
                                                  <Typography style={{ fontWeight: 'bold', color: '#1A1A1A', fontSize: '12px' }} sx={{ mx: 2 }}>
                                                    {count.find(item => item.PID === x.PID).quantity}
                                                  </Typography>
                                                  <Button variant="contained" style={{ backgroundColor: '#5CB85C', fontWeight: 'bolder', padding: '4px 8px', minWidth: '30px', fontSize: '0.625rem' }} size="small" onClick={() => handleAdd(x)}>
                                                    +
                                                  </Button>

                                                </Box>
                                              </>
                                            ) : (
                                              <>
                                                <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: '0px 3px 6px #B1B2BB', border: '0px solid #B1B2BB', justifyContent: 'center', backgroundColor: '#f5f5f5', padding: '1px', borderRadius: '0px' }}>
                                                  <Button variant="contained" style={{ backgroundColor: '#5CB85C', fontWeight: 'bolder', padding: '4px 9px', minWidth: '50px', fontSize: '0.625rem' }} size="small" onClick={() => handleAdd(x)}>
                                                    Add
                                                  </Button>
                                                </Box>
                                              </>
                                            )
                                            }
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Grid>

                                  ))}
                                  <Box sx={{ display: 'flex', alignItems: 'flex-end', marginLeft: '15%', marginTop: '20px', marginBottom: '20px' }} >

                                    {count.length != 0 &&
                                      <>
                                        <Stack direction='row' alignItems='center' sx={{ marginTop: '10px' }} justifyContent='center' spacing={5}>
                                          <Stack alignItems='center' className='Order_btn' >
                                            <label className='Win_lbl' onClick={() => Ordernow(chatMessage)}>Order now</label>
                                          </Stack>
                                        </Stack>
                                      </>
                                    }
                                  </Box>
                                </Grid>
                              ) : chatMessage.checkvalue === 'PO' ? (

                                <Stack
                                  className={`${classes.chatBubble} ${chatMessage.isUser ? classes.userBubble : classes.botBubble
                                    }`}
                                  ref={userBubbleRef}
                                >
                                  <Typography style={{ fontWeight: 'bolder', fontSize: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} component="div">
                                    Order Summery
                                  </Typography>
                                  {chatMessage.text.map((x, idx) => (
                                    <Stack>
                                      <Typography style={{ fontSize: 12, fontWeight: 'bold', marginLeft: '5px' }} > {x.pname}</Typography>
                                    </Stack>

                                  ))}

                                  <Typography style={{ fontSize: 12, fontWeight: 'bold', marginLeft: '5px' }} >Total qty   {chatMessage.totalqty}</Typography>
                                  <Typography style={{ fontSize: 12, fontWeight: 'bold', marginLeft: '5px' }} >Total Amount  ₹ {chatMessage.totalamt}</Typography>

                                  <Button variant="contained" sx={{ mt: 2, mx: 'auto', display: 'block' }} size="small" onClick={() => handleOrdernew(chatMessage)} >
                                    Confirm
                                  </Button>
                                </Stack>
                              ) : chatMessage.checkvalue === 'PM' ? (

                                <Stack
                                  className={`${classes.chatBubble} ${chatMessage.isUser ? classes.userBubble : classes.botBubble
                                    }`}
                                  ref={userBubbleRef}
                                >
                                  <div>
                                    <Typography style={{ fontWeight: 'bolder', fontSize: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} component="div">

                                      Choose a Payment Mode
                                    </Typography>

                                    <RadioGroup value={paymentMethod}
                                      onChange={handleChangeradio} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                      <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                                      <FormControlLabel value="online" control={<Radio disabled sx={{ marginLeft: '15px' }} />} label="Online" />
                                    </RadioGroup>

                                    <Button variant="contained" sx={{ mt: 2, mx: 'auto', display: 'block' }} size="small" onClick={() => handleConfirmOrder(chatMessage)}>
                                      Confirm
                                    </Button>
                                  </div>
                                </Stack>
                              ) : chatMessage.checkvalue === 'CCSO' && (

                                <Stack
                                  className={`${classes.chatBubble} ${chatMessage.isUser ? classes.userBubble : classes.botBubble
                                    }`}
                                  ref={userBubbleRef}
                                >
                                  <div>
                                    <Typography style={{ fontWeight: 'bolder', fontSize: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} component="div">

                                      Your Order Successfully Placed !
                                    </Typography>
                                  </div>
                                </Stack>
                              )
                        ) : (
                          <div
                            className={`${classes.chatBubble} ${chatMessage.isUser ? classes.userBubble : classes.botBubble
                              }`}
                            ref={userBubbleRef}
                          >
                            {chatMessage.text}
                          </div>
                        )}
                        {chatMessage.isUser ? <IconButton sx={{ bottom: '10px' }} disableRipple >
                          <Avatar sx={{ marginTop: '10px', marginRight: '10px', width: '35px', height: '35px' }} />                       </IconButton>
                          : <></>
                          //  <IconButton onClick={handleContextMenuClick} sx={{ bottom: '10px', }} disableRipple>
                          //     <MoreVertIcon sx={{ marginTop: '8px' }} />
                          //   </IconButton>
                        }

                      </Stack>
                    ))}
                  </Stack>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleContextMenuClose}
                  >
                    <MenuItem>
                      <IconButton>
                        <BookmarkIcon />
                      </IconButton>
                      Bookmark
                    </MenuItem>
                    <MenuItem>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                      Delete
                    </MenuItem>
                    <MenuItem>
                      <IconButton>
                        <CopyIcon />
                      </IconButton>
                      Copy
                    </MenuItem>
                    <MenuItem>
                      <IconButton>
                        <ReplyIcon />
                      </IconButton>
                      Forward
                    </MenuItem>
                  </Menu>
                  {openStack && (
                    <Stack
                      direction="row"
                      spacing={10}
                      alignItems="center"
                      marginTop={{ xs: '375px', sm: '100%' }}
                      marginLeft={{ xs: '0px', sm: '30px' }}
                      height={{ xs: '90px', sm: 'auto' }}
                      overflowX={{ xs: 'scroll', sm: 'hidden' }}
                    >
                      <Stack direction="column" alignItems="center" spacing={1}>
                        <AttachedIcon style={{ backgroundColor: '#F8D5A3', borderRadius: '50%', fontSize: 'small' }} />
                        <Typography variant="caption">Attached</Typography>
                      </Stack>
                      <Stack direction="column" alignItems="center" spacing={1}>
                        <CameraIcon style={{ backgroundColor: '#F8D5A3', borderRadius: '50%', fontSize: 'small' }} />
                        <Typography variant="caption">Camera</Typography>
                      </Stack>
                      <Stack direction="column" alignItems="center" spacing={1}>
                        <GalleryIcon style={{ backgroundColor: '#F8D5A3', borderRadius: '50%', fontSize: 'small' }} />
                        <Typography variant="caption">Gallery</Typography>
                      </Stack>
                      <Stack direction="column" alignItems="center" spacing={1}>
                        <HeadphonesIcon style={{ backgroundColor: '#F8D5A3', borderRadius: '50%', fontSize: 'small' }} />
                        <Typography variant="caption">Audio</Typography>
                      </Stack>
                      <Stack direction="column" alignItems="center" spacing={1}>
                        <LocationIcon style={{ backgroundColor: '#F8D5A3', borderRadius: '50%', fontSize: 'small' }} />
                        <Typography variant="caption">Location</Typography>
                      </Stack>
                      <Stack direction="column" alignItems="center" spacing={1}>
                        <ContactIcon style={{ backgroundColor: '#F8D5A3', borderRadius: '50%', fontSize: 'small' }} />
                        <Typography variant="caption">Contact</Typography>
                      </Stack>
                    </Stack>
                  )}

                </Paper>
              </div>



              <div style={{
                width: '95%',

                color: 'black',
                height: '10vh',

zIndex:'10000000',
                backgroundColor: '#dae1e9',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                // bottom: 10,
                top: '90%',
                left: 10,
                right: 0
              }}>
                <form onSubmit={handleMessageSubmit}>
                  <Stack direction={{ xs: 'row', sm: 'row' }} alignItems='center' justifyContent='space-between' spacing={1} marginRight="10px">

                    <Button variant="contained" color="primary" size="small" sx={{ marginTop: { xs: '0px', sm: '50px' }, display: 'none' }}>
                      iSaucer
                    </Button>

                    <Grid style={{ display: 'none' }} item xs={12}>
                      <Stack direction="row" alignItems="center" >
                        <Button variant="contained" color="primary" sx={{ overflow: 'hidden' }} size="small" onClick={handleClick} endIcon={<ExpandMoreIcon />}>
                          {value}
                        </Button>
                        <Menu anchorEl={anchorEl1} open={Boolean(anchorEl1)} onClose={handleClose}>
                          <MenuItem onClick={() => handleChange('public')} value="public">
                            <ListItemIcon>
                              <span style={{ fontSize: 20 }}>🌐</span>
                            </ListItemIcon>
                            <ListItemText primary="Public" />
                          </MenuItem>
                          <MenuItem onClick={() => handleChange('private')} value="private" >
                            <ListItemIcon>
                              <span style={{ fontSize: 20 }}>🔒</span>
                            </ListItemIcon>
                            <ListItemText primary="Private" />
                          </MenuItem>
                        </Menu>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField autoComplete="off" size="small" inputProps={ariaLabel} sx={{
                        width: { xs: '250px', sm: '850px' }, marginLeft: { xs: '3', sm: '5px' }, marginTop: '3px',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'white', // Replace 'red' with the color you want
                            borderRadius: '10px',
                          },
                          '&:hover fieldset': {
                            borderColor: 'white', // Replace 'green' with the color you want on hover
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'white', // Replace 'blue' with the color you want when the TextField is focused
                          },
                          '& .MuiOutlinedInput-input': {
                            color: '#002a3a',
                            fontFamily: 'Montserrat',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            height: '25px',
                            borderRadius: '10px'
                          },
                        }
                      }} placeholder="Type your message here..." value={message} onChange={(e) => setMessage(e.target.value)} />
                      <IconButton sx={{ backgroundColor: '#EC6331', right: '0%', height: '50px', width: '50px', top: '-100%' }} type="submit" disableRipple>
                        <RocketLaunchIcon sx={{ color: 'white' }} />
                      </IconButton>
                    </Grid>

                  </Stack>
                </form>
              </div>

            </div>
          </> :
          <Stack direction="row"  >

            <div className="div2"
              style={{
                width: "20%",
                // boxShadow: 'inset 0px 0px 10px #E4D0D0, inset 0px 0px 0px 2px #aaa',
                backgroundColor: 'white',
                marginTop: '8px',
                marginLeft: '10px',
                height: '77vh',
                borderRadius: '20px'
              }}
            >

              <>
                <Stack direction="row" justifyContent={'space-between'}>
                  <h4 style={{ color: "black", marginTop: '15px', marginLeft: '20px' }}>Chat</h4>

                  <AddIcon style={{ backgroundColor: '#EC6331', marginTop: '15px', marginRight: '20px', color: 'white' }} />


                </Stack>
                <div style={{ display: 'flex', width: '220px', marginLeft: '10px', marginRight: '10px', alignItems: 'center', backgroundColor: '#002a3a', borderRadius: '4px', padding: '2px', marginTop: '20px', borderRadius: '30px' }}>

                  <InputBase placeholder="Search..." style={{ flex: 1, fontSize: '14px', marginleft: '8px', backgroundColor: 'white', borderRadius: '30px' }} />
                  <IconButton size="small" sx={{ color: 'white' }}>
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </div>
                <Stack marginTop={'30px'}>
                  <h4 style={{ color: "black", marginLeft: '20px' }}>History</h4>

                </Stack>
                <Stack marginTop="20px">
                  {
                    // renderIntents()
                  }
                  {
                    // renderTest()
                  }
                </Stack>
              </>
            </div>

            <div className="div3" style={{
              width: '100%', color: 'black', height: 'auto',
              backgroundColor: '#dae1e9',
            }}>
              <div >

                <Paper id="id_ChatBot" className={classes.chatContainer} style={{ backgroundColor: '#dae1e9' }}>

                  <Stack direction="column"  >
                    {chatMessages.map((chatMessage, index) => (

                      <Stack
                        key={index}
                        direction="row"
                        justifyContent={chatMessage.isUser && 'flex-end'}

                      >
                        {!chatMessage.isUser ? <IconButton sx={{ bottom: '10px' }} disableRipple >
                          <img src={iSaucer} width="40" height="40" style={{ marginRight: '10px', marginTop: '10px' }} />

                        </IconButton> : <></>
                          //  :   <IconButton onClick={handleContextMenuClick} sx={{ bottom: '10px', }} disableRipple>
                          //       <MoreVertIcon sx={{ marginTop: '8px' }} />
                          //     </IconButton>
                        }
                        {Array.isArray(chatMessage.text) ? (
                          chatMessage.checkvalue === 'MSPS' ? (
                            <Grid container spacing={3} className="gridViewChatBot" style={{ marginBottom: '35px', marginTop: '10px', backgroundColor: '#002a3a' }} ref={userBubbleRef}>

                              {chatMessage.text.map((item, itemIndex) => (
                                <Grid key={itemIndex} item md={6} xs={6} sm={6} style={{ marginTop: '35px', position: 'relative', marginBottom: '110px', marginTop: '25px' }} className='maingrid1' direction='row'>
                                  {/* Image Stack with absolute positioning */}

                                  <Stack className='SubstackPublicmpchat'>

                                  </Stack>
                                  <Stack className='addmorebuttonsubscriptionchat' direction='row'>

                                    <MoreHorizIcon sx={{ backgroundColor: '#dae1e9', borderRadius: '100px' }}></MoreHorizIcon>
                                    <h5 style={{ cursor: 'pointer', color: '#002a3a', fontSize: '12px', alignItems: 'center', justifyContent: 'center', marginTop: '3px', marginLeft: '3px' }}>
                                      Know more
                                    </h5>
                                  </Stack>
                                  <Stack className='Substack5Publicchat' sx={{ marginTop: '10px' }}>
                                    <div>  <span >Membership Price:</span>
                                      <span >{new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.Amount)}</span></div>
                                    {item.IsJoinfee == 1 &&
                                      <div> <span>Joining Fee :</span><span>{item.IsJoinfee === 1
                                        ? new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.JoinFee)
                                        : ''}</span></div>}
                                    <div> <span> VAT </span>: <span> {new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.tax)}</span></div>
                                    {item.Discount != null && (item.IsDiscFlat == 0 ? <div><span>Discount:</span><span> {item.Discount}  %</span></div> : <div><span>Discount:</span><span> {item.Discount} Flat</span></div>)}
                                    {item.isfreez_avl == '1' && <div><span>Freez Amt:</span><span>{item.freez_fees}  </span></div>}
                                    <div><span>Package Validity :</span><span>{item.Duration} Days </span></div>
                                  </Stack>
                                  <Stack className='Substack1Publicchat'>
                                    {
                                      item.Icon === ""
                                        ? <img src='https://tnbdemo.barrlasystems.com/ifs/is/user.png' className='imgtagpublic' ></img>
                                        : <img src={item.Icon} className='imgtagpublic' ></img>
                                    }
                                  </Stack>
                                  <Stack className='Substack6Publicchat'>
                                    {matches ? (item.PlanDesc != "" ? (item.PlanDesc.length > 15 ? item.PlanDesc.substring(0, 15) + "..." : item.PlanDesc) : "") : (item.PlanDesc != "" ? (item.PlanDesc.length > 15 ? item.PlanDesc.substring(0, 15) + "..." : item.PlanDesc) : "")}
                                  </Stack>
                                  {/* Display name and email if they exist */}
                                  <Stack className='Substack3Publicchat'>
                                    {matches ? (item.PlanName != "" ? (item.PlanName.length > 10 ? item.PlanName.substring(0, 10) + "..." : item.PlanName) : "") : (item.PlanName != "" ? (item.PlanName.length > 25 ? item.PlanName.substring(0, 25) + "..." : item.PlanName) : "")}
                                  </Stack>
                                  <Stack className='Substack4Publicchat'>
                                    {item.IsJoinfee === 1 ? (
                                      <div  >
                                        {item.Discount == null ? (
                                          <div style={{ textAlign: 'center' }}>{new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.Amount + item.JoinFee + item.tax)}</div>
                                        ) : (
                                          <Stack direction='row' spacing={5} marginTop='10px'>
                                            <div style={{ textDecoration: 'line-through red', fontSize: '14px', marginLeft: '10px', color: 'red' }}>
                                              {new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.Amount + item.JoinFee + item.tax)}
                                            </div>
                                            <Divider orientation="vertical" flexItem sx={{ borderColor: 'black', borderWidth: '1px', width: '1px' }} />
                                            <div style={{ fontSize: '16px' }}>
                                              {new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.Amount + item.JoinFee + item.tax - item.Discount)}
                                            </div>
                                          </Stack>
                                        )}
                                      </div>
                                    ) : (
                                      <div  >
                                        {item.Discount == null ? (
                                          <div style={{ textAlign: 'center' }}>{new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.Amount + item.tax)}</div>
                                        ) : (
                                          <Stack direction='row' spacing={5} marginTop='10px'>
                                            <div style={{ textDecoration: 'line-through red', fontSize: '14px', marginLeft: '10px', color: 'red' }}>
                                              {new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.Amount + item.tax)}
                                            </div>
                                            <Divider orientation="vertical" flexItem sx={{ borderColor: 'black', borderWidth: '1px', width: '1px' }} />
                                            <div style={{ fontSize: '16px' }}>
                                              {new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2 }).format(item.Amount + item.tax - item.disc_amount)}
                                            </div>
                                          </Stack>
                                        )}
                                      </div>
                                    )}
                                  </Stack>

                                  <Stack className='Substack2Publicchat'>

                                    <DiaBtn2
                                      variant='outlined'
                                      style={{ backgroundColor: 'green', color: 'white', height: '25px' }}
                                      className='savemenu1'
                                      onClick={(e) => handelClickSubscriped(item)}
                                    >
                                      Subscribe Now
                                    </DiaBtn2>

                                  </Stack>


                                  {/* Grid containing the other details */}
                                  <Grid className='subgridpublicchat' >

                                  </Grid>
                                </Grid>
                              ))}</Grid>) : <></>
                        ) : (
                          <div
                            className={`${classes.chatBubble} ${chatMessage.isUser ? classes.userBubble : classes.botBubble
                              }`}
                            ref={userBubbleRef}


                          >

                            {chatMessage.text}

                          </div>
                        )}
                        {chatMessage.isUser ? <IconButton sx={{ bottom: '10px' }} disableRipple >
                          <Avatar sx={{ marginTop: '10px', marginRight: '10px', width: '35px', height: '35px' }} />                       </IconButton>
                          : <></>
                          //  <IconButton onClick={handleContextMenuClick} sx={{ bottom: '10px', }} disableRipple>
                          //     <MoreVertIcon sx={{ marginTop: '8px' }} />
                          //   </IconButton>
                        }


                      </Stack>
                    ))}
                  </Stack>


                </Paper>
              </div>



              <div style={{
                width: '100%',

                color: 'black',
                height: '7vh',


                backgroundColor: '#dae1e9',
                display: 'flex',


              }}>

                <form onSubmit={handleMessageSubmit}>
                  <Stack direction='row'>



                    <Grid item xs={8} style={{ borderRadius: '10px', marginTop: '10px', }}>
                      <TextField autoComplete="off"
                        inputProps={ariaLabel}
                        sx={{
                          width: '850px', height: '3px', marginLeft: '30px', backgroundColor: '#dae1e9', borderRadius: '10px',
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'white', // Replace 'red' with the color you want
                              borderRadius: '10px',
                            },
                            '&:hover fieldset': {
                              borderColor: 'white', // Replace 'green' with the color you want on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'white', // Replace 'blue' with the color you want when the TextField is focused
                            },
                            '& .MuiOutlinedInput-input': {
                              color: '#002a3a',
                              fontFamily: 'Montserrat',
                              fontSize: '16px',
                              backgroundColor: 'white',
                              height: '2px',
                              borderRadius: '10px'
                            },
                          }
                        }}
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <IconButton sx={{ backgroundColor: '#EC6331', right: '1%', height: '50px', width: '50px', top: '-20%' }} type="submit" disableRipple>
                        <RocketLaunchIcon sx={{ color: 'white' }} />
                      </IconButton>

                    </Grid>


                  </Stack>
                </form>
              </div>

            </div>
          </Stack>
        }

      </div>
    </>
  );
}

export default ChatBotAi;


