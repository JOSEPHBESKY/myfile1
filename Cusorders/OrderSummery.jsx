import React, { useState, useContext, useEffect } from 'react';
import { ImageList,ImageListItem,DialogTitle, Radio, RadioGroup, CardActions, Grid, FormControl, Select, FormGroup, FormControlLabel, Switch, Dialog, DialogContent, DialogActions, Card, CardHeader, Avatar, Button, Divider, IconButton, Input, ListItemAvatar, Menu, Stack, TextField, Typography, CardContent } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input'
import { useNavigate, useLocation } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ErrorBoundary from '../../common/errorboundary';
import UploadIcon from '@mui/icons-material/Upload';
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
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import CropIcon from '@mui/icons-material/Crop';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Loading from "../../loadingScr";
import SWAlert from "sweetalert2";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import configData from "../../config.json";
import { postAPI } from "../../services/apicall";
import { getCookie } from '../../common/cks';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { connect, useSelector } from "react-redux";
import DownloadIcon from '@mui/icons-material/Download';
import Swal from "sweetalert2";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


import {
    LblStateNm, StyledAvatar,
    StyledGrid, Label, StyledBox,
    StyledMore, StyledCard, StyledTypro,
    AddBox, AddBtn, StyledEdit, MenuLbl, StyledDelete,
    DiaBtn1, DiaBtn2, DiaHeader,
    StyledTextBox, StyledDiaBx, Closeicon, StyledForm
} from '../../styles/common';


