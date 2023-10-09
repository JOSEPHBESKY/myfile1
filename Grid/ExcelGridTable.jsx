import { Divider, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import "./MySheet.css";
//import * as math from "mathjs";


// const initialData = [
//   [{ value: "A1" }, { value: "B1" }, { value: "C1" }],
//   [{ value: "A2" }, { value: "B2" }, { value: "C2" }],
//   [{ value: "A3" }, { value: "B3" }, { value: "C3" }],
// ];

const initialData = [
  [{ value: "", readOnly: true, "width": 30 }, { value: "A", readOnly: true, "width": 100 }, { value: "B", readOnly: true, "width": 100 }, { value: "C", readOnly: true, "width": 100 }, { value: "D", readOnly: true, "width": 100 }, { value: "E", readOnly: true, "width": 100 }, { value: "F", readOnly: true, "width": 100 }, { value: "G", readOnly: true, "width": 100 }, { value: "H", readOnly: true, "width": 100 }, { value: "I", readOnly: true, "width": 100 }, { value: "J", readOnly: true, "width": 100 }, { value: "K", readOnly: true, "width": 100 }, { value: "L", readOnly: true, "width": 100 }, { value: "M", readOnly: true, "width": 100 }, { value: "N", readOnly: true, "width": 100 }, { value: "O", readOnly: true, "width": 100 }, { value: "P", readOnly: true, "width": 100 }],
  [{ value: "1", readOnly: true, "width": 30 }, { value: "SNo", readOnly: false, "width": 100 }, { value: "OrderID", readOnly: false, "width": 100 }, { value: "CustomerName", readOnly: false, "width": 100 }, { value: "ItemName", readOnly: false, "width": 100 }, { value: "OrderDate", readOnly: false, "width": 100 }, { value: "TableNo", readOnly: false, "width": 100 }, { value: "Amount", readOnly: false, "width": 100 }, { value: "OrderStatus", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "2", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "3", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "4", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "5", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "6", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "7", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "8", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "9", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "10", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "11", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "12", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "13", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "14", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "15", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "16", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "17", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "18", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "19", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "20", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "21", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "22", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "23", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "24", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "25", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "26", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "27", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "28", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "29", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "30", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "31", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "32", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "33", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "34", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "35", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
  [{ value: "36", readOnly: true, "width": 30 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }, { value: "", readOnly: false, "width": 100 }],
];

// const numRows = 100;
// const numCols = 26;

// const initialData = Array(numRows)
//   .fill()
//   .map(() => Array(numCols).fill({ value: "" }));


function ExcelGridTable(props) {
  const [data, setData] = useState(initialData);

  const handleCellChange = (changes) => {
    debugger
    // const newData = data.map((row) =>
    //   row.map((cell) => {
    //     const { row, col, value } = changes[0];
    //     debugger
    //     if (cell.row === row && cell.col === col) {
    //       debugger
    //       return { ...cell, value };
    //     }
    //     debugger
    //     return cell;
    //   })
    // );
    // setData(newData);

    //const { row, col, value } = changes[0];
    //debugger

    const grid = data.map((row) => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      debugger;
      grid[row][col] = { ...grid[row][col], value };
    });
    debugger
    setData(grid);

  };

  const [contextMenuCell, setContextMenuCell] = useState(null);

  const handleContextMenu = (e, cell) => {
    debugger
    // if (cell.readOnly)
    //   e.preventDefault();
    // else
    //   return;
    e.preventDefault();
    const { row, col } = cell;

    console.log("Row:", row, "Col:", col);

    setContextMenuCell(cell);
    setAnchorEl({
      x: e.clientX,
      y: e.clientY
    });
  };

  const options = [
    { label: "Cut", action: () => handleCut(contextMenuCell.row, contextMenuCell.col) },
    { label: "Copy", action: () => handleCopy(contextMenuCell.row, contextMenuCell.col) },
    { label: "Paste", action: () => handlePaste(contextMenuCell.row, contextMenuCell.col) },
    { label: "Insert Cell", action: () => handleInsertCell(contextMenuCell.row, contextMenuCell.col) },
    { label: "Insert Row Above", action: () => handleInsertRow(contextMenuCell.row) },
    { label: "Insert Row Below", action: () => handleInsertRow(contextMenuCell.row + 1) },
    { label: "Insert Column Left", action: () => handleInsertColumn(contextMenuCell.col) },
    { label: "Insert Column Right", action: () => handleInsertColumn(contextMenuCell.col + 1) },
    { label: "Apply Formula", action: () => handleApplyFormula(contextMenuCell.row, contextMenuCell.col) },
    // { label: "Insert Chart", action: () => handleInsertChart(contextMenuCell.row, contextMenuCell.col) },
  ];

  const [anchorEl, setAnchorEl] = useState(null);

  function handleClose() {
    setAnchorEl(null);
  }

  const handleCut = (row, col) => {
    // Implement cut functionality
    // ...
  };

  const handleCopy = (row, col) => {
    // Implement copy functionality
    // ...
  };

  const handlePaste = (row, col) => {
    // Implement paste functionality
    // ...
  };

  const handleInsertCell = (row, col) => {
    // Implement insert cell functionality
    // ...
  };

  const handleInsertRow = (row) => {
    // Implement insert row functionality
    // ...
  };

  const handleInsertColumn = (col) => {
    // Implement insert column functionality
    // ...
  };

  const handleApplyFormula = (row, col) => {
    // Implement apply formula functionality
    // ...
  };

  const handleInsertChart = (row, col) => {
    // Implement insert chart functionality
    // ...
  };

  const handleCreateView = (row, col) => {
    // Implement insert chart functionality
    // ...
  };


  return (
    <>
      <div className="excel-sheet" style={{marginTop:'37px'}}>
        <ReactDataSheet
          data={data}
          valueRenderer={(cell) => cell.value}
          onCellsChanged={handleCellChange}
          onContextMenu={handleContextMenu}
          overflow="clip"
        /> </div>

      {contextMenuCell && (
        <Menu
          anchorReference="anchorPosition"
          anchorPosition={
            anchorEl !== null
              ? { top: anchorEl.y, left: anchorEl.x }
              : undefined
          }
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options.map((i, index) => (
            <MenuItem key={index} value={i.label} onClick={i.action}>{i.label}</MenuItem>
          ))}
          <Divider />
          <MenuItem key={options.length} value={'Create View'} onClick={handleCreateView}>{'Create View'}</MenuItem>
        </Menu>
      )}
    </>
  );
};

export default ExcelGridTable;