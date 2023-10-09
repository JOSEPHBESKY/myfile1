import React, { useState, useEffect } from 'react';
import { makeStyles } from "@mui/styles";
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
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { Inthideshow } from "../../../stateManagement/action";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import InfinitScroll from 'react-infinite-scroll-component'
import theme from '../../../styles/theme';
import Loading from "../../../loadingScr";
import { postAPI, postAPIMySQL } from "../../../services/apicall";
import './intent.css'
import { Colors } from '../../../styles/theme';
// import { Colors } from '../../styles/theme';
import search from '../../../assets/images/searchBlue.png'
import { Closeicon, DiaBtn1, DiaBtn2, DiaHeader, StyledDiaBx, styleInfLoader } from '../../../styles/common';
import { BarLoader } from 'react-spinners';
import SWAlert from "sweetalert2";
import Logger from '../../../common/logger';
import { Stack } from '@mui/system';
import {  Input, useMediaQuery } from '@material-ui/core';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { connect, useSelector, useDispatch } from "react-redux";
import { useTheme } from '@mui/material/styles';
// import { makeStyles } from '@material-ui/core/styles';
const ariaLabel = { 'aria-label': 'description' };

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 1000,
        backgroundColor: theme.palette.background.paper,
    },
});

// const useStyles = makeStyles({
//     table: {
//         minWidth: 650,
//     },
// });

const Intents = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [intentsname, setIntentsname] = useState([]);
    const [intents, setIntents] = useState([]);
    const [resid, setResid] = useState([]);
    const [isEdit, setisEdit] = useState(false);
    const [querName, setquerIName] = useState([]);
    const [newIntents, setnewIntents] = useState(false)
    const [contenthide, setcontenthide] = useState(false)
    const [intentshide, setIntentshide] = useState(true);
    const [selectedIntent, setSelectedIntent] = useState([]);
    const [selectedIntentname, setSelectedIntentname] = useState('');
    const [selectedIntentquery, setSelectedIntentquery] = useState([]);
    const [selectedIntentresponse, setSelectedIntentresponse] = useState([]);
    const [isAddingIntent, setIsAddingIntent] = useState(false);
    const [isAddingQuery, setIsAddingQuery] = useState(false);
    const [isAddingQueryDB, setIsAddingQueryDB] = useState(false);
    const [isAddingQueryDBchange, setIsAddingQueryDBchange] = useState(false);
    const [isAddingResponse, setIsAddingResponse] = useState(false);
    const [isAddingResponseDB, setIsAddingResponseDB] = useState(false);
    const [isAddingResponseDBchange, setIsAddingResponseDBchange] = useState(false);
    const [queries, setQueries] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [todos2, setTodos2] = useState([]);
    const [val, setval] = useState("");
    const [editTodoIndex, setEditTodoIndex] = useState(null);
    const [editTodoIndex2, setEditTodoIndex2] = useState(null);
    const [editTodoIndex3, setEditTodoIndex3] = useState(null);
    const [editTodoText, setEditTodoText] = useState('');
    const [editTodoText2, setEditTodoText2] = useState('');
    const [editTodoText3, setEditTodoText3] = useState('');
    const [newTodo1, setNewTodo1] = useState('');
    const [todos1, setTodos1] = useState([]);
    const [underline, setUnderline] = useState(false);
    const [underline1, setUnderline1] = useState(false);
    const [hasMoreItems, sethasMoreItems] = useState(false);
    const [start, setStart] = useState(1);
    const [editTodoIndex1, setEditTodoIndex1] = useState(null);
    const [editTodoText1, setEditTodoText1] = useState('');
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [showQueries ,setShowQueries]=useState(false)
    const [showResponse ,setShowResponse]=useState(false)
    const [text, setText] = useState('')
    const [intenthide, setintenthide] = useState(true)
    const [originalIntentName, setOriginalIntentName] = useState('');
