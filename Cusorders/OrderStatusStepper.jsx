import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  CardHeader,
  Divider,
  Card,
  CardContent,
} from "@material-ui/core";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import logger from '../../common/logger';
import SWAlert from "sweetalert2";
// import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputBase, List, ListItem, ListItemText, Menu, styled, Tab, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, Tabs, TextField, Typography } from '@mui/material';
import { Box, Stack, } from '@mui/system'
import nonveg from '../../assets/images/nonveg.png'
import { Colors } from '../../styles/theme';
import { useEffect } from 'react';
import HeaderForm from "../saucerView/components/header/index";
import { postAPI } from '../../services/apicall';
import { FromHomeOrSetup } from "../../stateManagement/action";
import { connect, useSelector, useDispatch } from "react-redux";
import Cancel from'../../assets/images/cautionimg.png'
import success from'../../assets/images/successimg.png'
import { green } from "@material-ui/core/colors";
import { getCookie } from "../../common/cks";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Order Detail",
    "Payment Detail",
    "Accept",
"Ready",
    "Delivered"
  ];
}
function getSteps1() {
  return [
    "Order Detail",
    "Payment Detail",
    "Cancelled",
    "Delivered"
  ];
}
const BasicForm = () => {
  const { control } = useFormContext();
  return (
    <>
    

     
    </>
  );
};
const ContactForm = () => {
  const { control } = useFormContext();
  return (
    <>
    
    </>
  );
};
const PersonalForm = () => {
  const { control } = useFormContext();
  return (
    <>
    
    </>
  );
};
const PaymentForm = () => {
  const { control } = useFormContext();
  return (
    <>
     
    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    case 3:
      return <PaymentForm />;
    default:
      return "unknown step";
  }
}

