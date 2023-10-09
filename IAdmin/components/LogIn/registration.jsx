import { Box } from "@mui/system";
import logo from "../../../../assets/brand/Logo.png";
import logoGym from '../../../../assets/images/gymlog2.png'

import logoGym1 from '../../../../assets/images/loginlogo.png'
import logoKUN from '../../../../assets/images/kunlogo.png'
import loginScreen from "../../../../assets/images/loginscrrn.png";
import React, { useCallback } from "react";
import { Stack, styled, InputBase, Button, Divider, MenuItem, Select, InputLabel, FormControl, Collapse, InputAdornment, IconButton, TextField } from "@mui/material";
import { Colors } from "../../../../styles/theme";
import MblIcon from "@mui/icons-material/PhoneIphoneTwoTone";
import PwdIcon from "@mui/icons-material/LockOpenTwoTone";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { postAPI } from "../../../../services/apicall";
import { setCookie } from "../../../../common/cks";
import Loading from "../../../../loadingScr";
import { useIntl } from "react-intl";
import { useEffect } from "react";
import axios from "axios";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SWAlert from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  RightTree_ID, Show_Cancel, View_GJS, WebEditor_ID, SADMIN_KEY,
  SADMIN_KEYNM, FromHomeOrSetup, FunctionTypeID, Fn_ContainerID, UPTree_Id, Tree_Ids, ContainerType,
  FunctionCRUDType, FunctionType, accessID, Path_Data
} from "../../../../stateManagement/action";
import './login.css'
import logoNew from "../../../../assets/brand/logonew.png";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { Encrypt } from "../../../../common/tool/Gem";
import { requestForToken } from '../../../../firebaseNotifications/firebase';

export const HeaderLbl = styled(Box)(() => ({
  display: "flex",

  padding: "2px 4px",
  height: "40px",
  justifyContent: "center",
  alignItems: "center",
}));

export const LoginBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 38,
}));

export const LblInvalid = styled("label")(() => ({
  fontSize: "15px",
  display: "flex",
  color: Colors.red,
}));
export const LblError = styled("label")(() => ({
  fontSize: "13px",
  display: "flex",
  color: Colors.red,
  marginLeft: "30px",
}));

export const LblTxt = styled("label")(() => ({
  fontSize: "11px",
  color: Colors.lightGrey,
  fontWeight: "bold",
  //marginLeft: "60px",
  marginBottom: "15px",
}));

export const LblTxt1 = styled("label")(() => ({
  fontSize: "12px",
  color: Colors.textColor,
  fontWeight: "bold",
  //marginLeft: "60px",
  marginBottom: "15px",
}));

export const HeaderTxt = styled("label")(() => ({
  fontSize: "17px",
  color: Colors.loginCl,
  fontWeight: "bold",
  marginLeft: "60px",
  marginBottom: "25px",
}));
export const CreatePin = styled("label")(() => ({
  fontSize: "14px",
  color: "#35AFE2",
  marginLeft: "25px",
  textDecoration: "underline",
  cursor: "pointer",
}));

export const TextBox = styled("div")(({ theme }) => ({
  backgroundColor: Colors.textBg,
  padding: "0 10px",
  // width: "90%",
}));

const Img = styled("img")(() => ({
  marginLeft: "20px",
}));

export const LoginBtn = styled("button")(() => ({
  borderRadius: "20px",
  borderColor: Colors.btnblueclr,
  width: "95%",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "10px",
  backgroundColor: Colors.btnblueclr,
  cursor: 'pointer'
  //marginLeft: "5px",
}));

export const NewRegistrationBtn = styled('button')(() => ({
  borderRadius: "20px",
  backgroundColor: Colors.regist,
  width: "75%",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "10px",
  marginLeft: "25px",
}));

export const StyledNewRegistrationBtn = styled(NewRegistrationBtn)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: ${Colors.regist};
  transition: ${theme.transitions.create(['background-color', 'transform'], {
  duration: theme.transitions.duration.standard,
})};
  &:hover {
    background-color: ${Colors.registhover};
  }
  `}
`;