const [isIntentNameChanged, setIsIntentNameChanged] = useState(false);
const [Addresponse, setAddresponse] = useState([]);
const [savebtnres, setsavebtnres] = useState(false);
const [searchText, setSearchText] = useState('');
const [searchText1, setSearchText1] = useState('');
const [showEntity, setShowEntity] = useState(true);
const theme = useTheme();
const isSmallScreen1 = useMediaQuery(theme.breakpoints.down('sm'));
const isSmallScreen2 = useMediaQuery(theme.breakpoints.down('sm'));
const { label, value, onChange, ...other } = props;
    // savebtnres 
    const [parameters, setParameters] = useState([
      { id: 1,name:'Entity', entity: 'Entity 1', isListing: true, isRedactInLog: true },
     
    ]);
  
    const [editIndex, setEditIndex] = useState(-1);
    const [newEntity, setNewEntity] = useState('');
    const [newListing, setNewListing] = useState(false);
    const [newRedactInLog, setNewRedactInLog] = useState(false);
    const [newName, setNewName] = useState('');
    const handleEdit = (index) => {
      setEditIndex(index);
      setNewName(parameters[index].name)
      setNewEntity(parameters[index].entity);
      setNewListing(parameters[index].isListing);
      setNewRedactInLog(parameters[index].isRedactInLog);
    };
  
    const handleSave = (index) => {
      const newParameters = [...parameters];
      newParameters[index].name = newName;
      newParameters[index].entity = newEntity;
      newParameters[index].isListing = newListing;
      newParameters[index].isRedactInLog = newRedactInLog;
      setParameters(newParameters);
      setEditIndex(-1);
    };
  
    const handleCancel = () => {
      setEditIndex(-1);
      setNewEntity('');
      setNewListing(false);
      setNewRedactInLog(false);
    };
  
    const handleCheckboxChange = (event, index, fieldName) => {
      const newParameters = [...parameters];
      newParameters[index][fieldName] = event.target.checked;
      setParameters(newParameters);
    };
  
    const handleNewEntityChange = (event) => {
      setNewEntity(event.target.value);
    };
    const handleNewNameChange = (event) => {
      setNewName(event.target.value)
    };
    const handleNewListingChange = (event) => {
      setNewListing(event.target.checked);
    };
  
    const handleNewRedactInLogChange = (event) => {
      setNewRedactInLog(event.target.checked);
    };
  
    const handleAdd = () => {
      const newParameter = {
        id: parameters.length + 1,
        entity: newEntity,
        isListing: newListing,
        isRedactInLog: newRedactInLog,
      };
      setParameters([...parameters, newParameter]);
      setNewEntity('');
      setNewListing(false);
      setNewRedactInLog(false);
    };
  
    const handleDelete = (index) => {
      const newParameters = [...parameters];
      newParameters.splice(index, 1);
      setParameters(newParameters);
    };
    const handleNewTodoChange = (event) => {
      setNewTodo(event.target.value);
    };
  
    const handleAddTodo = () => {
      if (newTodo) {
        setTodos([...todos, newTodo]);
        setNewTodo('');
        // AdditionalReq() 
      }
    };
    const handleKeyPress1 = (event) => {
      debugger
      if (event.key === 'Enter') {
        handleAddTodo();
      }
    };
  
    const handleDeleteTodo = (index) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    };
    const handleEditTodo = (index) => {
        setEditTodoIndex(index);
        setEditTodoText(todos[index]);
      };
      
  const handleSaveTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index] = editTodoText;
    setTodos(newTodos);
    setEditTodoIndex(null);
    setEditTodoText('');
    // AdditionalReq() 
  };
  const handleSaveTodo2 = (index,id) => {
    debugger

    //  const newTodos = [querName];selectedIntentquery
     querName[index] = editTodoText2
    //  setquerIName(newTodos);
    selectedIntentquery[index]={query_id: id, query_text: editTodoText2}
    setEditTodoIndex2(null);
 setEditTodoText2('')
 setIsAddingQueryDB(false)
 setSearchText('')
 setSearchText1('')
 setIsAddingQueryDBchange(true)
 setIsAddingResponseDB(false)
    // editTodoText2;;{query_id: 73, query_text: 'sdad'}selectedIntentquery
    // updateIntents("U",0)
  };
  const handleKeyPressQueriesNew=(event,index,id)=>{
    if (event.key === 'Enter'){
      handleSaveTodo2(index,id) 
    }
  }
  const handleSaveTodo3 = (index,id,no) => {
    debugger

    //  const newTodos = [querName];
    //  querName[index] = editTodoText3
    //  setquerIName(newTodos);
    selectedIntentresponse[index]={row_num: no, response_id: id, response_text: editTodoText3}
    setEditTodoIndex3(null);
 setEditTodoText3('')
 setIsAddingResponseDB(true)
 setSearchText('')
 setSearchText1('')
    // editTodoText2;;{query_id: 73, query_text: 'sdad'}selectedIntentquery{row_num: 1, response_id: 107, response_text: editTodoText3}
    // updateIntents("U",'','',no,id)
  };
  const handleKeyPressresponseNew=(event,index,id,no)=>{
    if (event.key == 'Enter'){
      handleSaveTodo3(index,id,no)
    }
  }
  const hadlesaveAddresponse = (index) => {
    debugger

    //  const newTodos = [querName];
    //  querName[index] = editTodoText3
    //  setquerIName(newTodos);
    setEditTodoIndex2(null);
 setEditTodoText2('')
    // editTodoText2;;{query_id: 73, query_text: 'sdad'}selectedIntentquery
    updateIntents("U")
  };
  // const handleSaveTodo3 = (index) => {
  //   const newTodos = [...todos];
  //   newTodos[index] = editTodoText3;
  //   setTodos(newTodos);
  //   setEditTodoIndex3(null);
  //   setEditTodoText3('');selectedIntentquery,selectedIntentresponse,showQueries,showResponse
  // };start,newIntents,contenthide,
  useEffect(()=>{
    debugger
    ReadIntents()
 
  },[start])

  const fetchData = async () => {
    setStart(start + 1)
    // setOneld(false)
  };
