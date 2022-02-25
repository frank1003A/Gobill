import Layout from "../../component/Layout";
import * as React from "react";
import { useState, useEffect } from "react";
import Waybill from "../../component/Waybill";
import useLocalStorage from "../../hooks/localStorage";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { TextField, Button, FormLabel } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  faBookmark,
  faFileInvoice,
  faGripLinesVertical,
  faReplyAll,
  faRemove
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../component/Modal";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
} from "@mui/material";
import { updateItemSelected} from "../redux/waybillSlice";
import { removeItemSelected, updateItemsSelected } from "../redux/ItemsSlice";

const Items = () => {
  //inventory
  const [itemInventory, setitemInventory] = useLocalStorage("Inventory", []);

  //search
  const [searchValue, setsearchValue] = useState("");

  //sender states
  const [sName, setsName] = useState("");
  const [saddress, setsaddress] = useState("");
  const [sphone, setsphone] = useState("");
  const [semail, setsemail] = useState("");

  //reciever states
  const [rName, setrName] = useState("");
  const [rphone, setrphone] = useState("");

  //item select state
  const dispatch = useDispatch()
  const selectedItem = useSelector((state) => state.itemSelected)
  const selectedItems = useSelector((state) => state.itemsSelected)

  //signature state
  const [sign, setsign] = useState("");

  /**Modal State */
  const [openSettingModal, setopenSettingModal] = useState(false);
  const [openCreateWaybill, setopenCreateWaybill] = useState(false);

  //modal method
  const handleOpenModal = () => setopenSettingModal(true);
  const handleCloseModal = () => setopenSettingModal(false);
  const handleOpenCMModal = () => setopenCreateWaybill(true);
  const handleCloseCMModal = () => setopenCreateWaybill(false);

  //search
  const searchResult = itemInventory.filter((data) =>
    searchValue.toLocaleLowerCase().includes(data["WhatsApp"])
  );

  // Snackbar Alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [opensuccess, setOpensuccess] = useState(false);
  const [openwarn, setOpenwarn] = useState(false)

  const handlesucClick = () => {
    setOpensuccess(true);
  };

  const handlewarClick = () => {
    setOpenwarn(true);
  };

  const handlesucClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensuccess(false);
  };

  const handlewarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenwarn(false);
  };

  // Snackbar Alert end

  console.log(selectedItems)

  //calculate waybill total
  const getSum = () => {
    const Sum = selectedItems.itemsSelected.reduce(
      (sum, item) => (sum = sum + item.amount),
      0
    );
    return Sum;
  };

  //select item
  const selectItem = (item) => {
      dispatch(updateItemSelected({
        CName : item.CName,
        WhatsApp : item.WhatsApp,
        kilo : item.Kilo,
        amount : item.Amount
      }))
  };

  //add Items to wb
  const addItems = (item) => {
    dispatch(updateItemsSelected({
      CName : item.CName,
        WhatsApp : item.WhatsApp,
        kilo : item.Kilo,
        amount : item.Amount
    }))
  }
  //remove selectedItem
  const removeItem = (item) => {
   dispatch(removeItemSelected(item))
  };

  const formatMoney = () => {
    let money = getSum().toString().split('')
    const length = money.length
    const tens = money.slice(0, 2)
    const hundreds = money.splice(0, 3)
    const thousands = money.splice(0, 4)
    return [tens, hundreds, thousands].join(',')
  }

  const fetchWaybills = async () => {
    const res = await fetch("/api/waybill", {
      method: 'GET',
      headers: { 
        "Content-Type": "application/json"
      },
    })
    const waybills = await res.json()
    console.log(waybills)
  }

  useEffect(() => {
    fetchWaybills()
  }, [])
  
  const createWaybill = async () => {
    const wbInfo = {
      from : 'MaryBeth Cargo',
      to :  selectedItems.itemsSelected[0].description,
      items : selectedItems.itemsSelected,
      date : convert(Date.now())
    }

    const res = await fetch("/api/waybill", { 
      method: 'POST',
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(wbInfo)
    })

    const data = await res.json()
    console.log(data)

  };

  //date format
  const convert = (str) => {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    //return [date.getFullYear(), mnth, day].join("-");
    return [mnth, day, date.getFullYear()].join("/");
  };

  return (
    <Layout>
      <div className={styles.controlbar}>
          <TextField
            placeholder="type number to search item"
            sx={{ width: "30%" }}
            value={searchValue}
            onChange={(e) => {
              setsearchValue(e.target.value);
            }}
          ></TextField>
          <Button
            variant="contained"
            sx={{ gap: 1, color: "#fffff", background: "#002244" }}
            onClick={() => setopenCreateWaybill(!openCreateWaybill)}
          >
            Waybill <FontAwesomeIcon icon={faFileInvoice} />
          </Button>
          <Button
            variant="contained"
            sx={{ gap: 1, color: "#fffff", background: "#002244" }}
          >
            Register
            <FontAwesomeIcon icon={faBookmark} />
          </Button>
          <Button
            variant="contained"
            sx={{ gap: 1, color: "#fffff", background: "#002244" }}
            onClick={() => handleOpenModal()}
          >
            Setting
            <FontAwesomeIcon icon={faGripLinesVertical} />
          </Button>
          <Button
            variant="contained"
            sx={{ gap: 1, color: "#fffff", background: "#002244" }}
          >
            Print All
            <FontAwesomeIcon icon={faReplyAll} />
          </Button>
        </div>
      <div className={styles.maincntainer}>
        {searchValue.length > 0
          ? searchResult.map((item) => {
              return (
                <Waybill itemInventory={item} 
                         selectedItm={() => selectItem(item)}
                         scItms={() => {addItems(item); handlesucClick()}}
                         />
              )
            })
          : itemInventory.map((item) => {
              return <Waybill 
                         itemInventory={item} 
                         selectedItm={() => selectItem(item)} 
                         scItms={() => {addItems(item); handlesucClick()}}
                         />;
            })}
      </div>
      <Snackbar open={opensuccess} autoHideDuration={4000} onClose={handlesucClose} anchorOrigin={{vertical: 'top', horizontal:'right'}}>
        <Alert onClose={handlesucClose} severity="success" sx={{ width: '100%' }}>
          item added to waybill (WB324)!
        </Alert>
      </Snackbar>

      <Snackbar open={openwarn} autoHideDuration={4000} onClose={handlewarClose} anchorOrigin={{vertical: 'top', horizontal:'right'}}>
        <Alert onClose={handlewarClose} severity="warning" sx={{ width: '100%' }}>
          item removed from waybill (WB324)!
        </Alert>
      </Snackbar>
      <Modal
        className="formtable"
        OpenModal={openSettingModal}
        handleCloseModal={handleCloseModal}
      >
        <div className={styles.maincontainer}>
          <TextField
            placeholder="Dispatcher Phone Number"
            variant="filled"
          ></TextField>
          <Button
            variant="contained"
            sx={{ gap: 1, color: "#fffff", background: "#002244" }}
          >
            Proceed
          </Button>
        </div>
      </Modal>
      <Modal
        className="formtable"
        OpenModal={openCreateWaybill}
        handleCloseModal={handleCloseCMModal}
      >
        <FormLabel>Waybill Print Details</FormLabel>
        <div>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              id="tablegen"
            >
              <TableHead sx={{ background: "#eee" }}>
                <TableRow sx={{ color: "white" }}>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Kilo</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedItems.itemsSelected.map((data, idx) => {
                  return (
                    <TableRow
                      key={data[idx]}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{data.quantity}</TableCell>
                      <TableCell align="right">{data.description}</TableCell>
                      <TableCell align="right">{data.Kilo}</TableCell>
                      <TableCell align="right">{data.amount}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          style={{ color: "white", background: "#002244" }}
                          onClick={() => {removeItem(data.amount); handlewarClick()}}
                        >
                          <FontAwesomeIcon icon={faRemove} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <p>Total : {getSum()}</p>
          </div>
          <div>
            <Button
              variant="contained"
              sx={{
                gap: 1,
                color: "#fffff",
                background: "#002244",
                width: "fit-content",
              }}

              onClick={() => createWaybill()}
            >
              Create waybill
            </Button>

            <Link href={"/waybills-view"} >
            <Button
              variant="contained"
              sx={{
                gap: 1,
                color: "#fffff",
                background: "#002244",
                width: "fit-content",
              }}
            >PDF</Button>
            </Link>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default Items;
