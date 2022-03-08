import Layout from "../../component/Layout";
import { Button, Container, TextField, } from "@mui/material";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  IconButton
} from "@mui/material";
import clientPromise from "../../lib/mongodb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faFilePdf, faMoneyBillWave, faSearch, faRemove} from "@fortawesome/free-solid-svg-icons";
import { Chip } from "@mui/material";
import { useRouter } from "next/router";
import axios from 'axios'
import Modal from "../../component/Modal";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import DateComp from "../../component/Date"
import UpdateWbForm from '../../component/UpdateWbForm'
import { sortDataByDate, convertDate } from "../../utils/utils";

const register = ({ waybills }) => {
  //state
  const [openUpdateModal, setopenUpdateModal] = useState(false)
  const [dateValue, setdateValue] = useState(new Date(''));

  const handleChange = (newValue) => {
    setdateValue(newValue);
  };

  const handleOpenModal = () => setopenUpdateModal(true)
  const handleCloseModal = () => setopenUpdateModal(false)

  const api = axios.create({
    baseURL: "http://localhost:3000",
  });

  const handleDelete = () => {};
  const handleClick = () => {};

  const updateWaybill = async (data) => {
    try {
      const dta = {
        from : [{senderName : 'marybeth cargo (updated)'}],
        signOut: false,
      }

      await api.patch(`/api/waybillupdate?waybill_id=${data}`, dta, {withCredentials: true}, { 
        headers:{
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        console.log(res.data)
        alert('update sucessfull')
      })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteWaybill = async (id) => {
    try{
      await api.delete(`/api/waybillupdate?waybill_id=${id}`).then((res) => {
        console.log(res.data)
        alert('delete sucessfull')
          });
        } catch (err) {
          console.log(err);
        }
  }


  const statusBadge = (data) => {
    if (data === false) return <><Chip label="not signed" color="error" variant="outlined" /></>
    if (data === true) return <><Chip label="signed" color="success" variant="outlined" /></>
  }

  const updateModal = () => {
    return (
      <Modal
        className="formtable"
        OpenModal={openUpdateModal}
        handleCloseModal={handleCloseModal}
      >
        <UpdateWbForm />
      </Modal>
    )
  }


  return (
    <Layout mTop={'80px'} mLeft={'120px'}>
      <div className={styles.parentdiv}>

      <div className={styles.topbar}>

      <div className={styles.searchbar}>
        <div>
        <TextField
          placeholder="Type here to search"
        ></TextField>
        </div>
        <DateComp value={dateValue} handleChange={handleChange} dlabel={'Select Date'}/>
        <DateComp value={dateValue} handleChange={handleChange} dlabel={'Start Date'}/>
        <DateComp value={dateValue} handleChange={handleChange} dlabel={'End Date'}/>
        </div>
        <Button variant="contained" sx={{ gap: 1, color: "#fffff", background: "#002244" }}>Date Range</Button>
        <Button variant="contained" sx={{ gap: 1, color: "#fffff", background: "#002244" }}>Print Register</Button>
      </div>
      <div style={{ height: 450, width: "100%", overflow: 'auto', background: '#eee', border: '1px solid #eee' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" id="tablegen">
            <TableHead sx={{ background: "#002244", textAlign: "center",}}>
              <TableRow sx={{ color: "#fff", textAlign: "center" }}>
                <TableCell align="center" sx={{ color: "#fff" }}>Sender</TableCell>
                <TableCell align="center" sx={{ color: "#fff"}}>Reciever</TableCell>
                <TableCell align="center" sx={{ color: "#fff"}}>Date Created</TableCell>
                <TableCell align="center" sx={{ color: "#fff"}}>Item Number</TableCell>
                <TableCell align="center"sx={{ color: "#fff"}}>Total Amount <FontAwesomeIcon icon={faMoneyBillWave}/></TableCell>
                <TableCell align="center" sx={{ color: "#fff"}}>Sign Out</TableCell>
                <TableCell align="center" sx={{ color: "#fff"}}>Action</TableCell>
                <TableCell align="center" sx={{ color: "#fff"}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {waybills.map((data, idx) => {
                return (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      {data.from[0].senderName}
                    </TableCell>

                    <TableCell align="center">{data.to[0].receiverName}</TableCell>
                    <TableCell align="center">{data.dateCreated}</TableCell>
                    <TableCell align="center">{ Array.isArray(data.items) ? data.items.length : 1 }</TableCell>
                    <TableCell align="center">{data.totalAmount}</TableCell>
                    <TableCell align="center">
                      {statusBadge(data.signOut)}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="primary"
                        style={{ color: "#002244", background: "none" }}
                        onClick={handleOpenModal}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                      onClick={() => deleteWaybill(data._id)}
                      >
                       <FontAwesomeIcon icon={faRemove} style={{ color: "red", background: "none" }}/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {updateModal()}
      </div>
    </Layout>
  );
};

export default register;

export async function getServerSideProps(context) {

  const client = await clientPromise;

  const db = client.db("Gobill");

  let waybills = await db.collection("Waybill").find({}).toArray();
  waybills = JSON.parse(JSON.stringify(waybills));
  return {
    props: { waybills },
  };
}

/**
 const client = await clientPromise;

  const db = client.db("Gobill");

  let waybills = await db.collection("Waybill").find({}).toArray();
  waybills = JSON.parse(JSON.stringify(waybills));

  <TableCell align="center">
                      {data.itemsDescription[0].quantity}
                    </TableCell>
                    <TableCell align="center">
                      {data.itemsDescription[0].description}
                    </TableCell>
                    <TableCell align="center">
                      {data.itemsDescription[0].amount}
                    </TableCell>
 */
