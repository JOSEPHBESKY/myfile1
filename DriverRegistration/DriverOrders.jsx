import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputBase, Menu, MenuItem, styled, Tab, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, Tabs, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system'
import React from 'react'
import { useState, useRef } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeaderForm from "../saucerView/components/header/index";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import './D1.css'
import veg from '../../assets/images/vegicon.png'
import nonveg from '../../assets/images/nonveg.png'
import StoreIcon from '@mui/icons-material/Store';
import { Colors } from '../../styles/theme';
import Timer from '../../common/Timer';
import { Closeicon, DiaBtn1, DiaBtn2, DiaHeader, StyledDiaBx, styleInfLoader } from '../../styles/common';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import logger from '../../common/logger';
import SWAlert from "sweetalert2";
import { postAPI, postAPILocation } from '../../services/apicall';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { useEffect } from 'react';
import Loading from '../../loadingScr';
import InfinitScroll from 'react-infinite-scroll-component'
import { BarLoader } from 'react-spinners';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from "react-redux";
import { FromHomeOrSetup } from "../../stateManagement/action";
import { getCookie } from '../../common/cks';
import search from '../../assets/images/searchBlue.png'
import Swal from 'sweetalert2';
import DirectComponent from '../../pages/SAdmin/Delivery/Direct';
import { useNavigate, useLocation } from "react-router-dom";

