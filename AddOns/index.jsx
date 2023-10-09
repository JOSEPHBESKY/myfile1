import React, { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton, Menu, Stack, Typography } from '@mui/material';
import ErrorBoundary from '../../common/errorboundary';
import Logger from './../../common/logger';

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
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import SWAlert from "sweetalert2";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import HeaderForm from "../saucerView/components/header/index";
import Switch from '@mui/material/Switch';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch } from "react-redux";
import { FromHomeOrSetup } from "../../stateManagement/action";
import Loading from '../../loadingScr';
import { roleAcess } from '../../common/UseAuth';
import { getCookie } from '../../common/cks';

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
        id: 'NM',
        numeric: false,
        disablePadding: true,
        label: 'Name',
        align: 'center',
    },
    {
        id: 'AD',
        numeric: false,
        disablePadding: true,
        label: 'Description',
        align: 'center',
    },
    {
        id: 'Enabled',
        numeric: false,
        disablePadding: true,
        label: 'Enabled',
        align: 'center',
    },
    {
        id: 'settings',
        numeric: false,
        disablePadding: false,
        label: 'Settings',
        align: 'center',
    },
];

function EnhancedTableHead(props) {
    //debugger;
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow style={{ backgroundColor: 'lightblue' }}>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}    //{headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
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

