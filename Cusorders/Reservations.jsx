import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputBase, List, ListItem, ListItemText, Menu, styled, Tab, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, Tabs, TextField, Typography } from '@mui/material';
import { Box, Stack, } from '@mui/system'
import { createSearchParams, useSearchParams } from "react-router-dom";
import React from 'react'
import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import HeaderForm from "../saucerView/components/header/index";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import './cusorder.css'
import Loading from '../../loadingScr';
import veg from '../../assets/images/shops.jpg'
import nonveg from '../../assets/images/nonveg.png'
import { Colors } from '../../styles/theme';
import Timer from '../../common/Timer';
import { getCookie } from '../../common/cks';
import { BarLoader } from 'react-spinners';
import ReplayIcon from '@mui/icons-material/Replay';
import InfinitScroll from 'react-infinite-scroll-component'
import { Closeicon, DiaBtn1, DiaBtn2, DiaHeader, StyledDiaBx, styleInfLoader } from '../../styles/common';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import logger from '../../common/logger';
import SWAlert from "sweetalert2";
import { postAPI } from '../../services/apicall';
import { useEffect } from 'react';
import { connect, useSelector, useDispatch } from "react-redux";
import { FromHomeOrSetup } from "../../stateManagement/action";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import search from '../../assets/images/searchBlue.png'
import DriverDirectionView from '../SAdmin/Delivery/DriverDirectionView';

