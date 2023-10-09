import React, { useState, useEffect, useRef, createRef } from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import Close from '@mui/icons-material/Close';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import './left.css'
// import Box from'./Box'
// import NewspaperIcon from '@mui/icons-material/Newspaper';
import RectangleIcon from '@mui/icons-material/Rectangle';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import AddIcon from '@mui/icons-material/sc_plus';
// import StarIcon from '@mui/icons-material/Star';
// import SatelliteIcon from '@mui/icons-material/Satellite';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import CircleIcon from '@mui/icons-material/Circle';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import $ from 'jquery';
import AddIcon from '@mui/icons-material/Add';
import { postAPI, getAPI } from "../../../services/apicall";
import configData from "../../../config.json";
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// // import FilterAltIcon from '../../../assets/images/sc_filter.png'
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from "react-redux";
import { View_GJS, WebEditor_SHOW, Show_Cancel, l_menus, l_menuid, WebEditor_ID, isFilter_Enabled, isSaucer_Enabled } from '../../../stateManagement/action';
//  import Right from "./Right";
import store from "../../../stateManagement/store";
// import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
// Long Press Detect Event for Context Menu
import { useNavigate } from "react-router-dom";
import { Avatar, Icon, IconButton, List, ListItem, Stack } from "@mui/material";
import BackIcon from '@mui/icons-material/ArrowBackIos';
// import AddIcon from '@mui/icons-material/AddC';
// import Filter from '@mui/icons-material/FilterAltOutlined';
import "../../../assets/Fonts/styles.css"
import plus from '../../../assets/images/sc_plus.png'
import FilterAltIcon from '../../../assets/images/sc_filter.png'
import StarIcon from '../../../assets/images/sc_fav.png'
import BookmarkBorderIcon from '../../../assets/images/sc_bookmark.png'
import SatelliteIcon from '../../../assets/images/sc_home.png'
import clos from '../../../assets/images/sc_close.png'
import Location from '../../../assets/images/sc_loc.png'
import ContentPasteSearchIcon from '../../../assets/images/sc_contacts.png'
import calender from '../../../assets/images/sc_calender.png'
import VolumeOffIcon from '../../../assets/images/sc_voice.png'
import CircleNotificationsIcon from '../../../assets/images/sc_notification.png'
import NewspaperIcon from '../../../assets/images/sc_edit.png'
import radio from '../../../assets/images/sc_radiooff.png'
// import StarIcon from '@mui/icons-material/Star';
import SavedIcon from '@mui/icons-material/TurnedIn';
// import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import {
  CardContent,
  Card,
  Grid,
} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import ItemsRightFun from "./ItemsRightFun";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { green } from "@mui/material/colors";
// import { Box } from "@mui/system";

const mapStateToProps = function (state) {
  return {
    lmenuActiveID: state.lmenuActiveID,
    editormenuID: state.editormenuID,
    isFilterEnabled: state.isFilterEnabled,
    isSaucerEnabled: state.isSaucerEnabled,

  }
}
const mapDispatchtoProps = dispatch => {
  return {
    l_menuid: num => dispatch(l_menuid(num))
  }
}