function AddOnsIndex() {
    const dispatch = useDispatch();
    const [arrAddOnData, setArrAddOnData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loginedAsiSA, setLoginedAsiSA] = useState(false);
    const [EDvalue, setEDvalue] = useState();

    // const [arrAddOnData, setArrAddOnData] = useState([
    //     {
    //         "AddOnID": "202217120001",
    //         "NM": "Stripe",
    //         "AD": "A stripe api connection",
    //         "ED": true
    //     },
    //     {
    //         "AddOnID": "202217120002",
    //         "NM": "PayTM",
    //         "AD": "A PayTM api connection",
    //         "ED": false
    //     },
    //     {
    //         "AddOnID": "202217120003",
    //         "NM": "Pickup",
    //         "AD": "Customer know where to pickup",
    //         "ED": true
    //     },
    //     {
    //         "AddOnID": "202217120005",
    //         "NM": "Dine-in",
    //         "AD": "Customer order from table",
    //         "ED": true
    //     },
    // ]);

    useEffect(() => {
        loadData();

        //debugger;
        var loginedAs = roleAcess("roleAccess") || "";
        if (loginedAs != "" && loginedAs === "is-admin") {
            setLoginedAsiSA(true);
        }
    }, [])

    async function loadData() {
        try {
            //  debugger;
            setLoading(true);
            var payload = "";
            payload = {
                Req: {
                    Type: "GMDD",
                    CRUD: "SVC",
                    Rsk: "UnEuNhoKLZBdIcLjKILZg==",
                    DevID: "",
                    BizID: "",
                    BID: "",
                    ID: "",
                    PID: "",
                    ST: 1,
                    CC: "",
                    KS: "",
                    ICV: "", // Empty will show all Payments(Online&Cash) and DineIn&TakeAway. 
                    UID: getCookie('roleId')
                },
            };

            var req = JSON.stringify(payload);
            var rows = await postAPI(payload);
            setLoading(false);
            //debugger;
            if (!rows) {
                nav(`/login`);
            } else {
                let jsonObject = JSON.parse(rows);
                if (jsonObject.Resp.Sts == "1") {
                    //debugger;
                    setArrAddOnData(JSON.parse(jsonObject.Resp.Result));

                    const arr = JSON.parse(jsonObject.Resp.Result);
                    const filteredArray = arr.filter(obj => obj.NM === 'Driver');
                    const EDValue = filteredArray[0].ED;
                    setEDvalue(EDValue)
                    // console.log(EDValue,'EDValue')
                }
            }
        } catch (err) {
            setLoading(false);
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            Logger.errorLog(err.message ?? err, '', '//pages//WebEditor//Components//DraggableCart//CartComponent.jsx', 'GetProductData');
        }
    }

    const nav = useNavigate();

    const [serCl, setSerCl] = useState(false)
    const [text, setText] = useState('')

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    //const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        try {
            //debugger;
            if (event.target.checked) {
                const newSelected = arrAddOnData.map((n) => n.prodName);
                setSelected(newSelected);
                return;
            }
            setSelected([]);
        } catch (err) {
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            Logger.errorLog(err.message ?? err, '', '//pages//AddOns//index.jsx', 'handleSelectAllClick');
        }
    };

    const handleClick = (event, name) => {
        try {
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
        } catch (err) {
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            Logger.errorLog(err.message ?? err, '', '//pages//AddOns//index.jsx', 'handleClick');
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const handleChangeDense = (event) => {
    //     setDense(event.target.checked);
    // };

    const addonSettingsClick = (addonID, addonName) => {
        try {
            //debugger;
            if (addonName == 'Dine-In') {
                nav('/tables');
            }
            if (addonName == 'Driver') {
                if (EDvalue == true)
                    nav('/DriverRegForm');
            }

            if (addonName == 'Delivery') {
                nav('/delcircle');
            }
        } catch (err) {
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            Logger.errorLog(err.message ?? err, '', '//pages//AddOns//index.jsx', 'addonSettingsClick');
        }
    };

    const handleEnableDisableChange = (event, index, addonID) => {
        try {
            //debugger;
            // arrAddOnData[index].ED = event.target.checked ? 1 : 0;
            // setArrAddOnData([...arrAddOnData]);

            var addonStatus = event.target.checked ? 1 : 0;


            // When update (Online/Cash) by User/Seller then need to send both available Online&/Cash current data to update
            let SVCLAddOnArray = [];
            var scvlItems = { SVID: addonID, ED: addonStatus };
            SVCLAddOnArray.push(scvlItems)
            if (loginedAsiSA == false) {
                let TempAddOnArray = [];
                TempAddOnArray = arrAddOnData.filter(e => e.ICV == 0 && e.AddOnID != addonID);
                for (var i = 0; i < TempAddOnArray.length; i++) {
                    var enabled = (TempAddOnArray[i].ED == true ? 1 : 0);
                    var items1 = { SVID: TempAddOnArray[i].AddOnID, ED: enabled };
                    SVCLAddOnArray.push(items1);
                }
            }

            // Call Update Function
            updateAddOnStatus(addonID, addonStatus, SVCLAddOnArray);

        } catch (err) {
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            Logger.errorLog(err.message ?? err, '', '//pages//AddOns//index.jsx', 'handleEnableDisableChange');
        }
    };

    async function updateAddOnStatus(addonID, addonStatus, SVCLAddOnArray) {
        try {
            //debugger;
            var requestXML = '';
            if (loginedAsiSA == true) { // Log in as iSaucer Admin
                requestXML = {
                    Req: {
                        Type: "UMDD",
                        CRUD: "SVC",
                        Rsk: "UnEuNhoKLZBdIcLjKILZg==",
                        SVID: addonID,
                        ED: addonStatus,
                        UID: getCookie('roleId'),
                        CBY: getCookie('roleId')
                    },
                };
            }
            else {
                requestXML = {
                    Req: {
                        Type: "UMDD",
                        CRUD: "SVC",
                        Rsk: "UnEuNhoKLZBdIcLjKILZg==",
                        SVCL: SVCLAddOnArray,
                        UID: getCookie('roleId'),
                        CBY: getCookie('roleId')
                    },
                };
            }


            const res = await postAPI(requestXML);
            //debugger;
            let jsonObject = JSON.parse(res);
            if (jsonObject.Resp.Sts === "1") {
                //debugger;
                SWAlert.fire({ text: 'Status Successfully Updated...' });
                loadData();
            } else {
                SWAlert.fire({ text: 'Update Failed...' });
            }
        } catch (err) {
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            Logger.errorLog(err.message ?? err, '', '//pages//AddOns//index.jsx', 'onSearchClick');
        }
    };

    const onTextChange = (e) => {
        //debugger;
        try {
            if (e.target.value != "") {
                setSerCl(true);
                setText(e.target.value);
            } else {
                setSerCl(false);
                setText(e.target.value);
            }
        } catch (err) {
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            Logger.errorLog(err.message ?? err, '', '//pages//AddOns//index.jsx', 'onTextChange');
        }
    }

    const ClearText = () => {
        setText('');
        setSerCl(false);
        setArrAddOnData([
            {
                "AddOnID": "202217120001",
                "NM": "Stripe",
                "AD": "A stripe api connection",
                "ED": true
            },
            {
                "AddOnID": "202217120002",
                "NM": "PayTM",
                "AD": "A PayTM api connection",
                "ED": false
            },
            {
                "AddOnID": "202217120003",
                "NM": "Pickup",
                "AD": "Customer know where to pickup",
                "ED": true
            },
            {
                "AddOnID": "202217120005",
                "NM": "Dine-in",
                "AD": "Customer order from table",
                "ED": true
            },
        ]);
    }

    const onSearchClick = (e) => {
        try {
            //debugger;
            var arrAddOnData1 = [
                {
                    "AddOnID": "202217120001",
                    "NM": "Stripe",
                    "AD": "A stripe api connection",
                    "ED": true
                },
                {
                    "AddOnID": "202217120002",
                    "NM": "PayTM",
                    "AD": "A PayTM api connection",
                    "ED": false
                },
                {
                    "AddOnID": "202217120003",
                    "NM": "Pickup",
                    "AD": "Customer know where to pickup",
                    "ED": true
                },
                {
                    "AddOnID": "202217120005",
                    "NM": "Dine-in",
                    "AD": "Customer order from table",
                    "ED": true
                },
            ];
            let filtered = arrAddOnData1.filter(x => x.NM.toLowerCase().includes(text.toLocaleLowerCase()) || x.AD.toLowerCase().includes(text.toLocaleLowerCase()));
            setArrAddOnData(filtered);
        } catch (err) {
            SWAlert.fire({ title: 'Cell Serve Admin', text: err.message ?? err });
            Logger.errorLog(err.message ?? err, '', '//pages//AddOns//index.jsx', 'onSearchClick');
        }
    }


    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrAddOnData.length) : 0;

    const handleClickFunction = (fromWhere) => {
        dispatch(FromHomeOrSetup(fromWhere)); // If fromWhere == Home || fromWhere == Setup
    }

    return (
        <>
            <ErrorBoundary>
                <Loading style={{
                    display: loading ? "flex" : "none"
                }} loading={loading} />
                <HeaderForm clickFunction={handleClickFunction} />
                <Stack sx={{ marginTop: '80px' }}>
                    <Stack direction='row' alignItems='center' sx={{ width: '50%', height: '40px', backgroundColor: 'white', borderRadius: '10px 10px 0px 0px' }}>
                        <Stack alignItems='center' sx={{ height: '35px', backgroundColor: '#898BD6', borderRadius: '0px 0px 10px 10px', marginLeft: '15px', position: 'relative', bottom: '3px' }} >
                            <label style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginLeft: "10px", marginRight: "10px", position: 'relative', top: '3px' }}>Add-Ons</label>
                        </Stack>
                    </Stack>
                    {/* <Stack display='flex' sx={{ paddingBottom: '10px', alignItems: 'center' }}>
                        <Typography sx={{ display: 'inline' }} variant="h6" color='primary'>{'Add-Ons'}</Typography>
                    </Stack> */}
                    {/* <Stack direction='row-reverse' display='flex' sx={{ paddingBottom: '10px' }}>
                        <Stack direction='row' className='serBox' alignItems='center'  >
                            <Stack direction='row' spacing={3} alignItems='center'>
                                <SearchIcon sx={{ marginLeft: '10px', color: '#6eabe0' }} onClick={(e) => onSearchClick(e)} />
                                <InputBase value={text} sx={{ minWidth: "230px" }}
                                    placeholder='Search' onChange={(e) => onTextChange(e)}></InputBase>
                            </Stack>
                            {serCl && <CloseIcon sx={{
                                cursor: 'pointer', color: "#6eabe0",
                                textShadow: "0 0 3px #FF0000",
                                marginRight: "10px"
                            }} onClick={() => ClearText()} />}
                        </Stack>
                    </Stack>*/}
                </Stack>
                <Box sx={{ width: '100%', maxHeight: 500, overflowY: 'scroll' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        {/* <EnhancedTableToolbar numSelected={selected.length} rowCount={rows.length} /> */}
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 400 }}
                                aria-labelledby="tableTitle"
                                size='small' //{dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={arrAddOnData.length}
                                />
                                <TableBody>
                                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                   rows.sort(getComparator(order, orderBy)).slice() */}
                                    {stableSort(arrAddOnData, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.prodName);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    //onClick={(event) => handleClick(event, row.prodName)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.AddOnID}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell align="left" sx={{ width: '25%' }}>{row.NM}</TableCell>
                                                    <TableCell align="left" sx={{ width: '50%' }}>{row.AD}</TableCell>
                                                    <TableCell align="center" sx={{ width: '12%' }}>
                                                        <Switch
                                                            disabled={!row.IAD} //{!loginedAsiSA && (row.AddOnID == 'S0001' || row.AddOnID == 'S0002')} // iSaucer will Enable the Payment and User can use Payment or Not. So both user and iSaucer will edit.
                                                            checked={row.ED}
                                                            onChange={(event) => handleEnableDisableChange(event, index, row.AddOnID)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ width: '13%' }}>
                                                        <Tooltip title="Add-On Settings" color='cancel' placement="top" arrow>
                                                            <IconButton aria-label="addonSettings" onClick={() => {
                                                                try {
                                                                    addonSettingsClick(row.AddOnID, row.NM);
                                                                } catch (err) {
                                                                    SWAlert.fire({ text: err.message });
                                                                }
                                                            }}>
                                                                <SettingsIcon />
                                                            </IconButton>
                                                        </Tooltip>
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
                            count={arrAddOnData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
            </ErrorBoundary>
        </>
    );
}

export default AddOnsIndex