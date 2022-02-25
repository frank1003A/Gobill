import Layout from "../../component/Layout";
import { Button, Container } from "@mui/material";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
} from "@mui/material";
import clientPromise from "../../lib/mongodb";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faRemove } from "@fortawesome/free-solid-svg-icons";
import { Chip } from "@mui/material";
import { useRouter } from "next/router";
import axios from 'axios'
import { useEffect } from "react";

const waybill = ({ waybills }) => {
  const router = useRouter()
  const { wid } = router.query

  const handleDelete = () => {};
  const handleClick = () => {};

  //date format
  const convert = (str) => {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    //return [date.getFullYear(), mnth, day].join("-");
    return [mnth, day, date.getFullYear()].join("/");
  };


  const updateWaybill = async (id, data) => {
    const wbInfo = {
      from : 'MaryBeth Cargo (updated)',
      to :  data.to,
      items : data.items,
      date : convert(Date.now())
    }

    const res = await fetch(`/api/waybill?waybill_id=${id}`,{
      method: 'PATCH',
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(wbInfo),
      
    })

    const updatedWb = await res.json()
    console.log(updatedWb)
  }



  return (
    <Layout>
      <Container sx={{ margin: "1rem" }}>
        <Button variant="text">View Register</Button>
      </Container>
      <div style={{ height: 450, width: "100%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" id="tablegen">
            <TableHead sx={{ background: "orange", textAlign: "center" }}>
              <TableRow sx={{ color: "white", textAlign: "center" }}>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Signed</TableCell>
                <TableCell align="center">Action</TableCell>
                <TableCell align="center">Action</TableCell>
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
                      {data.from}
                    </TableCell>
                    
                    <TableCell align="center">
                      <Chip label="signed" color="success" variant="outlined" />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        style={{ color: "#002244", background: "none" }}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label="Delete"
                        onClick={handleClick}
                        onDelete={handleDelete}
                        sx={{Background: 'red'}}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        style={{ color: "#002244", background: "none" }}
                        onClick={() => updateWaybill(data._id, data)}
                      >
                        update
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};

export default waybill;

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