const handleIntentNameChange = e => {
    selectedIntentname({ ...selectedIntentname, name: e.target.value });
    setIsIntentNameChanged(e.target.value !== originalIntentName);
};
    // useEffect(() => {
    //     setIntents([
    //         {
    //             id: 1,
    //             name: 'Greeting',
    //             queries: [
    //                 { id: 1, query: 'What is your name?' },
    //                 { id: 2, query: 'What do you call yourself?' },
    //             ],
    //             responses: [
    //                 { id: 1, response: 'My name is ChatGPT.' },
    //             ],
    //         },
    //         {
    //             id: 2,
    //             name: 'Weather',
    //             queries: [
    //                 { id: 1, query: 'What is the weather like today?' },
    //                 { id: 2, query: 'Do you know the weather?' },
    //             ],
    //             responses: [
    //                 { id: 1, response: 'I don\'t know, check a weather app.' },
    //             ],
    //         },
    //         {
    //             id: 3,
    //             name: 'Time',
    //             queries: [
    //                 { id: 1, query: 'What time is it?' },
    //                 { id: 2, query: 'Do you know the time?' },
    //             ],
    //             responses: [
    //                 { id: 1, response: 'Check your device\'s clock.' },
    //             ],
    //         },
    //     ]);
    // }, []);hadlechangeName
    const handleNewTodoChange1 = (event) => {
        setNewTodo1(event.target.value);
      };
      const handleNewQueries = (event) => {
        debugger
        // querName.push(event.target.value)
        ;
        setquerIName(event.target.value)
        // setSelectedIntentquery([...selectedIntentquery,{query_id:0,query_text:event.target.value}])

        
        // setSelectedIntentquery(event.target.value);
      };
      const hadlechangeName = (event) => {
        setSelectedIntentname(event.target.value);
        setSearchText('')
        setSearchText1('')
      };
      const hadlechangeQueries = (event) => {
        setEditTodoText2(event.target.value)
        setSearchText('')
        setSearchText1('')
   
      };
      const hadlechangeResponse = (event) => {
        debugger
        setEditTodoText3(event.target.value)
        setAddresponse(event.target.value)
        setSearchText('')
        setSearchText1('')
      };
      const hadlechangeResponse1 = (event) => {
        debugger
        // setSelectedIntentresponse(event.target.value)
        setAddresponse(event.target.value)

        // setNewTodo1(event.target.value);
      };
    
    
    
      const handleAddTodo1 = (event) => {
        if (newTodo1) {
          setTodos1([...todos1, newTodo1]);
          setNewTodo1('');
          setIsAddingResponse(false)
          setsavebtnres(true)
          // AdditionalReq() 
         
        }

       
      };
      const handleKeyPress = (event) => {
        debugger
        if (event.key === 'Enter') {
          handleAddTodo1();
        }
      };
    
      const handleDeleteTodo1 = (index) => {
        const newTodos1 = [...todos1];
        newTodos1.splice(index, 1);
        setTodos1(newTodos1);
      };
      const handleEditTodo1 = (index) => {
          setEditTodoIndex1(index);
          setEditTodoText1(todos1[index]);
        };
        const handleDeleteTodo2 = (id,index) => {
          SWAlert.fire({
            text: 'Are you sure you want to delete ' + 'query' + '?',
            showCancelButton: true,
            confirmButtonColor: '#3899ec',
            cancelButtonColor: '#d33',
            focusCancel: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if (result.isConfirmed) {
              // deleteQueries(id)
              const newItems=[...selectedIntentquery]
              newItems.splice(index, 1);
              setSelectedIntentquery(newItems);
            }
          });
        
            setSearchText('')
            setSearchText1('')
          };
          const handleEditTodo2 = (index,txt,id) => {
              setEditTodoIndex2(index);
              setEditTodoText2(txt);
              setSearchText('')
              setSearchText1('')
              setEditTodoIndex3(null);

            };
            const handleAddQuries = (index) => {
              debugger
              setval("")
              setIsAddingQuery(false);
              setShowQueries(false)
              setIsAddingQueryDB(true)
              setIsAddingQueryDBchange(false)
              setIsAddingResponseDB(false)
              setSearchText('')
              setSearchText1('')
            //   var queyNames=[]
            //   for (var i = 0; i < querName.length; i++){
            //     debugger 
                
            //     queyNames.push(querName[i].query_text)
             
            //  }
            var a = [];
            a=selectedIntentquery;
            a.push({query_id:0,query_text:querName})
              setSelectedIntentquery(a)
              setShowQueries(true)
            
              };
              const handleEditTodo3 = (index,txt,id) => {
                debugger
                setEditTodoIndex3(index);
                setEditTodoText3(txt);
                setResid(id)
                setSearchText('')
                setSearchText1('')
                setEditTodoIndex2(null);
                // setEditTodoIndex3(null);
                };
                    
                const onKeypressQuerieschange =(event)=>{
                  if(event.key === 'Enter'){
                    handleAddQuries()
                  }
                }
    const handleSaveTodo1 = (index) => {
      const newTodos1 = [...todos1];
      newTodos1[index] = editTodoText1;
      setTodos1(newTodos1);
      setEditTodoIndex1(null);
      setEditTodoText1('');
      setSearchText('')
      setSearchText1('')
      // AdditionalReq() 
    };
    const handleKeyPressResponse =(event,index)=>{
      if (event.key === 'Enter') {
        handleSaveTodo1(index)
      }
    }
    const handleKeyPressQueries=(event,index)=>{
      if (event.key === 'Enter') {
        handleSaveTodo(index)
      }
    }
    const handleAddIntent = () => {
        debugger
      
        setStart(start + 1)
        setIntentsname([])
        setTodos([])
        setTodos1([])
        setsavebtnres(false)
        // setcontenthide(false)
        setIntentshide(false)
        setIsAddingIntent(true);
        setSelectedIntent({});
        setnewIntents(true)
        setIsAddingResponse(false) 
        setIsAddingQuery(false)
        setSearchText('')
        setSearchText1('')
        setText('')
    
    }
    const handleEditIntent = (id,name,queries,response) => {
        debugger
        setisEdit(true)
        dispatch(Inthideshow(true))
        setIntentshide(false)
        setIsAddingIntent(false);
        setcontenthide(true)
        setSelectedIntent(id);
        setSelectedIntentname(name)
        setSelectedIntentquery(queries)
        setSelectedIntentresponse(response)
        setShowQueries(true)
        setShowResponse(true)
        setintenthide(false)
        setText('')
//    let queyName=queries.map((name)=>{
//             setquerIName(name.queries_text) let resname=['a']
//         }) 
let queyName=[]
let resname=[]
// let rename1=
let ids=[]
setquerIName(queyName)
for (var i = 0; i < queries.length; i++){
   debugger 
   
   queyName.push(queries[i].query_text)

}
for (var i = 0; i < response.length; i++){
  debugger 
  
  resname.push(response[i].response_text)
ids.push(response[i].response_id)
}
setResid(ids[0])
setAddresponse(resname[0])
        document.querySelector('.savebtn').click();
    };

    const handleDeleteIntent = (id,index,name) => {
        // setIntents(intents.filter(intent => intent.id !== id));
        setText('')
        SWAlert.fire({
          text: 'Are you sure you want to delete ' + name + '?',
          showCancelButton: true,
          confirmButtonColor: '#3899ec',
          cancelButtonColor: '#d33',
          focusCancel: true,
          confirmButtonText: 'Ok',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            deleteIntents(id)
            const newItems=[...intents]
            newItems.splice(index, 1);
            setIntents(newItems);
          }
        });
       
    };

    const handleSaveIntent = () => {
        if (isAddingIntent) {
            setIntents([...intents, selectedIntent]);
        } else {
            setIntents(intents.map(existingIntent => {
                if (existingIntent.id === selectedIntent.id) {
                    return selectedIntent;
                }
                return existingIntent;
            }));
        }
        setSelectedIntent({});
        setIntentshide(true)
    };
    const newhandleSaveIntent = () => {
     debugger
    
     if (intentsname != '' && todos1 != '' && todos != '' ){
      
      // localStorage.setItem('intsavebtn','0')
      CreateIntents("C")
   
   
     }else{
      setnewIntents(true) 
      // localStorage.setItem('intsavebtn','1')
      if (intentsname == '' && todos1 == '' && todos == ''){
        SWAlert.fire({ title: 'Cell Serve Admin', text: 'Please add all above intents' });
      }
     else if (intentsname == ''){
      SWAlert.fire({ title: 'Cell Serve Admin', text: 'Please add intents name.' });}
      else if (todos == ''){
        SWAlert.fire({ title: 'Cell Serve Admin', text: 'Please add queries and response.'})
      }
      else if (todos1 == ''){
        SWAlert.fire({ title: 'Cell Serve Admin', text: 'Please add response.' })
      }
     
     }
   
       
    
        // setIntentshide(true)setisEdit
       
    };
    const updatehandleSaveIntent = () => {
        debugger
      
          //  updateIntents("U",'',1)
          
       
           // setIntentshide(true)setisEdit
           setIntentshide(true)
           setIsAddingIntent(false);
           setSelectedIntent({});
           setnewIntents(false)
           setcontenthide(false)
           setSearchText('')
           setSearchText1('')
           if (isAddingQueryDB == true){
            var a = [];
            a=selectedIntentquery;
            // a.push({query_id:0,query_text:querName})
              // setSelectedIntentquery(a)
              setShowQueries(true)
              updateIntents("U",1,"","","",a)
           }
          else if (isAddingQueryDBchange == true){
            updateIntents("U",2)
           }
          else if (isAddingResponseDB== true){
            var a = [];
            a=selectedIntentquery;
            updateIntents("U",'','','','',a)
           }
           else{
            var a = [];
            a=selectedIntentquery;
            updateIntents("U",'',1,"","",a)
           }
       };
    const handleAddQuery = () => {
        setIsAddingQuery(true);
        setSearchText('')
        setSearchText1('')
        setEditTodoIndex2(null);
        setEditTodoIndex3(null);
        setSelectedIntent({ ...selectedIntent, queries: [...selectedIntent.queries, { id: selectedIntent.queries.length + 1, query: '' }] });
    };

    // const handleEditQuery = (query) => {
    //     setIsAddingQuery(false);
    //     setSelectedIntent({
    //         ...selectedIntent, queries: selectedIntent.queries.map(existingQuery => {
    //             if (existingQuery.id === query.id) {
    //                 return query;
    //             }
    //             return existingQuery;
    //         })
    //     });
    // };
    const handleEditQuery = (index,txt,id) => {
      setEditTodoIndex2(index);
      setEditTodoText2(txt);

    };

    const handleDeleteTodo3 = (id,index) => {
      debugger
      // deleteIntents(id)
      const newItems=[...selectedIntentresponse]
            newItems.splice(index, 1);
            setSelectedIntentresponse(newItems);
            setSearchText('')
            setSearchText1('')
        // setSelectedIntent({ ...selectedIntent, queries: selectedIntent.queries.filter(query => query.id !== id) });
        // deleteIntents(id)
    };

    const handleAddResponse = () => {
        setIsAddingResponse(true);
        setSelectedIntent({ ...selectedIntent, responses: [...selectedIntent.responses, { id: selectedIntent.responses.length + 1, response: '' }] });
    };
    const handleAddIntents = () => {
        // setIntentshide(true)
        setcontenthide(false)
        setIntentshide(true)
        setIsAddingIntent(false);
        setSelectedIntent({});
        setnewIntents(false)
        setIsAddingQueryDB(false)
        setIsAddingQueryDBchange(false)
        setIsAddingResponseDB(false)
        setintenthide(true)
        setSearchText('')
        setSearchText1('')
        setText('')
        setEditTodoIndex2(null);
        setEditTodoIndex3(null);
        // setText('')
        // setIntentshide(false)
        // setIsAddingIntent(false);
        // setcontenthide(true)
        
    }
    const handleEditResponse = (response) => {
        setIsAddingResponse(false);
        setSelectedIntent({
            ...selectedIntent, responses: selectedIntent.responses.map(existingResponse => {
                if (existingResponse.id === response.id) {
                    return response;
                }
                return existingResponse;
            })
        });
    };
