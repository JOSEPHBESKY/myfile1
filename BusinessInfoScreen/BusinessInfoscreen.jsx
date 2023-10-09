import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputBase, List, ListItem, ListItemText, Menu, styled, Tab, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, Tabs, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system'
import React from 'react'
import { useState } from 'react';
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import HeaderForm from "../saucerView/components/header/index";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import './Business.css'
import veg from '../../assets/images/shops.jpg'
import nonveg from '../../assets/images/nonveg.png'
import star from '../../assets/images/rateStar.png'
import Loc from '../../assets/images/locBlue.png'
import { Colors } from '../../styles/theme';
import Timer from '../../common/Timer';
import { getCookie } from '../../common/cks';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Closeicon, DiaBtn1, DiaBtn2, DiaHeader, StyledDiaBx } from '../../styles/common';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import logger from '../../common/logger';
import SWAlert from "sweetalert2";
import { postAPI } from '../../services/apicall';
import { useEffect } from 'react';
import { connect, useSelector, useDispatch } from "react-redux";
import { FromHomeOrSetup, RightTree_ID } from "../../stateManagement/action";
import WebEditor from '../WebEditor/WebEditor';
const mapStateToProps = (state) => {
  return {
    accessID: state.accessID,
    CurrentArea: state.CurrentArea,
    CurrentCity: state.CurrentCity,
    RightTreeID: state.RightTreeID,
    FromHomeOrSetup: state.FromHomeOrSetup,
    LastNodeChecks: state.LastNodeCheck
  }
}

