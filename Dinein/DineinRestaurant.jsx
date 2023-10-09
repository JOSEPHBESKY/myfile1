import React, { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, Avatar, Button, Divider, IconButton, Input, ListItemAvatar, Menu, Stack, TextField, Typography } from '@mui/material';
import Swal from "sweetalert2";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ErrorBoundary from '../../common/errorboundary';
import { postAPI } from "../../services/apicall";
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
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import { getCookie } from '../../common/cks';
import AddProduct from './AddReservation'
import { Closeicon, DiaBtn1, DiaBtn2, DiaHeader, StyledDiaBx } from '../../styles/common';
import { connect, useSelector, useDispatch } from "react-redux";
import HeaderForm from "../saucerView/components/header/index";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import QrGen from '../../common/tool/qrGen';
import { FromHomeOrSetup } from "../../stateManagement/action";
import './dine.css'
import search from '../../assets/images/searchBlue.png'
import CloseIcon from '@mui/icons-material/Close';
import { Colors } from '../../styles/theme';

const mapStatetoProps = (state) => {
    return {
        RightTreeID: state.RightTreeID,
        DCONTENT: state.DCONTENT,
        MCONTENT: state.MCONTENT,
    };
};

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'RN',
        numeric: false,
        disablePadding: true,
        label: 'SNo',
        align: 'center',
        margin: '10px'
    },
    {
        id: 'TNO',
        numeric: false,
        disablePadding: true,
        label: 'Table Number',
        align: 'center',
        margin: '10px'
    },
    {
        id: 'DC',
        numeric: false,
        disablePadding: true,
        label: 'No Of Person',
        align: 'center',
        margin: '10px'

    },
    {
        id: 'ST',
        numeric: false,
        disablePadding: true,
        label: 'Status',
        align: 'center',
        margin: '10px'
    },

    {
        id: 'settings',
        numeric: false,
        disablePadding: false,
        label: 'Settings',
        align: 'center',
        margin: '10px'
    },
];

