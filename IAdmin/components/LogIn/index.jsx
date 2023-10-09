import { Box } from "@mui/system";
import logo from "../../../../assets/brand/Logo.png";
import logoNew from "../../../../assets/brand/logonew.png";
import logoGym from '../../../../assets/images/gymlog2.png'
import logoGym1 from '../../../../assets/images/loginlogo.png'
import logoKUN from '../../../../assets/images/kunlogo.png'
import imgMobile from "../../../../assets/images/sc_mobile.png";
import imgPwd from "../../../../assets/images/sc_pwd.png";
import loginScreen from "../../../../assets/images/loginscrrn.png";
import React, { useCallback } from "react";
import { Stack, styled, InputBase, Button, Divider, MenuItem, Select, InputLabel, FormControl, Collapse, InputAdornment, IconButton, TextField, useMediaQuery } from "@mui/material";
import theme, { Colors } from "../../../../styles/theme";
import MblIcon from "@mui/icons-material/PhoneIphoneTwoTone";
import PwdIcon from "@mui/icons-material/LockOpenTwoTone";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { postAPI } from "../../../../services/apicall";
import { setCookie } from "../../../../common/cks";
import configData from "../../../../config.json";
//import { Encrypt } from "../../../../common/tool/Gem";
import Loading from "../../../../loadingScr";
import { useIntl } from "react-intl";
import { useEffect } from "react";
import axios from "axios";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SWAlert from "sweetalert2";
import { PickersToolbarButton } from "@mui/x-date-pickers/internals";
import {
  RightTree_ID, Show_Cancel, View_GJS, WebEditor_ID, E_DISPLAY, SADMIN_KEY, SADMIN_KEYNM, FromHomeOrSetup, UPTree_Id
  , ContainerType, FunctionCRUDType, FunctionType, FunctionTypeID, Fn_ContainerID, Tree_Ids, accessID, Path_Data,
  Home_Viewtype, QuickMenuID, PDashboard_Open
} from "../../../../stateManagement/action";
import { connect, useDispatch, useSelector } from "react-redux";
import { event } from "jquery";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { isMobile } from '../../../../pages/WebEditor/utils/helpers';
import { Encrypt } from "../../../../common/tool/Gem";
import Swal from "sweetalert2";
import { requestForToken } from '../../../../firebaseNotifications/firebase';

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
  maxHeight: '610px',
  height: '90%'
}));

export const LblInvalid = styled("label")(() => ({
  fontSize: "15px",
  display: '#EC6331',
  color: Colors.red,
}));
export const LblError = styled("label")(() => ({
  fontSize: "13px",
  display: "flex",
  color: '#EC6331',
  marginLeft: "30px",
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
  width: "90%",
}));

const Img = styled("img")(() => ({
  marginLeft: "20px",
}));

