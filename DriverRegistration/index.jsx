import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import { connect, useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import ReactDOM from 'react-dom';
import HeaderForm from "../saucerView/components/header/index";
import theme, { Colors } from '../../styles/theme';
import { postAPI } from '../../services/apicall';
import { getCookie } from '../../common/cks';
import CropIcon from '@mui/icons-material/Crop';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Loading from "../../loadingScr"
import ListItemText from '@mui/material/ListItemText';
import SWAlert from "sweetalert2";
import logger from '../../common/logger';
import configData from "../../config.json";

import { SADMIN_KEY, SADMIN_KEYNM, FromHomeOrSetup } from "../../stateManagement/action";
// import './seller.css'

import {
    Box, Dialog, DialogContent, DialogActions, CardActions, Radio, Button, Paper, Grid, Card,
    CardContent,
    Typography,
    CardHeader, Divider, Select, InputLabel, MenuItem,
    TableRow, TableCell, TableContainer, Table, TableHead, TableBody, FormGroup
    , FormControlLabel, Switch, Checkbox, TextField, Stack, IconButton
} from '@mui/material';
import dayjs from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import {
    LblStateNm, StyledAvatar,
    StyledGrid, Label, StyledBox,
    StyledMore, StyledCard, StyledTypro,
    AddBox, AddBtn, StyledEdit, MenuLbl, StyledDelete,
    DiaBtn1, DiaBtn2, DiaHeader,
    StyledTextBox, StyledDiaBx, Closeicon, StyledForm
} from '../../styles/common';

import MapLoc from "../../pages/SAdmin/SellerDetails/MapLoc"
import { ElectricScooterSharp } from '@mui/icons-material';
// import Driverforms from './DriverForms';

//import { GoogleMap, LoadScript,Marker  } from '@react-google-maps/api';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,autoFocus: false,
        },
    },
};

const defaultCenter = {
    lat: 41.3851, lng: 2.1734
}

//create our styles
const classes = {
    paper: {
        padding: 20,
        textAlign: "center",
        color: "blue",
        fontFamily: "Roboto"
    }
};




