import React, { useState, useEffect, navigation } from 'react';
import { Link } from "react-router-dom"
import { Box, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material'
import $ from 'jquery';
import { format } from 'util';
import packageInfo from '../../package.json';
import * as Constants from '../Constants';
import { useAuthContext } from '../AuthContext'

export default function UserConfig (props) {
  const [country, setCountry]             = useState("");
  const [year, setYear]                   = useState("");
  const [course, setCourse]               = useState("");
  const [clazz, setClazz]                 = useState("");
  const [tableContent, setTableContent]   = useState([]);
  const [countries, setCountries]         = useState([]);
  const [years, setYears]                 = useState([]);
  const [courses, setCourses]             = useState([]);
  const [classes, setClasses]             = useState([]);
  const [walkList, setWalkList]           = useState([]);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [deletionId, setDeletionId]       = useState(0);
  const [rowsPerPage, setRowsPerPage]     = useState(25);
  const [currentRow, setCurrentRow]       = useState(0);
  const [numRows, setNumRows]             = useState(0);
  const [nextEnabled, setNextEnabled]     = useState(false);
  const [prevEnabled, setPrevEnabled]     = useState(false);
  const [pageNo, setPageNo]               = useState(1);
  const [inputPageNo, setInputPageNo]     = useState(1);
  const [numPages, setNumPages]           = useState(1);
   const {authenticated, setAuthenticated,
          name, setName,
          email, setEmail,
          userid, setUserid}              = useAuthContext();
  var tableContentFunction;
  var tableHeaderFunction;
  var walkId;

  const hideHeader   = () => { var elem = document.getElementById("header"); elem.style.display = 'none'; }
  const hideFooter   = () => { var elem = document.getElementById("footer"); elem.style.display = 'none'; }
  const closeConfirm = () => setConfirmIsOpen(false)
  const openConfirm  = (walkId) => { setDeletionId(walkId); setConfirmIsOpen(true); }

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    $.ajax({
      type: "GET",
      url: packageInfo.actionsUrl + format(Constants.OPERATION_USER_CONFIG,encodeURIComponent(userid.trim())),
      xhrFields: { withCredentials: true, credentials: 'include' },
      success(json, textStatus, request) {
        if (json["result"] === "success") {
          let y = [];
//           json["users"].forEach((item) => {
//             y.push({
//               "key": Math.floor(Math.random() * 999999),
//               "userid": item.userid,
//               "admin_user": item.admin_user,
//               "invalid_login_attempts": item.invalid_login_attempts,
//               "email": item.email,
//               "to_be_activated": item.to_be_activated,
//               "email_invalid": item.email_invalids
//             });
//           });
//           setTableContent(y);
        }
      }
    });
  }

  {/*
  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#00FF00",
    maxHeight: 'calc(100vh - 200px)',
    overflow: "scroll"
  }
  const headerStyle = {
    backgroundColor: "#FF0000",
    flex: "none"
  }
  const footerStyle = {
    backgroundColor: "#0000FF",
    flex: "none",
    position:"absolute",
    left:"0",
    bottom:"0",
    padding: "0 10px 10px 10px",
    margin: "20px"
  }


  const wrapperStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "20px"
  }
  const headerStyle = {
    background: silver;
  };
  const footerStyle = {
    background: silver;
  };
  const contentStyle = {
    flex: 1;
    overflow: auto;
    background: pink;
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#00FF00"
  }
  const headerStyle = {
    backgroundColor: "#FF0000",
    flex: "none"
  }
  const footerStyle = {
    backgroundColor: "#0000FF",
    flex: "none",
    position:"absolute",
    left:"0",
    bottom:"0",
    padding: "0 10px 10px 10px",
    margin: "20px"
  }
  */}
  const wrapperStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "20px"
  }

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    maxHeight: 'calc(100vh - 200px)',
    overflow: "scroll"
  }
  const headerStyle = {
    flex: "none",
  }
  const footerStyle = {
    flex: "none",
    position:"absolute",
    left:"20px",
    bottom:"10px",
    padding: "10px 10px 10px 10px",
  }

//   const fetchData = (actionAndParameters) => {
//     $.ajax({
//       type: "GET",
//       url: packageInfo.actionsUrl + actionAndParameters,
//       xhrFields: { withCredentials: true, credentials: 'include' },
//       success(json) {
//         if (json["result"] === "success") {
//           if (authenticated === Constants.USER_TYPE_ORDINARY || authenticated === Constants.USER_TYPE_UNAUTHENTICATED || props.action === Constants.ACTION_APPROVED) {
//             const startRow = parseInt(json["start_row"]);
//             const rowCount = parseInt(json["num_rows"]);
//             setChoices(json["courses"], setCourses, setCourse);
//             setChoices(json["years"], setYears, setYear);
//             setChoices(json["countries"], setCountries, setCountry);
//             setChoices(json["classes"], setClasses, setClazz);
//             setCountry(json["country"]);
//             setYear(json["year"]);
//             setCourse(json["course"]);
//             setClazz(json["class"]);
//             setCurrentRow(startRow);
//             setNumRows(rowCount);
//             if (startRow <= 0) {
//               setPrevEnabled(false);
//             } else {
//               setPrevEnabled(true);
//             }
//             if (startRow + rowsPerPage > rowCount) {
//               setNextEnabled(false);
//             } else {
//               setNextEnabled(true);
//             }
//             setPageNo(Math.floor(startRow/rowsPerPage) + 1);
//             setInputPageNo(Math.floor(startRow/rowsPerPage) + 1);
//             setNumPages(Math.floor((rowCount - 1)/rowsPerPage) + 1);
//           }
//           setWalkList(json["walks"]);
//           setWalks(json["walks"], "All", "All", "All", "All" );
//         } else {
//           alert("Unable to retrieve walk list");
//         }
//       }
//     });
//   };

  return (
    <div>
      <div d="wrapper" style={wrapperStyle}>
        <div id="header" style={headerStyle}>
        </div>

        <div id="content" style={contentStyle}>
                Hello, world from the config page of user {userid}!
        </div>

        <div id="footer" style={footerStyle}>
        </div>
      </div>
    </div>
  );
};