function BusinessInfoscreen(props) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const [serCl, setSerCl] = useState(false)
  const [text, setText] = useState('')
  const [open1, setOpen1] = useState(false);
  const [mins, setMins] = useState(5)
  var [time, setTime] = useState()
  const [newOrder, setNewOrder] = useState([])
  const [price, setPrice] = useState([])
  var UserID = getCookie("roleId");
  const [Oid, setOid] = useState('')
  const [searchParams] = useSearchParams();
  const queryStrVal = searchParams.get("v_sam");
  var ChildID = searchParams.get('cid')
  var iDN = props.ID
  let v_RTreeID = useSelector((state) => state.RightTreeID)
  useEffect(() => {
    ////debugger
    //console.log('BusinessInfoscreen-useEffect ~ Start');
    if (v_RTreeID != "") {
      GetValueScreen(v_RTreeID, "");
    }
    //console.log('BusinessInfoscreen-useEffect ~ End');
  }, [props]);

  async function GetValueScreen(v_RTreeID) {
    // debugger
    try {
      //console.log('BusinessInfoscreen-GetValueScreen ~ Start');
      const req = {
        // "Req": {
        //   "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
        //   "Type":"GCSO",
        //   "CRUD":"",
        //   "DevID": "",
        //   "RKID": "",
        //   "BID": "",
        //   "ID": "",//--Order Id
        //   "OD": "",//--Order Date
        //   "SID": "",//--service ID
        //   "PT": "",//--pay type
        //   "PTS": "",//--Payment status
        //   "DYT": "",//--Delivery Type id
        //   "CID": getCookie('roleId') ,//--Customer ID
        //   "GID": "",//--grp id
        //   "TN": "",//--dely ref No[room no or table no]
        //   "OS": status,//--ord status
        //   "PTXN": "",//----pay txn id
        //   "CBy": "",
        //   "SRT": "",
        //   "FD": "",//--from date
        //   "TD": "",//--to date
        //   "PTL": "",
        //   "OSL": "",//--order status list comma separated
        //   "ATB": "",//--atb 1 or 0
        //   "RS": 1,
        //   "RC": 1000
        Req: {
          Type: "GMDD",
          CRUD: "RKL",
          Rsk: "UnEuNhoKLZBdIcLjKILZg==",
          DevID: "",
          BizID: "",
          BID: "",
          ID: "",
          PID: v_RTreeID,
          ST: 1,
          CC: "",
          KS: "",
          //UID: UserID,
          //*********************************************************************************************************//
          // Anand Added on 19/12/2022 - To Location wise Key Filter. Send Current Area to the API Request 
          //*********************************************************************************************************//
          AL: localStorage.getItem('CurArea') != '' ? localStorage.getItem('CurArea') : props.CurrentArea,
          CYNM: localStorage.getItem('CurCity') != '' ? localStorage.getItem('CurCity') : props.CurrentCity
          //*********************************************************************************************************//
        },
        // }
      }

      const rows = await postAPI(req, true);
      const row = JSON.parse(rows);
      // debugger
      if (row.Resp.Sts == "1") {
        var res = JSON.parse(row.Resp.Result)



        setNewOrder(res)
        //console.log('BusinessInfoscreen-GetValueScreen ~ End');
      } else {

        setNewOrder([])
        if (getCookie("lastkeyval") == 1) {
          SWAlert.fire({ title: 'Details unavailable', })
        }
      }
    } catch (err) {
      SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
      logger.errorLog(err.message ?? err, '', '//sales//Index.jsx', 'iconBut_tAlign-onClick');
    }
  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onTextChange = (e,) => {
    ////debugger
    setText(e.target.value)







  }

  const ClearText = () => {
    // setText('')
    // setSerCl(false)
  }

  const OnAcceptClick = (e, id) => {
    setOpen1(true)
    setOid(id)

  }

  const OnCancelClick = () => {

  }


  function SaveBtnClicked() {
    // //debugger
    try {
      setTime(mins * 60)
      setOpen1(false);
      setValue("2")
      setMins(5)
    } catch (err) {
      console.error(`GET error: ${err}`);
    }
  }

  const handleClose1 = () => {
    setOpen1(false);
  };

  const OnMinusClick = () => {
    if (mins != 5) {
      setMins(mins - 5)
    }
  }

  const OnPlusClick = () => {
    if (mins != 30) {
      setMins(mins + 5)
    }
  }
  const HandleNewTap = (id, nm) => {
    ////debugger
    const params = { ltid: id, nm: encodeURIComponent(nm), cid: id, accid: props.accessID };
    // e.preventDefault(); //Restict two new window in mobile
    window.open(`/iSaucers?${createSearchParams(params)}`, "_blank");
  }

  const handleClickFunction = (fromWhere) => {
    dispatch(FromHomeOrSetup(fromWhere)); // If fromWhere == Home || fromWhere == Setup
  }

  return (
    <>

      <div>
        <Stack sx={{ marginTop: '5px' }}>

          <Stack>
            {newOrder.length > 0 ?
              <div >
                <Grid container spacing={2} sx={{ flexGrow: 1, marginLeft: '5px', marginRight: '5px' }}>

                  {newOrder.map((i, index) => (
                    <>
                      {i.BI == null ?
                        <></> :

                        <Grid key={index} item xs={12} md={3} onClick={() => HandleNewTap(i.ID, i.NM)} >
                          <Card className='card' sx={{ maxWidth: '100%', margin: '10px', borderRadius: '15px', backgroundColor: '#F5F5F5' }}>
                            <CardHeader
                              avatar={
                                <img src={i.BI[0].IC} style={{ borderRadius: '10px' }} height='120px' width='130px'></img>
                              }

                              title={<Stack spacing={2}>
                                <Stack direction='row-reverse' alignItems='center' width='100%'>
                                  <Stack className='rating' direction='row' alignItems='center' spacing={2}>
                                    <label className='sLbl'>4.5</label>
                                    <img src={star} height='10px' width='10px' style={{ marginRight: "3px" }}></img>
                                  </Stack>
                                </Stack>
                                <label className='hLbl' >{i.BI[0].DN}</label>
                                <Stack className='head'
                                  alignItems="center" direction='row'>
                                  <label style={{ color: 'floralwhite', cursor: ' context-menu', fontSize: '10px', fontWeight: 'bold', paddingLeft: '8px', whiteSpace: 'nowrap' }}  >{i.BI[0].BDS.length >= 23 ? i.BI[0].BDS.substring(0, 23) + '...' : i.BI[0].BDS}</label>
                                  {/* <label style={{ color: 'floralwhite', cursor: ' context-menu' ,fontSize:'10px', fontWeight: 'bold'}}  >,South </label>
                                <label style={{ color: 'floralwhite', cursor: ' context-menu', fontSize:'10px', fontWeight: 'bold'}}  > Indian </label>
                                <label style={{ color: 'floralwhite', cursor: ' context-menu',fontSize:'10px' , fontWeight: 'bold'}}  > ,Grill </label> */}
                                </Stack>

                                <Stack direction='row' className="locDiv">

                                  <img src={Loc} height='18px' width='18px' sx={{ marginTop: '3px', cursor: ' context-menu' }} />
                                  <label className='lLbl'>{i.BI[0].AL}</label>
                                </Stack>
                                {/* <Stack sx={{ flexGrow: 1, backgroundColor: '#FFF4BE', marginBottom: '10px', width:'77%',borderRadius:'0px 10px 10px 0px', cursor: ' context-menu' }} direction='row'>
                                <label style={{ color: 'red', cursor: ' context-menu' }}  >10%</label>
                                <label style={{ color: 'red', cursor: ' context-menu' }}  > OFF </label>
                                <label style={{ color: 'red', cursor: ' context-menu' }}  > | </label>
                                <label style={{ color: 'red', cursor: ' context-menu' }}  > Use</label>
                                <label style={{ color: 'red', cursor: ' context-menu' }}  > Coupon</label>
                                <label style={{ color: 'red', cursor: ' context-menu' }}  > </label>
                                <label style={{ color: 'red', cursor: ' context-menu' }}  >NEW10</label>
                              </Stack> */}
                                <Stack className='select' >
                                  <button className='SeLbl'  >Select</button>
                                </Stack>
                              </Stack>
                              }

                            // action={
                            //   <Stack marginTop={20} marginRight={20} sx={{fontWeight:'bold'}} > 
                            // <Typography variant='h7' sx={{color:'white',border:'1px solid red',backgroundColor:'red'cursor:' context-menu'}}  >SELECT</Typography> 
                            //     </Stack>
                            // }

                            >

                            </CardHeader>




                          </Card>
                        </Grid>
                      }   </>))}
                </Grid>
              </div> :
              <div>
                {
                  <WebEditor ID={v_RTreeID} fromHomeOrSetup={props.FromHomeOrSetup} />
                }{
                  // <h1 style={{padding:'10px',alignContent:'center',textAlign:'center'}}>No Restaurant Found </h1>
                } </div>}
          </Stack>
        </Stack>

      </div>
    </>
  )
}

export default connect(mapStateToProps)(BusinessInfoscreen)