const baseUrl = configData.SERVER_URL;
//Left Tree
function ItemsLeftFun(props) {
  const nav = useNavigate();
  const divRef = React.createRef();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const [TopMenu, setTopMenu] = useState('');
  const [TopMenuID, setTopMenuID] = useState('');
  const [open, setopen] = useState(true);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);
  const [list, setList] = useState([]);
  const [copy, setcopy] = useState([])
  const [taggle, settaggle] = useState(true)
  const [color1,setcolor1]=useState('darkcyan')
  const [color2,setcolor2]=useState('darkcyan')
  const [color3,setcolor3]=useState('darkcyan')
  const [color4,setcolor4]=useState('darkcyan')
  const [color5,setcolor5]=useState('darkcyan')
  const [color6,setcolor6]=useState('darkcyan')
  const [color7,setcolor7]=useState('darkcyan')
  const [color8,setcolor8]=useState('darkcyan')
  const [color9,setcolor9]=useState('darkcyan')
  const [color10,setcolor10]=useState('darkcyan')
  const [color11,setcolor11]=useState('darkcyan')
  const [color12,setcolor12]=useState('darkcyan')
  const [color13,setcolor13]=useState('darkcyan')
  const [color14,setcolor14]=useState('darkcyan')
  const [color15,setcolor15]=useState('darkcyan')
  const myRef = createRef();

  let DisplayLeftData = null;
  const items = useSelector((state) => state.lmenuData);
  const i_setlid = useSelector((state) => state.lmenuActiveID);
  const dispatch = useDispatch();

  useEffect(() => {

    //debugger;
    localStorage.setItem("TreeClicked", '');
    localStorage.setItem('LeftTreeID', '');
    localStorage.setItem('LeftSubTreeID', '');
    localStorage.setItem('RightTreeID', '');
    localStorage.setItem('RightSubTreeID', '');
    loadDataLeft('');
  }, [dispatch])

  useEffect(() => {
    //debugger;
    let v_isSaucerEnabled = props.isSaucerEnabled;
    let v_isFilterEnabled = props.isFilterEnabled;
    let clearicon = props.clearicon
    //alert(v_isFilterEnabled)
    if (v_isFilterEnabled) {

    }
    else {

    }

  }, [props])

  async function loadDataLeft(v_MID) {

    let sss = '';
    let sNM = '';
    try {
      var sValue = '';
      var sValue1 = '';
      const payload = ({
        Req: {
          Type: "GMDD",
          CRUD: "LM",
          Rsk: "UnEuNhoKLZBdIcLjKILZg==",
          DevID: "",
          BizID: "",
          BID: "",
          ID: v_MID,
          PID: "",
          ST: 1,
          CC: ""
        }
      });
      var req = JSON.stringify(payload);
      const rows = await postAPI(payload, true);
      //debugger;
      if (!rows) {
       nav("/logout");
      } else {
        let jsonObject = JSON.parse(rows);
        // debugger;
        localStorage.setItem("TreeClicked", '');
        localStorage.setItem('LeftTreeID', '');
        localStorage.setItem('LeftSubTreeID', '');
        localStorage.setItem('RightTreeID', '');
        localStorage.setItem('RightSubTreeID', '');
        let stockData1 = [];
        let stockData2 = [];


        if (jsonObject.Resp.Sts == "1") {
          stockData1 = JSON.parse(jsonObject.Resp.Result);

          const result = stockData1.filter(playlist => playlist.DF == '1');


          if (result != null) {
            if (result.length > 0) {
              localStorage.setItem("TreeClicked", 'L');
              localStorage.setItem('LeftTreeID', result[0].ID);
              localStorage.setItem('LeftSubTreeID', '');
              localStorage.setItem('RightTreeID', '');
              localStorage.setItem('RightSubTreeID', '');

              var v_dLTid = localStorage["LeftTreeID"] || "";
              sss = result[0].ID;
              sNM = result[0].SN;

              const removePlaylistById = (plists) =>
                plists.filter(stockData1 => stockData1.DF == '0');
              stockData2 = removePlaylistById(stockData1);

            }
            else {
              const removePlaylistById = (plists) =>
                plists.filter(stockData1 => stockData1.DF != '');
              stockData2 = removePlaylistById(stockData1);
            }
          }
          else {
            const removePlaylistById = (plists) =>
              plists.filter(stockData1 => stockData1.DF != '');
            stockData2 = removePlaylistById(stockData1);
          }
          setList(stockData2)
        }

        //dispatch(l_menus())
        dispatch({ type: 'LOAD_LEFTMENUS', lmenuData: stockData1 });
        var maxNumber = 45;
        var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
        if (sValue == '') {
          dispatch({ type: 'SET_LEFTMENUID', lmenuActiveID: sss + randomNumber });
          setTopMenu(sNM);
          setTopMenuID('');
        }
        else {
          dispatch({ type: 'SET_LEFTMENUID', lmenuActiveID: sValue + randomNumber });
          setTopMenu(sNM);
          setTopMenuID(sValue);
        }
        // grab current state
        const state = store.getState();
      }

    } catch (error) {
      console.error(error);
    }
  }
  const Box = () => {
    return (
      <div className="floads">
       <p> <RadioButtonCheckedIcon/></p> 
       <p> <CloseIcon onClick={() => handle()}/></p> 
      </div>
    )
  }
  const handle = () => {
    // const newcls=copy.filter((e)=>e.id !==copy.id)
    setcopy(!copy)
  }
  const closenotif = () => document.getElementById("notif").remove()
  const handle2 = (e) => {
    // closenotif();
    //console.log(props.isFilter_Enabled)
    dispatch(isFilter_Enabled(false))
  }
  var sValueconst = localStorage['LeftSubTreeID'] || '';
  const clickLeftButtons = (e, SN, SName, index) => {

    e.stopPropagation();

    localStorage.setItem('LeftSubTreeID', SN);
    localStorage.setItem('TreeClicked', 'LS');

    localStorage.setItem('RightSubTreeID', '');
    var maxNumber = 45;
    var randomNumber = Math.floor((Math.random() * maxNumber) + 1);

    window.fn_rtsubload();
    var v_dLTid = localStorage["LeftSubTreeID"] || "";
    dispatch(WebEditor_SHOW(""));
    dispatch(View_GJS(v_dLTid));

  };
  const click=()=>{
    setcolor1('red')
    setcolor2('darkcyan')
    setcolor3('darkcyan')
    setcolor4('darkcyan')
    setcolor5('darkcyan')
    setcolor6('darkcyan')
    setcolor7('darkcyan')
    setcolor8('darkcyan')
    setcolor9('darkcyan')
    setcolor10('darkcyan')
    setcolor11('darkcyan')
    setcolor12('darkcyan')
    setcolor13('darkcyan')
    setcolor14('darkcyan')
    setcolor15('darkcyan')
    setcopy(<Stack direction='row' spacing={8}> <div className="icon-scfavorites" style={{fontSize:'35px',color:'darkcyan',paddingBottom:'1px'}} ></div><Box /></Stack>)
  }
  const click1=()=>{
    setcolor1('darkcyan')
    setcolor2('red')
    setcolor3('darkcyan')
    setcolor4('darkcyan')
    setcolor5('darkcyan')
    setcolor6('darkcyan')
    setcolor7('darkcyan')
    setcolor8('darkcyan')
    setcolor9('darkcyan')
    setcolor10('darkcyan')
    setcolor11('darkcyan')
    setcolor12('darkcyan')
    setcolor13('darkcyan')
    setcolor14('darkcyan')
    setcolor15('darkcyan')
    setcopy(<Stack direction='row' spacing={8}>  <div className="icon-scsaved" style={{fontSize:'35px',color:'darkcyan'}} ></div><Box /></Stack>)
  }
  const click2=()=>{
    setcolor1('darkcyan')
    setcolor2('darkcyan')
    setcolor3('red')
    setcolor4('darkcyan')
    setcolor5('darkcyan')
    setcolor6('darkcyan')
    setcolor7('darkcyan')
    setcolor8('darkcyan')
    setcolor9('darkcyan')
    setcolor10('darkcyan')
    setcolor11('darkcyan')
    setcolor12('darkcyan')
    setcolor13('darkcyan')
    setcolor14('darkcyan')
    setcolor15('darkcyan')
    setcopy(<Stack direction='row' spacing={8}>  <div className="icon-schome" style={{fontSize:'35px',color:'darkcyan'}}></div><Box /></Stack>)
  }
  const click3=()=>{
    setcolor1('darkcyan')
    setcolor2('darkcyan')
    setcolor3('darkcyan')
    setcolor4('red')
    setcolor5('darkcyan')
    setcolor6('darkcyan')
    setcolor7('darkcyan')
    setcolor8('darkcyan')
    setcolor9('darkcyan')
    setcolor10('darkcyan')
    setcolor11('darkcyan')
    setcolor12('darkcyan')
    setcolor13('darkcyan')
    setcolor14('darkcyan')
    setcolor15('darkcyan')
    setcopy(<Stack direction='row' spacing={8}>  <div className="icon-sclocation" style={{fontSize:'35px',color:'darkcyan'}}></div><Box /></Stack>)  }
  const click4=()=>{
    setcolor1('darkcyan')
    setcolor2('darkcyan')
    setcolor3('darkcyan')
    setcolor4('darkcyan')
    setcolor5('red')
    setcolor6('darkcyan')
    setcolor7('darkcyan')
    setcolor8('darkcyan')
    setcolor9('darkcyan')
    setcolor10('darkcyan')
    setcolor11('darkcyan')
    setcolor12('darkcyan')
    setcolor13('darkcyan')
    setcolor14('darkcyan')
    setcolor15('darkcyan')
    setcopy(<Stack direction='row' spacing={8}>  <div className="icon-sccontacts" style={{fontSize:'35px',color:'darkcyan'}} ></div><Box /></Stack>)
  }
  const click5=()=>{
    setcolor1('darkcyan')
    setcolor2('darkcyan')
    setcolor3('darkcyan')
    setcolor4('darkcyan')
    setcolor5('darkcyan')
    setcolor6('red')
    setcolor7('darkcyan')
    setcolor8('darkcyan')
    setcolor9('darkcyan')
    setcolor10('darkcyan')
    setcolor11('darkcyan')
    setcolor12('darkcyan')
    setcolor13('darkcyan')
    setcolor14('darkcyan')
    setcolor15('darkcyan')
    setcopy(<Stack direction='row' spacing={8}>  <div className="icon-sccalendar" style={{fontSize:'35px',color:'darkcyan'}} ></div><Box /></Stack>)
  }
  const click6=()=>{
    setcolor1('darkcyan')
    setcolor2('darkcyan')
    setcolor3('darkcyan')
    setcolor4('darkcyan')
    setcolor5('darkcyan')
    setcolor6('darkcyan')
    setcolor7('red')
    setcolor8('darkcyan')
    setcolor9('darkcyan')
    setcolor10('darkcyan')
    setcolor11('darkcyan')
    setcolor12('darkcyan')
    setcolor13('darkcyan')
    setcolor14('darkcyan')
    setcolor15('darkcyan')
    setcopy(<Stack direction='row' spacing={8}>  <div className="icon-screcord" style={{fontSize:'35px',color:'darkcyan'}}></div><Box /></Stack>)
  }
  const click7=()=>{
    setcolor1('darkcyan')
    setcolor2('darkcyan')
    setcolor3('darkcyan')
    setcolor4('darkcyan')
    setcolor5('darkcyan')
    setcolor6('darkcyan')
    setcolor7('darkcyan')
    setcolor8('red')
    setcolor9('darkcyan')
    setcolor10('darkcyan')
    setcolor11('darkcyan')
    setcolor12('darkcyan')
    setcolor13('darkcyan')
    setcolor14('darkcyan')
    setcolor15('darkcyan')
    setcopy('A3')
  }
  const click8=()=>{
    setcolor1('darkcyan')
    setcolor2('darkcyan')
    setcolor3('darkcyan')
    setcolor4('darkcyan')
    setcolor5('darkcyan')
    setcolor6('darkcyan')
    setcolor7('darkcyan')
    setcolor8('darkcyan')
    setcolor9('red')
    setcolor10('darkcyan')
    setcolor11('darkcyan')
    setcolor12('darkcyan')
    setcolor13('darkcyan')
    setcolor14('darkcyan')
    setcolor15('darkcyan')
    setcopy('A4')
  }
  const click9=()=>{
    setcolor1('darkcyan')
    setcolor2('darkcyan')
    setcolor3('darkcyan')
    setcolor4('darkcyan')
    setcolor5('darkcyan')
    setcolor6('darkcyan')
    setcolor7('darkcyan')
    setcolor8('darkcyan')
    setcolor9('darkcyan')
    setcolor10('red')
    setcolor11('darkcyan')
    setcolor12('darkcyan')
    setcolor13('darkcyan')
    setcolor14('darkcyan')
    setcolor15('darkcyan')
    setcopy(<Stack direction='row' spacing={8}>  <div className="icon-scedit" style={{fontSize:'35px',color:'darkcyan'}}></div><Box /></Stack>)

  }
  const click10=()=>{
    setcolor1('darkcyan')
    setcolor2('darkcyan')
    setcolor3('darkcyan')
    setcolor4('darkcyan')
    setcolor5('darkcyan')
    setcolor6('darkcyan')
    setcolor7('darkcyan')
    setcolor8('darkcyan')
    setcolor9('darkcyan')
    setcolor10('darkcyan')
    setcolor11('red')
    setcolor12('darkcyan')
    setcolor13('darkcyan')
    setcolor14('darkcyan')
    setcolor15('darkcyan')
    setcopy(<Stack direction='row' spacing={8}>  <div className="icon-scnotification" style={{fontSize:'35px',color:'darkcyan'}}></div><Box /></Stack>)

  }
  const click11=()=>{
    setcolor1('darkcyan')
    setcolor2('darkcyan')
    setcolor3('darkcyan')
    setcolor4('darkcyan')
    setcolor5('darkcyan')
    setcolor6('darkcyan')
    setcolor7('darkcyan')
    setcolor8('darkcyan')
    setcolor9('darkcyan')
    setcolor10('darkcyan')
    setcolor11('darkcyan')
    setcolor12('red')
    setcolor13('darkcyan')
    setcolor14('darkcyan')
    setcolor15('darkcyan')
    setcopy('Algorithem')
  }
  const click12=()=>{
    setcolor1('darkcyan')
    setcolor2('darkcyan')
    setcolor3('darkcyan')
    setcolor4('darkcyan')
    setcolor5('darkcyan')
    setcolor6('darkcyan')
    setcolor7('darkcyan')
    setcolor8('darkcyan')
    setcolor9('darkcyan')
    setcolor10('darkcyan')
    setcolor11('darkcyan')
    setcolor12('darkcyan')
    setcolor13('red')
    setcolor14('darkcyan')
    setcolor15('darkcyan')
    setcopy('Algorithem')
    setcopy('Device')
  }
 
    return (
      <>
      {props.isFilterEnabled ? (
        <Stack className="ss">
      <div id="notif" className="main">
        <Stack className="block" direction='row'>
          <div> <div className="icon-scfilter"></div></div>
          <div><CloseIcon onClick={() => { handle2() }} /></div>
          <div><AddIcon/></div> </Stack>
        <div><div className="icon-scfavorites" style={{color:color1}}  onClick={() =>click()} ></div></div>
        <div><div className="icon-scsaved" style={{color:color2}} onClick={() =>click1() }></div></div>
        <div><div className="icon-schome" style={{color:color3}}  onClick={() =>click2() }></div></div>
        <div><div className="icon-sclocation" style={{color:color4}}  onClick={() =>click3()}></div></div>
        <div><div className="icon-sccontacts" style={{color:color5}}  onClick={() =>click4() }></div></div>
        <div><div className="icon-sccalendar" style={{color:color6}}  onClick={() =>click5() }></div></div>
        <div><div className="icon-screcord" style={{color:color7}}  onClick={() =>click6()} ></div></div>
        <div><FiberManualRecordIcon className="imgClsHdr" style={{ color: 'red' }} onClick={() => setcopy(<Stack direction='row' spacing={8}> <CircleIcon style={{ color: 'red' }}  /><Box /></Stack>)} /></div>  
        <div><FiberManualRecordIcon className="imgClsHdr" style={{ color: 'green' }} onClick={() => setcopy(<Stack direction='row' spacing={8}> <CircleIcon style={{ color: 'green' }}  /><Box /></Stack>)} /></div>  
        <div><FiberManualRecordIcon className="imgClsHdr" style={{ color: 'yellow' }}  onClick={() => setcopy(<Stack direction='row' spacing={8}> <CircleIcon style={{ color: 'yellow' }}  /><Box /></Stack>)}  /></div>  
          <div className="sup">
          <div><CheckBoxOutlineBlankIcon className="imgClsHdr" style={{ color: 'green' }} onClick={() => setcopy(<Stack direction='row' spacing={8}><CheckBoxOutlineBlankIcon  /><Box /></Stack>)} /></div>
          <div><RectangleIcon className="imgClsHdr" style={{ color: 'green' }} onClick={() => setcopy(<Stack direction='row' spacing={8}><RectangleIcon /><Box /></Stack>)} /></div>
          <div><Typography style={{display:'flex',marginTop:'7px',color:color8}}  onClick={() =>click7() } >A3</Typography> </div>
          <div> <Typography style={{display:'flex',marginTop:'7px',color:color9}}  onClick={() =>click8()} >A4</Typography> </div>
          <div> <div className="icon-scedit" style={{color:color10}}   onClick={() =>click9()}></div></div>
          <div> <div className="icon-scnotification" style={{color:color11}}  onClick={() =>click10()}></div></div>
          <div> <Typography style={{display:'flex',marginTop:'7px',color:color12}}   onClick={() =>click11() } >Algorithem</Typography></div>
          <div>  <Typography style={{display:'flex',marginTop:'7px',color:color13}}   onClick={() =>click12() } >Device</Typography></div>
          <div></div>
          <div></div>
        </div>
        </div>
      <div className="nm"> {copy}</div>

    </Stack>
    
    ) : null}
      </>
    )
  
  }
export default connect(mapStateToProps, mapDispatchtoProps)(ItemsLeftFun); 