export default function AddReservation({ PID, BIZID, BIZNAME, handleAE_CloseClick, handleAE_SaveClick }) {
    const nav = useNavigate();
    const maxConfigProdImgs = configData.MaxProdImages;

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pricingradiovalue, setPricingradiovalue] = React.useState('1');
    const [isFormInvalid, setIsFormInvalid] = useState(false);

    const [PrID, setPrID] = useState(PID);
    const [PNM, setPNM] = useState();
    const [bizID, setBizID] = useState(BIZID);
    const [bizName, setBizName] = useState(BIZNAME);

    const [valErrPNM, setValErrPNM] = useState("");
    const [Ribbon, setRibbon] = useState("");
    const [valErrRibbon, setValErrRibbon] = useState("");

    const [PDISVAL, setPDISVAL] = useState("0");
    const [valErrPDISVAL, setValErrPDISVAL] = useState("");

    const [PDES, setPDES] = useState("");
    const [valErrPDES, setValErrPDES] = useState("");

    const [PPRICE, setPPRICE] = useState("");
    const [valErrPPRICE, setValErrPPRICE] = useState("");

    const [discountchecked, setDiscountChecked] = React.useState(false);

    const [openImgModal, setOpenImgModal] = React.useState(false);
    const [readerrsltimg, setReaderrsltimg] = React.useState(null);
    const [cropUpdateID, setCropUpdateID] = React.useState('');
    const [cropper, setCropper] = useState("");
    const [opens, setOpens] = useState(false);
    const [discounttype, setDiscountType] = React.useState(-1);
    const [discountvalue, setDiscountvalue] = React.useState('');


    const [selectedValueMainImg, setSelectedValueMainImg] = React.useState('0');


    const [serviceList, setServiceList] = useState([{ name: "", email: "" }]);


    const [formValues, setFormValues] = useState([{ name: "", email: "" }])


    const [portionnames, setPortionNames] = React.useState('0');
    const [productPortionsPanel, setProductPortionsPanel] = React.useState(false);
    const [openPPortionPopup, setOpenPPortionPopup] = useState(false);
    const [chipsportion, setChipsportion] = React.useState([])
    const [chipsportionVariants, setChipsportionVariants] = React.useState([]) //[{"ID":"","URL":"","MT":"","SZ":""}

    const [optionnames, setOptionNames] = React.useState('0');
    const [productOptionsPanel, setProductOptionsPanel] = React.useState(false);
    const [openPOptionPopup, setOpenPOptionPopup] = useState(false);
    const [chipsoption, setChipsoption] = React.useState([])
    const [chipsoptionVariants, setChipsoptionVariants] = React.useState([]) //[{"ID":"","URL":"","MT":"","SZ":""}

    const[sized,setSized]=useState()


    let v_RTreeID = useSelector((state) => state.RightTreeID)
    var UserID=getCookie("roleId");
    let user = getCookie("userID");

    let arrChipsportionVariants = [];
    let arrChipsoptionVariants = [];

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { name: "", email: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }

    const [cropperdata, setCropperdata] = React.useState([]);
    let arCR_DATA = [];
    let imageView = [];
    let productPortionsTags = [];
    let productOptionsTags = [];
    const [image, setImage] = React.useState(
        "https://images.unsplash.com/photo-1612232134966-a9b076b9fbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    );

    useEffect(() => {
        
        //conFig();
debugger
        if (PrID != "")
            GetTableData(v_RTreeID,PrID);

        //debugger;
        //Scroll Top content
        setTimeout(function () {
        document.querySelector(".addeditproductpage").scrollTop = 0
    }, 100);


    }, []);

    async function conFig(){
        try{
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
                    "UID":''
                }
            }
            const rows = await postAPI(req);
            const row = JSON.parse(rows);
            //debugger
            if (row.Resp.Sts == "1") {
                var res = JSON.parse(row.Resp.Result)
                var size=res[1].CV
                setSized(size)
            }
        }catch(err){

        }
    }

    useEffect(() => {
        // debugger;
        // setCropperdata(cropperdata);
    }, [cropperdata]);

    async function GetTableData(v_RTreeID,v_PrID    ) {
        debugger
        try {
            setLoading(true);

            //debugger;
            var payload = "";
         
            payload = {
                // Req: {
                //     Type: "GSPL",
                //     CRUD: "",
                //     Rsk: "UnEuNhoKLZBdIcLjKILZg==",
                //     DevID: "",
                //     BizID: "",
                //     BID: "",
                //     ID: "",
                //     PID: v_PrID,
                //     NM: "",
                //     RBN: "",
                //     KID: v_RTreeID
                // },
                
                    "Req": {
                      "Type": "GSRT",
                      "CRUD": "",
                      "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
                      "DevID": "",
                      "RKID": v_RTreeID,//--root key id
                      "KID": v_RTreeID,//--key id
                      "TNO":v_PrID,//--table number      
                      "ST":"",//--status   
                      "CBY": getCookie('roleId') ,
                      "RS": "",
                      "RC": ""
                        }
                  
            };
            // debugger;
            var req = JSON.stringify(payload);
            var rows = await postAPI(payload, false); // Open for all
            setLoading(false);
            debugger;
            let jsonObject = JSON.parse(rows);
            if (jsonObject.Resp.Sts == "1") {
                // setArrProductData(JSON.parse(jsonObject.Resp.Result));
                // debugger;
                setRows(JSON.parse(jsonObject.Resp.Result));

                let arrData = JSON.parse(jsonObject.Resp.Result);
                if (arrData.length > 0) {
                    setPrID(arrData[0].PID);
                    setPNM(arrData[0].DC);
                    setRibbon(arrData[0].RBN);
                    //  setPDES(arrData[0].ST);
                    setPDES(arrData[0].DC);
                    setPPRICE( arrData[0].TNO);
                    let isDiscount = arrData[0].ST; //false - percentage, true - rupees
                    // let DiscountRupee = arrData[0].ST;
                    
                    if (isDiscount == 0) {
                        setDiscountChecked(false)
                        setPDISVAL(0)
                        setDiscountType(0)
                    }
                    else {
                        setDiscountChecked(true)
                        setPDISVAL(1)
                        setDiscountType(1)
                    }

                    if (isDiscount)
                        setDiscountType(1);
                    else
                        setDiscountType(0);


                    let l_mainImg = arrData[0].TNO;
                    if (l_mainImg != '') {
                        let l_Imgs = arrData[0].PML;
                        if (l_Imgs.length > 0) {
                            let iind = 0;
                            //debugger;
                            //for (var imgs in l_Imgs) {
                            for (var i = 0; i < l_Imgs.length; i++) {
                                var dat = l_Imgs[i].URL;
                                //debugger;


                                var items1 = { x: arCR_DATA.length, y: dat, z: '1' };
                                arCR_DATA.push(items1);
                                setCropperdata(arCR_DATA);

                               

                                iind++;
                            }


                            let iIndex = 0;
                            let iIndexValue = 0;
                            for (var imgs1 in l_Imgs) {
                                var urldat = l_Imgs[imgs1];
                                if (l_mainImg == urldat) {
                                    iIndexValue = iIndex;
                                }
                                iIndex++;
                            }
                            setSelectedValueMainImg('' + iIndexValue + '')

                        }
                        else {
                            setSelectedValueMainImg('0')
                        }

                    }

                    //debugger;
                    let l_chipsportionVariant = arrData[0].PVS;
                    if (l_chipsportionVariant.length > 0) {
                        let arrchipsportionGet = [];
                        let arrchipsportionVariantsInsert = [];
                        for (var i = 0; i < l_chipsportionVariant.length; i++) {
                            // arrchipsportionVariantsInsert.push({ variant: l_chipsportionVariant[i].V, vprice: ''+l_chipsportionVariant[i].P+'', P: ''+arrData[0].PP+'' });
                            arrchipsportionGet.push(l_chipsportionVariant[i].V);
                            var items1 = { variant: l_chipsportionVariant[i].V, vprice: '' + l_chipsportionVariant[i].P + '', vactprice: '' + arrData[0].PP + '' };
                            arrChipsportionVariants.push(items1);
                        }
                        setChipsportion(arrchipsportionGet)
                        setChipsportionVariants(arrChipsportionVariants);
                    }

                    let l_chipsoptionVariant = arrData[0].POS;
                    if (l_chipsoptionVariant.length > 0) {
                        let arrchipsoptionGet = [];
                        let arrchipsoptionVariantsInsert = [];
                        for (var i = 0; i < l_chipsoptionVariant.length; i++) {
                            // arrchipsoptionVariantsInsert.push({ variant: l_chipsoptionVariant[i].V, vprice: ''+l_chipsoptionVariant[i].P+'', P: ''+arrData[0].PP+'' });
                            arrchipsoptionGet.push(l_chipsoptionVariant[i].V);
                            var items1 = { variant: l_chipsoptionVariant[i].V, vprice: '' + l_chipsoptionVariant[i].P + '', vactprice: '' + arrData[0].PP + '' };
                            arrChipsoptionVariants.push(items1);
                        }
                        setChipsoption(arrchipsoptionGet)
                        setChipsoptionVariants(arrChipsoptionVariants);
                    }
                    debugger;
                    

                }

            }
        } catch (error) {
            setLoading(false);
        }

    }


    const params = {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    };

    
   

    function handleCloseClick(event) {
        handleAE_CloseClick(''); // pass any argument to the callback
    }

    function handleSaveClick(event) {
        debugger
        // handleAE_SaveClick(event.target.name); // pass any argument to the callback
        try {


            setValErrPNM(false);
            setValErrRibbon(false);
            //setValErrPDES(false);
            setValErrPPRICE(false);

         
                if (PNM != "" && PPRICE != "") {
                    setIsFormInvalid(false);
                    //debugger;
                    if (PrID != "") {
                        // setLoading(true);
                        UpdateTable("U");
                    } else {
                        //setLoading(true);
                        UpdateTable("C");
                    }
                } else {
                    setIsFormInvalid(true);




                    //alert(rfvallmandatoryfields);
                }
            
        } catch (error) {
            setLoading(false);
        }

    }

    async function UpdateTable(crud) {
        debugger
        try {
            setLoading(true);
            let v_Type = '';
            if (crud == 'U') {
                v_Type = 'USRT';
            }
            else {
                v_Type = 'CSRT';
            }
            debugger
            let v_discounttype = discounttype;
            let v_discountvalue = PDISVAL;
            if (discountchecked) {
                v_discountvalue = PDISVAL;
                v_discounttype = discounttype;
            }
            else {
                v_discountvalue = '0';
                v_discounttype = '0';
            }

           // debugger;
            //product variations available 1 or 0
            //PVS: [],//[{"K":"","V":"","P":""},{"K":"","V":"","P":""}],//prod variations
            let isProVariant = "0";
            let arrchipsportionVariants = Object.assign([], chipsportionVariants);
            let arrchipsportionVariantsInsert = [];
            for (var i = 0; i < arrchipsportionVariants.length; i++) {
                isProVariant = "1";
                if (chipsportionVariants[i].vprice === "") {
                    chipsportionVariants[i].vprice = "0";
                }
                //arrchipsportionVariantsInsert.push({ K: chipsportionVariants[i].variant, V: chipsportionVariants[i].vprice, P: chipsportionVariants[i].vactprice });
                arrchipsportionVariantsInsert.push({ K: "PORTION", V: chipsportionVariants[i].variant, P: chipsportionVariants[i].vprice });

              
            }


            //Option
            let isProVariantOption = "0";
            let arrchipsoptionVariants = Object.assign([], chipsoptionVariants);
            let arrchipsoptionVariantsInsert = [];
            for (var i = 0; i < arrchipsoptionVariants.length; i++) {
                isProVariantOption = "1";
                if (chipsoptionVariants[i].vprice === "") {
                    chipsoptionVariants[i].vprice = "0";
                }
                //arrchipsoptionVariantsInsert.push({ K: chipsoptionVariants[i].variant, V: chipsoptionVariants[i].vprice, P: chipsoptionVariants[i].vactprice });
                arrchipsoptionVariantsInsert.push({ K: "OPTION", V: chipsoptionVariants[i].variant, P: chipsoptionVariants[i].vprice });

            }


        
            //debugger;

            // let Req = {
            //     Req: {
            //         Rsk: "UnEuNhoKLZ7IDecLjKILZg==",
            //         Type: v_Type,
            //         CRUD: "",
            //         PID: PrID, //id   
            //         NM: PNM, // name
            //         PD: PDES,//Pdesc
            //         RBN: Ribbon, //ribbon
            //         SKU: "", //SKU
            //         PU: "", //product unit
            //         PBU: "", //product base unit
            //         PIC: v_selectedValueMainImg, //product main icon
            //         PP: PPRICE, //product price
            //         IFD: v_discounttype, //disc type- is flat disc 1 or percentage 0
            //         DR: v_discountvalue, //disc rate
            //         ION: "", //product 1 ON/ 0OFF
            //         NAT: "", //product next available time
            //         IVA: isProVariant, //product variations available 1 or 0
            //         IOA: isProVariantOption, //product options available 1 or 0
            //         IAA: "", //product attributes available 1 or 0
            //         IDL: "", //product is deleted 1 or 0
            //         IA: "", //product is approved 1 or 0
            //         SRT: "", //search tags
            //         CBY: getCookie('roleId'), //created by
            //         KID: v_RTreeID, //root key id-like biz id
            //         PML: v_ImageArray1,//[{"ID":"","URL":"","MT":"","SZ":""},{"ID":"","URL":"","MT":"","SZ":""}],//prod media list MT-media type/SZ - size/ID -1 main image 0 other image
            //         PVS: arrchipsportionVariantsInsert,//[{"K":"","V":"","P":""},{"K":"","V":"","P":""}],//prod variations
            //         POS: arrchipsoptionVariantsInsert,//[{"K":"","V":"","P":""},{"K":"","V":"","P":""}],//prod options
            //         PAS: [],//[{"K":"","V":""},{"K":"","V":""}],//prod attributes
            //         MKL: [],//[{"ID":"","ION":""},{"ID":"","ION":""}],//mapped key list
            //         MGL: [],//[{"ID":""},{"ID":""}]//mapped group list

            //     },
            // };
            let Req ={
                "Req": {
                  "Type": v_Type,
                  "CRUD": "",
                  "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
                  "DevID": "",
                  "RKID":v_RTreeID ,//--root key id
                  "KID":  v_RTreeID ,//--key id
                  "TNO":PPRICE,//--table number 
                  "DC":PNM,//--description
                  "ST":discounttype,//v_discountvalue,//--status
                  "PX":"",//--pax count
                  "CBY": getCookie('roleId') 
                }
              }
            debugger;
            const resp = await postAPI(Req);
            setLoading(false);
            debugger;
            if (!resp) {
                nav("/logout");
            } else {


                let response = JSON.parse(resp);

                if (response.Resp.Sts == 1) {

                    Swal.fire({
                        text: "Successfully Saved",
                    });
                    handleAE_SaveClick('');

                }
                else {
                    let v_ErrDEsc = response.Resp.Desc;

                    Swal.fire({
                        text: v_ErrDEsc,
                    });
                    // handleAE_CloseClick('');
                }

            }



        } catch (error) {
            // debugger;
            setLoading(false);
            console.error(` UpdateTable error: ${error}`);
            //setLoading(false);
        }
    }



    const validate = (e, from) => {

        try {


            if (from == "PDISVAL") {
                const re = /^[0-9.\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                    setPDISVAL(e.target.value);
                }
            }
            if (from == "PPRICE") {
                //const re = /^[0-9\b]+$/;
                const re = /^[0-9.\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                    setPPRICE(e.target.value);
                    if (e.target.value == '') setValErrPPRICE(true); else setValErrPPRICE(false);
                }
            }
            if (from == "Ribbon") {
                const re = /^[0-9a-zA-Z\b]*$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                    setRibbon(e.target.value);
                }
                
            }
            if (from == "PNM") {
                //const re = /^[0-9\b]+$/;
                const re = /^[0-9.\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                    setPNM(e.target.value);
                    if (e.target.value == '') setValErrPNM(true); else setValErrPNM(false);
                }
            }
      
        } catch (error) {
            console.error(`product validate error: ${error}`);
        }

    };

    

    const onChange =  (e) => {

        //debugger;
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
            debugger;
            var fsize = files[0].size
            var fileSize = Math.round((fsize / 1024))
            if (fileSize <= sized) {
                //var name = files.name
            } else {
                SWAlert.fire({
                    text: 'please select file size below '+sized+'kb',
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
            debugger;
            var fsize = files[0].size
            var fileSize = Math.round((fsize / 1024))
            if (fileSize <= sized) {
               
            } else {
                SWAlert.fire({
                    text: 'please select file size below '+sized+'kb',
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
            //debugger;
            setCropUpdateID('');
            setReaderrsltimg(reader.result);
            setImage(reader.result);
            setOpens(true);
            // getUploadedFile(reader.result);
            //setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);

    };

    const handleCloseImgModal = () => {
        setOpenImgModal(false);
    };
    const handleCloses = () => {
        setOpens(false);
    };

    const handleChangeDiscount = (event) => {
        setDiscountChecked(event.target.checked);
    };
    const ddlChangeDiscountType = (event) => {
        debugger;
        setDiscountType(event.target.value);
       
    
    };



    const onCropsave = () => {
        //debugger;
        if (typeof cropper !== "undefined") {
            let v_idata = cropper.getCroppedCanvas().toDataURL();
            //debugger;
            const items = arCR_DATA;
            arCR_DATA = cropperdata
            //setCropperdata([...items, v_idata]);
            //debugger;
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


    const OnDeleteImageClick = (e, id) => {
        //debugger;
        e.stopPropagation();

        let arData = cropperdata.filter(item => item.x != id)


        setCropperdata(arData);
        // debugger;
        if (selectedValueMainImg == '' + id + '') {
            if (arData.length > 0) {
                setSelectedValueMainImg(arData[0].x)
            }
        }
    }

    const OnCropImageClick = (e, id) => {
        //debugger;
        e.stopPropagation();
        let arData = cropperdata.filter(item => item.x == id)

        setCropUpdateID('' + id + '');
        setReaderrsltimg(arData[0].y);
        setImage(arData[0].y);

        setOpens(true);
        //setCropperdata(arData);
    }



    const handleChangeMain = (event) => {
        // debugger;
        setSelectedValueMainImg(event.target.value);
    };



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

                            <FormControlLabel
                                value="top"
                                control={<Radio
                                    checked={selectedValueMainImg === '' + v.x + ''}
                                    onChange={handleChangeMain}
                                    value={v.x}
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                ></Radio>}
                                label="Main"
                                componentsProps={{ typography: { fontSize: '12px' } }}

                                labelPlacement="left"
                            />

                            <br></br>

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

    const handleChangePricingRadio = (event) => {
        setPricingradiovalue(event.target.value);
    };

    //Open Portion Modal
    const AddProductPortions_Click = (e) => {
        e.stopPropagation();
        // alert('d');
        // setPopupTitle('Add Product')
        // setPID('');
        // setProductViewPanel(true);
        // setProductAEPanel(true);
        setProductPortionsPanel(true);
        setOpenPPortionPopup(true);

    };
    //Close Portion Modal
    const handleClosePPortionModal = () => {
        //debugger;
        setProductPortionsPanel(false);
        setOpenPPortionPopup(false);
    };
    const handleAddChipportion = (chipValue, chipIndex) => {
        /**
        chipValue: 'bar'
        chipIndex: 1
        **/
       debugger;
       //handleDeleteChipPortion(chipValue, chipIndex);
      }
     
      const handleDeleteChipPortion = (chipValue, chipIndex) => {
        /**
        chipValue: 'foo'
        chipIndex: 0
        **/
      }
      
    //Portions Add/Remove Change event
    const handleChangeChipPortion = (newChipsportion) => {
        debugger;
        setChipsportion(newChipsportion)
        //debugger;

        let ddcv = chipsportionVariants;
   

        if (newChipsportion.length > 0) {
            for (var i = 0; i < newChipsportion.length; i++) {
                let dd = newChipsportion[i]

                let arExistingData = chipsportionVariants.filter(item => item.variant == dd)

                if (arExistingData.length > 0) {
                    var items1 = { variant: dd, vprice: arExistingData[0].vprice, vactprice: PPRICE };
                    arrChipsportionVariants.push(items1);
                    setChipsportionVariants(arrChipsportionVariants);
                }
                else {
                    var items1 = { variant: dd, vprice: '', vactprice: PPRICE };
                    arrChipsportionVariants.push(items1);
                    setChipsportionVariants(arrChipsportionVariants);
                }
            }
        }
        else {
            setChipsportionVariants([]);
        }
        // setChipsportionVariants()
    }

    //Portions Save Button
    const onSaveProductPortion = () => {
        //debugger;
        setProductPortionsPanel(false);
        setOpenPPortionPopup(false);
    };
    //ddl Change Portion Names
    const ddlChangePortionNames = (event) => {
        setPortionNames(event.target.value);
    };
    //Portion Modal Price validation
    const validatePriceVariant = (i, e, from, varientname) => {
        debugger

        //const re = /^[0-9\b]+$/;
        const re = /^[0-9.\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let dd = chipsportionVariants;
            let newChipsportionVariantsValues = [...chipsportionVariants];
            newChipsportionVariantsValues[i]["vprice"] = e.target.value;
            setChipsportionVariants(newChipsportionVariantsValues);
        }

        if (from == "VARPRICE") {


        }
    };

    //---------------

    //Option Modal Price validation
    const validatePriceVariantOption = (i, e, from, varientname) => {
        debugger
        const re = /^[0-9.\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let dd = chipsoptionVariants;
            let newChipsoptionVariantsValues = [...chipsoptionVariants];
            newChipsoptionVariantsValues[i]["vprice"] = e.target.value;
            setChipsoptionVariants(newChipsoptionVariantsValues);
        }
    
        if (from == "OPTPRICE") {


        }
    };

    //Open Option Modal
    const AddProductOptions_Click = (e) => {
        e.stopPropagation();
        // alert('d');
        // setPopupTitle('Add Product')
        // setPID('');
        // setProductViewPanel(true);
        // setProductAEPanel(true);
        setProductOptionsPanel(true);
        setOpenPOptionPopup(true);

    };
    //Close Option Modal
    const handleClosePOptionModal = () => {
        //debugger;
        setProductOptionsPanel(false);
        setOpenPOptionPopup(false);
    };

    //Options Add/Remove Change event
    const handleChangeChipOption = (newChipsoption) => {
        setChipsoption(newChipsoption)
        debugger;

        let ddcv = chipsoptionVariants;
        //   for (var i = 0; i < chipsoptionVariants.length; i++) {
        //     // if (chipsoptionVariants[i].variant === varientname) {
        //     //     chipsoptionVariants[i].vprice = e.target.value;
        //     //   break;
        //     // }
        //   }


        if (newChipsoption.length > 0) {
            for (var i = 0; i < newChipsoption.length; i++) {
                let dd = newChipsoption[i]

                let arExistingData = chipsoptionVariants.filter(item => item.variant == dd)

                if (arExistingData.length > 0) {
                    var items1 = { variant: dd, vprice: arExistingData[0].vprice, vactprice: PPRICE };
                    arrChipsoptionVariants.push(items1);
                    setChipsoptionVariants(arrChipsoptionVariants);
                }
                else {
                    var items1 = { variant: dd, vprice: '', vactprice: PPRICE };
                    arrChipsoptionVariants.push(items1);
                    setChipsoptionVariants(arrChipsoptionVariants);
                }
            }
        }
        else {
            setChipsoptionVariants([]);
        }
        // setChipsoptionVariants()
    }

    //Option Save Button
    const onSaveProductOption = () => {
        //debugger;
        setProductOptionsPanel(false);
        setOpenPOptionPopup(false);
    };
    //ddl Change Option Names
    const ddlChangeOptionNames = (event) => {
        setOptionNames(event.target.value);
    };


    productPortionsTags = chipsportionVariants.map((v, index) => (
        <>

            <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell style={{ wordBreak:'break-all' }}  padding='0px' component="th" scope="row">
                    {v.variant}
                </TableCell>
                <TableCell padding='0px' align="right">

                    <StyledTextBox
                        autoFocus
                        id="txtPriceVar"

                        type="text"
                        size="small"
                        style={{ width: '100px' }}
                        fullWidth
                        variant="outlined"
                        inputProps={{ maxLength: 7 }}
                        value={v.vprice}
                        onChange={(e) => validatePriceVariant(index, e, "VARPRICE", v.variant)}
                    >
                    </StyledTextBox>

                </TableCell>
                <TableCell padding='0px' align="right">{v.vactprice}</TableCell>

            </TableRow>


        </>
    ));


    productOptionsTags = chipsoptionVariants.map((v, index) => (
        <>

            <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell style={{ wordBreak:'break-all' }} padding='0px'component="th" scope="row">
                    {v.variant}
                </TableCell>
                <TableCell padding='0px'align="right">

                    <StyledTextBox
                        autoFocus
                        id="txtPriceOpt"

                        type="text"
                        size="small"
                        style={{ width: '100px' }}
                        fullWidth
                        variant="outlined"
                        inputProps={{ maxLength: 7 }}
                        value={v.vprice}
                        onChange={(e) => validatePriceVariantOption(index, e, "OPTPRICE", v.variant)}
                    >
                    </StyledTextBox>

                </TableCell>


            </TableRow>


        </>
    ));

    return (
        <>
            <Box sx={{ flexGrow: 1, backgroundColor: '#F6F6F7' }}>
                <Grid container justify="flex-start" alignItems="stretch" spacing={{ xs: 0, md: 3 }} columns={{ xs: 3, sm: 8, md: 12 }}style={{ width: '200%' }}
                
              >
                    
                    <Grid item width='100%' xs={1} md={6}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 3, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Card variant='outlined' style={{}} >
                                <CardContent>
                                    <div style={{ width: "100%", paddingLeft: '10px' }}>
                                        <div style={{ width: '100%', backgroundColor: 'white' }} >
                                            <Typography sx={{ fontSize: 12, textAlign: 'left', fontWeight: 'bold', paddingLeft: '6px' }} color="text.secondary" gutterBottom>
                                               Table Number
                                            </Typography>
                                        </div>


                                        <div style={{ textAlign: 'left' }}>
                            
                                            <StyledTextBox
                                                autoFocus
                                                id="txtPrice"
                                                label="Table"
                                                type="text"
                                                size="small"
                                                fullWidth
                                                variant="outlined"
                                                inputProps={{ maxLength: 2 }}
                                                value={PPRICE}
                                                onChange={(e) => validate(e, "PPRICE")}
                                                error={valErrPPRICE}
                                            >
                                            </StyledTextBox>
                            
                                                    <StyledTextBox
                                                        autoFocus
                                                        id="txtProductName"
                                                        label="No of persons"
                                                        type="text"
                                                        size="small"
                                                        fullWidth
                                                        variant="outlined"
                                                        inputProps={{ maxLength: 2 }}
                                                        value={PNM}
                                                        onChange={(e) => validate(e, "PNM")}
                                                        error={valErrPNM}
                                                    >
                                                    </StyledTextBox>
                                                    <FormControl sx={{ m: 1, Width: 120, paddingTop: '5px' }} size="small">
                                                    <Select 
                                                   
                                                    MenuProps={{
                                                        style: {zIndex: 1000002}
                                                    }}
                                                        value={discounttype}
                                                        onChange={(e)=>ddlChangeDiscountType(e)}
                                                        
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                    >
                                                    <MenuItem value={-1}>Status</MenuItem>
                                                        <MenuItem value={1} >Active</MenuItem>
                                                        <MenuItem value={0}>InActive</MenuItem>
                                                        
                                                    </Select>
                                                </FormControl>

                                        </div>
                                        
                                    </div>


                                </CardContent>
                                
                            </Card>

                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 3, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            

                            <div style={{ textAlign: 'right', width: "100%", padding: '10px' }}>

                                <DiaBtn2 style={{}} variant='outlined' onClick={handleCloseClick}>
                                    Cancel
                                </DiaBtn2>&nbsp;
                                 <DiaBtn1 autoFocus variant="contained" onClick={handleSaveClick} >
                                    Save
                                </DiaBtn1>

                            </div>

                        </Box>
                    </Grid>
                  
                </Grid>
            </Box>






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





            {productPortionsPanel && (
                <>
                    <Dialog style={{ backgroundColor: '#F6F6F7', zIndex: '1000000' }}
                        open={openPPortionPopup}
                        PaperProps={{
                            sx: {
                                // minWidth: '98%',
                                backgroundColor: '#F6F6F7'
                            }
                        }}>
                        <DialogTitle >
                            <Stack direction='row' display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography variant='h6' sx={{ color: '#162D3D' }}>Product Portions</Typography>
                                <Closeicon className='clsup' sx={{ cursor: 'pointer', color: "#32536A", }} onClick={handleClosePPortionModal} />
                            </Stack>
                        </DialogTitle>
                        <DialogContent>
                            <Stack style={{ overflowX: "hidden", overflowY: "auto", maxHeight: "400px" }} direction='row' display='flex' justifyContent='space-between'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 3, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div style={{ width: '100%' }}>




                                        <FormControl sx={{ m: 1, Width: 120, paddingTop: '5px' }} size="small">
                                            <div style={{ width: '100%', backgroundColor: 'white' }} >
                                                <Typography sx={{ fontSize: 12, textAlign: 'left', fontWeight: 'bold', paddingLeft: '6px' }} color="text.secondary" gutterBottom>
                                                    Select portion name
                                                </Typography>
                                            </div>
                                            <Select
                                            MenuProps={{
                                                style: {zIndex: 1000002}
                                            }}
                                                value={portionnames}
                                                onChange={ddlChangePortionNames}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value={"0"}>Size</MenuItem>
                                                {/* <MenuItem value={"1"}>Color</MenuItem> */}
                                            </Select>
                                        </FormControl>


                                        {/* <StyledTextBox
                                            id="txtProductRibbon"
                                            label="Ribbon *"
                                            type="text"
                                            size="small"

                                            fullWidth
                                            variant="outlined"
                                            inputProps={{ maxLength: 10 }}


                                        /> */}


                                    </div>
                                    <div style={{ width: '100%' }}>

                                        <FormControl sx={{ m: 1, Width: 120, paddingTop: '5px' }} size="small">
                                            <div style={{ width: '100%', backgroundColor: 'white' }} >
                                                <Typography sx={{ fontSize: 12, textAlign: 'left', fontWeight: 'bold', paddingLeft: '6px' }} color="text.secondary" gutterBottom>
                                                    Enter choices for this portion (Type and press enter)
                                                </Typography>

                                                <MuiChipsInput disableEdition variant="outlined" hideClearAll size="medium"
                                                    style={{ width: '300px' }} value={chipsportion}
                                                    onChange={(chipsportion) => handleChangeChipPortion(chipsportion)}
                                                    // onDeleteChip={handleDeleteChipPortion}
                                                    // onAddChip={handleAddChipportion}
                                                />
                                            </div>

                                        </FormControl>



                                    </div>

                                </Box>

                            </Stack>
                        </DialogContent>
                        <DialogActions >
                            <DiaBtn2 variant='outlined' onClick={handleClosePPortionModal}>
                                Cancel
                            </DiaBtn2>
                            <DiaBtn1 autoFocus variant="contained" onClick={() => onSaveProductPortion()} >
                                Apply
                            </DiaBtn1>
                        </DialogActions>
                    </Dialog>

                </>
            )}


            {productOptionsPanel && (
                <>
                    <Dialog style={{ backgroundColor: '#F6F6F7', zIndex: '1000000' }}
                        open={openPOptionPopup}
                        PaperProps={{
                            sx: {
                                // minWidth: '98%',
                                backgroundColor: '#F6F6F7'
                            }
                        }}>
                        <DialogTitle >
                            <Stack direction='row' display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography variant='h6' sx={{ color: '#162D3D' }}>Product Options</Typography>
                                <Closeicon className='clsup' sx={{ cursor: 'pointer', color: "#32536A", }} onClick={handleClosePOptionModal} />
                            </Stack>
                        </DialogTitle>
                        <DialogContent>
                            <Stack style={{ overflowX: "hidden", overflowY: "auto", maxHeight: "400px" }} direction='row' display='flex' justifyContent='space-between'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 3, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div style={{ width: '100%' }}>




                                        <FormControl sx={{ m: 1, Width: 120, paddingTop: '5px', display: 'none' }} size="small">
                                            <div style={{ width: '100%', backgroundColor: 'white' }} >
                                                <Typography sx={{ fontSize: 12, textAlign: 'left', fontWeight: 'bold', paddingLeft: '6px' }} color="text.secondary" gutterBottom>
                                                    Select option name
                                                </Typography>
                                            </div>
                                            <Select
                                            MenuProps={{
                                                style: {zIndex: 1000002}
                                            }}
                                                value={optionnames}
                                                onChange={ddlChangeOptionNames}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value={"0"}>Size</MenuItem>
                                                {/* <MenuItem value={"1"}>Color</MenuItem> */}
                                            </Select>
                                        </FormControl>


                                    </div>
                                    <div style={{ width: '100%' }}>

                                        <FormControl sx={{ m: 1, Width: 120, paddingTop: '5px' }} size="small">
                                            <div style={{ width: '100%', backgroundColor: 'white' }} >
                                                <Typography sx={{ fontSize: 12, textAlign: 'left', fontWeight: 'bold', paddingLeft: '6px' }} color="text.secondary" gutterBottom>
                                                    Enter choices for this option (Type and press enter)
                                                </Typography>

                                                <MuiChipsInput disableEdition variant="outlined" hideClearAll size="medium"
                                                    style={{ width: '300px' }} value={chipsoption}
                                                    onChange={(chipsoption) => handleChangeChipOption(chipsoption)}
                                                />
                                            </div>

                                        </FormControl>



                                    </div>

                                </Box>

                            </Stack>
                        </DialogContent>
                    </Dialog>

                </>
            )}




        </>
    );
}