const handlearrowupdown =()=>{
  setShowResponse(!showResponse)
  setEditTodoIndex3(null);
  setEditTodoIndex2(null);
  setSearchText('')
  setSearchText1('')
}
const handlearrowupdown1 =()=>{
  setShowQueries(!showQueries)
  setEditTodoIndex2(null);
  setEditTodoIndex3(null);
    setSearchText('')
    setSearchText1('')
}
const handleSearchInputChange = (e) => {
  setSearchText(e.target.value);
  setSearchText1("");
};
const handleSearchInputChange1 = (e) => {
  setSearchText1(e.target.value);
  setSearchText("");
};
const FilterIntents =(e)=>{
  setText(e.target.value)
}
const filteredSelectedIntent = intents.filter((intent) =>
intent.intent_name.toLowerCase().includes(text.toLowerCase())
);
const filteredSelectedIntentquery = selectedIntentquery.filter((query) =>
  query.query_text.toLowerCase().includes(searchText.toLowerCase())
);
const filteredSelectedIntentResponse = selectedIntentresponse.filter((response) =>
response.response_text.toLowerCase().includes(searchText1.toLowerCase())
);

    const handleDeleteResponse = (id) => {
        setSelectedIntent({ ...selectedIntent, responses: selectedIntent.responses.filter(response => response.id !== id) });
    };
    const AddName=(e)=>{
        debugger
        setIntentsname(e.target.value)
    }
    const Addqueries=(e)=>{
        debugger
        setQueries(e.target.value)
    }
    async function CreateIntents(crud) {
        try {
            debugger;
            setLoading(true);
            let resposeques= todos1
            let resposequesInsert = [];
            for (var i = 0; i < resposeques.length; i++) {
                debugger
              
                 resposequesInsert.push({"query_index": 0,"response_text":resposeques[i] });

               
            }

            let Req = {
                "Req":
                {
                 "Type":"AIDM",
             "CRUD":crud,
                 "intent_name": intentsname,//book_flight",
                 "intent_description":"",// "Intent for booking a flight",
                 "training_data": "",
                  "queries":todos, //[
                //  "Book a flight from New York to Los Angeles",
                // "Reserve a flight from San Francisco to Boston"
                //  ],
               "responses":resposequesInsert,
            //  [
            //      {
            //     "query_index": 0,
            //      "response_text": "Okay, I'm booking your flight from New York to Los Angeles"
            //     },
            //      {
            //    "query_index": 0,
            //      "response_text": "Great, your flight from New York to Los Angeles has been booked"
            //      },
            //   {
            //    "query_index": 1,
            //   "response_text": "Sure, I'm reserving your flight from San Francisco to Boston"
            //     }
            //     ]
                }
                }
            
            const resp = await postAPIMySQL(Req, true);
            debugger;
            let response = JSON.parse(resp);
            setLoading(false);
            if (response.Resp.Sts == '1') {
              AdditionalReq()
              setIntentshide(true)
              setIsAddingIntent(false);
              setSelectedIntent({});
              setnewIntents(false)
              document.querySelector('.mainintent').click();
            }
            else if (response.Resp.Desc.slice(6,10) == '4500') {
              SWAlert.fire({ title: 'Existing intent', text: 'Please add new intent' });
            }
        } catch (err) {
            setLoading(false);
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            Logger.errorLog(err.message ?? err, '', '//pages//WebEditor//Components//DraggableCart//CartComponent.jsx', 'getAllTree');
        }
    }
    async function AdditionalReq() {
      try {
          debugger;
          setLoading(true);
          let Req ={
            "Req":{
              "Type":"MDAD",
              "CRUD":"SR",
              "id":"",
              "intent_name": "",
              "RC":"",
              "RS":""} 
            }
          

          const resp = await postAPIMySQL(Req, true);
          debugger;
          let response = JSON.parse(resp) 
          debugger
          setLoading(false);
          // `JSON.parse(resp)` 
          if (response.Resp.Sts == '1') {
            setStart(start + 1)
          }
          else {
              // setIntents([])
          }
      } catch (err) {
          setLoading(false);
          SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
          Logger.errorLog(err.message ?? err, '', '//pages//WebEditor//Components//DraggableCart//CartComponent.jsx', 'getAllTree');
      }
  }
    async function updateIntents(crud,no,val,row,id,a) {
        try {
            debugger;
            setLoading(true);
            // if(val == 1){

            // }
            let resposeques= Addresponse
            let resposequesInsert = [];
            resposequesInsert.push({row_num: 1, response_id: resid, response_text: Addresponse});
            // for (var i = 0; i < resposeques.length; i++) {
            //     debugger
              
            //      resposequesInsert.push({"query_index": 0,"response_text":resposeques[i] });

               
            // }
            var queryname
if(no == 1){
  queryname= []
      // var queyNames=[]
              for (var i = 0; i < a.length; i++){
                debugger 
                
                queryname.push(a[i].query_text)
             
             }
}
else if(no == 2){
  queryname= querName
}
else if(no == ""){
  queryname= []
  // var queyNames=[]
          for (var i = 0; i < a.length; i++){
            debugger 
            
            queryname.push(a[i].query_text)
         
         }
}
            let Req = {
                "Req":
                {
                 "Type":"AIDM",
             "CRUD":crud,
             "id":selectedIntent,
                 "intent_name": selectedIntentname,//book_flight",
                 "intent_description":"",// "Intent for booking a flight",
                 "training_data": "",
                  "queries":queryname,
                  //[selectedIntentquery
                //  "Book a flight from New York to Los Angeles",
                // "Reserve a flight from San Francisco to Boston"
                //  ],
               "responses":resposequesInsert,
            //  [
            //      {
            //     "query_index": 0,
            //      "response_text": "Okay, I'm booking your flight from New York to Los Angeles"
            //     },
            //      {
            //    "query_index": 0,
            //      "response_text": "Great, your flight from New York to Los Angeles has been booked"
            //      },
            //   {
            //    "query_index": 1,
            //   "response_text": "Sure, I'm reserving your flight from San Francisco to Boston"
            //     }
            //     ]
                }
                }
            
            const resp = await postAPIMySQL(Req, true);
            debugger;
            let response = JSON.parse(resp);
            setLoading(false);
            if (response.Resp.Sts == '1') {
              AdditionalReq()
            }
            else {

            }
        } catch (err) {
            setLoading(false);
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            Logger.errorLog(err.message ?? err, '', '//pages//WebEditor//Components//DraggableCart//CartComponent.jsx', 'getAllTree');
        }
    }
    async function ReadIntents() {
        try {
            debugger;
            setLoading(true);
            let Req = {
                
                    "Req":
                    {
                 "Type":"AIDM",
                 "CRUD":"R",
                  "id":"",
                 "intent_name": "",
                 "RC":"",
                 "RS":""
                     }
                    }
            

            const resp = await postAPIMySQL(Req, true);
            debugger;
            let response = JSON.parse(resp) 
            debugger
            setLoading(false);
            // `JSON.parse(resp)` 
            if (response.Resp.Sts == '1') {
                let dsc = response.Resp.Result;
                setIntents(JSON.parse(response.Resp.Result))
                var val=response.Resp.Result;
                // setStart(start + 1)
                // AdditionalReq()
            }
            else {
                // setIntents([])
                sethasMoreItems(false);
            }
        } catch (err) {
            setLoading(false);
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            Logger.errorLog(err.message ?? err, '', '//pages//WebEditor//Components//DraggableCart//CartComponent.jsx', 'getAllTree');
        }
    }
    async function deleteIntents(id) {
        try {
            debugger;
            setLoading(true);
            let Req = {
                
                    "Req":
                    {
                 "Type":"AIDM",
                 "CRUD":"D",
                  "id":id,
                 "intent_name": "",
                 "RC":"",
                 "RS":""
                     }
                    }
            

            const resp = await postAPIMySQL(Req, true);
            debugger;
            let response = JSON.parse(resp) 
            debugger
            setLoading(false);
            // `JSON.parse(resp)` 
            if (response.Resp.Sts == '1') {
              AdditionalReq()
             
            }
            else {
                // setIntents([])
            }
        } catch (err) {
            setLoading(false);
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            Logger.errorLog(err.message ?? err, '', '//pages//WebEditor//Components//DraggableCart//CartComponent.jsx', 'getAllTree');
        }
    }
    async function deleteQueries(id) {
      try {
          debugger;
          // setLoading(true);
          let Req = {
              
                  "Req":
                  {
               "Type":"AIDM",
               "CRUD":"DQ",
                "id":id,
               "intent_name": "",
               "RC":"",
               "RS":""
                   }
                  }
          

          const resp = await postAPIMySQL(Req, true);
          debugger;
          let response = JSON.parse(resp) 
          debugger
          // setLoading(false);
          // `JSON.parse(resp)` 
          if (response.Resp.Sts == '1') {
            // AdditionalReq()
            setStart(start + 1)
          }
          else {
              // setIntents([])
          }
      } catch (err) {
          // setLoading(false);
          SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
          Logger.errorLog(err.message ?? err, '', '//pages//WebEditor//Components//DraggableCart//CartComponent.jsx', 'getAllTree');
      }
  }
   
    return (<>    <Loading style={{
      display: loading ? "flex" : "none"
  }} loading={loading} />
        <div className={classes.root}>
        <InfinitScroll
        dataLength={selectedIntentresponse.length}
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
      {    intentshide && 
        <Stack alignItems='flex-end' marginTop={'20px'}>
        <Stack direction='row' className='serBox ser1' alignItems='flex-end' justifyContent='space-between' >
        <Stack direction='row' spacing={3} alignItems='center'>
          {/* <SearchIcon sx={{ marginLeft: '10px', color: '#6eabe0' }} /> */}
          <img src={search} width='30px' height='30px' />
          <InputBase value={text} onChange={(e)=>setText(e.target.value)} sx={{
            color: Colors.primary, fontSize: '15px', fontStyle: 'italic',
            width: "85%"
          }}
            placeholder='Search for Intents' ></InputBase>
        </Stack>
        </Stack></Stack>}
            {/* {!selectedIntent.id && (
                <> */}
                <div style={{display:'none'}}>
                    <h1 className='hide1' onClick={handleAddIntents}>Intents</h1>
                    <Button  variant="contained" color="primary" className='addintens' onClick={handleAddIntent}>
                        Add Intent
                    </Button></div>
                    {
                    //     intentshide ?
                    // <List className='listintents'>
                    //     {intents.map(intent => (
                    //         <ListItem key={intent.intent_id}  sx={{justifyContent:'space-between'}}>
                    //             <ListItemText primary={intent.intent.intent_name} />
                    //             <ListItemSecondaryAction>
                    //                 <IconButton edge="end" onClick={() => handleEditIntent(intent)}>
                    //                     <EditIcon />
                    //                 </IconButton>
                    //                 <IconButton edge="end" onClick={() => handleDeleteIntent(intent.intent_id)}>
                    //                     <DeleteIcon />
                    //                 </IconButton>
                    //             </ListItemSecondaryAction>
                    //         </ListItem>
                    //     ))}
                    // </List>:<></> 
                            intentshide ?
                    <List className='listintents'>
                        {filteredSelectedIntent.map((intent, index)  => (
                            <ListItem key={intent.intent_id}  sx={{justifyContent:'space-between'}}>
                                <ListItemText onClick={() => handleEditIntent(intent.intent_id,intent.intent_name,intent.queries,intent.responses)} primary={intent.intent_name} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" sx={{color:'#29AAE1'}} onClick={() => handleEditIntent(intent.intent_id,intent.intent_name,intent.queries,intent.responses)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end"  sx={{color:'red'}} onClick={() => handleDeleteIntent(intent.intent_id,index,intent.intent_name)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>:<></> 
                }
                {selectedIntent && (
                  contenthide ? 
                    <div className='mainshow'>
                        <h3 className='headinssub'>Name</h3>
                        <TextField
                            
                            value={selectedIntentname}
                            onChange={hadlechangeName}    
                            onClick={()=>{ setSearchText('');setSearchText1('');   setEditTodoIndex2(null);   setEditTodoIndex3(null);}}               
                                     fullWidth
                        />
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer',}} onClick={() => handlearrowupdown1() }>
                            <h3 className='headinssub' style={{marginRight: '10px'}}>Queries</h3>
                            {showQueries ? <ExpandLessIcon /> : <ExpandMoreIcon />}

                        </div>
                        {selectedIntentquery != null && showQueries && (
                        
                        
                            <List>
                            <Stack direction='row' spacing={3} alignItems='center'>
                            {/* <SearchIcon sx={{ marginLeft: '10px', color: '#6eabe0' }} /> */}
                            <img src={search} width='30px' height='30px' />
                              <Input placeholder='Search Queries...' fullWidth value={searchText} onChange={handleSearchInputChange}  onClick={()=> {setSearchText1('');setEditTodoIndex3(null);   setEditTodoIndex2(null);setUnderline(true);}}
                              disableUnderline 
                              inputProps={{ 
                                style: { 
                                  borderBottom: underline && searchText ? '1px solid #29AAE1' : 'none' 
                                } 
                              }}
                              onFocus={() => setUnderline(true)}
                              onBlur={() => setUnderline(false)}   /></Stack>
                              {filteredSelectedIntentquery.map((query, index) => (
                                <ListItem key={index} sx={isSmallScreen2 ? { px: 12 } : undefined} {...other}>
                                  {editTodoIndex2 === index ? (
                                    <>
                                      <TextField value={editTodoText2} onChange={hadlechangeQueries} onKeyPress={(event) =>handleKeyPressQueriesNew(event,index,query.query_id,)} fullWidth />
                                      <IconButton edge='end' sx={{ color: 'green' }} onClick={() => handleSaveTodo2(index, query.query_id)} >
                                        <SaveIcon sx={{ color: 'green' }} />
                                      </IconButton>
                                    </>
                                  ) : (
                                    <>
                                      <ListItemText primary={query.query_text} onClick={() => handleEditTodo2(index, query.query_text, query.query_id)} />
                                      <ListItemSecondaryAction>
                                        <IconButton edge='end' sx={{ color: '#29AAE1' }} onClick={() => handleEditTodo2(index, query.query_text, query.query_id)}>
                                          <EditIcon />
                                        </IconButton>
                                        {selectedIntentquery.length == 1 ? <></> :
                                        <IconButton edge='end' sx={{ color: 'red' }} onClick={() => handleDeleteTodo2(query.query_id, index)}>
                                          <DeleteIcon />
                                        </IconButton>}
                                      </ListItemSecondaryAction>
                                    </>
                                  )}
                                </ListItem>
                              ))}
                            </List>
                       
                        
                          
                        )} { showQueries &&(
                        <Stack direction= 'row'>
                          
                        {isAddingQuery ? (
                          <Stack direction='row'>
                          <TextField
                              label="Add Query"
                              defaultValue={val}
                         onChange={handleNewQueries}
                         onKeyPress={onKeypressQuerieschange}
                         onClick={()=> {setSearchText('');setSearchText1('');   setEditTodoIndex3(null);   setEditTodoIndex2(null);}}
                              fullWidth
                          />
                          <Button  size={isSmallScreen ? 'small' : 'medium'} variant="contained" color="primary" onClick={handleAddQuries}>
                          ADD
                      </Button></Stack>
                      ) : (
                          <Button size={isSmallScreen ? 'small' : 'medium'} variant="contained" color="primary" onClick={handleAddQuery}>
                              Add Query
                          </Button>
                      )}
                              </Stack>)}
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer',}} onClick={() => handlearrowupdown()}>
                        <h3 className='headinssub' style={{marginRight: '10px'}}>responses</h3>
                        {showResponse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </div>
                    {showResponse &&  selectedIntentresponse != null &&(
                      
                      <List>
                      <Stack direction='row' spacing={3} alignItems='center'>
                      {/* <SearchIcon sx={{ marginLeft: '10px', color: '#6eabe0' }} /> */}
                      <img src={search} width='30px' height='30px' />
                        <Input placeholder='Search Responses...' fullWidth value={searchText1} onChange={handleSearchInputChange1}  onClick={()=> {setSearchText('');   setEditTodoIndex2(null);   setEditTodoIndex3(null);setUnderline1(true)}} 
                        disableUnderline 
                        inputProps={{ 
                          style: { 
                            borderBottom: underline1 && searchText1 ? '1px solid #29AAE1' : 'none' 
                          } 
                        }}
                        onFocus={() => setUnderline1(true)}
                        onBlur={() => setUnderline1(false)} 
                        /></Stack>
                      {filteredSelectedIntentResponse.map((response, index) => (
                        <ListItem key={index}> 
                          {editTodoIndex3 === index ? (
                            <>
                              <TextField value={editTodoText3} onChange={hadlechangeResponse} onKeyPress={(event) =>handleKeyPressresponseNew(event,index,response.response_id,response.row_num)} fullWidth />
                              <IconButton edge="end" sx={{color:'green'}}  onClick={() => handleSaveTodo3(index,response.response_id,response.row_num)}>
                                <SaveIcon />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <ListItemText primary={response.response_text}  onClick={() => handleEditTodo3(index,response.response_text,response.response_id)} />
                              <ListItemSecondaryAction>
                                <IconButton edge="end" sx={{color:'#29AAE1'}}  onClick={() => handleEditTodo3(index,response.response_text,response.response_id)}>
                                  <EditIcon />
                                </IconButton>
                                { selectedIntentresponse.length == 1 ? <></>:
                                <IconButton edge="end" sx={{color:'red'}}  onClick={() => handleDeleteTodo3(response.response_id,index)}>
                                  <DeleteIcon />
                                </IconButton>
                                }
                              </ListItemSecondaryAction>
                            </>
                          )}
                        </ListItem>
                      ))}
                    </List>
                   
                    )}
                    {
                    //   showResponse && ( 
                    // <Stack direction='row'>
                    
                    // {
                    //   isAddingResponse ? (
                    //     <Stack direction='row'>
                    //     <TextField
                    //         label="Add Response"
                    //         value={Addresponse} onChange={hadlechangeResponse1}
                    //         fullWidth
                    //     />
                    //     <Button size={isSmallScreen ? 'small' : 'medium'} variant="contained" color="primary"  onClick={hadlesaveAddresponse}>
                    //    Add
                    // </Button></Stack>
                    // ) : (
                    //     <Button size={isSmallScreen ? 'small' : 'medium'} variant="contained" color="primary" onClick={handleAddResponse}>
                    //         Add Response
                    //     </Button>
                    // )}
                    
                    // </Stack>)
                  }
                  <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer',}} onClick={() => setShowEntity(!showEntity)}>
                  <h3 className='headinssub' style={{marginRight: '10px'}}></h3>
                  {showEntity ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>
              {showEntity && 
                <div>
                <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Parameter Name</TableCell>
                    <TableCell>Entity</TableCell>
                    {/* <TableCell>Edit</TableCell> */}
                    <TableCell>Listing</TableCell>
                    <TableCell>Redact in Log</TableCell>
                    <TableCell ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parameters.map((parameter, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input type="text" value={newName} onChange={handleNewNameChange} onClick={() => handleEdit(index)} disableUnderline />
                      </TableCell>
                      <TableCell>
                        <Input type="text" value={newEntity} onChange={handleNewEntityChange} onClick={() => handleEdit(index)} disableUnderline />
                     </TableCell>
                      {/* <TableCell></TableCell> */}
                      <TableCell>{editIndex === index ? (
                        <input type="checkbox" checked={newListing} onChange={handleNewListingChange} />
                      ) : (
                        <input type="checkbox" checked={parameter.isListing} onChange={(event) => handleCheckboxChange(event, index, 'isListing')} />
                      )}</TableCell>
                      <TableCell>{editIndex === index ? (
                        <input type="checkbox" checked={newRedactInLog} onChange={handleNewRedactInLogChange} />
                      ) : (
                        <input type="checkbox" checked={parameter.isRedactInLog} onChange={(event) => handleCheckboxChange(event, index, 'isRedactInLog')} />
                      )}</TableCell>
                      <TableCell>{editIndex === index ? (
                        <div>
                         
                          <IconButton edge='end' sx={{ color: 'green' }} onClick={() => handleSave(index)}>
                          <SaveIcon />
                        </IconButton>
                        <IconButton edge='end' sx={{ color: 'red' }} onClick={handleCancel}>
                        <CloseIcon />
                      </IconButton>
                        </div>
                      ) : (
                        <button style={{display:'none'}} onClick={() => handleEdit(index)}>Edit</button>
                      )}
                   
                      <IconButton edge='end' sx={{ color: 'red' }} onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                    </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
                {editIndex === -1 && (
                  <div>
                  {
                    // <input type="text" value={newName} onChange={handleNewNameChange} />
                    // <input type="text" value={newEntity} onChange={handleNewEntityChange} />
                    // <input type="checkbox" checked={newListing} onChange={handleNewListingChange} />
                    // <input type="checkbox" checked={newRedactInLog} onChange={handleNewRedactInLogChange} />
                    
                  }<button onClick={handleAdd}>Add</button>
                  </div>
                )}
              </div>
              
              
              }
                    <Button className='updatesavebtn' size={isSmallScreen ? 'small' : 'medium'} variant="contained" color="primary" onClick={updatehandleSaveIntent} sx={{display:'none'}}>
                    Save Intent
                </Button>
                    </div>:<></>
                )}
                
                
                {newIntents ?
                    <div className='mainshow'>
                    <div style={{paddingLeft:'50px'}}>
                    <h3 className='headinssub'>Name</h3>
                  
                    <TextField
                       
                        value={intentsname}
                       onChange={(e)=>AddName(e)}
                      //  fullWidth={isSmallScreen1 ? false : true}
                            size={isSmallScreen1 ? 'small' : 'medium'}
                            width='10%'
                    />  
                
                    <h3 className='headinssub'>Queries</h3>
                    <List>
                    {todos.map((todo, index) => (
                      <ListItem key={index}>
                        {editTodoIndex === index ? (
                          <>
                            <TextField value={editTodoText} onChange={(e) => setEditTodoText(e.target.value)} onKeyPress={(event) =>handleKeyPressQueries(event,index)}  fullWidth />
                            <IconButton edge="end" sx={{color:'green'}}  onClick={() => handleSaveTodo(index)}>
                              <SaveIcon />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <ListItemText primary={todo} />
                            <ListItemSecondaryAction>
                              <IconButton edge="end" sx={{color:'#29AAE1'}}  onClick={() => handleEditTodo(index)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton edge="end" sx={{color:'red'}}  onClick={() => handleDeleteTodo(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </>
                        )}
                      </ListItem>
                    ))}
                  </List>
            
                    {isAddingQuery ? (
                        <Stack direction='row' spacing={4}>
                        <TextField
                            label="Add Query"
                            value={newTodo} onChange={handleNewTodoChange}
                            fullWidth={isSmallScreen1 ? false : true}
                            onKeyPress={handleKeyPress1}
                            size={isSmallScreen1 ? 'small' : 'medium'}
                        />
                        <Button  size={isSmallScreen ? 'small' : 'medium'} variant="contained" color="primary" onClick={handleAddTodo}>
                        ADD 
                    </Button></Stack>
                    ) : (
                        <Button size={isSmallScreen ? 'small' : 'medium'} variant="contained" color="primary" onClick={handleAddQuery}>
                            Add Query
                        </Button>
                    )}
                    <h3 className='headinssub'>Responses</h3>
                    <List>
                    {todos1.map((todo1, index) => (
                      <ListItem key={index}>
                        {editTodoIndex1 === index ? (
                          <>
                            <TextField value={editTodoText1} onChange={(e) => setEditTodoText1(e.target.value)} onKeyPress={(event) =>handleKeyPressResponse(event,index)}    fullWidth />
                            <IconButton edge="end" onClick={() => handleSaveTodo1(index)}>
                              <SaveIcon />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <ListItemText primary={todo1} />
                            <ListItemSecondaryAction>
                              <IconButton edge="end" onClick={() => handleEditTodo1(index)}>
                                <EditIcon />
                              </IconButton>
                              {
                              // <IconButton edge="end" onClick={() => handleDeleteTodo1(index)}>
                              //   <DeleteIcon />
                              // </IconButton>
                            }
                            </ListItemSecondaryAction>
                          </>
                        )}
                      </ListItem>
                    ))}
                  </List>
                    {
                      isAddingResponse ? (
                        <Stack direction='row' spacing={4}>
                        <TextField
                            label="Add Response"
                            value={newTodo1} onChange={handleNewTodoChange1}
                            onKeyPress={handleKeyPress}
                            fullWidth={isSmallScreen1 ? false : true}
                            size={isSmallScreen1 ? 'small' : 'medium'}
                        />
                        <Button size={isSmallScreen ? 'small' : 'medium'} variant="contained" color="primary"  onClick={handleAddTodo1} onKeyPress={handleKeyPress} >
                        ADD
                    </Button></Stack>
                    ) : (
                        <Button size={isSmallScreen ? 'small' : 'medium'} sx={{display: savebtnres ? 'none':'block'}} variant="contained" color="primary" onClick={handleAddResponse}>
                            Add Response
                        </Button>
                    )}
                    <Button className='addsavebtn' size={isSmallScreen ? 'small' : 'medium'} variant="contained" color="primary" onClick={newhandleSaveIntent} sx={{display:'none'}}>
                        Save Intent
                    </Button>
                </div>
          
                    </div> : <></>}
                    </InfinitScroll>
        </div></>
    );
};

export default Intents;