const OrderStatusStepper = () => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      nickName: "",
      emailAddress: "",
      phoneNumber: "",
      alternatePhone: "",
      address1: "",
      address2: "",
      country: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [stepCount, setStepCount] = useState("");
  const [Count, setCount] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const [orderval, setOrderval] = useState([]);
  const [ordervalname, setOrdervalname] = useState([]);
  const [paymentsts, setPaymentsts] = useState([]);
  const [paymentstsnum, setPaymentstsnum] = useState([]);
  const [succesmes,setSuccesmes]=useState([])
  const [driverSts, setDriverSts] = useState([]);
  const [whichOrder, setWhichOrder] = useState([]);
  const [paymentstsval, setPaymentstsval] = useState([]);
  const [refresh, setRef] = useState(0)
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  var ORDERID = searchParams.get('orderid');
  var ORDERID1 = searchParams.get('OID');
  var TS = searchParams.get('TS')
  let v_RTreeID = useSelector((state) => state.RightTreeID)
  console.log(TS,'Ts');
  var steps 
  if (stepCount=='4'){
    steps= getSteps1();
     }
     else{
      steps= getSteps();
     }
  useEffect(() => {

    const LogedInUserId = getCookie('roleId');
    if (LogedInUserId == 'null') {
      nav('/iSaucers');
    }
    else {
      if (TS == null) {
        GetOrdersDetails(ORDERID)
      } else {
        UpdateTransactionStatus(ORDERID1, TS);
        GetOrdersDetails(ORDERID1)
      }
    }


  }, [refresh]);
  const startOnlinePayment = async (ORDERID1) => {
    debugger;
    let Req = {
        Req: {
            Type: "GPGD",
            CRUD: "",
            Rsk: "UnEuNhoKLZBdIcLjKILZg==",
            DevID: "",
            OID: ORDERID1,
            CC: "",
            GWID: "",
            CBY: ""
        },
    };
    debugger;
    const resp = await postAPI(Req);
    // setLoading(false);
    debugger;
    if (!resp) {
        // If not loged in then redirect to Login Page and if login then show the Cart Page
        const params = { righttreeid: v_RTreeID, comingfrom: 'Cart' };
        nav(`/login?${createSearchParams(params)}`);
    } else {
        let response = JSON.parse(resp);
        if (response.Resp.Sts == 1) {
            debugger;
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


  async function UpdateTransactionStatus(OrderID, ts){
    debugger
 
    try{
      const req={
        "Req": {
          "Type":"UCSOS",
          "CRUD":"PTU",
          "Rsk": "UnEuNhoKLZBdIcLjKILZg==",
          "DevID": "",    
          "ID": OrderID,//order ID
          "PST":ts,//payment status
          "BizID":"" 
        }
      }
      debugger
      const rows = await postAPI(req);
      const row = JSON.parse(rows);
       debugger
       if (row.Resp.Sts == "1") {
        var res = JSON.parse(row.Resp.Result)
        
      }
       
    }catch(err){
  // SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
      logger.errorLog(err.message ?? err, '', '//sales//Index.jsx', 'iconBut_tAlign-onClick');
    }
  }

  async function GetOrdersDetails(status){
    debugger
 
    try{
      const req={
        "Req": {
          "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
          "Type":"GCSO",
          "CRUD":"",
          "DevID": "",
          "RKID": "",
          "BID": "",
          "ID": status,//--Order Id
          "OD": "",//--Order Date
          "SID": "",//--service ID
          "PT": "",//--pay type
          "PTS": "",//--Payment status
          "DYT": "",//--Delivery Type id
          "CID":"" ,//--Customer ID
          "GID": "",//--grp id
          "TN": "",//--dely ref No[room no or table no]
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
        setOrderval(res)
        setStepCount(res[0].OS)
        setOrdervalname(res[0].OSN)
        setDriverSts(res[0].DOS)
        setWhichOrder(res[0].SID)
        setPaymentsts(res[0].RFS)
        setPaymentstsval(res[0].RISNM)
        setPaymentstsnum(res[0].PAYSTS)
        setSuccesmes(res[0].PT)
        console.log(res[0].RFS)
      }
       
    }catch(err){
  // SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
      logger.errorLog(err.message ?? err, '', '//sales//Index.jsx', 'iconBut_tAlign-onClick');
    }
  }
  
  useEffect(() => {
    

    debugger
    if (TS=='PAYMENT FAILURE'){
      setActiveStep(1)
    }
    else if(TS=='SUCCESS'){
      setActiveStep(1)
    }else if (ordervalname == 'Payment Pending'){
      setActiveStep(1)
    }
    else if (ordervalname == 'PaymentFailed'){
      setActiveStep(1)
    }
    else if( stepCount=="0" || stepCount=="1" && succesmes == 'pt002'){
      setActiveStep(1)
     }
 
   else if(stepCount=="1"){
    setActiveStep(0)
   }  
   else if(stepCount=="2" || stepCount=="3"){
    setActiveStep(2)
   }
   else if(stepCount=="5"){
    setActiveStep(3)
   }
   else if(stepCount=="4"){
    setActiveStep(2)
   }
   else if(whichOrder =="S0003"){
    if(stepCount=="6" && driverSts == '13' ){
      setActiveStep(4)
      setCount(0)
      
     }
  else if(stepCount=="6"){
      setActiveStep(3)
      setCount(1)
      
     }
    
   }
   else if(whichOrder !="S0003"){
  
    if(stepCount=="6"){
      setActiveStep(4)
      
     }
    
   }
 


       
  }, [stepCount,refresh]);
  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    console.log(data);
    if (activeStep == steps.length - 1) {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
          setActiveStep(activeStep + 1);
        });
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };
const OnRefreshClick=(ORDERID)=>{
  window.location.reload()
//  history.go(0)

  setRef(refresh + 1)
  GetOrdersDetails(ORDERID)

}

  const handleClickFunction = (fromWhere) => {
    dispatch(FromHomeOrSetup(fromWhere)); // If fromWhere == Home || fromWhere == Setup
  }
  return (
    <>
    <HeaderForm clickFunction={handleClickFunction} />
   
    <div style={{marginTop:'100px'}}>
    <Stack direction='row' style={{ marginLeft: '5px' }} onClick={(e) => OnRefreshClick(ORDERID)} >
    <label className="LogLbl" style={{ marginLeft: '3px' }}>Refresh</label>
                  <button className='btnOrderTrackBlue' onClick={(e) => OnRefreshClick()} style={{ width: '75px' }}>Refresh</button>
  </Stack>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                 color="success"
                style={{ display: "block" }}
              >
     
              </Typography>
            );
          }
          
          if ((TS=='PAYMENT FAILURE') && activeStep==index){
            labelProps.error=true
          }
       
          if (ordervalname == 'Canceled' && activeStep==index){
            labelProps.error=true
        
            
          }
          if (ordervalname == 'PaymentFailed'  && activeStep==index){
            labelProps.error=true
          }
          if ( ordervalname == 'Payment Pending' && activeStep==index){
            labelProps.error=true
          }
          if (TS=="SUCCESS" && activeStep==index){
            labelProps.icon = <CheckCircleIcon  sx={{color:'green'}}/>
          }
          // succesmes
          
          if (ordervalname == 'New'  && activeStep==index){
            labelProps.icon = <CheckCircleIcon  sx={{color:'#3899EC'}}/>
          }
          if ( paymentstsnum == '1' && activeStep==index){
            labelProps.icon = <CheckCircleIcon  sx={{color:'green'}}/>
          }
          if (ordervalname == 'Accepted'  && activeStep==index){
            labelProps.icon = <CheckCircleIcon  sx={{color:'#3899EC'}}/>
          }
          if (ordervalname == 'Ready'  && activeStep==index){
            labelProps.icon = <CheckCircleIcon  sx={{color:'#3899EC'}}/>
          }
          if (ordervalname == 'Delivered' && activeStep==index){
            labelProps.icon = <CheckCircleIcon  sx={{color:'green'}}/>
          } 
        
          // if (ordervalname == 'Canceled' && activeStep==index ) {
          //   if (paymentsts == '0' ){
          //     <Typography variant="h3" align="center">
          //     Your Payment is pending
          //   </Typography>
          //    }else{
          //     <Typography variant="h3" align="center">
          //     Your Payment is Refund
          //   </Typography>
          //    }
          // }
       
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep == "4" &&
      <>
      <Typography variant="h3" align="center">
      <img src={success} width='50px' alignItems="center"></img>
      </Typography> 
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
        </>
      }
      {ordervalname == 'New' &&
      <>
     
        <Typography variant="h3" align="center">
      Your Order is processing
        </Typography>
        </>
      }    
      {ordervalname == 'Accepted' &&
      <>
     
        <Typography variant="h3" align="center">
      Your Order is Accepted
        </Typography>
        </>
      } 
      {Count== 1 &&
      <>
     
        <Typography variant="h3" align="center">
      Your Order is Ready
        </Typography>
        <Typography variant="h6" align="center">
        Your Order is PickedUp To Delivered
          </Typography>
        </>
      }
      
      {ordervalname == 'Ready' &&
      <>
     
        <Typography variant="h3" align="center">
      Your Order is Ready
        </Typography>
        </>
      }
          
      {ordervalname == 'Reached' &&
      <>
     
        <Typography variant="h3" align="center">
      Your Order is Ready
        </Typography>
        <Typography variant="h3" align="center">
    Driver is reached in Shop
          </Typography>
        </>
      }
      {ordervalname == 'Ready to Start' &&
      <>
     
        <Typography variant="h3" align="center">
      Your Order is Ready
        </Typography>
        <Typography variant="h3" align="center">
    Driver is Accepted
          </Typography>
        </>
      }
      {activeStep == "2" && ordervalname == 'Canceled' && <>
      <Typography variant="h3" align="center">
      {
        // <CancelIcon height'200px' sx={{color :'red',}}/> ordervalname == 'PaymentFailed'
      }
    
      <img src={Cancel} width='50px' alignItems="center"></img>
        </Typography>
      <Typography variant="h3" align="center">
       Cancelled
      </Typography>
      {paymentsts == '0' ?<>
            <Typography variant="h3" align="center">
            {paymentstsval}
          </Typography> 
         
          </>
           :paymentsts == '1' ?    <Typography variant="h3" align="center">
           Your Payment is initiate
         </Typography>:
            <Typography variant="h3" align="center">
            Your Payment is Refund
          </Typography>
          
        }
        
      </>
    } {   
    activeStep == "1" && ordervalname == 'PaymentFailed' &&
    <>  {TS === null ?
    <Typography variant="h3" align="center">
 
    <img src={Cancel} width='50px' alignItems="center"></img>
    </Typography>:<></> }
      <h3  style={{color:'blue', alignItems:"center",textAlign:'center',cursor:'pointer' }}  alignItems="center" onClick={()=>startOnlinePayment(ORDERID)}>
      Payment Retry
      </h3>
      {TS === null ? <Typography variant="h3" align="center">
      PaymentFailed
      </Typography>:<></>}
      </>
    
  }
  {   
    activeStep == "1" && ordervalname == 'Payment Pending' &&
    <>  {TS === null ?
    <Typography variant="h3" align="center">
 
    <img src={Cancel} width='50px' alignItems="center"></img>
    </Typography>:<></> }
      <h3  style={{color:'blue', alignItems:"center",textAlign:'center',cursor:'pointer' }}  alignItems="center" onClick={()=>startOnlinePayment(ORDERID)}>
      Payment Retry
      </h3>
      {TS === null ? <Typography variant="h3" align="center">
      Payment Pending
      </Typography>:<></>}
      </>
    
  }
    {TS == 'PAYMENT FAILURE' &&
    <>
    <Typography variant="h3" align="center">
    <img src={Cancel} width='50px' alignItems="center"></img>
    </Typography> 
      <Typography variant="h3" align="center">
      PaymentFailed
      </Typography>
  
     
      </>
    
     }
    
    {
    //   TS == 'SUCCESS' && 
    // <>
    // <Typography variant="h3" align="center">
    // <img src={success} width='50px' alignItems="center"></img>
    // </Typography> 
    //   <Typography variant="h3" align="center">
    //   PaymentSuccess
    //   </Typography>
    //   </>
    }
    { stepCount=="1" && succesmes == 'pt002'  && 
    <>
    <Typography variant="h3" align="center">
    <img src={success} width='50px' alignItems="center"></img>
    </Typography> 
      <Typography variant="h3" align="center">
      PaymentSuccess
      </Typography>
      </>
    }
    
 
      <div className="disview" >

       <Grid container spacing={2} sx={{  backgroundColor: Colors.WhiteSmoke ,alignContent:'center',textAlign:'center'}}>
       {orderval.map((i, index)=>(
      
        <Grid key={index} item xs={12} md={3} sx={{alignContent:'center',textAlign:'center'}}>
      
      { 
         //  <Card sx={{maxWidth:'100%',margin:'10px', }}>
      //  <Stack sx={{alignItems:'center'}}><CancelIcon/></Stack>
      //  <Stack  sx={{fontWeight:'bold',alignItems:'center'}} > {
      //   i.OSN =='Canceled'?   <Typography variant='h7' sx={{color:'white',border:'1px solid red',backgroundColor:'red'}}  >CANCELED</Typography>:
      //   i.OSN =='Delivered'?<Typography variant='h7'  sx={{color:'white',border:'1px solid green',backgroundColor:'green'}} >DELIVERED</Typography>:
      //   i.OSN =='Accepted'?<Typography variant='h7'  sx={{color:'white',border:'1px solid #3899EC',backgroundColor:'#3899EC'}} >ACCEPTED</Typography>:<Typography variant='h7'   sx={{color:'white',border:'1px solid #3899EC',backgroundColor:'#3899EC'}} >{i.OSN}</Typography>
      //  }
      //      </Stack>
      //  </Card>
    }
         <Card sx={{maxWidth:'100%',margin:'10px'}}>
         <CardHeader
     
     
     avatar={
       <img src={i.BIZIC} height='50px' width='100px'></img>
     }
     title={i.BNM}
     subheader={<Stack>
      <label style={{ fontSize: 12 }} >{i.BRCYN}</label>
      <label className='lblTime' >Type: {i.SIDN},{i.PTN}</label>{
i.PAYSTS == '-1' ? <label style={{ fontSize: 12 ,color:'orange'}} >PAYMENT PENDING</label>:
i.PAYSTS == '1' ?   <label style={{ fontSize: 12,color:'green' }} >PAYMENT PAID</label>:
i.PAYSTS == '0' ?   <label style={{ fontSize: 12,color:'red' }} >PAYMENT UNPAID</label>:
      <label style={{ fontSize: 12 }} ></label>}
      </Stack>
    }
   
   >
   
   </CardHeader>

   
   <Divider/>
   <CardContent>
     <Stack>
     {i.PS.map((p, ind)=>(
      
       <Stack sx={{height:'35px'}} direction='row' alignItems='center' display='flex' justifyContent='space-between'>
       <Stack>
       <label className='labeDish'> <img src={nonveg} height='15px' width='10px' /> {p.QTY} x {p.PN}</label>
      
       </Stack>
       <label className='lblTime' >₹{(Math.round((p.APP) * 100) / 100).toFixed(2)}</label>
       </Stack>
     ))}
   
  
     
   
             </Stack>
             <Divider sx={{ marginTop: '10px' }} />
             <Stack sx={{ height: '35px',marginTop: '15px' } }  direction='row' alignItems='center' display='flex' justifyContent='space-between'>
             <Stack sx={{marginTop: '17px'}}  >
               <label className='lblTime' >Price :</label>
               {
                 i.SID == 'S0003' && (<Stack direction='row' display='flex' >
                   <label className='lblTime' >Delivery charge :</label>
                  </Stack>
                 )
               }
               <label className='lblTime' >GST :</label>
               <label className='lblTime' style={{fontWeight:'bold',marginTop:'6px',fontSize:'12px'}} >Total Amount :</label>
            </Stack>
            <Stack sx={{ marginTop: '15px' }} alignItems="flex-end">
             <label className='lblAMT' style={{marginLeft:'10px'}}>₹{(Math.round((i.OABT) * 100) / 100).toFixed(2)}</label>
             {
               i.SID == 'S0003' && (<Stack  display='flex' alignItems="flex-end">{
             
           
                  <label className='lblAMT'>₹ {(Math.round((i.DADD.DF) * 100) / 100).toFixed(2)}</label>
               
     
             }
                </Stack>
               )
             }
             <Divider sx={{ bgcolor: "#a59f9f" }} />
             <label className='lblAMT'>₹ {(Math.round((i.GSTP) * 100) / 100).toFixed(2)}</label>
{ i.DADD.DF!= undefined ?
             <label className='lblAMT'  style={{fontWeight:'bold',color:'blue',borderBottom:'1px solid blue'}} >₹{(Math.round((i.OABT + i.DADD.DF + i.GSTP) * 100) / 100).toFixed(2) }</label>
:                                <label className='lblAMT'  style={{fontWeight:'bold',color:'blue',borderBottom:'1px solid blue'}} >₹{(Math.round((i.OABT + 0 + i.GSTP) * 100) / 100).toFixed(2) }</label>

           } </Stack>

           </Stack>
                              <Stack sx={{marginTop:'30px'}}>
                     
                              <label className='lblTime' >Order Placed On</label>
                              <label className='lblTime' >{i.ODFT}</label></Stack>
             <Stack   sx={{marginTop:'10px',color:'',alignItems:"flex-end"}} >
             
              { i.DYRN != ''? 
             
           <Typography variant='h6' sx={{marginLeft:'47%'}}>Table No {i.DYRN}</Typography>:<></>}
         
             </Stack>
          
             <Divider sx={{ bgcolor: "#a59f9f" }} />
           {i.DADD != undefined || i.DADD != 0  && (
            <Stack>
            <Stack direction='row' spacing={5} >
            <label className='lblTime' style={{fontWeight:'bold',marginTop:'6px',fontSize:'12px'}} >Driver Details :</label>
            <label className='lblTime' style={{fontWeight:'bold',marginTop:'6px',fontSize:'12px'}} >{i.DADD.DRNM}</label>
            <label className='lblTime' style={{fontWeight:'bold',marginTop:'6px',fontSize:'12px',textAlign:'flex-end'}} >{"XXXXX" + i.DADD.DRMN.slice(-4)}</label>
        
            </Stack>
       
            </Stack>
            )
           }
   </CardContent>
         </Card>
       </Grid>
       ))}
      </Grid>
     
    
      </div>
      
    </div>
    </>
  );
};

export default OrderStatusStepper;