function DriverOrders() {
  const nav = useNavigate();
  var interval = null;
  const [timer, setTimer] = useState(0)
  const increment = useRef(null);
  const dispatch = useDispatch();
  let date = new Date()
  var dat = date.getDate()
  var mon = date.getMonth() + 1;
  var yr = date.getFullYear()
  const [opensclk, setOpensclk] = useState(false);
  const [value, setValue] = useState('1');
  const [value1, setValue1] = useState(date);
  const [value2, setValue2] = useState(date);
  const [serCl, setSerCl] = useState(false)
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [open1, setOpen1] = useState(false);
  const [mins, setMins] = useState(5)
  var [time, setTime] = useState()
  const [statuss, setStatuss] = useState("Reached");
  const [newOrder, setNewOrder] = useState([])
  const [load, setLoad] = useState(false)
  const [Oid, setOid] = useState('')
  const [Sts, setSts] = useState('')
  const [Msg, setMsg] = useState('')
  const [start, setStart] = useState(1);
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [itemscount, setItemscount] = useState('');
  const count = 10;
  const [minDa, setMinDa] = useState('2012-01-01')
  const [option, setoption] = useState([])
  const [oneld, setOneld] = useState(true)
  var UserID = getCookie("roleId")
  const [refresh, setRef] = useState(0)

  var CurrDate = new Date()
  var dateInSecs = Math.round(CurrDate / 1000);

  const [fDate, setfDate] = useState(`${yr}-${mon}-${dat}`)
  const [tDate, settDate] = useState(`${yr}-${mon}-${dat}`)
  const [reached, setReached] = useState(false);
  const [pick, setPick] = useState(false);
  const [deliv, setDeliv] = useState(false);

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

  const [prevLat, setPrevLat] = useState("0.0");
  const [prevLong, setPrevLong] = useState("0.0");

  //   const [age, setAge] = useState('pt000');
  const [age, setAge] = useState('pt000');
  const handleChangesdrop = (event) => {
    //debugger
    if (event.target.value == 'pt000') {
      setAge(event.target.value);
      // if (value == '1') {
      //   GetOrders("N", "", "", "")
      // }
      // else if (value == '2') {
      //   GetOrders("O", "", "", "")
      //   setAge(event.target.value);
      // }
      // else {
      //   GetOrders("", "", "", "")
      //   setAge(event.target.value);
      // }
    }
    else {
      setAge(event.target.value);
      // if (value == '1') {
      //   GetOrders("N", "", "", event.target.value)
      // } else if (value == '2') {
      //   GetOrders("O", "", "", event.target.value)
      // } else {
      //   GetOrders("", "", "", event.target.value)
      // }

    };

  }
  const fetchData = async () => {
    setStart(start + 1)
    setOneld(false)
  };

  const [BizzID, setBizId] = useState('')

  useEffect(() => {
    const LogedInUserId = getCookie('roleId');
    if (LogedInUserId == 'null') {
      nav('/iSaucers');
    }
    else {
    sethasMoreItems(true);
    // debugger
    GetBizID()
    }
  }, [start, value, refresh]);

  async function FilterOrders(id, status, val) {
    //debugger
    try {
      setLoad(true)
      const req = {
        "Req": {
          "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
          "Type": "GCSO",
          "CRUD": "US",
          "DevID": "",
          "UID": getCookie('roleId'),
          "BizID": "",
          "RKID": "",
          "BID": "",
          "ID": id,//--Order Id
          "OD": "",//--Order Date
          "SID": "",//--service ID
          "PT": val,//--pay type
          "PTS": "",//--Payment status
          "DYT": "",//--Delivery Type id
          "CID": "",//--Customer ID
          "GID": "",//--grp id
          "TN": "",//--dely ref No[room no or table no]
          "OS": '',//--ord status
          "PTXN": "",//----pay txn id
          "TF": status,
          "CBy": "",
          "SRT": "",
          "FD": fDate,//--from date
          "TD": (tDate == '' ? '' : tDate + ' 23:59:59'),//--to date
          "PTL": "",
          "OSL": "",//--order status list comma separated
          "ATB": "",//--atb 1 or 0
          "RS": "",
          "RC": ""
        }
      }
      const rows = await postAPI(req);
      const row = JSON.parse(rows);
      if (row.Resp.Sts == "1") {
        var res = JSON.parse(row.Resp.Result)
        setoption(res)
        setLoad(false)
      } else {
        setoption([{ "ID": "No Results Found" }])
        setLoad(false)
      }

    } catch (err) {
      SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
      logger.errorLog(err.message ?? err, '', '//sales//Index.jsx', 'iconBut_tAlign-onClick');
      setLoad(false)
    }
  }

  async function GetBizID() {

    try {
      const req = {
        Req: {
          Type: "GMDD",
          CRUD: "KRI",
          Rsk: "UnEuNhoKLZBdIcLjKILZg==",
          UID: getCookie('roleId'),
          DevID: "",
          BizID: "",
          BID: "",
          ID: "",
          PID: "",
          ST: "",
          CC: "",
          KS: "",
          SUF: 1 // fromHomeOrSetupFlag = Home = 0
        },
      }
      var Req = JSON.stringify(req);
      var rows = await postAPI(Req); // Open for all
      setLoad(false);
      let jsonObject = JSON.parse(rows);
      if (jsonObject.Resp.Sts == "1") {
        var busID = JSON.parse(jsonObject.Resp.Result);
        //dispatch(BussId(busID))

        setBizId(busID[0].BizID)

        if (value == '1') {
          GetOrders("N", "",)
        } else if (value == '2') {
          GetOrders("O", "",)
        } else if (value == '3') {
          GetOrders("", "",)
        }
      }

    } catch (err) {
      SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
      logger.errorLog(err.message ?? err, '', '//pages//saucerView//Components//leftmenukey//leftmenukey.jsx', 'iconBut_tAlign-onClick');
    }
  }

  async function GetOrders(status, id = '', val) {
    try {

      setLoad(true)
      const req = {
        "Req": {
          "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
          "Type": "GCSO",
          "CRUD": "DOL",
          "DevID": "",
          "UID": getCookie('roleId'),
          "BizID": "",
          "RKID": "",
          "BID": "",
          "DOL": "",
          "ID": (id == '1' ? '' : text),//--Order Id
          "OD": "",//--Order Date
          "SID": "",//--service ID
          "PT": (age == 'pt000' ? '' : age),//--pay type
          "PTS": "",//--Payment status
          "DYT": "",//--Delivery Type id
          "CID": "",//--Customer ID
          "GID": "",//--grp id
          "TN": "",//--dely ref No[room no or table no]
          "OS": '',//--ord status
          "PTXN": "",//----pay txn id
          "TF": status,
          "CBy": "",
          "SRT": "",
          "FD": fDate,//--from date
          "TD": (tDate == '' ? '' : tDate + ' 23:59:59'),//--to date
          "PTL": "",
          "OSL": "",//--order status list comma separated
          "ATB": "",//--atb 1 or 0
          "RS": start,
          "RC": count
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

          console.log(res);
          //sethasMoreItems(true);
        }
        else {
          setItemscount(res.length);
          setNewOrder(newOrder.concat(res));
        }
        // setNewOrder(res)
        setLoad(false)
        //console.log(res)
      } else {
        setMsg('No Orders to display')
        setNewOrder([])
        setLoad(false)
        sethasMoreItems(false);
      }
    } catch (err) {
      SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
      logger.errorLog(err.message ?? err, '', '//sales//Index.jsx', 'iconBut_tAlign-onClick');
      setLoad(false)
    }
  }

  async function RefundPay(id, amount) {
    try {
      //debugger
      setLoad(true)
      const req = {
        "Req": {
          "Type": "UCSOS",
          "CRUD": "R",
          "Rsk": "UnEuNhoKLZBdIcLjKILZg==",
          "DevID": "",
          "ID": id,//--order ID
          "RA": amount,//--refund amt
          "MSG": "",//--refund message
          "CBy": ""
        }
      }
      const rows = await postAPI(req);
      const row = JSON.parse(rows);
      //debugger
      if (row.Resp.Sts == "1") {
        SWAlert.fire({ title: id, text: row.Resp.Desc, icon: 'Success', allowOutsideClick: false, })
        setLoad(false)
      } else {
        SWAlert.fire({ title: id, text: "Refund Failed", icon: 'error', allowOutsideClick: false, })
      }
    } catch (err) {
      SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
      logger.errorLog(err.message ?? err, '', '//sales//Index.jsx', 'iconBut_tAlign-onClick');
      setLoad(false)
    }

  }

  async function CollectPay(id) {
    try {
      //debugger
      setLoad(true)
      const req = {
        "Req": {
          "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
          "DevID": "",
          "Type": "UCSOS",
          "CRUD": "CP",
          "BizID": '',
          //"RKID": "100001",
          "ID": id,//--ord id
          "OS": '',//--ord status
          "PTR": '',//--prep timer-in mins
          "CBy": "",
          "ICC": "",//--Is cus canceled[1 or 0]
          "CRMK": "",//--Cancel remarks
          "PST": '',
          "PS": {
            "OI": []
          }
        }
      }
      const rows = await postAPI(req);
      const row = JSON.parse(rows);
      //
      if (row.Resp.Sts == "1") {

        // var res = JSON.parse(row.Resp.Result)
        SWAlert.fire({ title: id, text: row.Resp.Desc, icon: 'success', allowOutsideClick: false, })

        setLoad(false)
        //console.log(res)
      } else {
        SWAlert.fire({ title: id, text: "Payment Failed", icon: 'error', allowOutsideClick: false, })
      }

    } catch (err) {
      SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
      logger.errorLog(err.message ?? err, '', '//sales//Index.jsx', 'iconBut_tAlign-onClick');
      setLoad(false)
    }
  }

  async function UpdateOrder(Id, Time, status, ts, st) {
    try {
      //debugger
      setLoad(true)
      const req = {
        "Req": {
          "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
          "DevID": "",
          "Type": "UCSOS",
          "CRUD": "DOU",
          "BizID": "",
          //"RKID": "100001",
          "DID": getCookie('roleId'),
          "ID": Id,//--ord id
          "DOS": status,//--ord status
          "PTR": Time.toString(),//--prep timer-in mins
          "CBy": "",
          "TF": st,
          "ICC": "",//--Is cus canceled[1 or 0]
          "CRMK": "",//--Cancel remarks
          "PST": ts,
          "UID": getCookie('roleId'),
          "PS": {
            "OI": []
          }
        }
      }
      const rows = await postAPI(req);
      const row = JSON.parse(rows);
      // debugger
      if (row.Resp.Sts == "1") {

        //var res = JSON.parse(row.Resp.Result)
        //setNewOrder(res)
        if (status == '11') {
          SWAlert.fire({ allowOutsideClick: false, title: Id, text: "Order Accepted", icon: 'success', })
        } else if (status == '14') {
          SWAlert.fire({ allowOutsideClick: false, title: Id, text: "Order Canceled", icon: 'error', })
        } else if (status == '12') {
          SWAlert.fire({ allowOutsideClick: false, title: Id, text: "Order ready & OnTheWay", icon: 'success', })
        } else if (status == '13') {
          SWAlert.fire({ allowOutsideClick: false, title: Id, text: "Order deliveried Successfully", icon: 'success', })
        } else if (status == '15') {
          SWAlert.fire({ allowOutsideClick: false, title: Id, text: "Reached", icon: 'success', })
        }

        setLoad(false)
        //console.log(res)
      }else    if (row.Resp.Sts == "0") {
        SWAlert.fire({ title: 'Cell Serve Admin', text: 'This order is cancel'});
        logger.errorLog('This order is cancel', '', '//sales//Index.jsx', 'iconBut_tAlign-onClick');
        setLoad(false)
      }

    } catch (err) {
      SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
      logger.errorLog(err.message ?? err, '', '//sales//Index.jsx', 'iconBut_tAlign-onClick');
      setLoad(false)
    }
  }

  const handleChange = (event, newValue) => {
    //debugger
    setOneld(true)
    setValue(newValue);
    setStart(1)

  };

  const handleChange1 = (newValue) => {
    // debugger
    setValue1(newValue);
    var date = new Date(newValue.$d)
    var dat = date.getDate()
    var mon = date.getMonth() + 1;
    var yr = date.getFullYear()
    // setStart(1)
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
    //setStart(1)
    settDate(`${yr}-${mon}-${dat}`)
  };

  const onTextChange = (e) => {
    //debugger
    e.stopPropagation()
    if (e.target.value != "") {
      setSerCl(true)
      setOpen(true)
      setText(e.target.value)
      setStart(1)
      if (value == '1') {
        FilterOrders(e.target.value, "N")
      } else if (value == '2') {
        FilterOrders(e.target.value, "O")
      } else {
        FilterOrders(e.target.value, "")
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

  const ClearText = (e) => {
    //debugger
    e.stopPropagation()
    setText('')
    setSerCl(false)
    setOpen(false)
    sethasMoreItems(true)
    if (value == '1') {
      GetOrders("N", '1')
    } else if (value == '2') {
      GetOrders("O", "1")
    } else {
      GetOrders("", "1")
    }
  }

  const OnRefreshClick = () => {
    setStart(1) // Anand Added
    setRef(refresh + 1)
  }

  const OnSubmitClick = () => {
    // setStart(1)
    GetBizID()
  }

  const OnClearClick = () => {
    setValue1('')
    setValue2('')
    settDate('')
    setfDate('')
    setAge('pt000')
    // FilterOrders1('', '')
    GetBizID()
  }

  const OnAcceptClick = (e, id) => {
    //debugger
    // setOpen1(true)
    UpdateOrder(id, "", 11, '', '')
    setOid(id)
    setSts('11')
    setValue("2")
    setOpensclk(true)
  }

  const OnPayCollect = (e, id) => {
    //UpdateOrder(id, '', '','SUCESS')
    CollectPay(id)
    setTimeout(() => {
      GetBizID()
    }, 300);
  }

  const OnRefundClick = (e, id, amt) => {
    RefundPay(id, amt)
    setTimeout(() => {
      GetBizID()
    }, 300);
  }

  const OnCancelClick = (e, id) => {
    //debugger
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to cancel the order",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel Order!'
    }).then((result) => {
      if (result.isConfirmed) {
        UpdateOrder(id, '', '14', '', 'C')
        setTimeout(() => {
          GetBizID()
        }, 300);
      }
    })
  }


  function SaveBtnClicked(e, ID) {
    //debugger
    try {
      setTime(mins * 60)
      setOpen1(false);
      setValue("2")
      setMins(5)
      UpdateOrder(ID, mins, 2, '')
      setOid('')
      setTimeout(() => {
        GetBizID()
      }, 300);
    } catch (err) {
      console.error(`GET error: ${err}`);
    }
  }

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleCloseTracking = () => {
    setOpenTracking(false);
    clearInterval(increment.current);
    setTimer(0);
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

  const OnReadyClick = (e, Id) => {
    UpdateOrder(Id, '', '5', '')
    setTimeout(() => {
      GetBizID()
    }, 300);
  }

  const OnDeliveryClick = (e, Id) => {
    UpdateOrder(Id, '', '6', '')
    setTimeout(() => {
      GetBizID()
    }, 300);
  }

  const handleClickFunction = (fromWhere) => {
    dispatch(FromHomeOrSetup(fromWhere)); // If fromWhere == Home || fromWhere == Setup
  }

  const OnSearchClick = (e) => {
    //setAnchorEl(e.currentTarget);OnReadyClick
  }
  const OnReachedClick = (e, id) => {
    //debugger
    setStatuss("PickedUp");
    // UpdateOrder(id, 15, '','','R')
    UpdateOrder(id, "", 15, '', 'R')

    GetOrders("O", "1")
  };
  const OnReadyTostartClick = (e, id) => {
    //debugger
    setStatuss("Start");
    // UpdateOrder(id, 15, '','','R')
    UpdateOrder(id, "", 16, '', 'S')

    GetOrders("O", "1")
  };


  const OnPickedupClick = (e, id) => {
    //debugger
    setStatuss("Delivered");
    // UpdateOrder(id, 12, '','','T')
    UpdateOrder(id, "", 12, '', 'T')
    GetOrders("O", "1")
  };
  const OnDeliverClick = (e, id) => {
    //debugger
    setStatuss("Delivered");
    // UpdateOrder(id, 13, '','','D')
    UpdateOrder(id, "", 13, '', 'D')
    setValue("3")
    GetOrders("O", "1")
  };
  const OnMenuClick = (e, id) => {


    if (value == '1') {
      GetOrders("", id, "", '')
    } else if (value == '2') {
      GetOrders("", id, "", '')
    } else {
      GetOrders("", id, "", '')
    }

    setText(id)
    setOpen(false)
    // FilterOrders1(id)

  }

  const OnTrackBtnClick = (e, id, row) => {

    localStorage.setItem("DLATT", '');
    localStorage.setItem("DLONG", '');


    const trackOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 20000,
      distanceFilter: 1
    };

    const _oid = row.ID;

    setSellerName(row.BNM);

    let sloc = {
      lat: row.BLATT,
      lng: row.BLONG,
    }
    let cloc = {
      lat: row.LATT,
      lng: row.LONG,
    }
    setSellerLocation(sloc);
    setCustomerLocation(cloc);

    setOpenTracking(true);

    //Timer show location enable alert
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
      var srlat = localStorage.getItem("DLATT") || "0.0";
      var srlong = localStorage.getItem("DLONG") || "0.0";
      //alert(prevLat + 'fffff ' + srlat)
      const v_prlat = prevLat;
      const v_prlon = prevLong;
      setPrevLat(srlat);
      setPrevLong(srlong);

      UpdateLocattionToDB(srlat, srlong, _oid);
    }, 10000)


  };

  async function UpdateLocattionToDB(currentPositionlat, currentPositionlng, v_oid) {
    try {
      let v_lat = currentPositionlat || "0.0";
      var v_lattitude = parseFloat(v_lat).toFixed(10);//.toFixed(2)
      let v_lng = currentPositionlng || "0.0";
      var v_lngitude = parseFloat(v_lng).toFixed(10);//.toFixed(2)
      if (v_lattitude != "0.0000000000" && v_lngitude != "0.0000000000") {
        let Req = {
          Req: {
            Rsk: "UnEuNhoKLZ7IDecLjKILZg==",
            DevID: "",
            Type: "MDAD",
            CRUD: "UL",
            UID: getCookie('roleId'), //driver id
            OID: v_oid, //OID id (optional)   
            LATT: v_lattitude,//--latitude
            LONG: v_lngitude,//--longitude
            CBY: getCookie('roleId'), //created by
          },
        };
        const resp = await postAPI(Req);
        //const resp = await postAPILocation(Req);
        if (!resp) {
          nav("/logout");
        } else {
          let response = JSON.parse(resp);
          if (response.Resp.Sts == 1) {
          }
        }
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
      <>
        <Stack direction='row' alignItems='center' sx={{ width: '50%', height: '40px', backgroundColor: 'white', borderRadius: '10px 10px 0px 0px', position: 'relative', top: '80px' }}>
          <Stack alignItems='center' sx={{ height: '35px', backgroundColor: '#898BD6', borderRadius: '0px 0px 10px 10px', marginLeft: '15px', position: 'relative', bottom: '3px' }} >
            <label style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginLeft: "10px", marginRight: "10px", position: 'relative', top: '3px' }}>Order Details</label>
          </Stack>
        </Stack>
        <Stack sx={{ marginTop: '80px' }} spacing={5}>
          <Stack direction='row' display='flex' justifyContent='space-between'>
            <Stack spacing={2} width='50%'>
              <Box sx={{ width: '100%', maxWidth: { xs: 200, sm: 480 }, marginLeft: '-30px' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                >
                  <Tab value="1" label="New Orders" />
                  <Tab value="2" label="In Progress" />
                  <Tab value="3" label="All Orders" />
                </Tabs>
              </Box>
              <button className='btnOrderTrackBlue' onClick={(e) => OnRefreshClick()} style={{ width: '75px' }}>Refresh</button>
              {/* <Stack direction='row' alignItems='center' className='clrBtn1' onClick={(e) => OnRefreshClick()}>
                <label className="LogLbl" style={{ marginLeft: '12px' }}>Refresh</label>
              </Stack> */}
            </Stack>{
              // <Stack direction='row' className='serBox' alignItems='center' justifyContent='space-between' onClick={OnSearchClick}>
              //   <Stack direction='row' spacing={3} alignItems='center'>
              //     {/* <SearchIcon sx={{ marginLeft: '10px', color: '#6eabe0' }} /> */}
              //     <img src={search} width='30px' height='30px' />
              //     <InputBase value={text} sx={{
              //       color: Colors.primary, fontSize: '15px', fontStyle: 'italic',
              //       width: "85%"
              //     }}
              //       placeholder='Search for OrderID' onChange={(e) => onTextChange(e)} ></InputBase>
              //   </Stack>
              //   {serCl && <CloseIcon sx={{
              //     cursor: 'pointer', color: "#6eabe0",
              //     textShadow: "0 0 3px #FF0000",
              //     marginRight: "10px"
              //   }} onClick={(e) => ClearText(e)} />}
              //   {open &&
              //     <Stack className='menusss' >
              //       {option.map((i, index) => (
              //         <Stack sx={{ marginLeft: '20px', marginTop: '10px', cursor: 'pointer' }}>
              //           <label sx={{ cursor: 'pointer' }} key={index} onClick={(e) => OnMenuClick(e, i.ID)}>
              //             {i.ID}
              //           </label>
              //           <Divider />
              //         </Stack>
              //       ))}
              //     </Stack>}
              // </Stack>
            }
          </Stack>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <Stack direction='row' display='flex' spacing={4} alignItems='center' width='100%' sx={{ marginTop: '30px' }}> */}
            <Grid container spacing={2} width="100%" sx={{ flexGrow: 1 }} alignItems='center'>
              <Grid item xs={12} md={3}>
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Typography variant='h7' sx={{ marginLeft: '15px' }}>Date:</Typography>
                  <MobileDatePicker
                    label="From"
                    inputFormat="DD/MM/YYYY"
                    minDate={new Date('2012-01-01')}
                    maxDate={new Date()}
                    value={value1}
                    onChange={handleChange1}
                    renderInput={(params) => <TextField size="small" sx={{ minWidth: '112px' }} {...params} />}
                    sx={{ borderRadius: '15px' }}
                  />
                  <MobileDatePicker
                    label="To"
                    inputFormat="DD/MM/YYYY"
                    minDate={new Date(minDa)}
                    maxDate={new Date()}
                    value={value2}
                    onChange={handleChange2}
                    renderInput={(params) => <TextField size="small" sx={{ minWidth: '112px' }}  {...params} />}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack direction='row' display='flex' spacing={1} alignItems='center' >
                  <FormControl sx={{ m: 1, maxWidth: 150, }} size="small" fullWidth>
                    <InputLabel htmlFor="grouped-native-select" >Payment Type</InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      value={age}
                      onChange={handleChangesdrop}
                      autoWidth
                      label="Payment Type"
                    >
                      <MenuItem value={'pt000'}>All</MenuItem>
                      <MenuItem value={'pt002'}>Online</MenuItem>
                      <MenuItem value={'PT001'}>Pay at Counter</MenuItem>
                    </Select>
                  </FormControl>
                  <Stack direction='row' alignItems='center' display='flex' spacing={2}>
                    <button className='btnOrderTrackBlue' onClick={(e) => OnSubmitClick()}>Submit</button>
                    <button className='btnOrderTrackRed' onClick={(e) => OnClearClick()}>Clear</button>
                    {/* <Stack direction='row' alignItems='center' className='clrBtn' onClick={(e) => OnSubmitClick()}>
                      <label className="LogLbl" style={{ marginLeft: '6px' }}>Submit</label>
                    </Stack>
                    <Stack direction='row' alignItems='center' className='clrBtn2' onClick={(e) => OnClearClick()}>
                      <label className="LogLbl" style={{ marginLeft: '12px' }}>Clear</label>
                    </Stack> */}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            {/* </Stack> */}
          </LocalizationProvider>
          <Stack>
            {/* Staring of new orders */}
            {/* {value=='1' &&   */}
            <div style={{ display: (value == '1' ? "block" : "none") }}>
              {newOrder.length == 0 ?
                <Stack alignItems='center'>
                  <Typography variant='h5' color='red'>{Msg}</Typography>
                </Stack>
                :
                <Grid container spacing={2} sx={{ flexGrow: 1, backgroundColor: Colors.WhiteSmoke }}>
                  {newOrder.map((i, index) => (
                    <Grid key={index} item xs={12} md={3}>
                      <Card sx={{ maxWidth: '100%', margin: '15px', borderRadius: '15px', cursor: 'pointer' }}>
                        <CardHeader
                          avatar={
                            <Avatar sx={{ backgroundColor: 'red' }} >
                              {i.BNM[0]}
                            </Avatar>
                          }
                          title={<Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Stack>
                              <Stack direction='row' >
                                <LocationOnIcon />
                                <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.LM},</Typography>

                              </Stack>
                              <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black', marginLeft: '24px' }} > {i.AL}.</Typography>
                            </Stack>
                          </Stack>}
                          subheader={
                            <Stack>
                              <Stack direction='row' spacing={2}>
                                <TwoWheelerIcon />
                                <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.DDKM} Km</Typography>
                              </Stack>
                              <Typography variant='h7' sx={{ color: '#3899EC' }} > {i.ODFT} </Typography>
                              <Typography variant='h7' sx={{ color: '#3899EC' }} > orderId :{i.ID} </Typography>
                            </Stack>
                          }
                        />
                        <Divider sx={{ marginTop: '10px' }} />
                        <CardContent>
                          <Stack>

                            <label className='labeDish' style={{ fontWeight: 'bold', color: 'black' }}>Order From</label>

                            <Stack direction='row' spacing={4} alignItems='center' >
                              <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.BNM} </Typography>
                              <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.BAL} </Typography>

                            </Stack>



                            <Divider sx={{ marginTop: '5px' }} />
                            <Stack sx={{ height: '35px', marginTop: '18px' }} direction='row' alignItems='center' display='flex' justifyContent='space-between'>
                              <Stack>
                                <label className='labeDish' style={{ fontWeight: 'bold', color: 'black' }}>Delivery Location</label>
                                <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.LM},</Typography>
                                <label className='labeDish'>{i.DN},{i.ADD1}</label>
                              </Stack>
                              <Stack>
                              </Stack>
                            </Stack>
                            <Divider sx={{ marginTop: '18px' }} />
                            <Stack direction='row' justifyContent='center' width='100%' sx={{ marginTop: '10px' }} spacing={2}>
                              <button className='btnAccGreen' onClick={(e) => OnAcceptClick(e, i.ID)}>Accept</button>
                              <button className='btnOrderTrackRed' onClick={(e) => OnCancelClick(e, i.ID)}>Cancel</button>

                              {/* <Stack direction='row' alignItems='center' className='accBtn' onClick={(e) => OnAcceptClick(e, i.ID)}>
                                <label className="LogLbl" style={{ marginLeft: '13px' }}>Accept</label>
                              </Stack>
                              <Stack direction='row' alignItems='center' className='canBtn' onClick={(e) => OnCancelClick(e, i.ID)}>
                                <label className="LogLbl" style={{ marginLeft: '13px' }}>Cancel</label>
                              </Stack> */}
                            </Stack>
                            {
                              //     <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ marginTop: '10px' }} >
                              //       <label className='DeliveryLbl' style={{
                              //         color: '#2E3191'
                              //       }}>{i.PTN}</label>
                              //       {i.PT == 'PT001' && <button className='clrBtn' style={{ width: '50%', fontWeight: 'bold' }} onClick={(e) => OnPayCollect(e, i.ID)}>Collect Payment</button>}
                              //       {i.PAYSTS == 1 ? <label className='DeliveryLbl' style={{
                              //         color: 'green'
                              //       }}>Payment Success</label> : <></>}
                              //     </Stack>
                              //     <Divider sx={{ marginTop: '10px' }} />
                              //     <Stack direction='row' justifyContent='center' width='100%' sx={{ marginTop: '10px' }} spacing={2}>
                              //       <Stack direction='row' alignItems='center' className='accBtn' onClick={(e) => OnAcceptClick(e, i.ID)}>
                              //         <label className="LogLbl" style={{ marginLeft: '13px' }}>Accept</label>
                              //       </Stack>
                              //       <Stack direction='row' alignItems='center' className='canBtn' onClick={(e) => OnCancelClick(e, i.ID)}>
                              //         <label className="LogLbl" style={{ marginLeft: '13px' }}>Cancel</label>
                              //       </Stack>
                              //     </Stack>
                            }
                          </Stack>

                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>}
            </div>
            {/* End of new orders */}

            {/* starting of inprogress */}
            {/* {value=='2' &&  */}
            <div style={{ display: (value == '2' ? "block" : "none") }}>
              {newOrder.length == 0 ?
                <Stack alignItems='center'>
                  <Typography variant='h5' color='red'>{Msg}</Typography>
                </Stack>
                :
                <Grid container spacing={2} sx={{ flexGrow: 1, backgroundColor: Colors.WhiteSmoke }}>
                  {newOrder.map((i, index) => (
                    <Grid key={index} item xs={12} md={3}>
                      <Card sx={{ maxWidth: '100%', margin: '15px', borderRadius: '15px', cursor: 'pointer' }}>
                        <CardHeader
                          avatar={
                            <Avatar sx={{ backgroundColor: 'red' }} >
                              {i.BNM[0]}
                            </Avatar>
                          }
                          title={<Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Stack>
                              <Stack direction='row' >
                                <LocationOnIcon />
                                <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.LM},</Typography>

                              </Stack>
                              <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black', marginLeft: '24px' }} > {i.AL}.</Typography>
                            </Stack>
                          </Stack>}
                          subheader={
                            <Stack>
                              <Stack direction='row' spacing={2}>
                                <TwoWheelerIcon />
                                <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.DDKM} Km</Typography>

                              </Stack>
                              <Stack direction='row' spacing={2}>
                                <StoreIcon />                        <Stack direction='row' spacing={4} alignItems='center' >
                                  <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.BNM} </Typography>
                                  <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.BAL} </Typography>

                                </Stack>
                              </Stack>
                              <Typography variant='h7' sx={{ color: '#3899EC' }} > {i.ODFT} </Typography>
                              <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} >{i.PTR != "0" ? `Order Prepared in ${i.PTR} Min` : ''}</Typography>
                            </Stack>
                          }
                        />
                        <Divider sx={{ marginTop: '10px' }} />
                        <CardContent>
                          <Stack>

                            <Stack direction='row' spacing={4} alignItems='center' justifyContent='space-between'>
                              <Stack direction='row' spacing={2} alignItems='center'>
                                <label className='labeDish' style={{ fontWeight: 'bold', color: 'black' }}>Distance & Charges</label>
                                <Stack direction='row' spacing={2}>
                                  <label className='labeDish'>{i.DDKM}</label>
                                  <label className='labeDish'>x</label>
                                  <label className='labeDish'>{i.DC}</label>
                                </Stack>
                              </Stack>
                              <Stack direction='row-reverse'>
                                <label className='labeDish' style={{ borderBottom: '1px solid blue', color: 'blue' }}>₹{(Math.round((i.DF) * 100) / 100).toFixed(2)}</label>
                              </Stack>
                            </Stack>



                            <Divider sx={{ marginTop: '8px' }} />
                            <Stack sx={{ height: '35px', marginTop: '18px' }} direction='row' alignItems='center' display='flex' justifyContent='space-between'>
                              <Stack>
                                <label className='labeDish' style={{ fontWeight: 'bold', color: 'black' }}>Delivery Location</label>
                                <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.LM},</Typography>
                                <label className='labeDish'>{i.DN},{i.ADD1}</label>
                              </Stack>
                              <Stack>
                              </Stack>
                            </Stack>
                            <Divider sx={{ marginTop: '18px' }} />
                            {i.PT == 'PT002' &&
                                <label className='DeliveryLbl' style={{
                                  color:
                                    (i.OS == '-1' ? "red" :
                                      i.OS == '1' ? 'green' :
                                      i.OS == '0' ? 'red' : 'orange'),textAlign:'center'
                                }}> {i.OSN}</label>}
                      
                            <Stack direction="row" justifyContent="center" width="100%" sx={{ marginTop: '10px' }} spacing={2}>
                              {
                                i.DS === "11" && (<>
                                  <Stack direction='row' justifyContent='center' width='100%' sx={{ marginTop: '10px' }} spacing={2}>
                                    {i.OS == '2' || i.OS == '5' ?
                                      <button className='btnOrderTrackBlue' onClick={(e) => OnReadyTostartClick(e, i.ID)}>Ready to Start</button>
                                      :
                                      <button className='btnOrderTrackGray' >Ready to Start</button>
                                    }
                                    <button className='btnOrderTrackRed' onClick={(e) => OnCancelClick(e, i.ID)}>Cancel</button>
                                    {/* <Stack direction='row' alignItems='center' className='clrBtn' onClick={(e) => OnReadyTostartClick(e, i.ID)}>
                                      <label className="LogLbl" style={{ marginLeft: '11px' }}>Start</label>
                                    </Stack>
                                    <Stack direction='row' alignItems='center' style={{ marginLeft: '13px' }} className='canBtn' onClick={(e) => OnCancelClick(e, i.ID)}>
                                      <label className="LogLbl" style={{ marginLeft: '13px' }}>Cancel</label>
                                    </Stack> */}
                                  </Stack>

                                </>)
                              }
                              {i.DS === "16" && (<>
                                <Stack direction='row' justifyContent='center' width='100%' sx={{ marginTop: '10px' }} spacing={2}>
                                  <button className='btnOrderTrackBlue' onClick={(e) => OnReachedClick(e, i.ID)}>Reached</button>
                                  <button className='btnOrderTrackRed' onClick={(e) => OnCancelClick(e, i.ID)}>Cancel</button>

                                  {/* <Stack direction='row' alignItems='center' className='clrBtn' onClick={(e) => OnReachedClick(e, i.ID)}>
                                    <label className="LogLbl" style={{ marginLeft: '1px' }}>Reached</label>
                                  </Stack>
                                  <Stack direction='row' alignItems='center' style={{ marginLeft: '13px' }} className='canBtn' onClick={(e) => OnCancelClick(e, i.ID)}>
                                    <label className="LogLbl" style={{ marginLeft: '13px' }}>Cancel</label>
                                  </Stack> */}
                                </Stack>

                              </>)}

                              {i.DS === "15" && (<>
                                {i.OS == '6' ?
                                  <button className='btnOrderTrackBlue' onClick={(e) => OnPickedupClick(e, i.ID)}>PickedUp</button>
                                  :
                                  <button className='btnOrderTrackGray' >PickedUp</button>
                                }
                                <button className='btnOrderTrackBlue' onClick={(e) => OnTrackBtnClick(e, i.ID, i)}>Track</button>
                                <button className='btnOrderTrackRed' onClick={(e) => OnCancelClick(e, i.ID)}>Cancel</button>
                                {/* {i.OS == '6' ?
                                  <Stack direction="row" alignItems="center" className="clrBtn" onClick={(e) => OnPickedupClick(e, i.ID)}>
                                    <label className="LogLbl" >PickedUp</label>
                                  </Stack> : <Stack direction="row" alignItems="center" className="accBtn1" >
                                    <label className="LogLbl" style={{ marginLeft: '8px' }} >PickedUp</label>
                                  </Stack>} 
                                <Stack direction="row" alignItems="center" className="clrBtn"
                                  onClick={(e) => OnTrackBtnClick(e, i.ID, i)} >
                                  <label className="LogLbl" style={{ marginLeft: '10px' }}>Track</label>
                                </Stack>
                                <Stack direction='row' alignItems='center' className='clrBtn2' onClick={(e) => OnCancelClick(e, i.ID)}>
                                  <label className="LogLbl" style={{ marginLeft: '8px' }}>Cancel</label>
                                </Stack> */}

                              </>
                              )}
                              {i.DS === "12" && (
                                <>
                                  <button className='btnAccGreen' onClick={(e) => OnDeliverClick(e, i.ID)}>Delivered</button>
                                  <button className='btnOrderTrackBlue' onClick={(e) => OnTrackBtnClick(e, i.ID, i)}>Track</button>
                                </>
                              )}
                             
                            </Stack>






                            {
                              //     <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ marginTop: '10px' }} >
                              //       <label className='DeliveryLbl' style={{
                              //         color: '#2E3191'
                              //       }}>{i.PTN}</label>
                              //       {i.PT == 'PT001' && <button className='clrBtn' style={{ width: '50%', fontWeight: 'bold' }} onClick={(e) => OnPayCollect(e, i.ID)}>Collect Payment</button>}
                              //       {i.PAYSTS == 1 ? <label className='DeliveryLbl' style={{
                              //         color: 'green'
                              //       }}>Payment Success</label> : <></>}
                              //     </Stack>
                              //     <Divider sx={{ marginTop: '10px' }} />
                              //     <Stack direction='row' justifyContent='center' width='100%' sx={{ marginTop: '10px' }} spacing={2}>
                              //       <Stack direction='row' alignItems='center' className='accBtn' onClick={(e) => OnAcceptClick(e, i.ID)}>
                              //         <label className="LogLbl" style={{ marginLeft: '13px' }}>Accept</label>
                              //       </Stack>
                              //       <Stack direction='row' alignItems='center' className='canBtn' onClick={(e) => OnCancelClick(e, i.ID)}>
                              //         <label className="LogLbl" style={{ marginLeft: '13px' }}>Cancel</label>
                              //       </Stack>
                              //     </Stack>
                              //     <Stack direction="row" alignItems="center" className="clrBtn1" onClick={(e) => OnReachedClick(e, i.ID)}>
                              //     <label className="LogLbl" style={{ marginLeft: '8px' }}>Reached</label>
                              //   </Stack>
                              //   <Stack direction='row' alignItems='center' className='canBtn' onClick={(e) => OnCancelClick(e, i.ID)}>
                              //   <label className="LogLbl" style={{ marginLeft: '13px' }}>Cancel</label>
                              // </Stack>

                            }
                          </Stack>

                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>}
            </div>
            {/* end of inprogress */}

            {/* Starting of all orders */}
            {/* {value=='3' && */}

            <div  style={{ display: (value == '3' ? 'block' : 'none') }}>
              <InfinitScroll
                dataLength={newOrder.length}
                next={fetchData}
                //hasMore={true}
                hasMore={hasMoreItems}
                loadOnMount={true}
                scrollThreshold='1'
                
                loader={
                  <div style={styleInfLoader} >
                    <BarLoader height={8} color={Colors.BarCl}
                    />{hasMoreItems}</div>
                }
              >

                <div style={{ display: (value == '3' ? "block" : "none") }}>
                  {newOrder.length == 0 ?
                    <Stack alignItems='center'>
                      <Typography variant='h5' color='red'>{Msg}</Typography>
                    </Stack>
                    :
                    <Grid container spacing={2} sx={{ flexGrow: 1, backgroundColor: Colors.WhiteSmoke }}>
                      {newOrder.map((i, index) => (
                        <Grid key={index} item xs={12} md={3}>
                          <Card sx={{ maxWidth: '100%', margin: '15px', borderRadius: '15px', cursor: 'pointer' }}>
                            <CardHeader
                              avatar={
                                <Avatar sx={{ backgroundColor: 'red' }} >
                                  {i.BNM[0]}
                                </Avatar>
                              }
                              title={<Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Stack>
                                  <Stack direction='row' >
                                    <LocationOnIcon />
                                    <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.LM},</Typography>

                                  </Stack>
                                  <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black', marginLeft: '24px' }} > {i.AL}.</Typography>
                                </Stack>
                              </Stack>}
                              subheader={
                                <Stack>
                                  <Stack direction='row' spacing={2}>
                                    <TwoWheelerIcon />
                                    <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.DDKM} Km</Typography>

                                  </Stack>
                                  <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                    <Typography variant='h7' sx={{ color: '#3899EC' }} > {i.ODFT} </Typography>
                                  
                                    <Stack>
                                      <label className='labeDish'>Charges</label>
                                      <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'blue', marginLeft: '7px' }} > ₹{(Math.round((i.DF) * 100) / 100).toFixed(2)} </Typography>
                                    </Stack>
                                  </Stack>
                                  <Typography variant='h7' sx={{ color: '#3899EC' }} > orderId :{i.ID} </Typography>
                                </Stack>
                              }
                            />
                            <Divider sx={{ marginTop: '1px' }} />
                            <CardContent>
                              <Stack>

                                <label className='labeDish' style={{ fontWeight: 'bold', color: 'black' }}>Order From</label>

                                <Stack direction='row' spacing={4} alignItems='center' >
                                  <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.BNM} </Typography>
                                  <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.BAL} </Typography>

                                </Stack>



                                <Divider sx={{ marginTop: '8px' }} />
                                <Stack sx={{ height: '35px', marginTop: '18px' }} direction='row' alignItems='center' display='flex' justifyContent='space-between'>
                                  <Stack>
                                    <label className='labeDish' style={{ fontWeight: 'bold', color: 'black' }}>Delivery Location</label>
                                    <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'black' }} > {i.LM},</Typography> 
                                    <label className='labeDish'>{i.DN},{i.ADD1}</label>
                                  </Stack>
                                  <Stack>
                                  </Stack>
                                </Stack>
                                <Divider sx={{ marginTop: '18px' }} />
                                {i.PT == 'PT002' &&
                                <label className='DeliveryLbl' style={{
                                  color:
                                    (i.OS == '-1' ? "red" :
                                      i.OS == '1' ? 'green' :
                                      i.OS == '0' ? 'red' : 'orange'),textAlign:'center'
                                }}>{i.OSN}</label>}
                                <Stack direction='row' justifyContent='flex-end' width='100%' sx={{ marginTop: '10px' }} spacing={2}>
                                  {i.DSNM == 'New' ?
                                    <label style={{ fontWeight: 'bold', color: '#3899EC' }}>NEW</label> :
                                    i.DSNM == 'Accepted' ?
                                      <label style={{ fontWeight: 'bold', color: '#3899EC' }} >ACCEPTED</label> :
                                      i.DSNM == 'Rejected' ?
                                        <label style={{ fontWeight: 'bold', color: 'red' }}  >CANCELED</label> :
                                        i.DSNM == 'Reached' ?
                                          <label style={{ fontWeight: 'bold', color: 'black' }}>Reached</label> :
                                          i.DSNM == 'Delivered' ?
                                            <label style={{ fontWeight: 'bold', color: 'green' }} >DELIVERED</label> : <></>}
                                </Stack>
                                {
                                  //     <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ marginTop: '10px' }} >
                                  //       <label className='DeliveryLbl' style={{
                                  //         color: '#2E3191'
                                  //       }}>{i.PTN}</label>
                                  //       {i.PT == 'PT001' && <button className='clrBtn' style={{ width: '50%', fontWeight: 'bold' }} onClick={(e) => OnPayCollect(e, i.ID)}>Collect Payment</button>}
                                  //       {i.PAYSTS == 1 ? <label className='DeliveryLbl' style={{
                                  //         color: 'green'
                                  //       }}>Payment Success</label> : <></>}
                                  //     </Stack>
                                  //     <Divider sx={{ marginTop: '10px' }} />
                                  //     <Stack direction='row' justifyContent='center' width='100%' sx={{ marginTop: '10px' }} spacing={2}>
                                  //       <Stack direction='row' alignItems='center' className='accBtn' onClick={(e) => OnAcceptClick(e, i.ID)}>
                                  //         <label className="LogLbl" style={{ marginLeft: '13px' }}>Accept</label>
                                  //       </Stack>
                                  //       <Stack direction='row' alignItems='center' className='canBtn' onClick={(e) => OnCancelClick(e, i.ID)}>
                                  //         <label className="LogLbl" style={{ marginLeft: '13px' }}>Cancel</label>
                                  //       </Stack>
                                  //     </Stack>
                                }
                              </Stack>

                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>}
                </div>

              </InfinitScroll>
            </div>
            {/* end of inprogress */}

          </Stack>
        </Stack>

        <Dialog display='flexGrow' open={open1} onClose={handleClose1}>
          <DialogTitle>
            <DiaHeader justifyContent='space-between' alignItems='center' component='span'>Preparing Time
              <Closeicon onClick={handleClose1} />
            </DiaHeader>
            <Divider color={Colors.primary} height='10px' />
          </DialogTitle>
          <DialogContent>
            <StyledDiaBx>
              <Stack spacing={10} alignItems='center' sx={{ height: '50px', width: "200px" }}>
                <Stack direction='row' alignItems='center' spacing={2}>
                  <RemoveCircleOutlineIcon color='primary' sx={{ fontSize: '40px', cursor: 'pointer' }} onClick={OnMinusClick} />
                  {mins} mins
                  <AddCircleOutlineIcon color='primary' sx={{ fontSize: '40px', cursor: 'pointer' }} onClick={OnPlusClick} />
                </Stack>
              </Stack>
            </StyledDiaBx>
          </DialogContent>
          <DialogActions>
            <DiaBtn2 variant='outlined' onClick={handleClose1}>
              Cancel
            </DiaBtn2>
            <DiaBtn1 variant='contained' onClick={SaveBtnClicked} >
              Save
            </DiaBtn1>
          </DialogActions>
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
                  <DirectComponent
                    sellerName={sellerName}
                    sellerLocation={sellerLocation}
                    customerLocation={customerLocation}
                  ></DirectComponent>
                </Stack>
              </Stack>
            </StyledDiaBx>
          </DialogContent>

        </Dialog>

      </>
    </>
  )
}

export default DriverOrders