function EnhancedTableHead(props) {
    //debugger;
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow style={{ backgroundColor: 'lightblue' }}>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        marginRight={headCell.margin}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}

                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{ marginLeft: '25px' }}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function DineinRestaurant({
    onLocalUpdate,
    elemData,
    prefill,
    onComplete,
    tempID,
}) {
    //debugger;
    //const rows = elemData.data;
    const dispatch = useDispatch();
    const divRef = useRef(null);
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [arrProductData, setArrProductData] = useState([]);
    const [popupTitle, setPopupTitle] = useState("Add Product");

    const [PID, setPID] = useState("");



    const [bizID, setBizID] = useState("");
    const [bizName, setBizName] = useState('');
    const [arrBusinessData, setArrBusinessData] = useState([]);

    const [productViewPanel, setProductViewPanel] = React.useState(true);
    const [productAEPanel, setProductAEPanel] = React.useState(false);

    const [text, setText] = useState('')
    const [serCl, setSerCl] = useState(false)
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    //const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [openci, setOpenci] = useState(false);
    const [qrOpen, setQropen] = useState(false)
    //const { numSelected, rowCount } = props;

    const [anchorMoreEl, setAnchorMoreEl] = React.useState(null);

    const [searchinput, setSearchinput] = React.useState('');

    const openExp = Boolean(anchorMoreEl);
    let v_RTreeID = useSelector((state) => state.RightTreeID)
    const scrollToTop = () => {
        divRef.current.scroll({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {

        if (v_RTreeID != "") {
            GetTableData(v_RTreeID, "");
        }
        setProductViewPanel(true);
        setProductAEPanel(false);

    }, []);

    async function GetTableData(v_RTreeID, v_SearchTable) {
        //debugger
        try {
            setLoading(true);

            //debugger;
            var payload = "";
            // payload = {
            //     Req: {
            //         Type: "GSPL",
            //         CRUD: "",
            //         Rsk: "UnEuNhoKLZBdIcLjKILZg==",
            //         DevID: "",
            //         BizID: "",
            //         BID: "",
            //         ID: "",
            //         PID: "",
            //         NM: v_SearchName,
            //         RBN: "",
            //         KID: v_RTreeID
            //     },
            // };
            payload = {
                "Req": {
                    "Type": "GSRT",
                    "CRUD": "",
                    "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
                    "DevID": "",
                    "RKID": "",//--root key id
                    "KID": "",//--key id
                    "TNO": v_SearchTable,//--table number      
                    "ST": "",//--status 
                    "CBY": getCookie('roleId'),
                    "UID": getCookie('roleId'),
                    "RS": "",
                    "RC": ""
                }
            }

            var req = JSON.stringify(payload);
            var rows = await postAPI(payload, false); // Open for all
            setLoading(false);

            let jsonObject = JSON.parse(rows);
            if (jsonObject.Resp.Sts == "1") {
                // setArrProductData(JSON.parse(jsonObject.Resp.Result));
                // debugger;
                setRows(JSON.parse(jsonObject.Resp.Result));

                // Added by Anand for Temporary
                //elemData.data = JSON.parse(jsonObject.Resp.Result);
                //onLocalUpdate({ data: JSON.parse(jsonObject.Resp.Result) });

                // GetProductData_Cart(v_RTreeID,"");
            }
            else {
                setRows([]);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    const handleClickMoreAction = (event) => {
        setAnchorMoreEl(event.currentTarget);
    };
    const handleCloseMoreAction = () => {
        setAnchorMoreEl(null);
    };


    const handleFilterClick = (event) => {
        //setAnchorMoreEl(event.currentTarget);
    };



    //Add New Product
    const AddProduct_Click = (e) => {
        e.stopPropagation();

        setPopupTitle('Add Table')
        setPID('');
        setProductViewPanel(true);
        setProductAEPanel(true);
        setOpenci(true);

    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        //debugger;
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.TNO);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        //debugger;
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const ClearText = (e) => {
        e.stopPropagation()
        setText('')
        setSerCl(false)
    }

    const onTextChange = (e) => {
        //  debugger   setSearchinput(event.target.value);
        // event.target.value);
        if (v_RTreeID != "") {

            GetTableData(v_RTreeID, e.target.value);
        }
        e.stopPropagation()
        if (e.target.value != "") {
            setSerCl(true)
            setText(e.target.value)
        } else {
            setSerCl(false)
            setText(e.target.value)
        }
    }

    const hideProduct = (prodId) => {
        try {

        } catch (err) {
            SWAlert.fire({ text: err.message });
        }
    };

    const [ID, setID] = useState(null);
    const [restID, setRestID] = useState("");
    const [restName, setRestName] = useState('');
    const [keyID, setKeyID] = useState("");
    const [keyName, setKeyName] = useState('');

    const [Index, setIndex] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleSettingClick = (event, id, index) => {
        try {
            debugger;
            setAnchorEl(event.currentTarget);
            // When ... Click we need to take id, item & controlId and keep it in State
            setID(id.TNO);
            setRestID(id.BizID);
            setRestName(id.BizNM);
            setKeyID(id.DKID);
            setKeyName(id.DKNM);

            setPID(id.TNO);
            setIndex(index);
            //setIsEdit(false);
        } catch (err) {
            SWAlert.fire({ text: err.message, });
        }
    };
    const handleSettingClose = () => {
        setAnchorEl(null);
    };

    const handleEditProductClicked = (e, id) => {
        try {

            setPopupTitle('Edit Table')
            setAnchorEl(null);
            setProductViewPanel(true);
            setProductAEPanel(true);
            setOpenci(true);

        } catch (err) {
            SWAlert.fire({ text: err.message });
        }
    };

    const handleDuplicateProductClicked = (e, id) => {
        try {

            setAnchorEl(null);

        } catch (err) {
            SWAlert.fire({ text: err.message });
        }
    };

    const handleQRClicked = (e, id) => {
        try {
            // debugger;
            setQropen(true)
        } catch (err) {
            SWAlert.fire({ text: err.message });
        }
    }

    const handleClose = () => {
        setQropen(false);
    };

    const handleDeleteProductClicked = (e, id) => {
        try {

            setAnchorEl(null);

            SWAlert.fire({
                text: 'Are you sure you want to delete ?',
                showCancelButton: true,
                confirmButtonColor: '#3899ec',
                cancelButtonColor: '#d33',
                focusCancel: true,
                confirmButtonText: 'Ok',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    DeleteProduct('');
                }
            });



        } catch (err) {
            SWAlert.fire({ text: err.message });
        }
    };
    async function DeleteProduct(crud) {
        try {
            setLoading(true);
            let Req = {
                "Req": {
                    "Type": "DSRT",
                    "CRUD": "",
                    "Rsk": "UnEuNhoKLZ7IDecLjKILZg==",
                    "DevID": "",
                    "RKID": "",//--root key id
                    "KID": "",//--key id
                    "TNO": PID,//--table number      
                    "ST": "",//--status   
                    "CBY": getCookie('roleId'),
                    "UID": getCookie('roleId'),
                    "RS": "",
                    "RC": ""
                }
            }
            //debugger;
            const resp = await postAPI(Req);
            // debugger;
            setLoading(false);
            if (!resp) {
                nav("/logout");
            } else {
                let response = JSON.parse(resp);

                if (response.Resp.Sts == 1) {

                    Swal.fire({
                        text: "Successfully Deleted",
                    });
                    if (v_RTreeID != "")
                        GetTableData(v_RTreeID, searchinput);

                    setProductViewPanel(true);
                    setProductAEPanel(false);
                    setLoading(false);
                }
                else {
                    let v_ErrDEsc = response.Resp.Desc;
                    setLoading(false);
                    Swal.fire({
                        text: v_ErrDEsc,
                    });
                    // handleAE_CloseClick('');
                }

            }



        } catch (error) {
            // debugger;
            console.error(`product UpdateProduct error: ${error}`);
            setLoading(false);
        }
    }
    const handleCloseChangeIconModal = () => {

        //debugger;
        setOpenci(false);


    };


    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    //Close click - show grid page
    function handleAE_CloseClick(color) {
        setProductViewPanel(true);
        setProductAEPanel(false);
    }

    function handleAE_SaveClick(color) {
        if (v_RTreeID != "")
            GetTableData(v_RTreeID, searchinput);

        setProductViewPanel(true);
        setProductAEPanel(false);

        // document.querySelector('.refreshdraggablecartindexpg').click();

    }


    const onChangeSearch = (event) => {
        // debugger
        setSearchinput(event.target.value);
        // event.target.value);
        if (v_RTreeID != "") {

            GetTableData(v_RTreeID, event.target.value);
        }
    };

    const handleClickFunction = (fromWhere) => {
        dispatch(FromHomeOrSetup(fromWhere)); // If fromWhere == Home || fromWhere == Setup
    }

    return (
        <>
            <Loading style={{
                display: loading ? "flex" : "none"
            }} loading={loading} />
            <HeaderForm clickFunction={handleClickFunction} />
            <Box sx={{ width: '100%', maxHeight: 460, overflowY: 'scroll', marginTop: '80px' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>

                    {productViewPanel && (
                        <>
                            <Toolbar style={{ minHeight: '50px' }}
                                sx={{
                                    pl: { sm: 2 },
                                    pr: { xs: 1, sm: 1 },
                                }}
                            >
                                {/* <Typography
                                    sx={{ flex: '1 1 100%', marginLeft:'15px' }}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div"
                                >
                                    Table Information
                                </Typography> */}
                                <Stack direction='row' alignItems='center' justifyContent='space-between' width='100%'>
                                    <Stack direction='row' alignItems='center' sx={{ width: '50%', height: '40px', backgroundColor: 'white', borderRadius: '10px 10px 0px 0px', position: 'relative', bottom: '5px' }}>
                                        <Stack alignItems='center' sx={{ height: '35px', backgroundColor: '#898BD6', borderRadius: '0px 0px 10px 10px', marginLeft: '15px', position: 'relative', bottom: '3px' }} >
                                            <label style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginLeft: "10px", marginRight: "10px", position: 'relative', top: '3px' }}>Table Information</label>
                                        </Stack>
                                    </Stack>
                                    <Stack direction='row' alignItems='center'>
                                        <button
                                            id="demo-customized-button"
                                            aria-controls={openExp ? 'demo-customized-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openExp ? 'true' : undefined}
                                            variant="contained"
                                            disableElevation
                                            onClick={handleClickMoreAction}
                                            endIcon={<KeyboardArrowDownIcon />}
                                            style={{ width: '250px', display: 'none', borderRadius: '30px', height: '30px', fontSize: '14px' }}
                                            className='clrBtn'
                                        >
                                            More Action
                                        </button>
                                        <StyledMenu
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'demo-customized-button',
                                            }}
                                            anchorEl={anchorMoreEl}
                                            open={openExp}
                                            onClose={handleCloseMoreAction}
                                        >
                                            <MenuItem onClick={handleCloseMoreAction} disableRipple>
                                                <UploadIcon />
                                                Export
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseMoreAction} disableRipple>
                                                <DownloadIcon />
                                                Import
                                            </MenuItem>
                                        </StyledMenu>

                                        <button
                                            id="demo-customized-button"
                                            aria-haspopup="true"
                                            variant="contained"
                                            disableElevation
                                            style={{ width: '100px', height: '30px', borderRadius: '30px', marginRight: '15px' }}
                                            size="small"
                                            onClick={(e) => AddProduct_Click(e)}
                                            className='clrBtn'

                                        >
                                            <label className="LogLbl" style={{ paddingBottom: '0px', position: 'relative', bottom: '0px' }}>Add Table</label>
                                        </button>
                                    </Stack>
                                </Stack>


                            </Toolbar>
                            <Toolbar style={{ minHeight: '50px' }}
                                sx={{
                                    pl: { sm: 2 },
                                    pr: { xs: 1, sm: 1 },
                                    bgcolor: (theme) =>
                                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                                }}
                            >
                                <Button
                                    id="demo-customized-button"
                                    aria-haspopup="true"
                                    variant="contained"
                                    disableElevation
                                    onClick={handleFilterClick}
                                    style={{ width: '100px', display: 'none', height: '30px', alignItems: 'center', borderRadius: '30px' }}
                                    size="small"
                                    className='clrBtn'
                                >
                                    <FilterListIcon />Filter
                                </Button>

                                <Stack direction='row' className='serBox' alignItems='center' justifyContent='space-between' >
                                    <Stack direction='row' spacing={3} alignItems='center'>
                                        <img src={search} width='30px' height='30px' />
                                        <InputBase value={text} sx={{
                                            color: Colors.primary, fontSize: '15px', fontStyle: 'italic',
                                            width: "85%"
                                        }}
                                            placeholder='Search Table No' onChange={(e) => onTextChange(e)}  ></InputBase>
                                    </Stack>
                                    {serCl && <CloseIcon sx={{
                                        cursor: 'pointer', color: "#6eabe0",
                                        textShadow: "0 0 3px #FF0000",
                                        marginRight: "10px"
                                    }} onClick={(e) => ClearText(e)} />}
                                </Stack>
                            </Toolbar>


                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    size='small'
                                >
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    <TableBody>

                                        {stableSort(rows, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row}
                                                        selected={isItemSelected}
                                                    >

                                                        <TableCell align="center" style={{ width: '70px', marginLeft: "15px" }}
                                                            component="th"
                                                            id={labelId}
                                                            scope="row"
                                                            padding="none"
                                                        >
                                                            {row.RN}
                                                        </TableCell>
                                                        <TableCell align="center" >  {row.TNO}</TableCell>
                                                        <TableCell
                                                            component="th"
                                                            id={labelId}
                                                            scope="row"
                                                            padding="none"
                                                            align="center"
                                                        >
                                                            {row.DC}
                                                        </TableCell>
                                                        {row.ST ? <TableCell align="center">  Active  </TableCell> : <TableCell align="center">  InActive  </TableCell>}

                                                        <TableCell align="center">

                                                            <IconButton aria-label="setting" onClick={(e) => {
                                                                try {
                                                                    handleSettingClick(e, row, index);
                                                                } catch (err) {
                                                                    SWAlert.fire({ text: err.message });
                                                                }
                                                            }}>
                                                                {/* <VisibilityIcon /> */}
                                                                <MoreHorizIcon fontSize='small' style={{ textAlign: 'right' }} />
                                                            </IconButton>
                                                            <Menu key={row.PID}
                                                                id="fade-menu"
                                                                MenuListProps={{
                                                                    'aria-labelledby': 'fade-button',
                                                                }}
                                                                anchorEl={anchorEl}
                                                                open={open}
                                                                onClose={handleSettingClose}
                                                                TransitionComponent={Fade}
                                                            >
                                                                <MenuItem key={row.PID} data-id={row}
                                                                    onClick={(e) => {
                                                                        handleEditProductClicked(e, row);
                                                                    }}
                                                                ><EditIcon />Edit </MenuItem>
                                                                <MenuItem key={row.PID} onClick={(e) => {
                                                                    handleDuplicateProductClicked(e, row);
                                                                }}><FileCopyIcon />Duplicate</MenuItem>
                                                                <MenuItem key={row.PID} onClick={(e) => {
                                                                    handleDeleteProductClicked(e, row);
                                                                }}><DeleteIcon />Delete</MenuItem>
                                                                <MenuItem key={row.PID} onClick={(e) => {
                                                                    handleQRClicked(e, row);
                                                                }}><QrCode2Icon />Generate QR</MenuItem>
                                                            </Menu>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height: (33) * emptyRows,  //(dense ? 33 : 53) * emptyRows,
                                                }}
                                            >
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                    )}

                    {productAEPanel && (
                        <>
                            <Dialog style={{ backgroundColor: '#F6F6F7', zIndex: '1000000' }}
                                open={openci}
                                PaperProps={{
                                    sx: {
                                        minWidth: '50%',
                                        backgroundColor: '#F6F6F7'
                                    }
                                }}>
                                <DialogTitle >
                                    <Stack direction='row' display='flex' alignItems='center' justifyContent='space-between'>
                                        <Typography variant='h6' sx={{ color: '#162D3D' }}>Add</Typography>
                                        <Closeicon className='clsup' sx={{ cursor: 'pointer', color: "#32536A", }} onClick={handleCloseChangeIconModal} />
                                    </Stack>
                                </DialogTitle>
                                <DialogContent>
                                    <Stack ref={divRef} className='addeditproductpage' style={{ overflowX: "hidden", overflowY: "auto", maxHeight: "400px" }} direction='row-reverse' display='flex' justifyContent='space-between'>
                                        <AddProduct PID={PID} BIZID={bizID} BIZNAME={bizName} handleAE_CloseClick={handleAE_CloseClick}
                                            handleAE_SaveClick={handleAE_SaveClick}

                                        ></AddProduct>
                                    </Stack>
                                </DialogContent>
                            </Dialog>

                        </>
                    )}
                    <Dialog style={{ backgroundColor: '#F6F6F7', zIndex: '1000000' }}
                        open={qrOpen}
                        onClose={handleClose}
                        PaperProps={{
                            sx: {
                                minWidth: '50%',
                                backgroundColor: '#F6F6F7'
                            }
                        }}>
                        <DialogTitle >
                            <Stack direction='row' display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography variant='h6' sx={{ color: '#162D3D' }}>QR Scan</Typography>
                                <Closeicon className='clsup' sx={{ cursor: 'pointer', color: "#32536A", }} onClick={handleClose} />
                            </Stack>
                        </DialogTitle>
                        <DialogContent>
                            <QrGen TableNo={ID} BizID={restID} BizName={restName} KeyID={keyID} KeyName={keyName}></QrGen>
                        </DialogContent>
                    </Dialog>
                </Paper>

            </Box>

        </>
    );
}
