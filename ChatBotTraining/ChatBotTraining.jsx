import React,{useState,useEffect} from 'react';
import './ChatBotTraining.css';
import Box from '@mui/material/Box';
import { connect, useSelector, useDispatch } from "react-redux";
import HeaderForm from "../saucerView/components/header/index";
import { FromHomeOrSetup } from "../../stateManagement/action";
import { Stack } from '@mui/system';
import Intents from './Intent/index'
import { Colors } from '../../styles/theme';
import search from '../../assets/images/searchBlue.png'
import {  useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    TextField,
    Button,
    InputBase,
} from "@mui/material";
// import {   useDispatch } from "react-redux";
import { Inthideshow } from "../../stateManagement/action";
function ChatBotTraining() {
  const dispatch = useDispatch();
  const [text, setText] = useState('')
  const [btnshow, setBtnshow] = useState(false)
  const [addsavebtnhide, setAddsavebtnhide] = useState(false)
  const [intenthide, setintenthide] = useState(true)
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  let inthideshow = useSelector((state) => state.Inthideshow)
  const handleClickFunction = (fromWhere) => {
    dispatch(FromHomeOrSetup(fromWhere)); // If fromWhere == Home || fromWhere == Setup
  }

  const [activeIndex, setActiveIndex] = React.useState(0);
 
 
  const handleListItemClick0 = (event, index) => {
    debugger
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
  const clkBtn=()=>{
    document.querySelector('.addintens').click();
    setAddsavebtnhide(true)
  }
  const clksaveBtn=()=>{
    debugger
    // if (localStorage.getItem('intsavebtn')=='1'){
    //   document.querySelector('.addsavebtn').click();
    // }else{
      document.querySelector('.addsavebtn').click();
    // setAddsavebtnhide(false)}
    // document.querySelector('.savebtn').click();updatesavebtn
  }
  const clkupdatesaveBtn=()=>{
    debugger
    document.querySelector('.updatesavebtn').click();
    setAddsavebtnhide(false)
    setBtnshow(false)
    // document.querySelector('.int1').click();updatesavebtn
  }
  const SaveClick=()=>{
 
    setAddsavebtnhide(false)
    setBtnshow(true)
  
  }
  return (
    <div className="App" style={{ marginTop: '80px' }}>
    {
      <HeaderForm clickFunction={handleClickFunction} />
    }
      <Box sx={{ display: 'flex', borderBottom: '1px solid lightgray', height: '50px' }}>
        <Box className='chattrainhead' sx={{ width: '20%', background: '#a2c5e1 none repeat scroll 0 0', color: 'black', textAlign: 'center',cursor: 'default'}}><h3>isaucers AI</h3></Box>
        <Box  sx={{ width: '60%', textAlign: 'center' , justifyContent:'space-between'}}>
       {
        intenthide && 
        <Stack direction ='row' spacing={10} marginTop={'10px'} marginLeft={ isSmallScreen ? '2px':'50px'} justifyContent='space-between'>
      {btnshow   &&  <ArrowBackIcon onClick={(e) => handleListItemClick0(e, 0)}  /> }
     { addsavebtnhide &&  <ArrowBackIcon onClick={(e) => handleListItemClick0(e, 0)}  /> }
          <h3 className='chattrainhead' style={{textAlign: 'center',cursor: 'default'}}>Intents</h3>
       { btnshow ?  <Stack  direction ='row' spacing={8} alignItems={'flex-end'}>     <Button  width={ isSmallScreen ? '10px':'100px'} height={isSmallScreen ? '1vh':'100px'} size={isSmallScreen ? 'small' : 'medium'} variant="contained" color="primary" onClick={(e)=>clkupdatesaveBtn()} >
          save
          </Button>
          <Button width={ isSmallScreen ? '10px':'100px'} size={isSmallScreen ? 'small' : 'medium'}  variant="contained" color="error"   onClick={(e) => handleListItemClick0(e, 0)}  >Cancel</Button>
          </Stack> :
          <Stack direction='row'  alignItems={'flex-end'}  >
          {addsavebtnhide ? <Stack direction ='row' spacing={8}> <Button width={ isSmallScreen ? '10px':'100px'}    size={isSmallScreen ? 'small' : 'medium'} variant="contained" color="primary" onClick={(e)=>clksaveBtn()} >
          Save 
        </Button>
        <Button width={ isSmallScreen ? '10px':'100px'} size={isSmallScreen ? 'small' : 'medium'}  variant="contained" color="error"   onClick={(e) => handleListItemClick0(e, 0)}  >Cancel</Button></Stack>
        :
            <Button   size={isSmallScreen ? 'small' : 'medium'} variant="contained" color="primary" onClick={(e)=>clkBtn()} >
              Add Intent
            </Button>}

            <p className='savebtn' style={{display:'none'}} onClick={()=>SaveClick()}></p>
           
          </Stack>}
         
        </Stack>}
      </Box>
      
      
       
        <Box className='chattrainhead' sx={{ width: '20%', borderLeft: '1px solid #a2c5e1', color: 'black', textAlign: 'center',cursor: 'default' }}><h3>Test</h3></Box>
      </Box>
      <Stack direction='row'>
        <div style={{ width: '20%', background: '#a2c5e1 none repeat scroll 0 0', height: 'auto', }}>
        { 
        // <ul>
        //     <li onClick={(e) => handleListItemClick(e, 0)} style={{ background: activeIndex === 0 ? '#0066CC' : '', color: activeIndex === 0 ? 'white' : '',height:'40px',marginTop:'50px' }}><div style={{color: activeIndex === 0 ? 'white' : '',paddingLeft:'50px',marginTop:'50px'}}>Intents</div></li>
        //     <li onClick={(e) => handleListItemClick(e, 1)} style={{ background: activeIndex === 1 ? '#0066CC' : '', color: activeIndex === 1 ? 'white' : '',height:'40px' ,marginTop:'50px' }}><div style={{color: activeIndex === 1 ? 'white' : '',paddingLeft:'50px',marginTop:'50px'}}>Menu item 2</div></li>
        //     <li onClick={(e) => handleListItemClick(e, 2)} style={{ background: activeIndex === 2 ? '#0066CC' : '', color: activeIndex === 2 ? 'white' : '' ,height:'40px',marginTop:'50px' }}><div style={{color: activeIndex === 2 ? 'white' : '',paddingLeft:'50px',marginTop:'50px'}}> Menu item 3</div></li>
        //   </ul>
        }
      
        <div className='int1 mainintent' onClick={(e) => handleListItemClick0(e, 0)} style={{ background: activeIndex === 0 ? '#0066CC' : '', color: activeIndex === 0 ? 'white' : '',height:'40px',paddingTop:'10px' ,paddingLeft:isSmallScreen ? '10px' : '50px',cursor:'pointer'}}>Intents</div>
        <div  className='int1' onClick={(e) => handleListItemClick1(e, 1)} style={{ background: activeIndex === 1 ? '#0066CC' : '', color: activeIndex === 1 ? 'white' : '',height:'40px',paddingTop:'10px' ,paddingLeft:isSmallScreen ? '10px' : '50px',cursor:'pointer'}}>Test</div>

        </div>
        <div style={{ width: '60%', borderRight: '1px solid #a2c5e1', boxSizing: 'border-box', color: 'black' , height: 'auto' }}>
      
{
    intenthide &&   <Intents/>
}
        </div>
        <div style={{ width: '20%', boxSizing: 'border-box', color: 'black', height: '100vh' }}>
        </div>
      </Stack>
    </div>
  );
}

export default ChatBotTraining;