export const LoginBtn = styled("button")(() => ({
  borderRadius: "20px",
  borderColor: Colors.secondary,
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

// const mapDispatchtoProps = dispatch => {
//   return {
//     RightID:(value)=>dispatch(RightTree_ID(value)),
//     ViewmenuID: (value) => dispatch(View_GJS(value)),
//     WebeditID: (value) => dispatch(WebEditor_ID(value)),
//     ShowID: (value) => dispatch(Show_Cancel(value)),
//   }
// }

function IAdminL(props) {
  const IsMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  // This will only consider the path without the query string.
  const currentPath = location.pathname;

  const isLogin = currentPath.toLowerCase() === '/login' || currentPath.toLowerCase() === '/';
  const marginLeftValue = isLogin ? '60px' : '50px';
  const logoSrc = isLogin ? logoGym1 : logoKUN;
  const logoAlt = isLogin ? "Logo for Login" : "Logo for Staff";


  const [searchParams, setSearchParams] = useSearchParams();
  const queryStrRightTreeId = searchParams.get("righttreeid");
  const queryStrComingFrom = searchParams.get("comingfrom");
  //
  const FJID = configData.FjId;
  const FJTEMPID = configData.FjTempID;
  const FJPID = configData.FJPID;
  const FJNAME = configData.FJname;
  const [getCountry, setgetCountry] = useState([]);

  const [country, setCountry] = useState('');
  const [MobileNo, setMobileNo] = useState("");
  const [LoginPasswd, setLoginPasswd] = useState("");
  const [LoginPassError, setLoginPassEror] = useState();

  const [Passwd, setPasswd] = useState("");

  const [isLoginOTPTextFieldDisabled, setIsLoginOTPTextFieldDisabled] = useState(true);

  const [pinpassword, setPinpassword] = useState('');
  const [pinpassError, setPinPassError] = useState();
  const [showPinpassword, setShowPinpassword] = useState(false);
  const [confirmPinpassword, setConfirmPinpassword] = useState('');
  const [confirmPinpassError, setConfirmPinpassError] = useState();
  const [showConfirmPinpassword, setShowConfirmPinpassword] = useState(false);

  const [ISDError, setISDError] = useState();
  const [MbError, setMbError] = useState();
  const [PassError, setPassEror] = useState();
  const [Login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  let phnm, isd, otp, pwd, lgnpwd = false;

  const intl = useIntl();
  const nav = useNavigate();

  const [timer, setTimer] = useState(29);
  const [tOut, setTOut] = useState(true);
  const [tOutText, setTOutText] = useState("Resend OTP in 00:");
  //const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);

  const [checked, setChecked] = useState(false);
  const [checkedPanel, setCheckedPanel] = useState('1');

  const [editFlag, setEditFlag] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [ISD, setISD] = useState("");
  const [ID, setID] = useState("");

  let v_SADMINKEYID = useSelector((state) => state.SADMINKEY)
  const accid = searchParams.get("accid");
  const Fname = searchParams.get("cn");
  const Fn = searchParams.get("fn");
  const Popupopen = searchParams.get("fnopen");
  const Vid = searchParams.get("vid");
  const Vpid = searchParams.get("vpid");
  const QID = searchParams.get("qid");
  const Exe = searchParams.get("exe");
  const Fid = searchParams.get("fid");
  const Isa = searchParams.get("Isa");
  const Lid = searchParams.get("lid");
  const Menuname = searchParams.get("mn");
  const Mid = searchParams.get("mid");
  const mpid = searchParams.get("mpid");
  const Mnopen = searchParams.get("mnopen");
  const Supfnopen = searchParams.get("supfnopen");
  const qs_Page = searchParams.get("page");
  const pid = searchParams.get("pid");
  //requestForToken();

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

    setShowPinpassword(!showPinpassword);
  };



  const handleConfirmPINPasswordChange = (e) => {
    const ree = /^[0-9\b]+$/;
    if (e.target.value === "" || ree.test(e.target.value)) {
      setConfirmPinpassword(e.target.value);
    }
  };
  const handleClickShowConfirmPINPassword = () => {

    setShowConfirmPinpassword(!showConfirmPinpassword);
  };


  const lblLogin = intl.formatMessage({
    id: "login.login",
    defaultMessage: "Login",
  });
  const lblCPP = intl.formatMessage({
    id: "login.cpp",
    defaultMessage: "Create PIN/Forgot Password",
  });

  const lblPEP = intl.formatMessage({
    id: "login.pep",
    defaultMessage: "Please enter your six-digit password",
  });

  const lblPEMN = intl.formatMessage({
    id: "login.pemn",
    defaultMessage: "Please Enter Mobile Number",
  });

  const lblPSISD = intl.formatMessage({
    id: "login.psisdcode",
    defaultMessage: "Please Select Country Code",
  });

  const lblSendOTP = intl.formatMessage({
    id: "login.sendotp",
    defaultMessage: "Send OTP",
  });


  const lblSL = intl.formatMessage({
    id: "login.al",
    defaultMessage: "LOGIN",
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
    defaultMessage: "Password",
  });
  const handleChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setMobileNo(e.target.value);
      setCookie("mobileno", e.target.value);
    }
    //setIsLoginOTPTextFieldDisabled(true);
    //setLoginPasswd('');
    //setLoginPassEror(false);

  };

  const handleChange1 = (e) => {


    const ree = /^[0-9\b]+$/;
    if (e.target.value === "" || ree.test(e.target.value)) {
      setLoginPasswd(e.target.value);
    }
  };

  async function SendLoginOTPClicked(event) {

    setIsLoginOTPTextFieldDisabled(true);
    setLoginPasswd('');
    setLoginPassEror(false);

    if (country == "" || country == null) {
      event.preventDefault()
      setISDError(true);
      isd = false;
    } else {
      setISDError(false);
      isd = true;
    }

    if (MobileNo == "" || (MobileNo.length < 9)) {
      event.preventDefault()
      setMbError(true);
      phnm = false;
    } else {
      setMbError(false);
      phnm = true;
    }

    if (isd && phnm) {
      event.preventDefault()
      let obj = getCountry.find(o => o.SNM === country);
      //console.log(obj);
      if (obj != null) {
        event.preventDefault()
        setID(obj.ID);
        setISD(obj.ISD);

        // Send Request to API to Send OTP
        sendLoginOTP(obj.ID, obj.ISD);
      }
    }
    else {
      if (!isd) {
        Swal.fire({ text: 'Please select Country Code' });
      }
      else
        Swal.fire({ text: 'Please enter valid Mobile Number' });
    }
  }
  // Send Request to API to Send Login OTP
  async function sendLoginOTP(ID, ISD) {
    //

    try {
      setLoading(true);
      var Req = {
        Req: {
          Type: "OTPP",
          Rsk: "UnEuNhoKLZBdIcLjKILZg==",
          PhNo: MobileNo,   // user mob no  
          Email: "",
          RSP: "",       // user name [optional when sign-in]
          AM: "",
          CC: ID,           // user country code
          ISD: ISD,         // ISD code[to send otp]   
          IEU: 1            // New User = 0 / Exist User = 1
        },
      };
      //var stockDataResp = [];
      Req = JSON.stringify(Req);

      var rows = await postAPI(Req, true);

      //console.log(rows);
      if (!rows) {
        setLoading(false);
        nav("/logout");
      } else {
        let jsonObject = JSON.parse(rows);

        if (jsonObject.Resp.Sts == "1") {
          if (JSON.parse(jsonObject.Resp.Result)["IMS"] === "1") {
            setLoading(false);
            setIsLoginOTPTextFieldDisabled(false);
            SWAlert.fire({ text: "Successfully sent OTP to your mail. Please login!" });
          }
          else {
            setLoading(false);
            setIsLoginOTPTextFieldDisabled(true);
            setLoginPassEror(false);
            SWAlert.fire({ text: "OTP Sending Failure. Please try again later!" });
          }
        }
        else if (jsonObject.Resp.Sts == "0") {
          setIsLoginOTPTextFieldDisabled(true);
          setLoading(false);
          setLoginPassEror(false);

          if (jsonObject.Resp.Desc.includes(700007)) {
            // 700007::Max OTP count reached, please try next day or contact customer care.
            SWAlert.fire({ text: jsonObject.Resp.Desc.replace("700007::", "") });
          }
          else if (jsonObject.Resp.Desc.includes(700101)) {
            // 700101::This mobile number not registered with us. Then navigate to Login Screen
            SWAlert.fire({ text: jsonObject.Resp.Desc.replace("700101::", "") });

          }
          else if (jsonObject.Resp.Desc.includes(700102)) {
            // 700102::This mobile number already registered with us. Then navigate to Login Screen
            SWAlert.fire({ text: jsonObject.Resp.Desc.replace("700102::", "") });

          }
          else {
            SWAlert.fire({ text: "OTP Sending Failure. Please contact administrator!" });
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function LoginClicked(event) {

    try {

      requestForToken();




      let v_ISD = '';
      if (MobileNo == "" || (MobileNo.length < 9)) {
        setMbError(true);
        phnm = false;
      } else {
        setMbError(false);
        phnm = true;
      }
      if (country == "" || country == null) {
        event.preventDefault()
        setISDError(true);
        isd = false;
      } else {
        setISDError(false);
        isd = true;
      }

      if (isd && phnm) {
        let obj = getCountry.find(o => o.SNM === country);
        //console.log(obj);
        if (obj != null) {
          setID(obj.ID);
          setISD(obj.ISD);
          v_ISD = obj.ISD;
          setCookie("roleISD", obj.ISD);
          // console.log(v_ISD);

        }
      }

      if (LoginPasswd == "" || LoginPasswd.length < 6) {
        setLoginPassEror(true);
        lgnpwd = false;
      } else {
        setLoginPassEror(false);
        lgnpwd = true;
      }

      const token = localStorage.getItem('tkn') || '';
      localStorage.setItem("accesID", '1');
      //alert(token);
      if (phnm && lgnpwd && isd) {
        let encpwd = await encryptPwd(LoginPasswd);
        var Req = {
          Req: {
            Rsk: "UnEuNhoKLZBdIcLjKILZg==",
            Type: "GetUserAuthorize",
            CRUD: "R",
            User: {
              UserID: MobileNo,   // user mob no
              ISD: v_ISD,
              Pwd: encpwd,  //--pin
              UserLoginTime: "",
              SessionID: "",
              LoginType: "L",
              Flag: "",
              LoginDomain: "L",
              Application: "SM",
              UFT: token,
            },
          },
        };

        ProcessLogin(Req);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function ProcessLogin(Req) {

    try {
      setLoading(true);

      //var stockDataResp = [];
      Req = JSON.stringify(Req);

      var rows = await postAPI(Req, true);
      
      //console.log(rows);
      if (!rows) {
        setLoading(false);
        nav("/logout");
      } else {
        let jsonObject = JSON.parse(rows);
        if (jsonObject.Resp.Sts == "1") {
          setCookie("userID", JSON.parse(jsonObject.Resp.Result)[0].MP, 1);
          setCookie("userName", JSON.parse(jsonObject.Resp.Result)[0].Name, 1);
          let roleAccess = JSON.parse(jsonObject.Resp.Result);
          setCookie("roleId", JSON.parse(jsonObject.Resp.Result)[0].ID, 1)
          setCookie("roleAccess", roleAccess[0].RID, 1);
          setLoading(false);
          let staffORmember = JSON.parse(jsonObject.Resp.Result)[0].isfjstaff
          let mpadmin = JSON.parse(jsonObject.Resp.Result)[0].MP

          if (isLogin)
            localStorage.setItem('isLogin', 'M')
          else
            localStorage.setItem('isLogin', 'S')


          //
          if (queryStrRightTreeId != null && queryStrComingFrom != null) {
            // If coming from Cart if login then show the Cart Page
            // const params = { righttreeid: queryStrRightTreeId, comingfrom: queryStrComingFrom };
            // temparay change besky--------------------------------------------------------------------------
            let params = {
              fn: 'IsFJ',
              qid: '2',
              fid: '',
              cn: FJNAME,
              vid: FJID,
              vpid: FJTEMPID,
              pid: FJPID,
              accid: 0,
              exe: 'fj'
            };
            nav(`/IsFJ/Fpopup?${createSearchParams(params)}`);
          }
          else {
            if (QID == '10' || QID == '1') {
              let params;

              if (Exe == null) {
                params = {
                  fn: Fn,
                  qid: QID,
                  accid: accid
                }
              }
              else if (Popupopen == "true") {
                if (Mnopen) {

                  params = {
                    fn: 'IsFunction',
                    qid: '10',
                    mn: Menuname,
                    fnopen: true,
                    supfnopen: true,
                    mnopen: true,
                    fid: Fid,
                    vid: Vid,
                    vpid: Vpid,
                    cn: Fname,
                    mid: Mid,
                    mpid: mpid,
                    accid: accid,
                    exe: Exe
                  };

                }
                else if (Supfnopen == 'true') {
                  params = {
                    fn: Fn,
                    qid: QID,
                    mn: Menuname,
                    fnopen: true,
                    supfnopen: true,
                    fid: Fid,
                    vid: Vid,
                    vpid: Vpid,
                    cn: Fname,
                    mid: Mid,
                    mpid: mpid,
                    accid: accid,
                    exe: Exe
                  };
                }
                else {
                  params = {
                    fn: Fn,
                    qid: QID,
                    fnopen: true,
                    fid: Fid,
                    vid: Vid,
                    vpid: Vpid,
                    cn: Fname,
                    accid: accid,
                    exe: Exe
                  };
                }

              }
              else {
                params = {
                  fn: Fn,
                  qid: QID,
                  fid: Fid,
                  accid: accid,
                  exe: Exe
                }
              }

              if (Popupopen == "true") {
                if (QID == '1') {
                  nav(`/iSaucers/Fpopup?${createSearchParams(params)}`);
                } else {
                  nav(`/IsFunction/Fpopup?${createSearchParams(params)}`);
                }

              }
              else {
                if (QID == '10') {
                  nav(`/IsFunction?${createSearchParams(params)}`)
                }
                else {
                  let params = {
                    fn: 'IsFJ',
                    qid: '2',
                    fid: '',
                    cn: FJNAME,
                    vid: FJID,
                    vpid: FJTEMPID,
                    pid: FJPID,
                    accid: 0,
                    exe: 'fj'
                  };
                  nav(`/IsFJ/Fpopup?${createSearchParams(params)}`);
                  // besky change temparay for login nav _________________________________________________________________________________________________________________________
                  // if (QID == '1'){ 
                  //   dispatch(Home_Viewtype("h"))
                  //   if(window.location.search != '')
                  //      nav(`/iSaucers${window.location.search.replace('&comingfrom=home','')}`);
                  //      else 
                  //      nav(`/iSaucers?qid=1&accid=0`);
                  // }
                  // else{
                  //   nav("/iSaucers"); 
                  // }

                }
              }

            }
            else if (QID == '2') {
              let params;
              if (Mnopen == 'true') {
                params = {
                  fn: Fn,
                  qid: QID,
                  mn: Menuname,
                  fnopen: true,
                  supfnopen: true,
                  fid: Fid,
                  Isa: Isa,
                  mnopen: true,
                  vid: Vid,
                  vpid: Vpid,
                  pid: pid,
                  lid: Lid,
                  fid: Fid,
                  mid: Mid,
                  mpid: mpid,
                  accid: accid,
                  exe: Exe
                }
              }
              else if (Supfnopen == "true") {
                params = {
                  fn: Fn,
                  qid: QID,
                  fnopen: true,
                  fid: Fid,
                  Isa: Isa,
                  cn: Fname,
                  vid: Vid,
                  vpid: Vpid,
                  pid: pid,
                  lid: Lid,
                  fid: Fid,
                  supfnopen: true,
                  accid: accid,
                  exe: Exe,
                }
              } else {
                if (Vid != null) {
                  params = {
                    fn: Fn,
                    qid: QID,
                    fid: Fid,
                    vid: Vid,
                    vpid: Vpid,
                    pid: pid,
                    lid: Lid,
                    cn: Fname,
                    Isa: Isa,
                    accid: accid,
                    exe: Exe,
                  }
                }
                else {
                  params = {
                    fn: Fn,
                    qid: QID,
                    accid: accid,
                    exe: Exe
                  }
                }
              }

              if (Vid != null || Popupopen == "true") {
                nav(`/IsFJ/Fpopup?${createSearchParams(params)}`);
              }
              else {
                nav(`/IsFJ?${createSearchParams(params)}`);
              }
            }
            else if (QID == '8') {
              let params;
              if (Mnopen == 'true') {
                params = {
                  fn: Fn,
                  qid: QID,
                  mn: Menuname,
                  fnopen: true,
                  supfnopen: true,
                  fid: Fid,
                  Isa: Isa,
                  mnopen: true,
                  vid: Vid,
                  vpid: Vpid,
                  pid: pid,
                  lid: Lid,
                  fid: Fid,
                  mid: Mid,
                  mpid: mpid,
                  accid: accid,
                  exe: Exe
                }
              }
              else if (Supfnopen == "true") {
                params = {
                  fn: Fn,
                  qid: QID,
                  fnopen: true,
                  fid: Fid,
                  Isa: Isa,
                  cn: Fname,
                  vid: Vid,
                  vpid: Vpid,
                  pid: pid,
                  lid: Lid,
                  fid: Fid,
                  supfnopen: true,
                  accid: accid,
                  exe: Exe,
                }
              } else {
                if (Vid != null) {
                  params = {
                    fn: Fn,
                    qid: QID,
                    fid: Fid,
                    fnopen: true,
                    vid: Vid,
                    vpid: Vpid,
                    pid: pid,
                    lid: Lid,
                    cn: Fname,
                    Isa: Isa,
                    accid: accid,
                    exe: Exe,
                  }
                }
                else {
                  params = {
                    fn: Fn,
                    qid: QID,
                    accid: accid,

                  }
                }
              }

              if (Vid != null || Popupopen == "true") {
                nav(`/IsPage/Fpopup?${createSearchParams(params)}`);
              }
              else {
                nav(`/IsPage?${createSearchParams(params)}`);
              }
            }
            else if (QID == '9') {
              const params = {
                qid: QID,
                accid: accid
              };
              nav(`/isLine?${createSearchParams(params)}`);
            }

            else if (QID == '7') {
              let params;
              if (Popupopen == 'true') {
                params = {
                  fn: Fn,
                  accid: accid,
                  qid: QID,
                  fid: Fid,
                  cn: Fname,
                  cid: Vid,
                  vid: Vid,
                  popupopen: true,
                  fnopen: true,
                }
              }
              else {
                params = {
                  fn: Fn,
                  qid: QID,
                  accid: accid
                }
              }

              if (Popupopen == "true") {
                nav(`/IsView/Fpopup?${createSearchParams(params)}`);
              }
              else {
                nav(`/IsView?${createSearchParams(params)}`);
              }
            }
            // besky change nav ______________________________________________________________________________________
            //             else if (QID == '1'){ 
            //               
            //               dispatch(Home_Viewtype("h"))
            //               if(window.location.search != '')
            //                  nav(`/iSaucers${window.location.search.replace('&comingfrom=home','')}`);
            //                  else 
            //                  nav(`/iSaucers?qid=1&accid=0`);
            //             }
            //             else {
            // 
            //               if(queryStrComingFrom != null){
            //                 if(queryStrComingFrom.toUpperCase() == "CART"){
            //                   dispatch(Home_Viewtype("h"))
            //                   nav(`/iSaucers${window.location.search.replace('&comingfrom=home','')}`);
            //                 }
            //                 else{
            //                   dispatch(Home_Viewtype("h"))
            //                   dispatch(QuickMenuID(""));
            //                   nav("/iSaucers"); // Map to iSaucers Page after Login
            //                   }
            //               }
            //               else{
            //               dispatch(Home_Viewtype("h"))
            //               dispatch(QuickMenuID(""));
            //               nav("/iSaucers"); // Map to iSaucers Page after Login
            //               }
            //             }
            else {
              let params;
              if (mpadmin == '00966536060053') { // 00919100091000   00966920003714  new admin=00966536060053
                params = {
                  fn: 'IsFJ',
                  qid: '2',
                  fid: '',
                  cn: FJNAME,
                  vid: FJID,
                  vpid: FJTEMPID,
                  ssid: staffORmember,
                  pid: FJPID,
                  accid: 0,
                  exe: 'fj'
                };

                localStorage.setItem('RURL_fn', 'IsFJ')
                localStorage.setItem('RURL_qid', '2')
                localStorage.setItem('RURL_tid', '')
                localStorage.setItem('RURL_cn', FJNAME)
                localStorage.setItem('RURL_fid', "")
                localStorage.setItem('RURL_vid', FJID)
                localStorage.setItem('RURL_vpid', FJTEMPID)
                localStorage.setItem('RURL_pid', FJPID)
                localStorage.setItem('RURL_ssid', staffORmember)

                nav(`/IsFJ/Fpopup?${createSearchParams(params)}`);
              } else if (staffORmember == '1') {
                params = {
                  fn: 'IsFJ',
                  qid: '2',
                  fid: '',
                  cn: FJNAME,
                  vid: FJID,
                  vpid: FJTEMPID,
                  ssid: staffORmember,
                  pid: FJPID,
                  accid: 0,
                  exe: 'fj'
                };

                localStorage.setItem('RURL_fn', 'IsFJ')
                localStorage.setItem('RURL_qid', '2')
                localStorage.setItem('RURL_tid', '')
                localStorage.setItem('RURL_cn', FJNAME)
                localStorage.setItem('RURL_fid', '')
                localStorage.setItem('RURL_vid', FJID)
                localStorage.setItem('RURL_vpid', FJTEMPID)
                localStorage.setItem('RURL_pid', FJPID)
                localStorage.setItem('RURL_ssid', staffORmember)

                nav(`/IsFJ/Fpopup?${createSearchParams(params)}`);
              } else {
                // params = {
                //   fn: 'IsFJ',
                //   qid: '2',
                // fid:'',
                //   cn:FJNAME,
                //   vid: FJID,
                //   vpid: FJTEMPID,
                // pid:FJPID,
                //   accid: 0,
                //   exe: 'fj'
                // };
                let params = {
                  do: 1,
                  fid: 3,
                  cname: FJNAME,
                  vid: FJID,
                  ssid: staffORmember,
                  avid: FJID,
                  tvid: FJTEMPID,
                  isdb: '1'
                }
                nav(`/iSaucers?${createSearchParams(params)}`);
                dispatch(PDashboard_Open(true));
              }
            }
          }


          dispatch(FromHomeOrSetup('Home')); // If fromWhere == Home || fromWhere == Setup
          dispatch(ContainerType('H'))
          dispatch(FunctionCRUDType(""));
          dispatch(FunctionType(''))
          dispatch(FunctionTypeID(''))
          dispatch(Fn_ContainerID(''))
          dispatch(accessID(1));
          dispatch(Path_Data('isView'));
          localStorage.setItem("accesID", '1');
          dispatch(RightTree_ID(''));
          dispatch(UPTree_Id(''));
          dispatch(Tree_Ids(''));



        }
        else if (jsonObject.Resp.Sts == "0") {
          setLoading(false);
          // 500019::Invalid OTP.
          if (jsonObject.Resp.Desc.includes('500019')) {
            //SWAlert.fire({ text: jsonObject.Resp.Desc.replace("500019::", "") });
            SWAlert.fire({ text: 'Invalid Password!. Please enter valid six-digit Password!' });

          }
          else if (jsonObject.Resp.Desc.includes('500009')) {
            SWAlert.fire({ text: jsonObject.Resp.Desc.replace("500009::", "") });
          }
          else if (jsonObject.Resp.Desc.includes('50001')) {
            SWAlert.fire({ text: jsonObject.Resp.Desc.replace("50001::", "") });
          }
          else if (jsonObject.Resp.Desc.includes('50002')) {
            SWAlert.fire({ text: jsonObject.Resp.Desc.replace("50002::", "") });
          }
          else if (jsonObject.Resp.Desc.includes('50003')) {
            SWAlert.fire({ text: jsonObject.Resp.Desc.replace("50003::", "") });
          }
          else if (jsonObject.Resp.Desc.includes('50004')) {
            SWAlert.fire({ text: jsonObject.Resp.Desc.replace("50004::", "") });
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

  async function encryptPwd(val) {
    setLoading(true);
    const enc = await Encrypt(val);
    setLoading(false);
    return enc;
  }

  async function NewRegistrationClicked(e) {
    e.preventDefault();
    //nav("/reg");
    if (queryStrRightTreeId != null && queryStrComingFrom != null) {
      // If coming from Cart if login then show the Cart Page
      const params = { righttreeid: queryStrRightTreeId, comingfrom: queryStrComingFrom };
      if (isLogin)
        nav(`/reg?${createSearchParams(params)}`);
      else
        nav(`/sreg?${createSearchParams(params)}`);
    }
    else {
      if (isLogin)
        nav(`/reg`);
      else
        nav(`/sreg`);
    }
  }


  async function SendOTPClicked(event) {

    setPasswd('');
    if (country == "" || country == null) {
      event.preventDefault()
      setISDError(true);
      isd = false;
    } else {
      setISDError(false);
      isd = true;
    }

    if (MobileNo == "" || (MobileNo.length < 9)) {
      event.preventDefault()
      setMbError(true);
      phnm = false;
    } else {
      setMbError(false);
      phnm = true;
    }

    if (isd && phnm) {
      event.preventDefault()
      let obj = getCountry.find(o => o.SNM === country);
      //console.log(obj);
      if (obj != null) {
        event.preventDefault()
        setID(obj.ID);
        setISD(obj.ISD);

        // Send Request to API to Send OTP
        sendOTP(obj.ID, obj.ISD);
      }
    }
    else {
      if (!isd) {
        Swal.fire({ text: 'Please select Country Code' });
      }
      else
        Swal.fire({ text: 'Please enter valid Mobile Number' });
    }
  }

  // Send Request to API to Send OTP
  async function sendOTP(ID, ISD) {
    //
    try {
      setLoading(true);
      var Req = {
        Req: {
          Type: "PCAR",
          CRUD: "",
          Rsk: "UnEuNhoKLZBdIcLjKILZg==",
          PhNo: MobileNo,   // user mob no  
          //NM: Name,         // user name [optional when sign-in]
          CC: ID,           // user country code
          ISD: ISD,         // ISD code[to send otp]   
          IEU: 0            // New User = 0 / Exist User = 1
        },
      };
      //var stockDataResp = [];
      Req = JSON.stringify(Req);

      var rows = await postAPI(Req, true);

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
          else if (jsonObject.Resp.Desc.includes(700101)) {
            // 700101::This mobile number not registered with us. Then navigate to Login Screen
            SWAlert.fire({ text: jsonObject.Resp.Desc.replace("700101::", "") });
            nav("/logout");
          }
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

  let KEY = "AIzaSyDZZZOCatwYlKWV5d3mXi7AsBj3VcBRyRY";
  function getCourrentCountryCode() {
    //
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KEY}`;
      //
      api(url);
    });
    function api(url) {
      axios
        .post(url)
        .then((response) => {

          if (response.status === 200) {
            if (response.data.status === "OK") {
              const data = response.data;
              const results = data.results;
              for (var i = 0; i < results.length; i++) {
                if (results[i].types[0] === "country") {
                  //
                  //setCountryCode(results[i].address_components[0].short_name);
                  setCountry(results[i].address_components[0].short_name); //IN
                }
              }
            }
            else {
              // Handle error
              console.error(response.data.status);
            }
          }
          else {
            // Handle error
            console.error(response.status);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  useEffect(() => {

    if (currentPath === '/login') { //login

    }
    else { //Staff

    }
    //setIsLoginOTPTextFieldDisabled(true);
    requestForToken();
    //
    //dispatch(UPTree_Id(''));
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
  }, [timer]); //, timeOutCallback

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
      //
      setLoading(true);
      const resp = await postAPI(CntryReq, true);


      let response = JSON.parse(resp)
      if (response.Resp.Sts == 1) {
        setgetCountry(JSON.parse(response.Resp.Result));
        setLoading(false);
        //
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
        //
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

    // setIsLoginOTPTextFieldDisabled(true);
    // setLoginPasswd('');
    // setLoginPassEror(false);

  }


  function OnLoginWithPIN() {

    dispatch(RightTree_ID(v_SADMINKEYID))
    dispatch(View_GJS(v_SADMINKEYID))
    dispatch(WebEditor_ID(v_SADMINKEYID))
    dispatch(ContainerType('H'))
    dispatch(FromHomeOrSetup('Home'));
    dispatch(FunctionCRUDType(""));
    localStorage.setItem("accesID", '1');
    if (isMobile()) {
      dispatch(E_DISPLAY('M'))
    }
    else {
      dispatch(E_DISPLAY('D'))
    }
    dispatch(Show_Cancel(v_SADMINKEYID))


    LoginWithPINClicked()
  }
  // Login Clicked
  //***************
  async function LoginWithPINClicked() {


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

  async function LoginWithPIN() {
    //////
    try {
      requestForToken();

      setLoading(true);
      let encpwd = await encryptPwd(pinpassword);

      const token = localStorage.getItem('tkn') || '';
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
          //////


          if (isLogin) {
            localStorage.setItem('isLogin', 'M')
            nav("/logout"); // Map to iSaucers Page after Login
          }
          else {
            localStorage.setItem('isLogin', 'S')
            nav("/logout");
          }

          /*
          if (queryStrRightTreeId != null && queryStrComingFrom != null) {
            // If coming from Cart if login then show the Cart Page
            const params = { righttreeid: queryStrRightTreeId, comingfrom: queryStrComingFrom };
            nav(`/iSaucers?${createSearchParams(params)}`);
          }
          else {
            if (QID == '10') {
              let params;
              if (Exe == null) {
                params = {
                  fn: Fn,
                  qid: QID,
                  accid: accid
                }
              }
              else if (Popupopen == "true") {
                if (Mnopen) {

                  params = {
                    fn: Fn,
                    qid: QID,
                    mn: Menuname,
                    fnopen: true,
                    supfnopen: true,
                    mnopen: true,
                    fid: Fid,
                    vid: Vid,
                    vpid: Vpid,
                    cn: Fname,
                    mid: Mid,
                    mpid: mpid,
                    accid: accid,
                    exe: Exe
                  };

                }
                else if (Supfnopen == 'true') {
                  params = {
                    fn: Fn,
                    qid: QID,
                    mn: Menuname,
                    fnopen: true,
                    supfnopen: true,
                    fid: Fid,
                    vid: Vid,
                    vpid: Vpid,
                    cn: Fname,
                    mid: Mid,
                    mpid: mpid,
                    accid: accid,
                    exe: Exe
                  };
                }
                else {
                  params = {
                    fn: Fn,
                    qid: QID,
                    fnopen: true,
                    fid: Fid,
                    vid: Vid,
                    vpid: Vpid,
                    cn: Fname,
                    accid: accid,
                    exe: Exe
                  };
                }

              }
              else {
                params = {
                  fn: Fn,
                  qid: QID,
                  fid: Fid,
                  accid: accid,
                  exe: Exe
                }
              }

              if (Popupopen == "true") {
                nav(`/IsFunction/Fpopup?${createSearchParams(params)}`);
              }
              else {
                nav(`/IsFunction?${createSearchParams(params)}`);
              }
            }
            else if (QID == '2') {
              let params = {
                fn: Fn,
                qid: QID,
                accid: accid,
                exe: Exe
              }
              if (Popupopen == "true") {
                nav(`/IsFJ/Fpopup?${createSearchParams(params)}`);
              }
              else {
                nav(`/IsFJ?${createSearchParams(params)}`);
              }
            } else if (QID == '8') {
              let params = {
                fn: Fn,
                qid: QID,
                accid: accid,
                exe: Exe
              }
              if (Popupopen == "true") {
                nav(`/IsPage/Fpopup?${createSearchParams(params)}`);
              }
              else {
                nav(`/IsPage?${createSearchParams(params)}`);
              }
            }
            else {
              dispatch(Home_Viewtype("h"))
              dispatch(QuickMenuID(""));
              nav("/iSaucers"); // Map to iSaucers Page after Login
            }
          }
          */

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
          localStorage.setItem("accesID", '1');



        }
        else if (jsonObject.Resp.Sts == "0") {
          setLoading(false);
          // 500019::Invalid OTP.
          if (jsonObject.Resp.Desc.includes('500019')) {
            SWAlert.fire({ text: jsonObject.Resp.Desc.replace("500019::", "") });

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

  function OnOTPSubmit() {
    // dispatch(RightTree_ID(v_SADMINKEYID))
    // dispatch(View_GJS(v_SADMINKEYID))
    // dispatch(WebEditor_ID(v_SADMINKEYID))
    // dispatch(Show_Cancel(v_SADMINKEYID))
    // LoginClicked()

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
    //
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
      //
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
            // SWAlert.fire({ text: jsonObject.Resp.Desc.replace("500019::", "") });
            SWAlert.fire({ text: 'Invalid OTP. Please enter valid six-digit OTP!' });
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }



  function EditMobileNumberClicked() {
    //setIsLoginOTPTextFieldDisabled(true);
    //setLoginPasswd('');
    //setLoginPassEror(false);

    if (MobileNo != '') {
      setChecked(!checked);
      setCheckedPanel('1');
      setEditFlag(true);
    }
    else {
      Swal.fire({ text: 'Please enter Mobile Number' });
    }
    // return false;
  }
  function ForgotPassword_Clicked() {

    //setIsLoginOTPTextFieldDisabled(true);
    //setLoginPasswd('');
    //setLoginPassEror(false);

    if (MobileNo == "" || (MobileNo.length < 9)) {
      Swal.fire({ text: 'Please enter Mobile Number' });
    }
    else {
      setCheckedPanel('2');
    }


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
    //
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
      //
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

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const getLabel = () => {
    if (IsMobile) {
      return isFocused ? 'Country Code' : 'Country C...';
    }
    return 'Country Code';
  };

  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div style={{ background: `url(${loginScreen})`, backgroundSize: 'cover', }} className="loginscreendiv">

          <HeaderLbl>{Login && <LblInvalid>{lblIVD}</LblInvalid>}</HeaderLbl>
          <div className="LoginBox">
            <Stack spacing={10}>
              {/* <Img src={logoNew} height="100px" width="273px" sx={{ paddingRight: "5px", marginLeft: "0px" }}></Img>
               */}

              <Stack
                direction={'row'}
                style={{ marginLeft: marginLeftValue, padding: '10px', width: '200px', height: '100px' }}
              >
                <img src={logoSrc} width='100%' alt={logoAlt} />
              </Stack>


              {/* <Stack direction="row">
                  <HeaderTxt>{lblSL}</HeaderTxt>
                </Stack> */}
              <Box >
                <Box sx={{ "& > :not(style)": { display: "flow", justifyContent: "space-around", width: 280, marginLeft: '15px', marginRight: '10px' } }}>
                  <div>
                    <Collapse in={(checkedPanel == '1' ? true : false)}>
                      <Box sx={{ "& > :not(style)": { display: "flex", justifyContent: "space-around" } }} >

                        {/* <Stack direction="row" spacing={2}>
                            <MblIcon color="icon"></MblIcon>
                            <TextBox>
                              <InputBase
                                placeholder={lblMN}
                                value={MobileNo}
                                onChange={handleChange}
                                fontWeight="40px"
                                autoComplete="off"
                                inputProps={{ maxLength: 10 }}
                                type="text"
                                onKeyPress={(e) => {
                                  if (e.key == "Enter") {
                                    e.preventDefault();
                                    LoginClicked();
                                  }
                                }}
                              />
                            </TextBox>
                          </Stack> */}
                        <Stack direction="row" spacing={2} alignItems={"center"} >
                          <FormControl variant="outlined" sx={{ m: 1, width: '48%', maxWidth: '48%' }} className='sst customTextFieldlogin'>
                            <img style={{ position: 'absolute', left: '-42px', top: '10px', width: '36px' }} src={imgMobile} width='100%' alt="ISD Flag" />

                            <InputLabel id="demo-simple-select-outlined-label" sx={{ color: 'white', marginTop: (IsMobile ? '5px' : '3px'), }}>{country == '' ? getLabel() : 'Country Code'}</InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={country}
                              onChange={OnCountrySelect}
                              //label="Country Code"
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                              required
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(218, 225, 233, 0.5)',
                                color: 'white',
                                paddingRight: '12px',
                                width: '100%',
                                height: '38px',
                                marginTop: '10px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                borderRadius: '5px',

                              }}
                            >
                              {CountryList}
                            </Select>

                          </FormControl>




                          <FormControl sx={{ m: 1, width: '65%', maxWidth: '65%', }} variant="outlined" className='sst customTextFieldlogin'>
                            <TextField
                              size="small"
                              variant="outlined"
                              autoComplete="new-password"
                              label="Mobile Number"
                              name="name"
                              sx={{
                                // opacity:'0.5',
                                borderRadius: '5px',
                                marginTop: '10px',
                                backgroundColor: 'rgba(218, 225, 233, 0.5)',
                                color: 'white',

                              }}
                              value={MobileNo}
                              onChange={handleChange}
                              inputProps={{ maxLength: 15 }}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  LoginClicked(e);
                                  //SendLoginOTPClicked(e);
                                }
                              }}
                              style={{
                                width: '100%', // Ensure the input takes full width
                              }}
                            />
                          </FormControl>

                          {/* </TextBox> */}
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
                        <Stack style={{ width: '100%', display: 'none' }} direction="row" paddingTop={"10px"} spacing={2}>
                          <LoginBtn style={{ cursor: 'pointer' }} className="logSendOTPBtn" variant="contained" onClick={SendLoginOTPClicked}>
                            <label className="LogLbl">Send OTP</label>
                          </LoginBtn>
                        </Stack>
                        <Stack direction="row" style={{ width: '100%' }} paddingTop={"10px"} spacing={2}>
                          {/* <PwdIcon color="icon" /> */}

                          <FormControl style={{ width: '100%' }} variant="outlined" sx={{ m: 1, }} className='sst customTextFieldlogin'>
                            <img style={{ position: 'absolute', left: '-42px', top: '2px', width: '36px' }} src={imgPwd} width='100%' ></img>
                            <TextField
                              style={{ width: '100%' }}
                              size="small"
                              variant="outlined"
                              sx={{
                                borderRadius: '5px',
                                backgroundColor: 'rgba(218, 225, 233, 0.5)', // Background color with opacity
                                color: 'white',
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    border: 'none', // Remove outline border
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

                              label={lblPWD}
                              value={LoginPasswd}
                              onChange={handleChange1}
                              autoComplete="new-password"
                              inputProps={{ maxLength: 6, width: '100%' }}
                              type="password"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  LoginClicked(e);
                                }
                              }}
                            />

                          </FormControl>

                        </Stack>
                        {LoginPassError && (
                          <Stack>
                            <LblError>Please enter your six-digit password</LblError>
                          </Stack>
                        )}
                        <Stack style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                          <Stack style={{ width: '100%', paddingLeft: '44px' }} paddingTop={"10px"}>
                            <LoginBtn style={{ cursor: 'pointer', height: '40px', width: '170px' }} className="button--standard button--3d button--gradient" variant="contained" onClick={LoginClicked}>
                              <label className="LogLbl">{lblLogin}</label>
                            </LoginBtn>
                          </Stack>
                        </Stack>

                        <Stack onClick={SendOTPClicked} style={{ textAlign: 'center', cursor: 'pointer' }} paddingTop={"10px"}>
                          <CreatePin style={{ paddingRight: '29px', textDecoration: 'none', color: '#EC6331' }}>Forgot password</CreatePin>
                        </Stack>
                        <Stack style={{ display: 'none' }} paddingTop={"10px"}>
                          <LoginBtn className="logBtn" variant="contained" onClick={SendOTPClicked}>
                            <label className="LogLbl">{lblSendOTP}</label>
                          </LoginBtn>
                        </Stack>
                        <Stack paddingTop={"10px"}> {/* style={{display:'none'}} */}
                          {/* <Divider style={{ width: "240px" }}>or</Divider> */}
                        </Stack>
                        <Stack style={{ justifyContent: 'center', width: '100%' }} direction="row"> {/* style={{display:'none'"#515151",}} */}
                          <label style={{ paddingRight: '5px', fontSize: "12px", color: "white", }}>Don't have an account?</label>
                          <Stack direction="row" onClick={(e) => NewRegistrationClicked(e)}  >
                            <label style={{ fontSize: "14px", color: "#EC6331", cursor: 'pointer', marginTop: '-3px' }}
                            >Register now</label>
                          </Stack>
                          {/* <StyledNewRegistrationBtn className="newBtn" variant="contained" onClick={(e) => NewRegistrationClicked(e)}>
                            <label className="LogLbl">New Registration</label>
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
                        <Stack style={{ width: "260px", textAlign: "center", marginLeft: '30px' }}>
                          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className='sst customTextFieldlogin'>
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
                            {/* <TextField
                              size="small"
                              variant="outlined"
                              label={lblPWD}
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
                                      OnLogin();
                                    }
                                  }}
                            /> */}
                          </FormControl>
                        </Stack>
                        {PassError && (
                          <Stack>
                            <LblError>Please enter your six-digit OTP</LblError>
                          </Stack>
                        )}
                        <Stack>
                          {/* disabled={!tOut}  */}
                          <LoginBtn className="button--standard button--3d button--gradient" style={{ width: '100px', marginLeft: '80px' }} variant="contained" onClick={OnOTPSubmit}>
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
                          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" className='sst customTextFieldlogin'>
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
                                    OnLoginWithPIN();
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
                          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" className='sst customTextFieldlogin' >
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
                                    OnLoginWithPIN();
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
                          <LoginBtn onClick={OnLoginWithPIN}>
                            {/* <label className="LogLbl">{lblLogin}</label> */}
                            <label className="LogLbl">Login</label>
                          </LoginBtn>
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

export default IAdminL;