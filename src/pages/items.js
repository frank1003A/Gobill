import Layout from "../../component/Layout";
import * as React from "react";
import { useState, useEffect } from "react";
import Waybill from "../../component/Waybill";
import useLocalStorage from "../../hooks/localStorage";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { TextField, Button, FormLabel, Divider, Switch, StepLabel } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  faBookmark,
  faFileInvoice,
  faGripLinesVertical,
  faReplyAll,
  faRemove,
  faSave,
  faSearch,
  faCartShopping
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
import { updateItemSelected } from "../redux/waybillSlice";
import {
  removeItemSelected,
  updateItemsSelected,
  clearItemsSelected,
} from "../redux/ItemsSlice";
import axios from "axios";
import { convertDate } from "../../utils/utils";

const Items = () => {
  //inventory
  const [itemInventory, setitemInventory] = useLocalStorage("Inventory", []);

  //state
  const [cusNum, setcusNum] = useState("");
  const [wbServer, setwbServer] = useState([]);

  //search
  const [searchValue, setsearchValue] = useState("");

  //sender states
  const [sName, setsName] = useState("");
  const [saddress, setsaddress] = useState("");
  const [sphone, setsphone] = useState("");

  //reciever states
  const [rName, setrName] = useState("");
  const [rphone, setrphone] = useState("");

  //item select state
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.itemSelected);
  const selectedItems = useSelector((state) => state.itemsSelected);

  console.log(selectedItem)

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
    searchValue.toLocaleLowerCase().includes(data["PHONE NUMBER"])
  );

  // Snackbar Alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [opensuccess, setOpensuccess] = useState(false);
  const [openwarn, setOpenwarn] = useState(false);

  const handlesucClick = () => {
    setOpensuccess(true);
  };

  const handlewarClick = () => {
    setOpenwarn(true);
  };

  const handlesucClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpensuccess(false);
  };

  const handlewarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenwarn(false);
  };

  // Snackbar Alert end

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
    dispatch(
      updateItemSelected({
        CName: item.NAME,
        WhatsApp: item['PHONE NUMBER'],
        kilo: item.KILO,
        amount: item.TOTAL,
      })
    );
  };

  //add Items to wb
  const addItems = (item) => {
    dispatch(
      updateItemsSelected({
        CName: item.NAME,
        WhatsApp: item['PHONE NUMBER'],
        kilo: item.KILO,
        amount: item.TOTAL,
      })
    );
  };

  /**clear selected items */
  const clearSelectedItems = () => {
    dispatch(clearItemsSelected());
  };

  //remove selectedItem
  const removeItem = (item) => {
    dispatch(removeItemSelected(item));
  };

  const formatMoney = () => {
    let money = getSum().toString().split("");
    const length = money.length;
    const tens = money.slice(0, 2);
    const hundreds = money.splice(0, 3);
    const thousands = money.splice(0, 4);
    return [tens, hundreds, thousands].join(",");
  };

  const api = axios.create({
    baseURL: "http://localhost:3000",
  });

  const fetchWb = async () => {
    try {
      await api.get("/api/waybill").then((res) => {
        setwbServer(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWb();
  }, []);

  const getItemCount = () => {
    const count = wbServer.filter((wb) => wb);
    return count.length;
  };

  const createWaybill = async () => {
    const wbInfo = {
      from: [
        {
          senderName: "marybeth cargo",
          address: "Ajao Estate, Lagos, Nigeria",
          phone: "080345434",
          logo: ''
        },
      ],
      to: [
        {
          receiverName: "reciever name",
          address: "some address",
          phone: cusNum,
        },
      ],
      itemNo: `WB${getItemCount() + 1}`,
      totalAmount: getSum(),
      signOut: true,
      items: selectedItems.itemsSelected,
      dateCreated: convertDate(Date.now()),
    };

    try {
      await api.post("/api/waybill", wbInfo).then((res) => {
        console.log(res.data);
        alert("waybill created successfully");
      });
    } catch (err) {
      console.log(err);
    }

    clearSelectedItems(); // clear selected items
    fetchWb();
  };

  const createSingleWb = async (data) => {
    selectItem(data)
    const wbInfo = {
      from: [
        {
          senderName: "marybeth cargo",
          address: "Ajao Estate, Lagos, Nigeria",
          phone: "080345434",
          logo: ''
        },
      ],
      to: [
        {
          receiverName: 'reciever name',
          address: "some address",
          phone: cusNum,
        },
      ],
      itemNo: `WB${getItemCount() + 1}`,
      totalAmount: data.TOTAL,
      signOut: true,
      items: [selectedItem.itemSelected],
      dateCreated: convertDate(Date.now()),
    };
    try {
      await api.post("/api/waybill", wbInfo).then((res) => {
        console.log(res.data);
        alert("waybill created successfully");
      });
    } catch (err) {
      console.log(err);
    }

    clearSelectedItems(); // clear selected items
    fetchWb();
  }

  const findUsers = () => {
    const user = itemInventory.map((item) => {
      if (item.WhatsApp === cusNum) {
        return (
          <>
            <p>Customer : {item.CName}</p>
          </>
        );
      }
    });
    return user;
  };

  const settingsModal = () => {
    return (
      <Modal
        className="formtable"
        OpenModal={openSettingModal}
        handleCloseModal={handleCloseModal}
      >
        <FormLabel>Company Details</FormLabel>
        <Divider />
        <div className={styles.setform}>
          <div className={styles.formcontrol}>
            <TextField
              id="standard-basic1"
              label="Company Name?"
              variant="standard"
              value={sName}
              onChange={(e) => setsName(e.target.value)}
            />
          </div>

          <div className={styles.formcontrol}>
            <TextField
              id="standard-basic2"
              label="Address?"
              variant="standard"
              value={saddress}
              onChange={(e) => setsaddress(e.target.value)}
            />
          </div>

          <div className={styles.formcontrol}>
            <label>Reminder </label>
            <Switch
              value={sign}
              onChange={(e) => setsign(e.currentTarget.checked)}
            />
          </div>

          <div className={styles.formcontrol}>
            <Button
              variant="contained"
              sx={{ gap: 1, color: "#fffff", background: "#002244" }}
            >
              Save
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </div>
        </div>
      </Modal>
    );
  };
  const inputProps = {
    paddingTop : 10,
  }

  return (
    <Layout mTop={"80px"} mLeft={"100px"}>
      <div className={styles.mainbdy}>
      <div className={styles.controlbar}>
        <TextField
          placeholder="Type number to search item"
          sx={{ width: "30%", padding: "10px 14px" }}
          inputProps={inputProps}
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
        <Link href={"/register"}>
          <Button
            variant="contained"
            sx={{ gap: 1, color: "#fffff", background: "#002244" }}
          >
            Register
            <FontAwesomeIcon icon={faBookmark} />
          </Button>
        </Link>
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
      <div className={styles.maincontainer}>
        {searchValue.length > 0 ? (
          searchResult.map((item) => {
            return (
              <Waybill
                itemInventory={item}
                selectedItm={() => selectItem(item)}
                scItms={() => {
                  addItems(item);
                  handlesucClick();
                }}
                createWb={() => {createSingleWb(item)}}
              />
            );
          })
        ) : (
          itemInventory.map((item) => {
                  return (
                    <Waybill
                      itemInventory={item}
                      selectedItm={() => selectItem(item)}
                      scItms={() => {
                        addItems(item);
                        handlesucClick();
                      }}
                      createWb={() => {createSingleWb(item)}}
                    />
                  )
                  })
        )}
      </div>
      <Snackbar
        open={opensuccess}
        autoHideDuration={4000}
        onClose={handlesucClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handlesucClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          item added to waybill (WB{getItemCount() + 1})!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openwarn}
        autoHideDuration={4000}
        onClose={handlewarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handlewarClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          item removed from waybill (WB{getItemCount() + 1})!
        </Alert>
      </Snackbar>
      <Modal
        className="formtable"
        OpenModal={openCreateWaybill}
        handleCloseModal={handleCloseCMModal}
      >
        {selectedItems.itemsSelected.length > 0 ? 
           <>
           <FormLabel>Waybill Print Details</FormLabel>
        <div className={styles.form}>
          <TextField
            placeholder="client phone number"
            variant="outlined"
            value={cusNum}
            onChange={(e) => setcusNum(e.target.value)}
          />
        </div>
        <div className={styles.table}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              id="tablegen"
            >
              <TableHead sx={{ background: "#eee" }}>
                <TableRow sx={{ color: "white" }}>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Kilo</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedItems.itemsSelected.map((data, idx) => {
                  return (
                    <TableRow
                      key={data[idx]}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{data.quantity}</TableCell>
                      <TableCell align="center">{data.description}</TableCell>
                      <TableCell align="center">{data.Kilo}</TableCell>
                      <TableCell align="center">{data.amount}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          style={{ color: "white", background: "#002244" }}
                          onClick={() => {
                            removeItem(data.amount);
                            handlewarClick();
                          }}
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
        </div>
        <div>
          <p>Total : {getSum()}</p>
        </div>
        <div className={styles.btnflex}>
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

          <Link href={"/waybills-view"}>
            <Button
              variant="contained"
              sx={{
                gap: 1,
                color: "#fffff",
                background: "#002244",
                width: "fit-content",
              }}
            >
              View PDF
            </Button>
          </Link>
        </div>
           </>
           :
           <div style={{display: "flex", justifyContent: "center", fontSize: 200}}>
             <FontAwesomeIcon icon={faCartShopping}/>
           </div>
        }
      </Modal>
      {settingsModal()}
      </div>
    </Layout>
  );
};

export default Items;

/**

 itemInventory.map((item) => {
              return (
                <Waybill 
               itemInventory={item} 
               selectedItm={() => selectItem(item)} 
               scItms={() => {addItems(item); handlesucClick()}}
               />
              )
          })     
         }

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


      <Waybill 
                         itemInventory={item} 
                         selectedItm={() => selectItem(item)} 
                         scItms={() => {addItems(item); handlesucClick()}}
                         />;

                         itemInventory.map((item) => {
              return (
                <Waybill 
               itemInventory={item} 
               selectedItm={() => selectItem(item)} 
               scItms={() => {addItems(item); handlesucClick()}}
               />
              )
          })

          const rows = () => {
    const rws = itemInventory.map((item) => {
      return (
        {
          WhatsApp: item['PHONE NUMBER'], 
          CName: item.NAME,
          Agent: item.AGENT,
          Kilo: item.KILO
        }
      )
    })
    return rws
  }
  
  console.log(rows())

  /*
  itemInventory.map((item) => {
      return (
        {
          id: item.Reference,
          WhatsApp: item['PHONE NUMBER'], 
          CName: item.NAME,
          Agent: item.AGENT,
          Kilo: item.KILO
        }
      )
    })
  

  const columns = [
    {field: 'WhatsApp', headerName : 'WhatsApp', width: 300}, 
    {field: 'CName', headerName : 'CName', width: 300}, 
    {field: 'Agent', headerName : 'Agent', width: 300}, 
    {field: 'Kilo', headerName : 'Kilo', width: 100}, 
  ]



          <DataGrid sx={{textAlign: 'center'}} rows={rows()} columns={columns} getRowId={(row) => row.Reference}/>
 */