function DriverDetails(props) {
    let date = new Date()
    var dat = date.getDate()
    var mon = date.getMonth() + 1;
    var yr = date.getFullYear()
    var CurrDate = new Date()
    const maxConfigProdImgs = 1;
    const maxConfigDrLicImgs =  configData.MaxDrLicImages;

    const nav = useNavigate();
    const dispatch = useDispatch();
    const count = 10;
    const [refresh, setRef] = useState(0)
    const [minDa, setMinDa] = useState('2000-01-01')
    const [maxDa, setMaxDa] = useState('2050-01-01')
    const [value1, setValue1] = useState(date);
    const [value2, setValue2] = useState(date);
    const [tno, setTno] = useState('');
    const [fDate, setfDate] = useState(`${yr}-${mon}-${dat}`)
    const [tDate, settDate] = useState(`${yr}-${mon}-${dat}`)
    let v_SADMINKEYID = useSelector((state) => state.SADMINKEY)
    const [personName, setPersonName] = React.useState([]);
    const [getCitys, setgetCitys] = useState([]);
    const [getCityids, setgetCityids] = useState([]);
    let v_RTreeID = useSelector((state) => state.RightTreeID)
    var UserID = getCookie("roleId");
    let user = getCookie("userID");
    const [srCity, setSrCity] = useState('');
    const [srState, setSrState] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFormInvalid, setIsFormInvalid] = useState(false);

    const [CRUDTYPE, setCRUDTYPE] = useState("C");
    const [BizID, setBizID] = useState("");
    const [CYCval, setCYCval] = useState([]);
    const [SDisNaM, setSDisNaM] = useState("");
    const [valErrSDisNaM, setValErrSDisNaM] = useState(false);

    const [DLnum, setDLnum] = useState("");
    const [valErrDLnum, setValErrDLnum] = useState(false);

    const [phNumber, setPhNumber] = useState("");
    const [valErrphNumber, setvalErrPhNumber] = useState(false);
    const [SABuildingDtls, setSABuildingDtls] = useState("");
    const [valErrSAAddress, setValErrSAAddress] = useState("");
    const [SAAddress, setSAAddress] = useState("");
    const [SAStreet, setSAStreet] = useState("");
    const [SAZIP, setSAZIP] = useState("");

    const [valErrSABuildingDtls, setValErrSABuildingDtls] = useState("");
    const [valErrSAStreet, setValErrSAStreet] = useState(false);
    const [valErrSAZIP, setValErrSAZIP] = useState(false);

    const [SAArea, setSAArea] = useState("");
    const [valErrSAArea, setValErrSAArea] = useState("");

    const [category, setCategory] = useState('');
    const [valErrSCatg, setValErrSCatg] = useState("");
    const [ddlCategory, setDdlCategory] = useState(false);
    const [getCategory, setgetCategory] = useState([]);

    const [srAreaL2, setSrAreaL2] = useState('');
    const [srAreaL1, setSrAreaL1] = useState('');

    const [country, setCountry] = useState('');
    const [srCountry, setSrCountry] = useState('');
    const [valErrCountry, setValErrCountry] = useState(false);
    const [ddlCntry, setDdlCntry] = useState(false);
    const [getCountry, setgetCountry] = useState([]);

    const [getState, setgetState] = useState([]);
    const [valErrState, setValErrState] = useState(false);
    const [stateEn, setStateEn] = useState(true);
    const [stateID, setStateID] = useState('');
    const [kmrate, setKmrate] = useState('');
    const [modalName, setModalName] = useState('');
    const [rcnumber, setRcnumber] = useState('');
    const [ddlState, setDdlState] = useState(false);
    const [valErrkmrate, setValErrKmrate] = useState(false);
    const [valErrmodalName, setValErrModalName] = useState(false);
    const [valErrrcnumber, setValErrRcnumber] = useState(false);
    const [getCity, setgetCity] = useState([]);
    const [cityEn, setCityEn] = useState(true);
    const [cityID, setCityID] = useState('');
    const [valErrCity, setValErrCity] = useState(false);
    const [ddlCity, setDdlCity] = useState(false);

    const [arealatitude, setArealatitude] = useState("");
    const [arealongitude, setArealongitude] = useState("");
    const hiddenFileInput = useRef(null);
    const hiddenFileInputDrLic = useRef(null);


    const [SDesc, setSDesc] = useState("");
    const st = dayjs('2020-01-01 24:00');
    const et = dayjs('2020-01-01 12:00');
    const [arrWeeks, setArrWeeks] = useState([{ id: "1", name: "Monday", start: st, end: et },
    { id: "1", isdcheck: false, name: "Tuesday", start: st, end: et },
    { id: "1", isdcheck: false, name: "Wednesday", start: st, end: et },
    { id: "1", isdcheck: false, name: "Thursday", start: st, end: et },
    { id: "1", isdcheck: false, name: "Friday", start: st, end: et },
    { id: "1", isdcheck: false, name: "Saturday", start: st, end: et },
    { id: "1", isdcheck: false, name: "Sunday", start: st, end: et }]);
    const [workhourschecked, setWorkhoursChecked] = React.useState(true);
    const [valueOpen, setValueOpen] = React.useState(dayjs('2020-01-01 24:00'));
    const [valueClose, setValueClose] = React.useState(dayjs('2020-01-01 12:00'));

    const [valueOpenGrid, setValueOpenGrid] = React.useState(dayjs('2020-01-01 24:00'));
    const [valueCloseGrid, setValueCloseGrid] = React.useState(dayjs('2020-01-01 12:00'));

    const [openImgModal, setOpenImgModal] = React.useState(false);
    const [readerrsltimg, setReaderrsltimg] = React.useState(null);
    const [sized, setSized] = useState()
    const [cropUpdateID, setCropUpdateID] = React.useState('');
    const [cropper, setCropper] = useState("");
    const [cropperdata, setCropperdata] = React.useState([]);
    const [opens, setOpens] = useState(false);

    const [openImgModalDrLic, setOpenImgModalDrLic] = React.useState(false);
    const [readerrsltimgDrLic, setReaderrsltimgDrLic] = React.useState(null);
    const [sizedDrLic, setSizedDrLic] = useState()
    const [cropUpdateIDDrLic, setCropUpdateIDDrLic] = React.useState('');
    const [cropperDrLic, setCropperDrLic] = useState("");
    const [cropperdataDrLic, setCropperdataDrLic] = React.useState([]);
    const [opensDrLic, setOpensDrLic] = useState(false);
    const [imageDrLic, setImageDrLic] = React.useState(
        "https://images.unsplash.com/photo-1612232134966-a9b076b9fbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    );

    const [vhileType, setVhileType] = React.useState('');
const [search,setSearch]=useState("");
const [inputValue, setInputValue] = useState("");


    const handleChangevhile = (event) => {
        setVhileType(event.target.value);
    };
    var HideShowMap = localStorage.getItem("hideShowMap");
    console.log(HideShowMap, 'HideShowMap')

    let arCR_DATADrLic = [];
    let imageViewDrLic = [];

    let arCR_DATA = [];
    let imageView = [];
    let productPortionsTags = [];
    let productOptionsTags = [];
    const [image, setImage] = React.useState(
        "https://images.unsplash.com/photo-1612232134966-a9b076b9fbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    );


    useEffect(() => {
        
        conFig();
        
        GetCountry();
        GetCategory();
        GetSelllerDetails()


    }, [refresh]);

    async function conFig() {
        try {
            const req = {
                "Req": {
                    "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
                    "Type": "GMDD",
                    "CRUD": "CFG",
                    "ID": '',// --menu id
                    "NM": "",//--menu name
                    "SNM": "",// --menu section name
                    "RS": "",
                    "RC": "",
                    "UID": ''
                }
            }
            const rows = await postAPI(req);
            const row = JSON.parse(rows);
            
            if (row.Resp.Sts == "1") {
                var res = JSON.parse(row.Resp.Result)
                var size = res[1].CV
                setSized(size)
            }
        } catch (err) {

        }
    }

    async function GetCategory() {
        
        try {
            setLoading(true);
            let CntryReq = {
                "Req": {
                    "Type": "CBTY",
                    "CRUD": "R",
                    "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
                    "DevID": "",
                    "BTID": "",
                    "BTN": "",
                    "ST": "",
                    "CBY": ""
                }
            };

            const resp = await postAPI(CntryReq);
            let response = JSON.parse(resp)
            setLoading(false);
            if (response.Resp.Sts == 1) {
                setgetCategory(JSON.parse(response.Resp.Result))
                // response.Resp.Result
            }
            //console.log(resp)
        }
        catch (err) {
            setLoading(false);
            console.error(`GET error: ${err}`);
        }
    }

    async function GetCountry() {
        try {
            // setLoading(true);
            let CntryReq = {
                "Req": {
                    "Type": "GMCC",
                    "CRUD": "",
                    "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
                    "ID": "",
                    "NM": "",
                    "SNM": "",
                    "ST": "",
                    "RS": "",
                    "RC": ""
                }
            };

            const resp = await postAPI(CntryReq);
            let response = JSON.parse(resp)
            setLoading(false);
            if (response.Resp.Sts == 1) {
                setgetCountry(JSON.parse(response.Resp.Result))
                let arrCountry = JSON.parse(response.Resp.Result);
                if (arrCountry.length > 0) {
                    dispatch(SADMIN_KEY(arrCountry[0].SKID));
                    dispatch(SADMIN_KEYNM(arrCountry[0].SKNM));
                    v_SADMINKEYID = arrCountry[0].SKID;

                    //get seller Details
                    //    GetSelllerDetails(v_SADMINKEYID);
                }
                // response.Resp.Result
            }
            else {

            }
            //console.log(resp)
        }
        catch (err) {
            setLoading(false);
            console.error(`GET error: ${err}`);
        }
    }
    useEffect(() => {
        

        GetCityId();
        // GetAreas(srCity)
    }, [props]);
    async function GetCityId() {
       
        try {
            const req = {
                Req: {
                    Rsk: "UnEuNhoKLZ7IDecLjKILZg==",
                    DevID: "",
                    Type: "CCEI",
                    CRUD: "R",
                    RKID: "", // v_SADMINKEYID,//v_RTreeID, //root key id-like biz id
                    AL: "",//--area location
                    LATT: "",//--latitude
                    LONG: "",//--longitude
                    CBY: "",//getCookie('roleId'), //created by
                    UID:"",// getCookie('roleId')
                },

            }

            const rows = await postAPI(req, true);
            const row = JSON.parse(rows);
            
            if (row.Resp.Sts == "1") {
                var res = JSON.parse(row.Resp.Result)

              


                console.log(res)
            } else {
                // setgetCityids([])
            }
        } catch (err) {
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            logger.errorLog(err.message ?? err, '', '//sales//Index.jsx', 'iconBut_tAlign-onClick');
        }
    }
    async function GetAreas(srCity) {
        
        try {
            const req = {
                Req: {
                    Rsk: "UnEuNhoKLZ7IDecLjKILZg==",
                    DevID: "",
                    Type: "GLC",
                    CRUD: "S",
                    CID: "",
                    CName:srCity,
                    CBY: getCookie('roleId'), //created by
                    UID: getCookie('roleId')
                },

            }

            const rows = await postAPI(req, true);
            const row = JSON.parse(rows);
           
            if (row.Resp.Sts == "1") {
                var res = JSON.parse(row.Resp.Result)
                var areaname = res.map((name) => (
                    name.CYC
                ))

                setCYCval(areaname)
                if (areaname[0]==true){
                    setPersonName([])
                }
                setgetCitys(res)
              
               
            } else {
                setgetCitys([])
            }
        } catch (err) {
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            logger.errorLog(err.message ?? err, '', '//sales//Index.jsx', 'iconBut_tAlign-onClick');
        }
    }
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };



    async function GetState(countryID) {
        try {
            //setLoading(true);
            //
            const req = {
                Req: {
                    Rsk: "UnEuNhoKLZ7IDecLjKILZg==",
                    Type: "GSTE",
                    CRUD: "",
                    ID: "",
                    CID: countryID,
                    NM: "",
                    SNM: "",
                    ST: ""
                }
            };
            const resp = await postAPI(req);
            setLoading(false);
            let response = JSON.parse(resp)
            if (response.Resp.Sts == 1) {
                setgetState(JSON.parse(response.Resp.Result))
                // response.Resp.Result
            } else {
                setgetState([]);
            }
            //console.log(resp)
        }
        catch (err) {
            setLoading(false);
            console.error(`GET error: ${err}`);
        }
    }

    const OnCategorySelect = (event) => {
        //
        setCategory(event.target.value);
        setDdlCategory(false)
    }

    const OnCountrySelect = (event) => {
        //
        setCountry(event.target.value);
        GetState(event.target.value);
        setStateEn(false);
        setStateID('');
        setDdlCntry(false)
        setValErrCountry(false)
    }




    const OnStateSelect = (e) => {

        setStateID(e.target.value)
        setDdlState(false)
        setValErrState(false)
        GetCity(e.target.value);
        setCityEn(false);
        setCityID('');
        setDdlCity(false)

    }


    async function GetCity(stateid) {
        try {
            // setLoading(true);
            const req = {
                Req: {
                    "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
                    "CRUD": "",
                    "Type": "GMCY",
                    "ID": "",
                    "CID": country,
                    "SID": stateid,
                    "NM": "",
                    "ST": "",
                    "SRT": "",
                    "RS": "",
                    "RC": "",
                }
            };
            const resp = await postAPI(req);
            let response = JSON.parse(resp)
            setLoading(false);
            if (response.Resp.Sts == 1) {
                setgetCity(JSON.parse(response.Resp.Result))
                // response.Resp.Result
            } else {
                setgetCity([]);
            }
            //console.log(resp)
        }
        catch (err) {
            setLoading(false);
            console.error(`GET error: ${err}`);
        }
    }

    const OnCitySelect = (e) => {
        setCityID(e.target.value)
        setDdlCity(false)
        setValErrCity(false)



    }
const Changesearch =(e)=>{
    setSearch(e.target.value)
}

    const validate = (e, from) => {


        try {
            if (from == "SDisNaM") {
                setSDisNaM(e.target.value);
                setValErrSDisNaM(false)
            }
            if (from == "DLnum") {
                setDLnum(e.target.value);
                setValErrDLnum(false)
            }
            if (from == "SDesc") {
                setSDesc(e.target.value);
            }
            if (from == "phNumber") {
                setPhNumber(e.target.value);
                setvalErrPhNumber(false)
            }

            // if (from == "category") {
            //     setCategory(e.target.value);
            //     setDdlCategory(false)
            //     setValErrSCatg(false)setSAAddress
            // }
            if (from == "SAAddress") {
                setSAAddress(e.target.value);
                setValErrSAAddress(false)
            }
            if (from == "kmrate") {
                if (e.target.value === "0") {
                    setValErrKmrate(true);
                } else {
                    setKmrate(e.target.value);
                    setValErrKmrate(false)

                }

            }
            if (from == "rcnumber") {
                setRcnumber(e.target.value);
                setValErrRcnumber(false)
            }
            if (from == "modalName") {
                setModalName(e.target.value);
                setValErrModalName(false)
            }
            if (from == "SABuildingDtls") {
                setSABuildingDtls(e.target.value);
                setValErrSABuildingDtls(false)
            }

            if (from == "SAArea") {
                setSAArea(e.target.value);
                setValErrSAArea(false)
            }
            if (from == "SAZIP") {
                setSAZIP(e.target.value);

                setValErrSAZIP(false)

            }

        } catch (error) {
            console.error(`product validate error: ${error}`);
        }

    };

    function handleSaveClick(event) {
        debugger
        // handleAE_SaveClick(event.target.name); // pass any argument to the callback
        try {
            

            setValErrSDisNaM(false);
            setValErrDLnum(false)
            setvalErrPhNumber(false)
            //  setRef(refresh +1)
            if (SDisNaM == "" || phNumber == "" || DLnum == "" || SAAddress == "" || SABuildingDtls == "" || SAArea == "" || rcnumber == "" || modalName == "" || kmrate == ""
            ) {
                if (SDisNaM == '')
                    setValErrSDisNaM(true); else setValErrSDisNaM(false);
                if (DLnum == '')
                    setValErrDLnum(true); else setValErrDLnum(false);
                if (phNumber == '')
                    setvalErrPhNumber(true); else setvalErrPhNumber(false);
                if (rcnumber == '')
                    setValErrRcnumber(true); else setValErrRcnumber(false);
                if (modalName == '')
                    setValErrModalName(true); else setValErrModalName(false);
                if (kmrate == '')
                    setValErrKmrate(true); else setValErrKmrate(false);
                if (SABuildingDtls == '')
                    setValErrSABuildingDtls(true); else setValErrSABuildingDtls(false);
                if (SAAddress == '')
                    setValErrSAAddress(true); else setValErrSAAddress(false);


                if (SAArea == '')
                    setValErrSAArea(true); else setValErrSAArea(false);





            }
            else {
                if (SDisNaM != "" && DLnum != "" && SAAddress != "" && SABuildingDtls != "" && SAArea != "" && kmrate != "" && rcnumber != "" && modalName != ""
                ) {
                    setIsFormInvalid(false);
                    //

                    if (BizID != "") {
                        // setLoading(true);
                        UpdateProduct("U");
                    } else {
                        //setLoading(true);
                        UpdateProduct("C");
                    }

                } else {
                    setIsFormInvalid(true);
                }
            }

        } catch (error) {
            setLoading(false);
        }

    }
    function getTimeStr(dates) {
        var ampm = (dates.getTimehours >= 12) ? "PM" : "AM";
        var hours = dates.getHours() > 12 ? dates.getHours() - 12 : dates.getHours();
        var am_pm = dates.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = dates.getMinutes() < 10 ? "0" + dates.getMinutes() : dates.getMinutes();
        var seconds = dates.getSeconds() < 10 ? "0" + dates.getSeconds() : dates.getSeconds();
        return hours + ":" + minutes + ":" + seconds + " " + am_pm;
    }
    async function GetSelllerDetails(v_r) {
        //debugger
        try {
            setLoading(true);
            var payload = "";
            payload = {
                "Req": {
                    "Type": "MDAD",
                    "CRUD": "R",
                    "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
                    "DevID": "",
                    "UID": getCookie('roleId'),//--root key id
                    "BizID": "",
                    "DN": "",//--disp name
                    "IC": "",//--prof pic
                    "URL": "",//--URL
                    "LN": "",//--lic no
                    "LNE": "",//--lic no exp date
                    "MN": "",//--mob no
                    "PAN": "",//--pan       
                    "ADD1": "",
                    "ADD2": "",
                    "ADD2": "",
                    "ZIP": "",
                    "CC": "",//--countrycode
                    "STID": "",//--state id
                    "CYID": "",//--city id
                    "AL": "",//--area location
                    "LATT": "",//--latitude
                    "LONG": "",//--longitudeSDesc
                    "CBY": getCookie('roleId'),
                    // "ML": [{ "ID": "", "URL": "", "MT": "", "SZ": "" }, { "ID": "", "URL": "", "MT": "", "SZ": "" }],//--media list
                    "ALL": "",//--area location array   
                    // "WHS":[{"DN":"","OH":"","CH":"","IH":""}]
                }
            };
            //debugger
            var req = JSON.stringify(payload);

            var rows = await postAPI(payload, false); // Open for all
            setLoading(false);
            
            let jsonObject = JSON.parse(rows);
            localStorage.setItem("hideShowMap", '0');
            if (jsonObject.Resp.Sts == "1") {
                let arrData = JSON.parse(jsonObject.Resp.Result);
                console.log(arrData, '1');
                if (arrData.length > 0) {

                    setCRUDTYPE("U");
                    localStorage.setItem("hideShowMap", '1');
                    // let dbEH = arrData[0].WHS;
                    // let newarrWeeks = [...arrWeeks];

                    // let sOHour =dbEH[i]["OH"];
                    // let allday_soh= dayjs('2020-01-01 '+sOHour);
                    // setValueOpen(allday_soh);
                    // let isDiff = false;


                    // let sOHour0;
                    // let sCHour0;
                    // for (var i = 0; i < dbEH.length; i++) {

                    //     let sHoliday0 = dbEH[0]["IH"];
                    //     sOHour0 = dbEH[i]["OH"];
                    //     sCHour0 = dbEH[i]["CH"];

                    //     let sHoliday = dbEH[i]["IH"];
                    //     let sDName = dbEH[i]["DN"];
                    //     let sOHour = dbEH[i]["OH"];
                    //     let sCHour = dbEH[i]["CH"];

                    //     if (sHoliday != sHoliday0) {

                    //         isDiff = true;
                    //     }


                    //     const filteredOpen = dbEH.filter((user) => user.OH === sOHour0);
                    //     if (filteredOpen.length != 7) {
                    //         isDiff = true;
                    //     }

                    //     const filteredClose = dbEH.filter((user) => user.CH === sCHour0);
                    //     if (filteredClose.length != 7) {

                    //         isDiff = true;
                    //     }




                    // }

                    // if (!isDiff) {

                    //     setWorkhoursChecked(true);

                    //     if (sOHour0 != undefined) {
                    //         let allday_soh = dayjs('2020-01-01 ' + sOHour0);
                    //         setValueOpen(allday_soh);

                    //         let allday_sch = dayjs('2020-01-01 ' + sCHour0);
                    //         setValueClose(allday_sch);
                    //     }

                    // }
                    // else {
                    //     setWorkhoursChecked(false);
                    // }

                    // for (var i = 0; i < dbEH.length; i++) {

                    //     let sHoliday = dbEH[i]["IH"];
                    //     let sDName = dbEH[i]["DN"];
                    //     let sOHour = dbEH[i]["OH"];
                    //     let sCHour = dbEH[i]["CH"];
                    //     let soh = dayjs('2020-01-01 ' + sOHour);
                    //     let sch = dayjs('2020-01-01 ' + sCHour);

                    //     const filteredArray = newarrWeeks.filter((user) => user.name === sDName);

                    //     if (filteredArray.length > 0) {
                    //         filteredArray[0].start = soh;
                    //         filteredArray[0].end = sch;
                    //         if (sHoliday == "1")
                    //             filteredArray[0].isdcheck = false;
                    //         else
                    //             filteredArray[0].isdcheck = true;
                    //     }


                    // }
                    // setValueOpenGrid(arrWeeks);

                    //newarrWeeks[i]["start"] = e
                    //setValueOpenGrid(newarrWeeks);

                    // if (from == "START") {
                    //     newarrWeeks[i]["start"] = e
                    //     setValueOpenGrid(newarrWeeks);
                    // }
                    // else {
                    //     newarrWeeks[i]["end"] = e
                    //     setValueOpenGrid(newarrWeeks);
                    // }

                    setRcnumber(arrData[0].VRC)
                    setModalName(arrData[0].VM)
                    setKmrate(arrData[0].DC)
                    setVhileType(arrData[0].VT)
                    setBizID(arrData[0].UID); // Changed from RKID to CBY Since RKID is empty when update it goes Create.
                    setSDisNaM(arrData[0].DN);
                    setSDesc(arrData[0].BD);
                    setDLnum(arrData[0].LN)
                    setPhNumber(arrData[0].MN)
                    // setPersonName(arrData[0].ALL)
                    const dateString = arrData[0].LNE;
                    const date = new Date(dateString);
                    const dat = date.getDate();
                    const mon = date.getMonth() + 1;
                    const yr = date.getFullYear();
                    setValue2(date);

                    setMaxDa(`${yr}-${mon}-${dat}`)
                    settDate(`${yr}-${mon}-${dat}`);
                    // setCategory(arrData[0].BT);
                    // setDdlCategory(false)
                    const AL_values = arrData[0].ALL.map(item => item.DAL);
                    console.log(AL_values);
                    setPersonName(AL_values)
                    // for(let i = 0, l =arrData[0].ALL.length; i < l; i++) {
                    //     var namesArea=[]
                    //     var obj = arrData[0].ALL[i].DAL;
                    //     //  setPersonName(obj)
                    //     var obj1=namesArea.push(obj)

                    //     // console.log( setPersonName(obj))

                    // }
                    // Object.keys(arrData[0].ALL).forEach(function(prop) {
                    //     // `prop` is the property name
                    //     // `data[prop]` is the property value
                    //     console.log(arrData[0].ALL[prop].DAL);
                    //   })
                    setSAAddress(arrData[0].ADD1)
                    setSABuildingDtls(arrData[0].ADD3);
                    setSAStreet(arrData[0].ADD2);
                    setSAZIP(arrData[0].ZIP);
                    setSAArea(arrData[0].AL)

                    setArealatitude(arrData[0].LATT);
                    setArealongitude(arrData[0].LONG);
                    setSrCountry(arrData[0].CC);
                    GetState(arrData[0].CC);
                    setStateEn(false);
                    setStateID('');
                    setDdlCntry(false)



                    setStateID(arrData[0].STID)
                    setDdlState(false)
                    GetCity(arrData[0].STID);
                    setCityEn(false);
                    setCityID('');
                    setDdlCity(false)


                    setCityID(arrData[0].CYID)
                    setDdlCity(false)
                    var strFormattedAddress = localStorage.getItem('drFormattedAddress') || '';
                    var strbuildingNo = localStorage.getItem('drbuildingNo') || '';
                    var strStreet = localStorage.getItem('drStreet') || '';
                    var strAreaL2 = localStorage.getItem('drAreaL2') || '';
                    var strAreaL1 = localStorage.getItem('drAreaL1') || '';
                    var strCity = localStorage.getItem('drCity') || '';
                    var strState = localStorage.getItem('drState') || '';
                    var strCountry = localStorage.getItem('drCountry') || '';
                    var strZip = localStorage.getItem('srZip') || '';

                    var srlat = localStorage.getItem("drlat") || "";
                    var srlng = localStorage.getItem("drlng") || "";
                    var srarea = localStorage.getItem("drarea1") || "";
                    localStorage.setItem('drFormattedAddresss', arrData[0].ADD1);
                    localStorage.setItem('drcity', arrData[0].CYNM);
                    localStorage.setItem('issaddress', '1');
                    localStorage.setItem('drFormattedAddress', arrData[0].ADD1);
                    localStorage.setItem('drbuildingNo', arrData[0].ADD3);
                    localStorage.setItem('drStreet', arrData[0].ADD2);
                    localStorage.setItem('drAreaL2', "");
                    localStorage.setItem('drAreaL1', "");
                    localStorage.setItem('drCity', "");
                    localStorage.setItem('drState', "");
                    localStorage.setItem('drCountry', "");
                    localStorage.setItem('srZip', "");

                    // localStorage.setItem("srlat", "");
                    // localStorage.setItem("srlng", "");
                    localStorage.setItem("drarea", arrData[0].AL);

                    setSAAddress(strFormattedAddress);
                    // setSABuildingDtls(strbuildingNo);
                    setSAStreet(strStreet);
                    setSrAreaL2(strAreaL2);
                    setSrAreaL1(strAreaL1);
                    // GetCity(strCity);
                    // GetState(strState);
                    setSrCity(strCity);
                    setSrState(strState);
                    // setCountry(strCountry);
                    setSAZIP(strZip);
                    setSrCountry(strCountry);
                    setArealatitude(srlat);
                    setArealongitude(srlng);
                    setSAArea(srarea);

                
                    // localStorage.setItem("srlat", "");
                    // localStorage.setItem("srlng", "");
                    // localStorage.setItem("srarea", "");
                    GetAreas(arrData[0].CYNM)

                    localStorage.setItem("srarea1",  arrData[0].AL);
                    //
                    localStorage.setItem("srlat1", arrData[0].LATT);
                    localStorage.setItem("srlng1", arrData[0].LONG);
                    setTimeout(() => {
                        document.querySelector('.clssetlatlong').click();
                    }, 2000)

                    
                    let l_mainImg = arrData[0].IC;
                    if (l_mainImg != '') {

                        var items1 = { x: arCR_DATA.length, y: l_mainImg, z: '1' };
                        arCR_DATA.push(items1);
                        setCropperdata(arCR_DATA);


                    }

                    
                    let l_Imgs = arrData[0].ML;
                    {
                        if (l_Imgs.length > 0) {
                            let iind = 0;
                            for (var i = 0; i < l_Imgs.length; i++) {
                                var datdl = l_Imgs[i].URL;
                                var items1 = { x: arCR_DATADrLic.length, y: datdl, z: '1' };
                                arCR_DATADrLic.push(items1);
                                setCropperdataDrLic(arCR_DATADrLic);
                                iind++;
                            }
                        }
                    }


                }
            }
        }
        catch (error) {
            setLoading(false);
        }
    }
    const handleInputChange = (event) => {
  setInputValue(event.target.value);
//   GetSelllerDetails(event.target.value) 
};
    async function UpdateProduct(crud) {
        //debugger
        try {
            
            setLoading(true);
            let v_CRUD = '';
            if (crud == 'U') {
                v_CRUD = 'U';
                // localStorage.setItem("hideShowMap", '');
                // localStorage.setItem("hideShowMap", '0');
            }
            else {
                v_CRUD = 'C';
                // localStorage.setItem("hideShowMap", '');
                // localStorage.setItem("hideShowMap", '0');
            }

            let v_lat = arealatitude || "0.0";
            var v_lattitude = parseFloat(v_lat).toFixed(7);//.toFixed(2)

            let v_lng = arealongitude || "0.0";
            var v_lngitude = parseFloat(v_lng).toFixed(7);//.toFixed(2)



            let is_workhourscheckedall = workhourschecked;

            let newarrWeeks = [...arrWeeks];


            let v_OpenHrs = valueOpen;
            let v_CloseHrs = valueClose;

            //let newarrWeeks1 = [...arrWeeks];
            //let newarrWeeks1 = Object.assign({}, [...arrWeeks]);

            //et newarrWeeks1 = Object.assign([], [...arrWeeks]);
            //let newarrWeeks1 = Object.assign([], [arrWeeks]);
            //const newarrWeeks1=[];
            // newarrWeeks1.push(...arrWeeks);
            //var newarrWeeks1 = Object.assign(arrWeeks);
            //const newarrWeeks1=[];
            //const newarrWeeks1 =  Object.assign([], [arrWeeks]);
            //  let newarrWeeks1 = Object.assign([], arrWeeks);
            let newarrWeeks1 = [];
            let temp = [];
            if (is_workhourscheckedall) //All Days
            {

                for (var i = 0; i < Object.keys(arrWeeks).length; i++) {
                    temp = Object.assign({}, arrWeeks[i]);
                    let start = v_OpenHrs.toDate();
                    let end = v_CloseHrs.toDate();
                    var timeSt = getTimeStr(start);
                    var timeEnd = getTimeStr(end);
                    //

                    let isHoliday = "0";
                    temp.isdcheck = isHoliday;
                    temp.start = timeSt;
                    temp.end = timeEnd;

                    newarrWeeks1.push(temp);

                }
            }
            else { //selected Days
                //


                for (var i = 0; i < Object.keys(arrWeeks).length; i++) {
                    temp = Object.assign({}, arrWeeks[i]);
                    let start = temp.start.toDate();

                    //let start =  Object.keys(newarrWeeks1)[i]["start"].toDate();
                    let end = temp.end.toDate();
                    var timeSt = getTimeStr(start);
                    var timeEnd = getTimeStr(end);
                    let sHoliday = temp.isdcheck
                    let isHoliday = "1";
                    if (sHoliday) {
                        isHoliday = "0";
                    }
                    else {
                        isHoliday = "1";
                    }
                    temp.isdcheck = isHoliday;
                    temp.start = timeSt;
                    temp.end = timeEnd;

                    newarrWeeks1.push(temp);
                }
            }
            //

            //"WHS":[{"DN":"","OH":"","CH":"","IH":""}]
            let gridchecked = true;
            let arrWHours = [];
            for (var i = 0; i < newarrWeeks1.length; i++) {
                let sHoliday = newarrWeeks1[i]["isdcheck"];
                // let isHoliday = "1";
                // if(sHoliday)
                // {
                //     isHoliday = "0";
                // }
                // else
                // {
                //     isHoliday = "1";
                // }

                if (sHoliday == "0") {
                    gridchecked = false;
                }

                arrWHours.push({ IH: sHoliday, DN: newarrWeeks1[i]["name"], OH: newarrWeeks1[i]["start"], CH: newarrWeeks1[i]["end"] });

            }

            if (!is_workhourscheckedall && gridchecked) {
                setLoading(false);
                Swal.fire({
                    text: "Please update Working Hours",
                });
                return;
            }

            // let v_ImageArray1 = [];
            // let v_ImageArray = [];
            // let v_ImageArrayFirst = [];
            //debugger
            let v_ImageURL = '';
            if (cropperdata.length > 0) {
                for (var key in cropperdata) {
                    var dat = cropperdata[key];
                    const imgtype = dat.y.split(';')[0].split('/')[1];
                    v_ImageURL = dat.y;
                    // v_ImageArrayFirst.push({ ID: '1', URL: dat.y, MT: 'I', SZ: "" });
                }
            }
            else {
                setLoading(false);
                Swal.fire({
                    text: "Please upload image",

                });

                return;
            }

            
            let v_ImageArray1 = [];
            let v_ImageArray = [];
            let v_ImageArrayFirst = [];
            if (cropperdataDrLic.length > 0) {
                for (var key in cropperdataDrLic) {
                    var dat = cropperdataDrLic[key];
                    const imgtype = dat.y.split(';')[0].split('/')[1];
                    //v_ImageArray.push({ID:dat.x,URL:dat.y,MT:imgtype,SZ:""});
                    if (parseInt(dat.x) == 0) {
                        v_ImageArray.push({ ID: '' + (parseInt(dat.x) + 6) + '', URL: dat.y, MT: 'I', SZ: "" });
                    }
                    else {
                        v_ImageArray.push({ ID: '' + (parseInt(dat.x) + 1) + '', URL: dat.y, MT: 'I', SZ: "" });
                    }
                }
            }
            else {
                setLoading(false);
                Swal.fire({
                    text: "Please upload Driving Licence",
                });
                return;
            }
            v_ImageArray1 = v_ImageArray;//v_ImageArrayFirst.concat(v_ImageArray)
            ////

            // v_ImageArray1 = v_ImageArrayFirst.concat(v_ImageArray)
            let Req = {
                // Req: {
                //     Rsk: "UnEuNhoKLZ7IDecLjKILZg==",
                //     DevID: "",
                //     Type: "CCEI",
                //     CRUD: v_CRUD,
                //     RKID: "",
                //     //RKID: v_SADMINKEYID,//v_RTreeID, //root key id-like biz id
                //     DN: SDisNM, // --disp name
                //     BD: SDesc, // --SDesc
                //     IC: v_ImageURL, //v_ImageArray1, // --disp name
                //     URL: "", // --URL
                //     BT: category,//--biz type
                //     PAN: "",//--pan
                //     IPGR: "",//--payment gw required
                //     GSTNO: "",
                //     GSTP: "",
                //     ADD1: SABuildingDtls,
                //     ADD2: SAStreet,
                //     ADD3: "",
                //     ZIP: SAZIP,
                //     CC: country,//--countrycode
                //     STID: stateID,//--state id
                //     CYID: cityID,//--city id
                //     AL: SAArea,//--area location
                //     LATT: v_lattitude,//--latitude
                //     LONG: v_lngitude,//--longitude
                //     WHS: arrWHours,//Working Hours
                //     CBY: getCookie('roleId'), //created by
                //     UID: getCookie('roleId')
                // },
                "Req": {
                    "Type": "MDAD",
                    "CRUD": v_CRUD,
                    "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
                    "DevID": "",
                    "UID": getCookie('roleId'),//--root key id
                    "BizID": "",
                    "BD": SDesc,
                    "DN": SDisNaM,//--disp name
                    "IC": v_ImageURL,//--prof pic
                    "URL": "",//--URL
                    "LN": DLnum,//--lic no
                    "VRN": "", //--vehicle number
                    "VM": modalName,//vehicle model,
                    "VT": vhileType,//--vehicle type,
                    "VRC": rcnumber,//--rc book number,
                    "DC": kmrate,//--dly charges per km
                    "LNE": (tDate == '' ? '' : tDate),//--lic no exp date
                    "MN": phNumber,//--mob no
                    "PAN": "",//--pan       
                    "ADD1": SAAddress,
                    "ADD2": SAStreet,
                    "ADD3": SABuildingDtls,
                    "ZIP": SAZIP,
                    "CC": srCountry,//--countrycode
                    "STID": srState,//--state id
                    "CYID": srCity,//--city id
                    "AL": SAArea,//--area location
                    "LATT": v_lattitude,//--latitude
                    "LONG": v_lngitude,//--longitudeSDesc
                    "CBY": getCookie('roleId'),
                    "ML": v_ImageArray1, //[{"ID":"","URL":"","MT":"","SZ":""},{"ID":"","URL":"","MT":"","SZ":""}],--media list
                    // "ML": [{ "ID": "", "URL": "", "MT": "", "SZ": "" }, { "ID": "", "URL": "", "MT": "", "SZ": "" }],//--media list
                    "ALL": personName,//--area location array   
                    // "WHS":[{"DN":"","OH":"","CH":"","IH":""}]
                }
            };


            
            const resp = await postAPI(Req);
            setLoading(false);
            
            if (!resp) {
                nav("/");
            } else {
                let response = JSON.parse(resp);
                if (response.Resp.Sts == 1) {
                    Swal.fire({
                        text: "Successfully Saved",
                    });
                    setCropperdata([]);
                    setCropperdataDrLic([]);
                    GetCountry();
                    GetCategory();
                    GetSelllerDetails()

                    //nav("/sellerinfo");


                }
                else {
                    let v_ErrDEsc = response.Resp.Desc;
                    Swal.fire({
                        text: v_ErrDEsc,
                    });
                }
            }

        } catch (error) {
            // 
            setLoading(false);
            console.error(`product UpdateProduct error: ${error}`);
            //setLoading(false);
        }
    }

    function handleCancelClick(event) {
        try {

        } catch (error) {
            setLoading(false);
        }

    }


    function latlong_click(event) {
        try {
            //debugger

            // var srlat = localStorage.getItem("srlat") || "";
            // var srlng = localStorage.getItem("srlng") || "";
            // var srarea = localStorage.getItem("srarea") || "";

            // localStorage.setItem("srlat", "");
            // localStorage.setItem("srlng", "");
            // localStorage.setItem("srarea", "");

            // setArealatitude(srlat);
            // setArealongitude(srlng);
            // setSAArea(srarea);

            var strFormattedAddress = "";
            var strissaddress = localStorage.getItem('issaddress') || '';
            var strCity = ''
            if (strissaddress == "1") {

                strFormattedAddress = localStorage.getItem('drFormattedAddresss') || '';
                strCity = localStorage.getItem('drcity') || '';

            }
            else {
                strFormattedAddress = localStorage.getItem('drFormattedAddress') || '';
                strCity =  localStorage.getItem('drCity') || '';
            }

            var strbuildingNo = localStorage.getItem('drbuildingNo') || '';
            var strStreet = localStorage.getItem('drStreet') || '';
            var strAreaL2 = localStorage.getItem('drAreaL2') || '';
            var strAreaL1 = localStorage.getItem('drAreaL1') || '';
        
            var strState = localStorage.getItem('drState') || '';
            var strCountry = localStorage.getItem('drCountry') || '';
            var strZip = localStorage.getItem('drZip') || '';

            var srlat = localStorage.getItem("drlat") || "";
            var srlng = localStorage.getItem("drlng") || "";
            var srarea = localStorage.getItem("drarea") || "";

            localStorage.setItem('drFormattedAddress', "");
            localStorage.setItem('drbuildingNo', "");
            localStorage.setItem('drStreet', "");
            localStorage.setItem('drAreaL2', "");
            localStorage.setItem('drAreaL1', "");
            localStorage.setItem('drCity', "");
            localStorage.setItem('drState', "");
            localStorage.setItem('drCountry', "");
            localStorage.setItem('drZip', "");

            // localStorage.setItem("srlat", "");
            // localStorage.setItem("srlng", "");
            // localStorage.setItem("srarea", "");

            setSAAddress(strFormattedAddress);
            // setSABuildingDtls(strbuildingNo);
            setSAStreet(strStreet);
            setSrAreaL2(strAreaL2);
            setSrAreaL1(strAreaL1);
            // GetCity(strCity);
            // GetState(strState);
            setSrCity(strCity);
            setSrState(strState);
            // setCountry(strCountry);
            setSAZIP(strZip);
            setSrCountry(strCountry);
            setArealatitude(srlat);
            setArealongitude(srlng);
            setSAArea(srarea);
            GetAreas(strCity)

        } catch (error) {
            setLoading(false);
        }

    }

    const CategoryList = getCategory.map(y => (
        <MenuItem key={y.BTID} value={y.BTID}>{y.BTNM}</MenuItem>
    ))

    const CountryList = getCountry.map(y => (
        <MenuItem key={y.ID} value={y.ID}>{y.NM}</MenuItem>
    ))

    const StateList = getState.map(z => (
        <MenuItem key={z.ID} value={z.ID}>{z.NM}</MenuItem>
    ))

    const CityList = getCity.map(z => (
        <MenuItem key={z.ID} value={z.ID}>{z.NM}</MenuItem>
    ))

    const handleChangeWorkhours = (event) => {
        setWorkhoursChecked(event.target.checked);
    };

    const handleGridCheckBoxClick = (i, e, varientname) => {

        let newarrWeeks = [...arrWeeks];
        newarrWeeks[i]["isdcheck"] = e.target.checked
        setValueOpenGrid(newarrWeeks);
    };

    const validateGridDays = (i, e, from, varientname) => {

        let newarrWeeks = [...arrWeeks];
        if (from == "START") {
            newarrWeeks[i]["start"] = e
            setValueOpenGrid(newarrWeeks);
        }
        else {
            newarrWeeks[i]["end"] = e
            setValueOpenGrid(newarrWeeks);
        }
    };

    const onChange = (e) => {

        //
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
            //
            var fsize = files[0].size
            var fileSize = Math.round((fsize / 1024))
            if (fileSize <= sized) {
                //var name = files.name
            } else {
                Swal.fire({
                    text: 'please select file size below ' + sized + 'kb',
                    confirmButtonColor: '#3899ec',
                    focusCancel: true,
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    return
                });
                return
            }

        } else if (e.target) {
            files = e.target.files;
            //
            // //debugger;
            // if (files.length > 0) {
            //     if (!files[0].name.includes(['.jpg', '.jpeg', '.png'])) {
            //         window.alert(`File does not support. `);
            //         return false;
            //     }
            // }

            var fsize = files[0].size
            var fileSize = Math.round((fsize / 1024))
            if (fileSize <= sized) {

            } else {
                Swal.fire({
                    text: 'please select file size below ' + sized + 'kb',
                    confirmButtonColor: '#3899ec',
                    focusCancel: true,
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    return;
                });
                return
            }

        }
        if (files.length === 0) {
            return alert("Please select a file.");
        }


        

        const reader = new FileReader();
        reader.onload = () => {
            //
            setCropUpdateID('');
            setReaderrsltimg(reader.result);
            setImage(reader.result);
            setOpens(true);
            // getUploadedFile(reader.result);
            //setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);

    };

    const OnCropImageClick = (e, id) => {
        //
        e.stopPropagation();
        let arData = cropperdata.filter(item => item.x == id)

        setCropUpdateID('' + id + '');
        setReaderrsltimg(arData[0].y);
        setImage(arData[0].y);

        setOpens(true);
        //setCropperdata(arData);
    }

    const OnDeleteImageClick = (e, id) => {
        //
        e.stopPropagation();

        let arData = cropperdata.filter(item => item.x != id)


        setCropperdata(arData);

    }
    const onCropsave = () => {
        //
        if (typeof cropper !== "undefined") {
            let v_idata = cropper.getCroppedCanvas().toDataURL();
            //
            const items = arCR_DATA;
            arCR_DATA = cropperdata
            //setCropperdata([...items, v_idata]);
            //
            if (cropUpdateID == '') {

                var maxNumber = 45;
                var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
                var items1 = { x: arCR_DATA.length, y: v_idata, z: '' + randomNumber + '' };
                arCR_DATA.push(items1);
                setCropperdata(arCR_DATA);

            }
            else {
                setCropperdata(arCR_DATA);
                arCR_DATA[parseInt(cropUpdateID)].y = v_idata
                setCropperdata(arCR_DATA);
            }


            //arCR_DATA[0] = v_idata;

            setOpens(false);
            // setTimeout(() => {
            //     document.querySelector('.closeBtn').click();
            // }, 0) //1 second delay
            // setTimeout(() => {
            //     document.querySelector('.clsImageModelOpen').click()
            // }, 200)
        }

    }
    const handleDelete = (index) => {
        setPersonName(prevState => {
            return prevState.filter((_, i) => i !== index);
        });
    };

    const handleCloses = () => {
        setOpens(false);
    };


    //Upload Driving Licence Start

    const onChangeDrLic = (e) => {

        
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
            //
            var fsize = files[0].size
            var fileSize = Math.round((fsize / 1024))
            if (fileSize <= sized) {
                //var name = files.name
            } else {
                Swal.fire({
                    text: 'please select file size below ' + sized + 'kb',
                    confirmButtonColor: '#3899ec',
                    focusCancel: true,
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    return
                });
                return
            }

        } else if (e.target) {
            files = e.target.files;
            //
            var fsize = files[0].size
            var fileSize = Math.round((fsize / 1024))
            if (fileSize <= sized) {

            } else {
                Swal.fire({
                    text: 'please select file size below ' + sized + 'kb',
                    confirmButtonColor: '#3899ec',
                    focusCancel: true,
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    return;
                });
                return
            }

        }
        if (files.length === 0) {
            return alert("Please select a file.");
        }

        const reader = new FileReader();
        reader.onload = () => {
            //
            setCropUpdateIDDrLic('');
            setReaderrsltimgDrLic(reader.result);
            setImageDrLic(reader.result);
            setOpensDrLic(true);
            // getUploadedFile(reader.result);
            //setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);

    };

    const OnCropImageClickDrLic = (e, id) => {
        //
        e.stopPropagation();
        let arData = cropperdataDrLic.filter(item => item.x == id)

        setCropUpdateIDDrLic('' + id + '');
        setReaderrsltimgDrLic(arData[0].y);
        setImageDrLic(arData[0].y);

        setOpensDrLic(true);
        //setCropperdata(arData);
    }

    const OnDeleteImageClickDrLic = (e, id) => {
        //
        e.stopPropagation();

        let arData = cropperdataDrLic.filter(item => item.x != id)


        setCropperdataDrLic(arData);

    }
    const onCropsaveDrLic = () => {
        
        if (typeof cropperDrLic !== "undefined") {
            let v_idata = cropperDrLic.getCroppedCanvas().toDataURL();
            //
            const items = arCR_DATADrLic;
            arCR_DATADrLic = cropperdataDrLic
            //setCropperdata([...items, v_idata]);
            //
            if (cropUpdateIDDrLic == '') {

                var maxNumber = 45;
                var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
                var items1 = { x: arCR_DATADrLic.length, y: v_idata, z: '' + randomNumber + '' };
                arCR_DATADrLic.push(items1);
                setCropperdataDrLic(arCR_DATADrLic);

            }
            else {
                setCropperdataDrLic(arCR_DATADrLic);
                arCR_DATADrLic[parseInt(cropUpdateIDDrLic)].y = v_idata
                setCropperdataDrLic(arCR_DATADrLic);
            }


            //arCR_DATA[0] = v_idata;

            setOpensDrLic(false);
            // setTimeout(() => {
            //     document.querySelector('.closeBtn').click();
            // }, 0) //1 second delay
            // setTimeout(() => {
            //     document.querySelector('.clsImageModelOpen').click()
            // }, 200)
        }

    }

    const handleClosesDrLic = () => {
        setOpensDrLic(false);
    };

    //Upload Driving Licence End

    const WeeksList = arrWeeks.map((y, index) => (
        <>
            <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        checked={y.isdcheck || false}

                        onClick={(event) => handleGridCheckBoxClick(index, event, y.name)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </TableCell>
                <TableCell style={{ wordBreak: 'break-all', width: '150px' }} padding='0px' component="th" scope="row">
                    <label style={{ fontSize: 16 }}>{y.name}</label>
                </TableCell>
                <TableCell style={{ width: '200px' }} padding='0px' align="left">
                    <LocalizationProvider

                        dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="Open"
                            value={y.start}

                            onChange={(e) => validateGridDays(index, e, "START", y.name)}

                            // onChange={(newValue) => {
                            //     setValueOpenGrid(newValue);
                            // }}
                            renderInput={(params) => <TextField size="small" style={{ width: 150 }} {...params} />}
                        />
                    </LocalizationProvider>

                </TableCell>
                <TableCell padding='0px' align="left">

                    <LocalizationProvider

                        dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="Close"
                            value={y.end}
                            onChange={(e) => validateGridDays(index, e, "CLOSE", y.name)}
                            renderInput={(params) => <TextField size="small" style={{ width: 150 }} {...params} />}
                        />
                    </LocalizationProvider>

                </TableCell>

            </TableRow>
        </>
    ))

    imageView = cropperdata.map((v, index) => (

        <>
            {/* <ImageListItem> */}
            <Stack direction="column" >

                <Card variant='outlined' style={{}} >
                    <CardContent>




                        <img style={{ width: '70px', height: '50px' }} src={v.y} />


                    </CardContent>
                    <CardActions style={{ marginLeft: "auto" }}>
                        <stack direction="row" style={{ marginLeft: "auto" }}>



                            <DeleteIcon onClick={(e) => {
                                OnDeleteImageClick(e, v.x);
                            }} style={{ color: 'red', textAlign: 'right' }} />
                            &nbsp; &nbsp;
                            <CropIcon onClick={(e) => {
                                OnCropImageClick(e, v.x);
                            }} style={{ color: 'gray', textAlign: 'right' }} />
                        </stack>

                        {/* <Button size="small">Delete</Button> */}
                    </CardActions>
                </Card>
            </Stack>
            {/* </ImageListItem> */}
        </>
    ));

    imageViewDrLic = cropperdataDrLic.map((v, index) => (
        <>
            {/* <ImageListItem> */}
            <Stack direction="column" >
                <Card variant='outlined' style={{}} >
                    <CardContent>
                        <img style={{ width: '70px', height: '50px' }} src={v.y} />
                    </CardContent>
                    <CardActions style={{ marginLeft: "auto" }}>
                        <stack direction="row" style={{ marginLeft: "auto" }}>
                            <DeleteIcon onClick={(e) => {
                                OnDeleteImageClickDrLic(e, v.x);
                            }} style={{ color: 'red', textAlign: 'right' }} />
                            &nbsp; &nbsp;
                            <CropIcon onClick={(e) => {
                                OnCropImageClickDrLic(e, v.x);
                            }} style={{ color: 'gray', textAlign: 'right' }} />
                        </stack>
                        {/* <Button size="small">Delete</Button> */}
                    </CardActions>
                </Card>
            </Stack>
            {/* </ImageListItem> */}
        </>
    ));

    const handleClickFunction = (fromWhere) => {
        dispatch(FromHomeOrSetup(fromWhere)); // If fromWhere == Home || fromWhere == Setup
    }
    const handleChange1 = (newValue) => {
        // //debugger
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
        ////debugger
        setValue2(newValue);
        var date = new Date(newValue.$d)
        var dat = date.getDate()
        var mon = date.getMonth() + 1;
        var yr = date.getFullYear()
        // setStart(1)
        setMaxDa(`${yr}-${mon}-${dat}`)
        settDate(`${yr}-${mon}-${dat}`)
    };

    return (
        <>
            <Loading style={{
                display: loading ? "flex" : "none"
            }} loading={loading} />

            <HeaderForm clickFunction={handleClickFunction} />
            <Stack direction='row' alignItems='center' sx={{ width: '50%', height: '40px', backgroundColor: 'white', borderRadius: '10px 10px 0px 0px', position: 'relative', top: '80px' }}>
                <Stack alignItems='center' sx={{ height: '35px', backgroundColor: '#898BD6', borderRadius: '0px 0px 10px 10px', marginLeft: '15px', position: 'relative', bottom: '3px' }} >
                    <label style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginLeft: "10px", marginRight: "10px", position: 'relative', top: '3px' }}>Drivers Details</label>
                </Stack>
            </Stack>
            <div style={{ flexGrow: '1', marginTop: '85px', marginLeft: '15px', marginRight: '15px' }} >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <Card variant='outlined' >
                                    <CardContent style={{ paddingLeft: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 5 }}>
                                        <div style={{ width: "100%", height: "100%", }}>
                                            <div style={{ width: '100%', backgroundColor: 'white', marginLeft: '14px' }} >
                                                <label style={{ fontSize: 16, textAlign: 'left', fontWeight: 'bold' }} >
                                                    Profile
                                                </label><br />
                                                <label style={{ fontSize: 12, textAlign: 'left' }}>
                                                    Your profile is what people will see on search results, invoices, chat and more.
                                                </label>
                                            </div>
                                            <Divider light sx={{ marginTop: '10px' }} />
                                            <Grid container={'true'} item xs={12} sm={12}>
                                                <Grid item xs={12} sm={6}>
                                                    <Card variant='none' >
                                                        <CardContent style={{ paddingLeft: 0, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}>
                                                            <div style={{ width: "100%", height: "100%", paddingLeft: '10px' }}>

                                                                <div style={{ width: '100%', height: "100%" }}>
                                                                    <StyledTextBox
                                                                        autoFocus
                                                                        id="txtDisplayName"
                                                                        label="Display Name *"
                                                                        type="text"

                                                                        size="small"
                                                                        fullWidth
                                                                        variant="outlined"
                                                                        inputProps={{ maxLength: 50 }}
                                                                        value={SDisNaM}
                                                                        onChange={(e) => validate(e, "SDisNaM")}
                                                                        error={valErrSDisNaM}
                                                                    >
                                                                    </StyledTextBox>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Card variant='none' >
                                                        <CardContent style={{ paddingLeft: 0, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}>
                                                            <div style={{ width: "100%", height: "100%", paddingLeft: '10px' }}>

                                                                <div style={{ width: '100%', height: "100%" }}>
                                                                <StyledTextBox
                                                                autoFocus
                                                                id="txtDisplayName"
                                                                label="Mobile No *"
                                                                type="number"
                                                                size="small"
                                                                fullWidth
                                                                variant="outlined"
                                                                inputProps={{ maxLength: 10 }}
                                                                value={phNumber}
                                                                onChange={(e) => validate(e, "phNumber")}
                                                                error={valErrphNumber}
                                                                onKeyDown={(e) => {
                                                                  if (e.target.value.length >= 10 && e.keyCode !== 8) {
                                                                    e.preventDefault();
                                                                  }
                                                                }}
                                                              />
                                                              
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6} md={3}>
                                                  <Card variant="none">
                                                    <CardContent style={{ padding: 10 }}>
                                                      <StyledTextBox
                                                        autoFocus
                                                        id="txtDisplayName"
                                                        label="Driving License No *"
                                                        type="text"
                                                        size="small"
                                                        fullWidth
                                                        variant="outlined"
                                                        inputProps={{ maxLength: 20 }}
                                                        value={DLnum}
                                                        onChange={(e) => validate(e, "DLnum")}
                                                        error={valErrDLnum}
                                                      />
                                                    </CardContent>
                                                  </Card>
                                                </Grid>
                                              
                                                <Grid item xs={12} sm={6} md={9}>
                                                  <Card variant="none">
                                                    <CardContent style={{ padding: 10 }}>
                                                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <Stack direction="row" display="flex" spacing={5} alignItems="center">
                                                          <Typography variant="h7">Valid Till:</Typography>
                                                          <MobileDatePicker
                                                            label="To"
                                                            inputFormat="DD/MM/YYYY"
                                                            minDate={new Date(minDa)}
                                                            maxDate={new Date(maxDa)}
                                                            value={value2}
                                                            onChange={handleChange2}
                                                            renderInput={(params) => (
                                                              <TextField size="small" {...params} />
                                                            )}
                                                          />
                                              
                                                          <Typography variant="h7">Charges per km:</Typography>
                                                          <StyledTextBox
                                                            autoFocus
                                                            id="txtDisplayName"
                                                            label="Cost *"
                                                            type="number"
                                                            size="small"
                                                            variant="outlined"
                                                            inputProps={{ maxLength: 4 }}
                                                            value={kmrate}
                                                            onChange={(e) => validate(e, "kmrate")}
                                                            onKeyDown={(e) => {
                                                                if (e.target.value.length >= 4 && e.keyCode !== 8) {
                                                                  e.preventDefault();
                                                                }
                                                              }}
                                                            error={valErrkmrate}
                                                          />
                                                        </Stack>
                                                      </LocalizationProvider>
                                                    </CardContent>
                                                  </Card>
                                                </Grid>
                                              </Grid>
                                              

                                                <Grid item xs={12} sm={4}  >
                                                    <Card variant='none'>
                                                        <CardContent style={{ paddingLeft: 0, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}>
                                                            <div style={{ width: "100%", height: "100%", paddingLeft: '10px' }}>
                                                                <div style={{ width: '100%', height: "100%" }}>
                                                                    <Stack direction='row' display='flex' spacing={2} alignItems='center' sx={{ marginTop: '0px' }}>
                                                                        <FormControl sx={{ m: 1, width: 500 }}>
                                                                            <InputLabel id="demo-simple-select-label">Vehile Type</InputLabel>
                                                                            <Select
                                                                                labelId="demo-simple-select-label"
                                                                                id="demo-simple-select"
                                                                                value={vhileType}
                                                                                label="Vehile Type"
                                                                                onChange={handleChangevhile}
                                                                            >
                                                                                <MenuItem value={10}>Auto</MenuItem>
                                                                                <MenuItem value={20}>Two Wheeler</MenuItem>
                                                                                <MenuItem value={30}>Four Wheeler</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Stack>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                <Grid item xs={12} sm={4} spacing={2} sx={{ marginTop: '17px' }}>
                                                    <StyledTextBox
                                                        autoFocus
                                                        id="txtDisplayName"
                                                        label="Modal Name *"
                                                        type="text"
                                                        size="small"
                                                        fullWidth
                                                        variant="outlined"
                                                        inputProps={{ maxLength: 15 }}
                                                        value={modalName}
                                                        onChange={(e) => validate(e, "modalName")}
                                                        error={valErrmodalName}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4} spacing={2} sx={{ marginTop: '17px' }}>
                                                    <StyledTextBox
                                                        autoFocus
                                                        id="txtDisplayName"
                                                        label="Registration Number *"
                                                        type="text"
                                                        size="small"
                                                        fullWidth
                                                        variant="outlined"
                                                        inputProps={{ maxLength: 15 }}
                                                        value={rcnumber}
                                                        onChange={(e) => validate(e, "rcnumber")}
                                                        error={valErrrcnumber}
                                                    />
                                                </Grid>



                                                <Grid item xs={12} sm={12}>
                                                    <Card variant='none' >
                                                        <CardContent style={{ paddingLeft: 0, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}>
                                                            <div style={{ width: "100%", height: "100%", paddingLeft: '10px' }}>

                                                                <div style={{ width: '100%', height: "100%" }}>
                                                                    <StyledTextBox
                                                                        autoFocus
                                                                        id="txtDescription"
                                                                        label="Short description"
                                                                        type="text"
                                                                        multiline
                                                                        rows={3}
                                                                        size="small"
                                                                        fullWidth
                                                                        variant="outlined"


                                                                        value={SDesc}
                                                                        onChange={(e) => validate(e, "SDesc")}


                                                                    >
                                                                    </StyledTextBox>
                                                                </div>


                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                      

                                                <Grid item xs={12} sm={6}>
                                                    <Card variant='none' >
                                                        <CardContent style={{ paddingLeft: 0, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}>
                                                            <div style={{ width: "100%", height: "100%", paddingLeft: '10px' }}>

                                                                <div>
                                                                    <Stack direction='row' >

                                                                    </Stack>
                                                                </div>
                                                                <div style={{ width: "100%", height: "100%", paddingTop: '2px' }}>
                                                                    <div style={{ width: '100%', backgroundColor: 'white', marginTop: '10px' }} >
                                                                        <label style={{ fontSize: 16, textAlign: 'left', fontWeight: 'bold' }} >
                                                                            Upload your Image
                                                                        </label>
                                                                    </div>
                                                                    {cropperdata.length < parseInt(maxConfigProdImgs) && (<>
                                                                        <div style={{ textAlign: 'left' }}>

                                                                            <div style={{ width: "100%" }}>
                                                                                <button className="clrBtn" style={{ height: '30px', width: '120px', borderRadius: '30px' }} onClick={() => hiddenFileInput.current.click()}>
                                                                                    <UploadIcon />
                                                                                    <label style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', position: 'relative', bottom: '5px' }}>Upload</label>
                                                                                    {/* <input hidden accept="image/*" multiple type="file" /> */}
                                                                                    <input hidden type="file" ref={hiddenFileInput} accept="image/*" onChange={onChange} />
                                                                                </button>

                                                                            </div>

                                                                        </div>
                                                                    </>
                                                                    )}

                                                                    <div style={{ width: "100%", overflow: 'auto' }}>
                                                                        <Stack style={{ width: "100%" }} justify="flex-start" direction="row" spacing={1} marginBottom={"10px"}>

                                                                            {imageView}


                                                                        </Stack>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>

                                                <Grid item width='100%' xs={12} sm={6}>
                                                    <Card variant='none' >
                                                        <CardContent style={{ paddingLeft: 0, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}>
                                                            <div style={{ width: "100%", height: "100%", paddingLeft: '10px' }}>
                                                                <div>
                                                                    <Stack direction='row' >

                                                                    </Stack>
                                                                </div>
                                                                <div style={{ width: "100%", height: "100%", paddingTop: '2px' }}>
                                                                    <div style={{ width: '100%', backgroundColor: 'white', marginTop: '10px' }} >
                                                                        <label style={{ fontSize: 16, textAlign: 'left', fontWeight: 'bold' }} >
                                                                            Upload your Driving Licence
                                                                        </label>
                                                                    </div>
                                                                    {cropperdataDrLic.length < parseInt(maxConfigDrLicImgs) && (<>
                                                                        <div style={{ textAlign: 'left' }}>
                                                                            <div style={{ width: "100%" }}>
                                                                                <button className="clrBtn" style={{ height: '30px', width: '120px', borderRadius: '30px' }} onClick={() => hiddenFileInputDrLic.current.click()}>
                                                                                    <UploadIcon />
                                                                                    <label style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', position: 'relative', bottom: '5px' }}>Upload</label>
                                                                                    {/* <input hidden accept="image/*" multiple type="file" /> */}
                                                                                    <input hidden type="file" ref={hiddenFileInputDrLic} accept="image/*" onChange={onChangeDrLic} />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                    )}
                                                                    <div style={{ width: "100%", overflow: 'auto' }}>
                                                                        <Stack style={{ width: "100%" }} justify="flex-start" direction="row" spacing={1} marginBottom={"10px"}>
                                                                            {imageViewDrLic}
                                                                        </Stack>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>

                                                <Grid item xs={12} sm={12}>
                                                    <Card variant='none' >
                                                        <CardContent style={{ paddingLeft: 0, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}>
                                                            <div style={{ width: "100%", height: "100%", paddingLeft: '10px' }}>

                                                                <div style={{ width: '100%', height: "100%" }}>
                                                                    <label style={{ fontSize: 16, textAlign: 'left', fontWeight: 'bold' }} >
                                                                        Add your home locations
                                                                    </label>
                                                                    <MapLoc></MapLoc>

                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>

                                            </Grid>

                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>


                            <Grid item xs={12} sm={12}>
                                <Card variant='outlined' >
                                    <CardContent style={{ paddingLeft: 10, paddingTop: 5, paddingBottom: 5, paddingRight: 5 }}>
                                        <div style={{ width: "100%", height: "100%", }}>
                                            <div style={{ width: '100%', backgroundColor: 'white', marginLeft: '14px' }} >
                                                <label style={{ fontSize: 16, textAlign: 'left', fontWeight: 'bold' }} >
                                                    Location & Contact Info
                                                </label><b />
                                            </div>
                                            <Divider light />

                                            <Grid container={'true'} item xs={12} sm={12}>

                                                {/* Map */}
                                                <Grid item xs={12} sm={12}>
                                                    <Card variant='none' >
                                                        <CardContent style={{ paddingLeft: 0, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}>
                                                            <div style={{ width: "100%", height: "100%", paddingLeft: '10px' }}>

                                                                <div style={{ width: '100%', height: "100%" }}>
                                                                    <StyledTextBox
                                                                        autoFocus
                                                                        id="txtDescription"
                                                                        label="Address"
                                                                        type="text"
                                                                        multiline
                                                                        rows={3}
                                                                        size="small"
                                                                        fullWidth
                                                                        variant="outlined"
                                                                        disabled={true}

                                                                        value={SAAddress}
                                                                        onChange={(e) => validate(e, "SAAddress")}
                                                                        error={valErrSAAddress}


                                                                    >
                                                                    </StyledTextBox>
                                                                </div>


                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Card variant='none' >
                                                        <CardContent style={{ paddingLeft: 0, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}>
                                                            <div style={{ width: "100%", height: "100%", paddingLeft: '10px' }}>

                                                                <div style={{ width: '100%', height: "100%" }}>
                                                                    <StyledTextBox
                                                                        autoFocus
                                                                        id="txtBuildingNo"
                                                                        label="Door / Flat No*"
                                                                        type="text"

                                                                        size="small"
                                                                        fullWidth
                                                                        variant="outlined"
                                                                        inputProps={{ maxLength: 15 }}

                                                                        value={SABuildingDtls}
                                                                        onChange={(e) => validate(e, "SABuildingDtls")}
                                                                        error={valErrSABuildingDtls}
                                                                    >
                                                                    </StyledTextBox>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>


                                                <Grid item xs={12} sm={6}>
                                                    <Card variant='none' >
                                                        <CardContent style={{ paddingLeft: 0, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}>
                                                            <div style={{ width: "100%", height: "100%", paddingLeft: '10px' }}>

                                                                <div style={{ width: '100%', height: "100%" }}>
                                                                    <StyledTextBox
                                                                        autoFocus
                                                                        id="txtCategoryName"
                                                                        label="Area*"
                                                                        type="text"
                                                                        size="small"
                                                                        fullWidth
                                                                        variant="outlined"
                                                                        inputProps={{ maxLength: 50 }}
                                                                        disabled={true}
                                                                        value={SAArea}
                                                                        onChange={(e) => validate(e, "SAArea")}
                                                                        error={valErrSAArea}

                                                                    >
                                                                    </StyledTextBox>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>

                                            </Grid>

                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Card variant='none' >
                                    <CardContent style={{ paddingLeft: 0, paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}>
                                        <div style={{ width: "100%", height: "100%", paddingLeft: '10px' }}>
                                            <label style={{ fontSize: 16, textAlign: 'left', fontWeight: 'bold' }} >
                                                Add your Delivary locations
                                            </label>
                                            <div>
                                                <Stack direction='row' >
                                                    <FormControl sx={{ m: 1, width: 300 }}>
                                                        <InputLabel id="demo-multiple-checkbox-label">Locations</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            value={personName}
                                                            onChange={handleChange}
                                                            input={<OutlinedInput label="Locations" />}
                                                            renderValue={(selected) => selected.join(', ')}
                                                            MenuProps={MenuProps}
                                                            
                                                        >
                                                            <MenuItem>
                                                                <input
                                                                    placeholder="search"
                                                                    value={inputValue}
                                                                    onChange={handleInputChange}
                                                                    style={{ padding: "10px", backgroundColor: "#fff", width: "100%" }}
                                                                    fullWidth
                                                                />
                                                            </MenuItem>
                                                            {getCitys
                                                                .sort((a, b) => a.AL.toLowerCase().indexOf(inputValue.toLowerCase()) - b.AL.toLowerCase().indexOf(inputValue.toLowerCase()))
          .filter((city) => city.AL.toLowerCase().includes(inputValue.toLowerCase()))
                                                                .map((name) => (
                                                                    <MenuItem key={name} value={name.AL}>
                                                                        <Checkbox checked={personName.indexOf(name.AL) > -1} />
                                                                        <ListItemText primary={name.AL} />
                                                                    </MenuItem>
                                                                ))}
                                                        </Select>
                                                    </FormControl>


                                              
                                              
                                                    <div style={{ marginLeft: '5px', marginTop: '5px', paddingLeft: '2px' }}>
                                                        {personName.map((name, index) => (
                                                            <div key={index} style={{ display: 'inline-flex', alignItems: 'center' }}>
                                                                {name}

                                                                <DeleteIcon sx={{ color: 'red' }} onClick={() => handleDelete(index)} />

                                                            </div>
                                                        ))}
                                                    </div>                                                                    </Stack>
                                            </div>
                                            <div style={{ width: "100%", height: "100%", paddingTop: '2px' }}>

                                            </div>

                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card variant='none'>
                                    <CardContent style={{ padding: 5 }}>
                                        <div style={{ width: "100%", height: "100%", }}>
                                            <div style={{ width: '100%', backgroundColor: 'white', textAlign: 'center' }} >

                                                <DiaBtn2 style={{ display: 'none' }} variant='outlined' onClick={handleCancelClick}>
                                                    Cancel
                                                </DiaBtn2>&nbsp;

                                                <button className='clrBtn' style={{ height: '30px', borderRadius: '30px', fontSize: '15px' }} onClick={handleSaveClick} autoFocus variant="contained"  >
                                                    Save
                                                </button>

                                                <DiaBtn1 className='clsmaplatlongupdateds' style={{ display: 'none' }} onClick={latlong_click} autoFocus variant="contained"  >
                                                    Loc
                                                </DiaBtn1>

                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>


                        </Grid>
                    </Grid>
                </Grid>

            </div>


            {/* photo upload start*/}
            <>


                <Dialog style={{ zIndex: '1000000' }}
                    open={opens} PaperProps={{
                        sx: {
                            minWidth: '25%',
                        }
                    }}
                >
                    <DialogContent>
                        <StyledDiaBx marginLeft="100px">
                            <Stack spacing={1}>
                                {image && (
                                    <Cropper
                                        // zoomTo={0.5}
                                        initialAspectRatio={1}
                                        preview=".img-preview"
                                        src={image}
                                        viewMode={1}
                                        minCropBoxHeight={10}
                                        minCropBoxWidth={10}
                                        background={false}
                                        responsive={true}
                                        autoCropArea={1}
                                        checkOrientation={false}
                                        onInitialized={(instance) => {
                                            setLoading(true);
                                            setCropper(instance);
                                            setLoading(false);
                                        }}
                                        guides={true}
                                    />
                                )}
                            </Stack>
                        </StyledDiaBx>
                    </DialogContent>
                    <DialogActions sx={{ marginLeft: '100px', width: '100px' }}>
                        <DiaBtn2 variant='outlined' onClick={handleCloses}>
                            Cancel
                        </DiaBtn2>
                        {image && (<DiaBtn1 autoFocus variant="contained" onClick={() => onCropsave()} >
                            crop
                        </DiaBtn1>)}
                    </DialogActions>
                </Dialog>
            </>
            {/* photo upload end*/}

            {/* driving licence upload start*/}
            <>
                <Dialog style={{ zIndex: '1000000' }}
                    open={opensDrLic} PaperProps={{
                        sx: {
                            minWidth: '25%',
                        }
                    }}
                >
                    <DialogContent>
                        <StyledDiaBx marginLeft="100px">
                            <Stack spacing={1}>
                                {imageDrLic && (
                                    <Cropper
                                        // zoomTo={0.5}
                                        initialAspectRatio={1}
                                        preview=".img-preview"
                                        src={imageDrLic}
                                        viewMode={1}
                                        minCropBoxHeight={10}
                                        minCropBoxWidth={10}
                                        background={false}
                                        responsive={true}
                                        autoCropArea={1}
                                        checkOrientation={false}
                                        onInitialized={(instance) => {
                                            setLoading(true);
                                            setCropperDrLic(instance);
                                            setLoading(false);
                                        }}
                                        guides={true}
                                    />
                                )}
                            </Stack>
                        </StyledDiaBx>
                    </DialogContent>
                    <DialogActions sx={{ marginLeft: '100px', width: '100px' }}>
                        <DiaBtn2 variant='outlined' onClick={handleClosesDrLic}>
                            Cancel
                        </DiaBtn2>
                        {image && (<DiaBtn1 autoFocus variant="contained" onClick={() => onCropsaveDrLic()} >
                            crop
                        </DiaBtn1>)}
                    </DialogActions>
                </Dialog>
            </>
            {/* photo upload end*/}

        </>



    );
}
export default DriverDetails;