function Registration() {
  const location = useLocation();
  
  // This will only consider the path without the query string.
  const currentPath = location.pathname;

  const isLogin = currentPath.toLowerCase() === '/reg';
  const marginLeftValue = isLogin ? '40px' : '40px';
  const logoSrc = isLogin ? logoGym1 : logoKUN;
  const logoAlt = isLogin ? "Logo for Login" : "Logo for Staff";

  const [searchParams, setSearchParams] = useSearchParams();
  const queryStrRightTreeId = searchParams.get("righttreeid");
  const queryStrComingFrom = searchParams.get("comingfrom");

  const dispatch = useDispatch();
  const [getCountry, setgetCountry] = useState([]);
  //const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState('');
  const [Name, setName] = useState("");
  const [MobileNo, setMobileNo] = useState("");
  //const [OTP, setOTP] = useState("");

  const [NameError, setNameError] = useState();
  const [ISDError, setISDError] = useState();
  const [MbError, setMbError] = useState();
  const [PassError, setPassEror] = useState();
  const [Login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  let name, phnm, isd, otp = false;
  const intl = useIntl();
  const nav = useNavigate();
  const [timer, setTimer] = useState(29);
  const [tOut, setTOut] = useState(false);
  const [tOutText, setTOutText] = useState("Resend OTP in 00:");
  //const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);

  const [checkedPanel, setCheckedPanel] = useState('1');
  const [checked, setChecked] = useState(false);
  const [editFlag, setEditFlag] = useState(false);

  const [resendOTPText, setResendOTPText] = useState("Resend OTP");

  const [showPassword, setShowPassword] = useState(false);
  const [Passwd, setPasswd] = useState("");



  const [pinpassword, setPinpassword] = useState('');
  const [pinpassError, setPinPassError] = useState();
  const [showPinpassword, setShowPinpassword] = useState(false);
  const [confirmPinpassword, setConfirmPinpassword] = useState('');
  const [confirmPinpassError, setConfirmPinpassError] = useState();
  const [showConfirmPinpassword, setShowConfirmPinpassword] = useState(false);


  const [ISD, setISD] = useState("");
  const [ID, setID] = useState("");
  let v_SADMINKEYID = useSelector((state) => state.SADMINKEY)

  const handlePasswordChange = (e) => {
    const ree = /^[0-9\b]+$/;
    if (e.target.value === "" || ree.test(e.target.value)) {
      setPasswd(e.target.value);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  const handlePINPasswordChange = (e) => {
    const ree = /^[0-9\b]+$/;
    if (e.target.value === "" || ree.test(e.target.value)) {
      setPinpassword(e.target.value);
    }
  };
  const handleClickShowPINPassword = () => {
    //debugger
    setShowPinpassword(!showPinpassword);
  };



  const handleConfirmPINPasswordChange = (e) => {
    const ree = /^[0-9\b]+$/;
    if (e.target.value === "" || ree.test(e.target.value)) {
      setConfirmPinpassword(e.target.value);
    }
  };
  const handleClickShowConfirmPINPassword = () => {
    //debugger
    setShowConfirmPinpassword(!showConfirmPinpassword);
  };


  const handleChange123 = () => {
    setChecked((prev) => !prev);
  };

  const lblLogin = intl.formatMessage({
    id: "login.login",
    defaultMessage: "Login",
  });

  const lblPEP = intl.formatMessage({
    id: "login.pep",
    defaultMessage: "Please Enter OTP",
  });

  const lblPEName = intl.formatMessage({
    id: "login.pename",
    defaultMessage: "Please Enter Name",
  });

  const lblPSISD = intl.formatMessage({
    id: "login.psisdcode",
    defaultMessage: "Please Select Country Code",
  });

  const lblPEMN = intl.formatMessage({
    id: "login.pemn",
    defaultMessage: "Please Enter Mobile Number",
  });

  const lblSendOTP = intl.formatMessage({
    id: "login.sendotp",
    defaultMessage: "Send OTP",
  });

  const lblAlreadyReg = intl.formatMessage({
    id: "login.alreadyreg",
    defaultMessage: "Already registered?",
  });

  const lblIVD = intl.formatMessage({
    id: "login.ivd",
    defaultMessage: "Invalid Login Details",
  });
  const lblMN = intl.formatMessage({
    id: "login.mn",
    defaultMessage: "Mobile Number",
  });
  const lblPWD = intl.formatMessage({
    id: "login.pwd",
    defaultMessage: "New Password",
  });

  const handleNameChange = (e) => {
    //if (e.target.value === "") {
    setName(e.target.value);
    //}
  };
  const handleChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setMobileNo(e.target.value);
    }
  };
  async function GetRootKeyCode() {
    try {
      ////debugger

      let CntryReq = {
        "Req": {
          "Type": "GMDD",
          "CRUD": "RIS",
          "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
          "ID": "",
          "NM": "",
          "SNM": "",
          "ST": "",
          "RS": "",
          "RC": ""
        }
      };

      const resp = await postAPI(CntryReq, true);

      //debugger;
      let response = JSON.parse(resp)
      if (response.Resp.Sts == 1) {

        let arrCountry = JSON.parse(response.Resp.Result);
        //debugger
        if (arrCountry.length > 0) {

          dispatch(SADMIN_KEY(arrCountry[0].SKID));
          dispatch(SADMIN_KEYNM(arrCountry[0].SKNM));
          v_SADMINKEYID = arrCountry[0].SKID;


        }
        else {
          dispatch(SADMIN_KEY(""));
          dispatch(SADMIN_KEYNM(""));
        }

      }
      else {
        dispatch(SADMIN_KEY(""));
        dispatch(SADMIN_KEYNM(""));
      }

    }
    catch (err) {
      console.error(`GetRootKeyCode error: ${err}`);
    }
    finally {

    }
  }


  async function SendOTPClicked() {
    //debugger;
    if (Name == "") {
      setNameError(true);
      name = false;
    }
    else {
      setNameError(false);
      name = true;
    }
    if (country == "" || country == null) {
      setISDError(true);
      isd = false;
    } else {
      setISDError(false);
      isd = true;
    }
    if (MobileNo == "" || MobileNo.length < 9) {
      setMbError(true);
      phnm = false;
    } else {
      setMbError(false);
      phnm = true;
    }

    if (name && isd && phnm) {
      let obj = getCountry.find(o => o.SNM === country);
      //console.log(obj);
      if (obj != null) {
        setID(obj.ID);
        setISD(obj.ISD);

        // Send Request to API to Send OTP
        sendOTP(obj.ID, obj.ISD);
      }
    }
  }

  // Send Request to API to Send OTP
  async function sendOTP(ID, ISD) {
    //debugger;
    try {
      setLoading(true);
      var Req = {
        Req: {
          Type: "PCAR",
          CRUD: "",
          Rsk: "UnEuNhoKLZBdIcLjKILZg==",
          PhNo: MobileNo,   // user mob no
          NM: Name,         // user name [optional when sign-in]
          CC: ID,           // user country code
          ISD: ISD,         // ISD code[to send otp]
          IEU: 1            // New User = 0 / Exist User = 1
        },
      };
      //var stockDataResp = [];
      Req = JSON.stringify(Req);
      ////debugger;
      var rows = await postAPI(Req, true);
      debugger
      //console.log(rows);
      if (!rows) {
        setLoading(false);
        nav("/logout");
      } else {
        let jsonObject = JSON.parse(rows);

        if (jsonObject.Resp.Sts == "1") {
          setLoading(false);
          if (!editFlag) {
            clearTimeout(setTimer(29));
            setTOut(true);
          }
          else {
            setPasswd('');  //Clear OTP
          }
          setChecked(!checked); // Open OTP Verification Screen
          setCheckedPanel('2');
        }
        else if (jsonObject.Resp.Sts == "0") {
          setLoading(false);
          if (jsonObject.Resp.Desc.includes(700007)) {
            // 700007::Max OTP count reached, please try next day or contact customer care.
            SWAlert.fire({ text: jsonObject.Resp.Desc.replace("700007::", "") });
          }
          // else if (jsonObject.Resp.Desc.includes(700101)) {
          //   // 700101::This mobile number not registered with us. Then navigate to Login Screen
          //   SWAlert.fire({text: jsonObject.Resp.Desc.replace("700101::", "")});
          //   nav("/");
          // }
          else if (jsonObject.Resp.Desc.includes(700102)) {
            // 700102::This mobile number already registered with us. Then navigate to Login Screen
            SWAlert.fire({ text: jsonObject.Resp.Desc.replace("700102::", "") });
            nav("/logout");
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function OldRegistrationClicked() {
    ////debugger;
    if (queryStrRightTreeId != null && queryStrComingFrom != null) {
      // If coming from Cart if login then show the Cart Page
      const params = { righttreeid: queryStrRightTreeId, comingfrom: queryStrComingFrom };
      if(isLogin)
        nav(`/login?${createSearchParams(params)}`);
      else
        nav(`/staff?${createSearchParams(params)}`);
    }
    else {
      if(isLogin)
      nav("/login"); // Map to iSaucers Page after Login
      else
      nav("/staff");
    }
  }

  let KEY = "AIzaSyDZZZOCatwYlKWV5d3mXi7AsBj3VcBRyRY";
  function getCourrentCountryCode() {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KEY}`;
      api(url);
    });
    function api(url) {
      axios
        .post(url)
        .then((response) => {
          ////debugger;
          const data = response.data;
          const results = data.results;
          for (var i = 0; i < results.length; i++) {
            if (results[i].types[0] === "country") {
              ////debugger;
              //setCountryCode(results[i].address_components[0].short_name);
              setCountry(results[i].address_components[0].short_name); //IN
            }
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  //requestForToken();

  useEffect(() => {
    if (currentPath === '/login') { //login

    } 
    else{ //Staff

    }

    requestForToken();
    ////debugger;
    setCheckedPanel('1');
    getCourrentCountryCode();
    loadCountryCode();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(oldCount => oldCount - 1);
    }, 1000);

    if (timer <= 0) {
      setTOut(false);
      setTOutText("Resend OTP");
    }
    else if (timer > 0) {
      setTOutText("Resend OTP in 00:");
    }

    return () => {
      // Since useEffect dependency array is empty, this will be called only on unmount
      clearInterval(intervalId);
    };
  }, [timer]);  //, timeOutCallback

  const CntryReq = {
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

  async function loadCountryCode() {
    try {
      ////debugger
      setLoading(true);
      const resp = await postAPI(CntryReq, true);
      let response = JSON.parse(resp)
      if (response.Resp.Sts == 1) {
        setgetCountry(JSON.parse(response.Resp.Result));
        setLoading(false);

        let arrCountry = JSON.parse(response.Resp.Result);

        if (arrCountry.length > 0) {
          dispatch(SADMIN_KEY(arrCountry[0].SKID));
          dispatch(SADMIN_KEYNM(arrCountry[0].SKNM));
        }
        else {
          dispatch(SADMIN_KEY(""));
          dispatch(SADMIN_KEYNM(""));
        }

        // response.Resp.Result
        ////debugger
      }
      else {
        dispatch(SADMIN_KEY(""));
        dispatch(SADMIN_KEYNM(""));
      }
      //console.log(resp)
    }
    catch (err) {
      console.error(`GET error: ${err}`);
    }
    finally {
      setLoading(false);
    }
  }

  const CountryList = getCountry.map(y => (
    <MenuItem key={y.SNM} value={y.SNM}>{y.ISD} {' - '} {y.NM}</MenuItem>
  ))

  const OnCountrySelect = (event) => {
    setCountry(event.target.value);
  }


  function OnOTPSubmit() {
    // dispatch(RightTree_ID(v_SADMINKEYID))
    // dispatch(View_GJS(v_SADMINKEYID))
    // dispatch(WebEditor_ID(v_SADMINKEYID))
    // dispatch(Show_Cancel(v_SADMINKEYID))
    // LoginClicked()
    //debugger;
    if (Passwd == "") {
      setPassEror(true);
      otp = false;
    }
    else {
      setPassEror(false);
      otp = true;
    }

    if (otp) {
      // Set PIN

      ValidateOTP();
    }
  }

  // Login with OTP
  async function ValidateOTP() {
    ////debugger;
    try {
      setLoading(true);
      var Req = {
        Req: {
          Type: "PCOV",
          CRUD: "",
          Rsk: "UnEuNhoKLZBdIcLjKILZg==",
          PhNo: MobileNo,   // user mob no
          Email: "",        // [optional]
          RSP: Passwd,      // OTP
          ISD: ISD          // ISD
        },
      };
      //var stockDataResp = [];
      Req = JSON.stringify(Req);
      ////debugger;
      var rows = await postAPI(Req, true);
      //console.log(rows);
      if (!rows) {
        setLoading(false);
        nav("/logout");
      } else {
        let jsonObject = JSON.parse(rows);
        if (jsonObject.Resp.Sts == "1") {
          setLoading(false);
          setCheckedPanel('3');
        }
        else if (jsonObject.Resp.Sts == "0") {
          setLoading(false);
          // 500019::Invalid OTP.
          if (jsonObject.Resp.Desc.includes(500019)) {
            //SWAlert.fire({text: jsonObject.Resp.Desc.replace("500019::", "")});
            SWAlert.fire({ text: 'Invalid OTP. Please enter valid six-digit OTP!' });
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }


  function OnLogin() {

    dispatch(RightTree_ID(v_SADMINKEYID))
    dispatch(View_GJS(v_SADMINKEYID))
    dispatch(WebEditor_ID(v_SADMINKEYID))
    dispatch(Show_Cancel(v_SADMINKEYID))

    LoginClicked()
  }



  // Login Clicked
  //***************
  async function LoginClicked() {
    //debugger;
    if (pinpassword == "" || pinpassword.length < 6) {
      setPinPassError(true);
    }
    else {
      setPinPassError(false);
    }

    if (confirmPinpassword == "" || confirmPinpassword.length < 6) {
      setConfirmPinpassError(true);
    }
    else {
      setConfirmPinpassError(false);
    }




    if (pinpassword != "" && confirmPinpassword != "") {
      if (pinpassword.length == 6 && confirmPinpassword.length == 6) {
        if (pinpassword === confirmPinpassword) {
          // passwords match, do something
          // Login with OTP
          LoginWithPIN();
        }
        else {
          if (pinpassword != "" && confirmPinpassword != "") {
            SWAlert.fire({ text: 'PIN not matched!' });
          }
        }
      }

      // passwords do not match, show error
    }

  }


  async function encryptPwd(val) {
    setLoading(true);
    const enc = await Encrypt(val);
    setLoading(false);
    return enc;
  }
  async function LoginWithPIN() {
    requestForToken();
    ////debugger;
    try {
      const token = localStorage.getItem('tkn') || '';
      setLoading(true);
      let encpwd = await encryptPwd(pinpassword);
      //debugger;
      var Req = {
        Req: {
          Type: "UUPG",
          CRUD: "",
          Rsk: "UnEuNhoKLZBdIcLjKILZg==",
          PhNo: MobileNo,   // user mob no
          ISD: ISD,
          Email: "",        // [optional]
          UP: encpwd,  //--pin
          AM: "",
          UFT: token,
        },
      };
      //var stockDataResp = [];
      Req = JSON.stringify(Req);
      //debugger;
      var rows = await postAPI(Req, true);
      //console.log(rows);
      if (!rows) {
        setLoading(false);
        nav("/logout");
      } else {
        let jsonObject = JSON.parse(rows);
        if (jsonObject.Resp.Sts == "1") {
          setCookie("userID", JSON.parse(jsonObject.Resp.Result)[0].MP, 1);
          setCookie("userName", JSON.parse(jsonObject.Resp.Result)[0].NM, 1);
          let roleAccess = JSON.parse(jsonObject.Resp.Result);
          setCookie("roleId", JSON.parse(jsonObject.Resp.Result)[0].ID, 1)
          setCookie("roleAccess", roleAccess[0].RID, 1);
          setLoading(false);
          // if (queryStrRightTreeId != null && queryStrComingFrom != null) {
          //   // If coming from Cart if login then show the Cart Page
          //   const params = { righttreeid: queryStrRightTreeId, comingfrom: queryStrComingFrom };
          //   nav(`/iSaucers?${createSearchParams(params)}`);
          // }
          // else {
          //   nav("/iSaucers"); // Map to iSaucers Page after Login
          // }
          if(isLogin){
            localStorage.setItem('isLogin','M') 
            nav("/logout"); // Map to iSaucers Page after Login
          }
          else{
            localStorage.setItem('isLogin','S') 
            nav("/logout");
          }

          dispatch(FromHomeOrSetup('Home')); // If fromWhere == Home || fromWhere == Setup
          dispatch(ContainerType('H'))
          dispatch(FunctionCRUDType(""));
          dispatch(FunctionType(''))
          dispatch(FunctionTypeID(''))
          dispatch(Fn_ContainerID(''))
          dispatch(accessID(1));
          dispatch(Path_Data('isView'));

          dispatch(RightTree_ID(''));
          dispatch(UPTree_Id(''));
          dispatch(Tree_Ids(''));


        }
        else if (jsonObject.Resp.Sts == "0") {
          setLoading(false);
          // 500019::Invalid OTP.
          if (jsonObject.Resp.Desc.includes('500019')) {
            // SWAlert.fire({text: jsonObject.Resp.Desc.replace("500019::", "")});


          }
          else if (jsonObject.Resp.Desc.includes('500009')) {
            SWAlert.fire({ text: jsonObject.Resp.Desc.replace("500009::", "") });

          }
          else {
            SWAlert.fire({ text: jsonObject.Resp.Desc });

          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function EditMobileNumberClicked() {
    setChecked(!checked);
    setCheckedPanel('1');
    // return false;
  }

  async function ResendOTPClicked() {
    if (!tOut) {
      // Send Request to API to Send OTP
      reSendOTP();
      setPasswd('');  //Clear OTP
    }
  }

  // Send Request to API to Send OTP
  async function reSendOTP() {
    ////debugger;
    try {
      setLoading(true);
      var Req = {
        Req: {
          Type: "PCAR",
          CRUD: "",
          Rsk: "UnEuNhoKLZBdIcLjKILZg==",
          PhNo: MobileNo,   // user mob no
          //NM: Name,       // user name [optional when sign-in]
          CC: ID,           // user country code
          ISD: ISD,         // ISD code[to send otp]
          IEU: ""           // For Resend we need to make this empty
        },
      };
      //var stockDataResp = [];
      Req = JSON.stringify(Req);
      ////debugger;
      var rows = await postAPI(Req, true);
      //console.log(rows);
      if (!rows) {
        setLoading(false);
        //nav("/");
      } else {
        let jsonObject = JSON.parse(rows);

        if (jsonObject.Resp.Sts == "1") {
          setLoading(false);
          clearTimeout(setTimer(29));
          setTOut(true);
        }
        else if (jsonObject.Resp.Sts == "0") {
          setLoading(false);
          // 700007::Max OTP count reached, please try next day or contact customer care.
          if (jsonObject.Resp.Desc.includes(700007)) {
            SWAlert.fire({ text: jsonObject.Resp.Desc.replace("700007::", "") });
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div style={{background:`url(${loginScreen})`,backgroundSize:'cover',}} className="loginscreendiv">

          <HeaderLbl>{Login && <LblInvalid>{lblIVD}</LblInvalid>}</HeaderLbl>
          <div className="LoginBox">
            <Stack style={{ width: "260px" }} spacing={1}>
              {/* <Img src={logoNew} height="100px" width="273px" sx={{ position:'relative', right:'38px' }}></Img> */}
              {/* <Stack direction={'row'} style={{ marginLeft: '40px', padding: '10px', width: '200px', height: '80px' }} >
                <img src={logoGym1} width='100%' ></img>
              </Stack> */}
              <Stack 
                direction={'row'} 
                style={{ marginLeft: marginLeftValue, padding: '10px', width: '200px', height: '100px' }} 
              >
                <img src={logoSrc} width='100%' alt={logoAlt} />
              </Stack>

              <Stack direction="row">
                <HeaderTxt>New Registration</HeaderTxt>
              </Stack>
              <Box>
                <Box sx={{ "& > :not(style)": { display: "flow", justifyContent: "space-around", width: 280 } }}>
                  <div>
                    <Collapse in={(checkedPanel == '1' ? true : false)} >
                      <Box sx={{ "& > :not(style)": { display: "flex", justifyContent: "space-around" } }} >
                        <Stack direction="row" spacing={2} alignItems='center'>
                          {/* <AssignmentIndIcon color="icon" ></AssignmentIndIcon > */}

                          <TextField
                            size="small"
                            variant="outlined"
                            label="User Name"
                            autoFocus
                            value={Name}
                            onChange={handleNameChange}
                            fontWeight="40px"
                            autoComplete="new-password"
                            inputProps={{ maxLength: 50 }}
                            type="text"
                            onKeyPress={(e) => {
                              if (e.key == "Enter") {
                                e.preventDefault();
                                SendOTPClicked();
                              }
                            }}
                        
                            sx={{
                              position: 'relative', bottom: '10px',
                              width: '100%',
                              borderRadius: '5px',
                              backgroundColor: 'rgba(218, 225, 233, 0.5)', // Background color with opacity
                              color: 'white',
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  border: 'none', // Remove outline border
                                  color: 'white',
                                },
                                '&:hover fieldset': {
                                  border: 'none', // Remove outline border on hover
                                },
                                '&.Mui-focused fieldset': {
                                  border: 'none', // Remove outline border when focused
                                },
                              },
                              '& .MuiInputLabel-root': {
                                color: 'white', // Label color
                              },
                              '& .MuiInputBase-input:focus-within': {
                                color: 'white', // Change text color when input is focused
                              },
                              '& .MuiInputBase-input': {
                                color: 'white', // Change text color when input is focused
                              },
                            }}
                          />
                        </Stack>
                        {NameError && (
                          <Stack>
                            <LblError>{lblPEName}</LblError>
                          </Stack>
                        )}
                        <Stack direction="row" spacing={2} alignItems={"center"} paddingBottom={"1px"}>
                          <FormControl variant="outlined" sx={{ m: 1, width: '47%', maxWidth: '47%',  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                                                                border: 'rgba(218, 225, 233, 0.1)',

                                                                            }, }}>
                            <Stack direction="row"  >
                              <InputLabel id="demo-simple-select-outlined-label" style={{color:'white'}}>Country Code</InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={country}
                                onChange={OnCountrySelect}
                                label="Country Code"
                                required
                                size="small"

                                sx={{
                                  backgroundColor: 'rgba(218, 225, 233, 0.5)',
                                  color: 'white',
                                  paddingRight: '12px',
                                  width: '100%',
                                  overflow: 'hidden',
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                  borderRadius: '5px',
                                  '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      border: 'none', // Remove outline border
                                      color: 'white',
                                    },
                                    '&:hover fieldset': {
                                      border: 'none', // Remove outline border on hover
                                    },
                                    '&.Mui-focused fieldset': {
                                      border: 'none', // Remove outline border when focused
                                      color: 'white',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: 'none', // Remove default border color
                                      color: 'white',
                                    },
                                    '& .MuiInputBase-input': {
                                      color: 'white', // Change text color when input is focused
                                      color: 'white',
                                    },
                                  },
                                }}
                              >
                                {CountryList}
                              </Select>
                            </Stack>
                          </FormControl>
                          <FormControl sx={{ m: 1, width: '65%', maxWidth: '65%' ,   color: 'white',}} variant="outlined">
                            <TextField
                              size="small"
                              variant="outlined"
                              autoComplete="new-password"
                              label="Mobile Number"
                              name="name"
                        
                              value={MobileNo}
                              onChange={handleChange}
                              inputProps={{ maxLength: 15 }}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  SendOTPClicked();
                                }
                              }}
                           
                              sx={{
                                // opacity:'0.5',
borderRadius:'5px',
                                
                                backgroundColor: 'rgba(218, 225, 233, 0.5)',
                                color: 'white',
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    border: 'none', // Remove outline border
                                    color: 'white',
                                  },
                                  '&:hover fieldset': {
                                    border: 'none', // Remove outline border on hover
                                    color: 'white',
                                  },
                                  '&.Mui-focused fieldset': {
                                    border: 'none', // Remove outline border when focused
                                    color: 'white',
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  color: 'white', // Label color
                                },
                                '& .MuiInputBase-input:focus-within': {
                                  color: 'white', // Change text color when input is focused
                                },
                                '& .MuiInputBase-input': {
                                  color: 'white', // Change text color when input is focused
                                },
                                '& .MuiOutlinedInput-select': {
                                  color: 'white', // Change select option text color
                                },
                              }}
                            />
                          </FormControl>


                        </Stack>
                        {ISDError && (
                          <Stack>
                            <LblError>{lblPSISD}</LblError>
                          </Stack>
                        )}
                        {MbError && (
                          <Stack>
                            <LblError>{lblPEMN}</LblError>
                          </Stack>
                        )}

                        <Stack style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                          <Stack style={{ width: '100%', paddingLeft: '40px' }} paddingTop={"10px"}>
                            <LoginBtn style={{ cursor: 'pointer', height: '40px', width: '170px' }} className="button--standard button--3d button--gradient" variant="contained" onClick={SendOTPClicked}>
                              <label className="LogLbl">{lblSendOTP}</label>
                            </LoginBtn>
                          </Stack>
                        </Stack>

                        {/* <Stack paddingTop={"10px"}>

                         
                          <LoginBtn className="btnOrderTrackBlue" variant="contained" onClick={SendOTPClicked}>
                            <label className="LogLbl"> {lblSendOTP}</label>
                          </LoginBtn>
                        </Stack> */}
                        <Stack paddingTop={"10px"}>
                        <div style={{ width: "100%",height:'10px' }}></div>
                          {/* <Divider style={{ width: "240px" }}>or</Divider> */}
                        </Stack>
                        <Stack style={{ justifyContent: 'center' }} direction="row">
                          <label style={{ paddingRight: '5px', fontSize: "14px", color: "#515151",  }}>Already Registrered?</label>

                          <Stack direction="row" onClick={OldRegistrationClicked} >
                            <label style={{ fontSize: "14px", color: "#EC6331", cursor: 'pointer' }}
                            >Login now</label>
                          </Stack>
                          {/* <StyledNewRegistrationBtn className="newBtn" variant="contained" onClick={OldRegistrationClicked}>
                            <label className="LogLbl"> {lblAlreadyReg}</label>
                            </StyledNewRegistrationBtn> */}
                        </Stack>
                      </Box>
                    </Collapse>
                    <Collapse in={(checkedPanel == '2' ? true : false)}>
                      <Box sx={{ "& > :not(style)": { display: "flex", justifyContent: "space-around" } }} >
                        <Stack style={{ width: "260px", textAlign: "center" }}>
                          <LblTxt >We sent you a code to verify your mobile number {MobileNo}</LblTxt>
                          <LblTxt1>Enter your OTP code here</LblTxt1>
                        </Stack>
                        <Stack style={{ width: "260px", textAlign: "center" }}>
                          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <TextBox sx={{ paddingLeft: "70px" }}>
                              <InputBase
                                placeholder="OTP"
                                fontWeight="40px"
                                value={Passwd}
                                onChange={handlePasswordChange}
                                inputProps={{ maxLength: 6 }}
                                autoComplete="off"
                                type={showPassword ? 'text' : 'password'}
                                className="pwd"
                                onKeyPress={(e) => {
                                  if (e.key == "Enter") {
                                    e.preventDefault();
                                    OnOTPSubmit();
                                  }
                                }}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                            </TextBox>
                          </FormControl>
                        </Stack>
                        {PassError && (
                          <Stack>
                            <LblError>Please enter your six-digit OTP</LblError>
                          </Stack>
                        )}
                        <Stack>
                          {/* disabled={!tOut} */}
                          <LoginBtn onClick={OnOTPSubmit}>
                            {/* <label className="LogLbl">{lblLogin}</label> */}
                            <label className="LogLbl">Submit</label>
                          </LoginBtn>
                        </Stack>
                        <Stack spacing={2} direction="row" style={{ fontSize: "11px", marginTop: "20px" }}>
                          <Button color={tOut ? 'cancel' : 'primary'} component="button" variant="text" onClick={ResendOTPClicked} style={{ fontSize: "11px" }}>
                            {tOutText}{timer > 0 && <>{timer}</>}
                          </Button>
                          <Button component="button" variant="text" onClick={EditMobileNumberClicked} style={{ fontSize: "11px" }}>
                            Edit Mobile Number
                          </Button>
                        </Stack>
                      </Box>
                    </Collapse>
                    <Collapse in={(checkedPanel == '3' ? true : false)} >
                      <Box sx={{ "& > :not(style)": { display: "flex", justifyContent: "space-around" } }} >
                        <Stack style={{ width: "260px", textAlign: "center" }}>
                          <LblTxt >Your mobile number {MobileNo}</LblTxt>
                          <LblTxt1>Set PIN</LblTxt1>
                        </Stack>
                        <Stack style={{ width: "260px", textAlign: "center" }}>
                          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <TextBox sx={{ paddingLeft: "70px" }}>
                              <InputBase
                                placeholder="PIN"
                                fontWeight="40px"
                                value={pinpassword}
                                onChange={handlePINPasswordChange}
                                inputProps={{ maxLength: 6 }}
                                autoComplete="off"
                                type={showPinpassword ? 'text' : 'password'}
                                className="pwd"
                                onKeyPress={(e) => {
                                  if (e.key == "Enter") {
                                    e.preventDefault();
                                    OnLogin();
                                  }
                                }}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPINPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showPinpassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                            </TextBox>
                          </FormControl>
                        </Stack>
                        {pinpassError && (
                          <Stack>
                            <LblError>Please enter a six-digit valid PIN</LblError>
                          </Stack>
                        )}
                        <Stack style={{ width: "260px", textAlign: "center" }}>
                          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <TextBox sx={{ paddingLeft: "70px" }}>
                              <InputBase
                                placeholder="Confirm PIN"
                                fontWeight="40px"
                                value={confirmPinpassword}
                                onChange={handleConfirmPINPasswordChange}
                                inputProps={{ maxLength: 6 }}
                                autoComplete="off"
                                type={showConfirmPinpassword ? 'text' : 'password'}
                                className="pwd"
                                onKeyPress={(e) => {
                                  if (e.key == "Enter") {
                                    e.preventDefault();
                                    OnLogin();
                                  }
                                }}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowConfirmPINPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showConfirmPinpassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                            </TextBox>
                          </FormControl>
                        </Stack>
                        {confirmPinpassError && (
                          <Stack>
                            <LblError>Please enter valid confirm PIN</LblError>
                          </Stack>
                        )}
                        <Stack>
                          {/* disabled={!tOut} */}
                          <LoginBtn onClick={OnLogin}>
                            {/* <label className="LogLbl">{lblLogin}</label> */}
                            <label className="LogLbl">Submit</label>
                          </LoginBtn>
                        </Stack>
                        <Stack paddingTop={"10px"}>
                          <Divider style={{ width: "240px" }}>or</Divider>
                        </Stack>
                        <Stack>
                          <StyledNewRegistrationBtn className="newBtn" variant="contained" onClick={OldRegistrationClicked}>
                            <label className="LogLbl"> {lblAlreadyReg}</label>
                          </StyledNewRegistrationBtn>
                        </Stack>
                      </Box>
                    </Collapse>
                  </div>
                </Box>
              </Box>
            </Stack>
          </div>

        </div>
      )}
    </>
  );
}

export default Registration;