function Reservations(props) {
    // newformsdata
  let date = new Date()
  var dat = date.getDate()
  var mon = date.getMonth() + 1;
  var yr = date.getFullYear()
  var CurrDate = new Date()
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [newOrders, setNewOrders] = useState(JSON.parse(localStorage.getItem("newformsdata"))|| [])
  const [value, setValue] = useState('1');
  const [serCl, setSerCl] = useState(false)
  const [text, setText] = useState('')
  const [open1, setOpen1] = useState(false);
  const [mins, setMins] = useState(5)
  const [driverCost, setDriverCost] = useState(0)
  var [time, setTime] = useState()
  const [open, setOpen] = useState(false)
  const [newOrder, setNewOrder] = useState([])
  const [price, setPrice] = useState([])
  const [Oid, setOid] = useState('')
  const [Msg, setMsg] = useState('')
  const [start, setStart] = useState(1);
  const [oneld, setOneld] = useState(true)
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [itemscount, setItemscount] = useState('');
  const [load, setLoad] = useState(false)
  let v_RTreeID = useSelector((state) => state.RightTreeID)
  const count = 10;
  const [refresh, setRef] = useState(0)
  const [minDa, setMinDa] = useState('2012-01-01')
  const [value1, setValue1] = useState(date);
  const [value2, setValue2] = useState(date);
  const [tno, setTno] = useState('');
  const [fDate, setfDate] = useState(`${yr}-${mon}-${dat}`)
  const [tDate, settDate] = useState(`${yr}-${mon}-${dat}`)
  const [searchParams] = useSearchParams();

  const [openTracking, setOpenTracking] = useState(false);
  const [sellerName, setSellerName] = useState("");
  const [sellerLocation, setSellerLocation] = useState({
    lat: 0,
    lng: 0
  });
  const [customerLocation, setCustomerLocation] = useState({
    lat: 0,
    lng: 0
  });
  const [driverLocation, setDriverLocation] = useState({
    lat: 0,
    lng: 0
  });
  const [trackOID, setTrackOID] = useState('');
  const [driverID, setDriverID] = useState('');


  var dateInSecs = Math.round(CurrDate / 1000);
  console.log(newOrders, 'newOrders')
  const fetchData = async () => {
    setStart(start + 1)
    setOneld(false)
  };
  useEffect(() => {
   

    GetOrders("")
    GetOrdersvalue()

  }, [start, refresh]);

  async function GetOrders(status, val, search) {
   debugger
    setLoad(true)
    try {
      const req = {
        "Req": {
          "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
          "Type": "GCSO",
          "CRUD": "",
          "DevID": "",
          "RKID": "",
          "BID": "",
          "ID": "",//--Order Id
          "OD": "",//--Order Date
          "SID": "",//--service ID
          "PT": "",//--pay type
          "PTS": "",//--Payment status
          "DYT": "",//--Delivery Type id
          "CID": getCookie('roleId'),//--Customer ID
          "GID": "",//--grp id
          "TN": val,//--dely ref No[room no or table no]
          "OS": status,//--ord status
          "PTXN": "",//----pay txn id
          "CBy": "",
          "SRT": "",
          "FD": fDate,//--from date
          "TD": (tDate == '' ? '' : tDate + ' 23:59:59'),//--to date
          "PTL": "",
          "OSL": "",//--order status list comma separated
          "ATB": "",//--atb 1 or 0
          "RS": 1,
          "RC": 1000
        }
      }
     
      const rows = await postAPI(req);
      const row = JSON.parse(rows);
     debugger
      if (row.Resp.Sts == "1") {
        var res = JSON.parse(row.Resp.Result)
        if (res.length == 0 || res.length < 10) {
          sethasMoreItems(false);
        } if (start == 1) {
          setItemscount(res.length);

          setNewOrder(res)
          // const filteredData = res.filter(obj => obj.hasOwnProperty("DADD"));
          // const DFValue = filteredData.map(obj => {
          //   const parsedDADD = JSON.parse(obj.DADD);

          //   return parsedDADD.DF;

          // });
          // setDriverCost(DFValue)

          //sethasMoreItems(true);     
        }
        else {
          setItemscount(res.length);
          setNewOrder(newOrder.concat(res));
        }
        // setNewOrder(res)
        setLoad(false)
        console.log(res)
      } else {
        setMsg('No Orders to display')
        setNewOrder([])
        setLoad(false)
        sethasMoreItems(false);
      }
    } catch (err) {
      SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
      logger.errorLog(err.message ?? err, '', '//sales//Index.jsx', 'iconBut_tAlign-onClick');
    }
  }
  async function GetOrdersvalue(Id, search) {
    debugger
    try {
      const req = {
        "Req": {
          "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
          "Type": "GCSO",
          "CRUD": "",
          "DevID": "",
          "RKID": "",
          "BID": "",
          "ID": Id,//--Order Id
          "OD": "",//--Order Date
          "SID": "",//--service ID
          "PT": "",//--pay type
          "PTS": "",//--Payment status
          "DYT": "",//--Delivery Type id
          "CID": "",//--Customer ID
          "GID": "",//--grp id
          "TN": Id,//--dely ref No[room no or table no]
          "OS": "",//--ord status
          "PTXN": "",//----pay txn id
          "CBy": "",
          "SRT": "",
          "FD": "",//--from date
          "TD": "",//--to date
          "PTL": "",
          "OSL": "",//--order status list comma separated
          "ATB": "",//--atb 1 or 0
          "RS": 1,
          "RC": 1000
        }
      }
      debugger
      const rows = await postAPI(req);
      const row = JSON.parse(rows);
      debugger
      if (row.Resp.Sts == "1") {
        var res = JSON.parse(row.Resp.Result)
        setPrice(res)
        console.log(res)
      }
    } catch (err) {
      SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
      logger.errorLog(err.message ?? err, '', '//sales//Index.jsx', 'iconBut_tAlign-onClick');
    }
  }
  async function GetOrdersvalues(Id, search) {
   debugger
    try {

      const req = {
        Req: {
          Rsk: "UnEuNhoKLZ7IDecLjKILZg==",
          DevID: "",
          Type: "CCEI",
          CRUD: "R",
          RKID: "",
          DN: Id, // v_SADMINKEYID,//v_RTreeID, //root key id-like biz id
          AL: Id,//--area location
          LATT: "",//--latitude
          LONG: "",//--longitude
          CBY: getCookie('roleId'), //created by
          UID: getCookie('roleId')
        },
      };
     // debugger
      const rows = await postAPI(req);
      const row = JSON.parse(rows);
     // debugger
      if (row.Resp.Sts == "1") {
        var res = JSON.parse(row.Resp.Result)

        console.log(res)
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
   // debugger
    // setText(e.target.value)
    e.stopPropagation()
    if (e.target.value != "") {
      setSerCl(true)
      setOpen(true)
      setText(e.target.value)
      //GetOrders("", e.target.value)
      setStart(1)
      if (value == '1') {
        GetOrdersvalues(e.target.value)
      } else if (value == '2') {
        GetOrdersvalues(e.target.value)
      } else {
        GetOrdersvalues(e.target.value)
      }

    } else {
      setSerCl(false)
      setOpen(false)
      setText(e.target.value)
      //GetOrders('')
      setStart(1)
      //FilterOrders(e.target.value)

    }





  }

  const ClearText = () => {
    setText('')
    setSerCl(false)
  }

  const OnAcceptClick = (e, id) => {
    setOpen1(true)
    setOid(id)
    GetOrdersvalue(id)
  }

  const OnCancelClick = () => {

  }
  const handleChange1 = (newValue) => {
    // debugger
    setValue1(newValue);
    var date = new Date(newValue.$d)
    var dat = date.getDate()
    var mon = date.getMonth() + 1;
    var yr = date.getFullYear()
    //setStart(1)
    setMinDa(`${yr}-${mon}-${dat}`)
    setfDate(`${yr}-${mon}-${dat}`)
  };
  const handleChange2 = (newValue) => {
    //debugger
    setValue2(newValue);
    var date = new Date(newValue.$d)
    var dat = date.getDate()
    var mon = date.getMonth() + 1;
    var yr = date.getFullYear()
    // setStart(1)
    settDate(`${yr}-${mon}-${dat}`)
  };
  const HandleNewTap = (id, id1) => {
    //debugger
    const params = { orderid: id, custid: id1 };
    // e.preventDefault(); //Restict two new window in mobile
    window.open(`/OrderDetail?${createSearchParams(params)}`, "_blank");
  }


  function SaveBtnClicked() {
    // debugger
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
  const OnClearClick = () => {
    setValue1('')
    setValue2('')
    settDate('')
    setfDate('')
    setRef(refresh + 1)
  }
  const handleClickFunction = (fromWhere) => {
    dispatch(FromHomeOrSetup(fromWhere)); // If fromWhere == Home || fromWhere == Setup
  }
  const startOnlinePayment = async (orderId) => {
   // debugger;
    let Req = {
      Req: {
        Type: "GPGD",
        CRUD: "",
        Rsk: "UnEuNhoKLZBdIcLjKILZg==",
        DevID: "",
        OID: orderId,
        CC: "",
        GWID: "",
        CBY: ""
      },
    };
    //debugger;
    const resp = await postAPI(Req);
    // setLoading(false);
    //debugger;
    if (!resp) {
      // If not loged in then redirect to Login Page and if login then show the Cart Page
      const params = { righttreeid: props.RightTreeID, comingfrom: 'Cart' };
      nav(`/login?${createSearchParams(params)}`);
    } else {
      let response = JSON.parse(resp);
      if (response.Resp.Sts == 1) {
        //debugger;
        // localStorage.removeItem('CartData');    // Delete the Local Storage
        // props.LocalStorage_Cart([]);    // Clear the Local Storage Array in props.LocalStorage_Cart

        var paytmParams = {};
        paytmParams = response.Resp.Result;

        // separate key and values from the res object which is nothing but param_dict
        let keyArr = Object.keys(paytmParams);
        let valArr = Object.values(paytmParams);

        // when we start the payment verification we will hide our Product form
        //document.getElementById("paymentFrm").style.display = "none";
        // props.close();  // Close Current Cart Component Page

        // Lets create a form by DOM manipulation

        // display messages as soon as payment starts
        let heading1 = document.createElement("h1");
        heading1.innerText = "Redirecting you to the paytm....";
        let heading2 = document.createElement("h1");
        heading2.innerText = "Please do not refresh your page....";

        //create a form that will send necessary details to the paytm
        let frm = document.createElement("form");
        frm.action = "https://securegw.paytm.in/order/process";  //"https://securegw.paytm.in";  //"https://securegw-stage.paytm.in/order/process/";
        frm.method = "post";
        frm.name = "paytmForm";

        // we have to pass all the credentials that we've got from param_dict
        keyArr.map((k, i) => {
          // create an input element
          let inp = document.createElement("input");
          inp.key = i;
          inp.type = "hidden";
          // input tag's name should be a key of param_dict
          inp.name = k;
          // input tag's value should be a value of key that we are passing in inp.name
          inp.value = valArr[i];
          // append those all input tags in the form tag
          frm.appendChild(inp);
          // we will submit this form with all the credentials present in param_dict
        });

        //debugger
        // append all the above tags to the body tag
        document.body.appendChild(heading1);
        document.body.appendChild(heading2);
        document.body.appendChild(frm);
        // finally submit that form with all the inpput tags to get a confirmation from the paytm
        frm.submit();


      }
      else if (response.Resp.Sts == 0) {
        // If Business is not working then validate in DB its self and through here
        var arrError = response.Resp.Desc.split('::');
        if (arrError.length > 0) {
          SWAlert.fire({
            position: 'center',
            icon: 'error',
            showConfirmButton: true,
            text: arrError[1],
          });
        }
      }
    }

  }
  const OnRefreshClick = () => {
    setStart(1) // Anand Added
    setRef(refresh + 1)
  }
  const OnSubmitClick = () => {
    // setStart(1)
    GetOrders("")
    // setRef(refresh + 1)
  }
  const OnTrackBtnClick = (e, id, row) => {
    //debugger;

    setSellerName(row.BNM);
    const _oid = row.ID;
    const _did = row.DADD.DID;

    let sloc = {
      lat: row.BLATT,
      lng: row.BLONG,
    }
    let cloc = {
      lat: row.DADD.LATT,
      lng: row.DADD.LONG,
    }
    setSellerLocation(sloc);
    setCustomerLocation(cloc);

    

    setTrackOID(_oid);
    setDriverID(_did);

    GetDriverCurrentLocattionToDB(_oid,_did);

    //Timer show location enable alert
    // increment.current = setInterval(() => {
    //   setTimer((timer) => timer + 1)
    //   GetDriverCurrentLocattionToDB(_oid);
    //   //alert(timer);
    // }, 10000)


  };
  const handleCloseTracking = () => {
    setOpenTracking(false);
    // clearInterval(increment.current);
    // setTimer(0);
  };

  async function GetDriverCurrentLocattionToDB(v_oid, v_did) {
    try {
      // setCurrentPosition({
      //   lat: 13.0415011000,
      //   lng: 80.2650506000
      // })

      let Req = {
        Req: {
          Rsk: "UnEuNhoKLZ7IDecLjKILZg==",
          DevID: "",
          Type: "MDAD",
          CRUD: "RDL",
          UID: v_did, //driver id
          OID: v_oid, //OID id (optional)   
          CBY: getCookie('roleId'), //created by
        },
      };
      const resp = await postAPI(Req);
      //debugger;

      let response = JSON.parse(resp);
      if (response.Resp.Sts == 1) {
        let val = JSON.parse(response.Resp.Result);
        if (val.length > 0) {
          //debugger;
          // setCurrentPosition({
          //   lat: val[0].LATT == 0 ? parseFloat(val[0].LATT).toFixed(10) : parseFloat(val[0].LATT).toFixed(10),
          //   lng: val[0].LONG == '0' ? parseFloat(val[0].LONG).toFixed(10) : parseFloat(val[0].LONG).toFixed(10),
          // })
          let v_lat = val[0].LATT == 0 ? parseFloat(val[0].LATT).toFixed(10) : parseFloat(val[0].LATT).toFixed(10);
          var v_lattitude = parseFloat(v_lat).toFixed(10);//.toFixed(2)
          let v_lng = val[0].LONG == 0 ? parseFloat(val[0].LONG).toFixed(10) : parseFloat(val[0].LONG).toFixed(10);
          var v_lngitude = parseFloat(v_lng).toFixed(10);//.toFixed(2)
          if (v_lattitude != "0.0000000000" && v_lngitude != "0.0000000000") {
         
          let dloc = {
            lat: parseFloat(v_lattitude),
            lng: parseFloat(v_lngitude),
          }

          setDriverLocation(dloc);

          setOpenTracking(true);
          }
          else {
            SWAlert.fire({  text: 'Driver route not availabel' });
          }
        }
        else {
          SWAlert.fire({  text: 'Driver route not availabel' });
        }
      }
      else {
        SWAlert.fire({  text: 'Driver route not availabel' });
      }

    } catch (error) {
      console.error(`UpdateLocattionToDB error: ${error}`);
    }
  }



  return (
    <>
      <HeaderForm clickFunction={handleClickFunction} />
      {oneld && <Loading style={{
        display: load ? "flex" : "none"
      }} loading={load}></Loading>}
      <div>
        <Stack sx={{ marginTop: '100px' }}>
          <Stack direction='row' display='flex' justifyContent='space-between'>
            <Stack direction='row' alignItems='center' sx={{ width: '50%', height: '40px', backgroundColor: 'white', borderRadius: '10px 10px 0px 0px', position: 'relative', bottom: '20px' }}>
              <Stack alignItems='center' sx={{ height: '35px', backgroundColor: '#898BD6', borderRadius: '0px 0px 10px 10px', marginLeft: '15px', position: 'relative', bottom: '3px' }} >
                <label style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginLeft: "10px", marginRight: "10px", position: 'relative', top: '3px' }}>Your Reservations</label>
              </Stack>

            </Stack>


            <Stack direction='row' className='serBox' alignItems='center' justifyContent='space-between'>
              <Stack direction='row' spacing={3} alignItems='center'>
                <img src={search} width='30px' height='30px' />
                <InputBase value={text}
                  placeholder='Search' onChange={(e) => onTextChange(e)}
                  sx={{
                    color: Colors.primary, fontSize: '15px', fontStyle: 'italic',
                    width: "85%"
                  }}></InputBase>
              </Stack>
              {serCl && <CloseIcon sx={{
                cursor: 'pointer', color: "#6eabe0",
                textShadow: "0 0 3px #FF0000",
                marginRight: "10px"
              }} onClick={() => ClearText()} />}
            </Stack>
          </Stack>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction='row' display={['block', 'flex']} spacing={4} alignItems='center' sx={{ marginLeft: '15px', marginTop: '10px' }}>
              <Typography variant='h7'>Date:</Typography>
              <Box sx={{ display: ['block', 'flex'] }}>
                <MobileDatePicker
                  label="From"
                  inputFormat="DD/MM/YYYY"
                  minDate={new Date('2012-01-01')}
                  maxDate={new Date()}
                  value={value1}
                  onChange={handleChange1}
                  renderInput={(params) => <TextField size="small" sx={{ width: '110px' }} {...params} />}
                />
                <MobileDatePicker
                  label="To"
                  inputFormat="DD/MM/YYYY"
                  minDate={new Date(minDa)}
                  maxDate={new Date()}
                  value={value2}
                  onChange={handleChange2}
                  renderInput={(params) => <TextField size="small" sx={{ width: '110px', marginLeft: ['10px', '10px'], marginTop: [0, 0] }}  {...params} />}
                />
              </Box>
              <Stack direction='row' alignItems='center' display='flex' spacing={2} className='datepicker'>
                <button className='btnOrderTrackBlue' onClick={(e) => OnSubmitClick()}>Submit</button>
                <button className='btnOrderTrackRed' onClick={(e) => OnClearClick()}>Clear</button>
                <button className='btnOrderTrackBlue' onClick={(e) => OnRefreshClick()}>Refresh</button>
                {/* <Stack direction='row' alignItems='center' className='clrBtn' onClick={(e) => OnSubmitClick()}>
                  <label className="LogLbl" style={{ marginLeft: '6px' }}>Submit</label>
                </Stack>
                <Stack direction='row' alignItems='center' className='clrBtn2' onClick={(e) => OnClearClick()}>
                  <label className="LogLbl" style={{ marginLeft: '12px' }}>Clear</label>
                </Stack>
                <Stack direction='row' alignItems='center' className='clrBtn' onClick={(e) => OnRefreshClick()} >
                  <label className="LogLbl" style={{ marginLeft: '3px' }}>Refresh</label>
                </Stack> */}
              </Stack>
            </Stack>
          </LocalizationProvider>


          <Stack>

            <div >
              <InfinitScroll
                dataLength={newOrders.length}
                next={fetchData}
                //hasMore={true}
                hasMore={hasMoreItems}
                loadOnMount={true}
                scrollThreshold='1'
               
                loader={
                  <div style={styleInfLoader} >
                    <BarLoader height={10} color={Colors.BarCl}
                    />{hasMoreItems}</div>
                }
              >
                {newOrders.length == 0 ?
                  <h1 style={{ padding: '10px', alignContent: 'center', textAlign: 'center', color: 'red' }}>No Orders Found </h1>
                  :
                  <Grid container spacing={2} sx={{ flexGrow: 1, backgroundColor: Colors.WhiteSmoke }}>
                    {newOrders.map((i, index) => (
                      <Grid key={index} item xs={12} md={3}  >
                        <Card sx={{ maxWidth: '100%', margin: '15px', borderRadius: '15px' }}>
                          <CardHeader
                          avatar={
                            <Avatar sx={{ backgroundColor: 'red' }} >
                              {i.name[0]}
                            </Avatar>
                          }
                            title={<label style={{ fontSize: 15, fontWeight: 'bold', color: '#3899EC' }}>{i.name}</label>}
                            subheader={<Stack>
                                <label style={{ fontSize: 12 }} >{i.mobileNo}</label>
                              <label style={{ fontSize: 12 }} >{i.Email}</label>
                              <label style={{ fontSize: 12 }} >{i.ReservationFor}</label>
                              <label style={{ fontSize: 12 }} >{i.ReservationOn} at {i.ReservationStartat}</label>

                              <label style={{ fontSize: 12 }} >{i.ReservationTableSize}</label>
                              <Divider />
                              <label style={{ fontSize: 14 ,marginLeft:'170px'}} >{i.status} </label>
                              </Stack>
                            }
                          >
                          </CardHeader>
                          
                          <Divider />
                       
                        </Card>
                      </Grid>
                    ))}
                  </Grid>}
              </InfinitScroll>
            </div>
          </Stack>
        </Stack>
        <Dialog style={{ backgroundColor: '#F6F6F7', zIndex: '1000000' }}
          open={open1}
          PaperProps={{
            sx: {
              minWidth: '50%',
              backgroundColor: '#F6F6F7'
            }
          }} onClose={handleClose1}>
          <DialogTitle >
            <Stack direction='row' display='flex' alignItems='center' justifyContent='space-between'>
              <Typography variant='h6' sx={{ color: '#3899EC' }}>Order Summary</Typography>
              <Closeicon className='clsup' sx={{ cursor: 'pointer', color: "#32536A", }} onClick={handleClose1} />
            </Stack>
            <Divider />
          </DialogTitle>
          <DialogContent>
            <Stack className='addeditproductpage' style={{ overflowX: "hidden", overflowY: "auto", maxHeight: "400px" }} display='flex' justifyContent='space-between'>
              <List sx={{ width: '100%', maxWidth: '440px', bgcolor: 'background.paper', alignItems: 'start' }}>

                <ListItem alignItems="flex-start">
                  <ListItemText

                  >        {price.map((i, index) => (
                    <label className='lblAMT' key={index} >Price  ({i.PS.length} items)  </label>))}</ListItemText>
                  <ListItemText
                    primary={
                      <Stack direction='row-reverse'>
                        <React.Fragment>

                          {price.map((i, index) => (
                            <label className='lblAMT' key={index} >₹{i.OABT}</label>


                          ))}
                        </React.Fragment>
                      </Stack>}
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={'Discount (%)'}
                  />
                  <ListItemText
                    primary={<Stack direction='row-reverse'>₹0.00</Stack>}
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={'Tax (GST)'}
                  />
                  <ListItemText
                    primary={<Stack direction='row-reverse'>₹0.00</Stack>}
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={'Shipping'}
                  />
                  <ListItemText
                    primary={<Stack direction='row-reverse'>Free</Stack>}
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <label className='lblAMT'  >Total Amount </label>
                  <ListItemText sx={{ marginLeft: '30px', fontWeight: 'bold' }}
                    primary={
                      <Stack direction='row-reverse'>
                        <React.Fragment>

                          {price.map((i, index) => (
                            <label className='lblAMT' key={index} >₹{i.OABT}</label>
                          ))}
                        </React.Fragment>
                      </Stack>}
                  />
                </ListItem>
              </List>
            </Stack>
            <Divider />
          </DialogContent>
          <DialogContent >
            <Stack direction='row' display='flex' alignItems='center' justifyContent='space-between'>
              <Typography variant='h6' sx={{ color: '#3899EC' }}>Location</Typography>
            </Stack>
            <Divider />
            <Stack>

              <DialogContent>
                <Stack className='addeditproductpage' style={{ overflowX: "hidden", overflowY: "auto", maxHeight: "400px" }} display='flex' justifyContent='space-between'>




                  {price.map((i, index) => (<>

                    <label>{i.BNM}</label>
                    <label>{i.BRCYN}</label>
                    <label>{i.BRCN}</label>
                  </>))}







                </Stack>

              </DialogContent>

            </Stack>
          </DialogContent>
        </Dialog>


        <Dialog
          PaperProps={{
            sx: {
              minWidth: '98%',
              minHeight: '98%',
              backgroundColor: '#F6F6F7'
            }
          }}
          display='flexGrow' open={openTracking} onClose={handleCloseTracking}>
          <DialogTitle>
            <DiaHeader justifyContent='space-between' alignItems='center' component='span'>Tracking
              <Closeicon onClick={handleCloseTracking} />
            </DiaHeader>
            <Divider color={Colors.primary} height='10px' />
          </DialogTitle>
          <DialogContent sx={{ height: '100%', width: "100%" }}>
            <StyledDiaBx sx={{ height: '100%', width: "99%" }} >
              <Stack spacing={10} alignItems='center' sx={{ height: '100%', width: "100%" }}>
                <Stack direction='row' sx={{ height: '100%', width: "100%" }} alignItems='center' spacing={2}>
                  <DriverDirectionView
                    sellerName={sellerName}
                    sellerLocation={sellerLocation}
                    customerLocation={customerLocation}
                    driverLocation={driverLocation}
                    driverID={driverID}
                    trackOID={trackOID}
                  ></DriverDirectionView>
                </Stack>
              </Stack>
            </StyledDiaBx>
          </DialogContent>

        </Dialog>

      </div>
    </>
  )
}

export default Reservations