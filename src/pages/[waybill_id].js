import Layout from '../../component/Layout'
import { Button, Container } from '@mui/material';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import {useRouter} from 'next/router'
import clientPromise from '../../lib/mongodb';

const waybillDetail = ({waybill}) => {
  const router = useRouter()
  const wbId = router.query
  console.log(wbId)
  console.log(waybill)
  
  return (
    <Layout>
      <Container sx={{margin: '1rem'}}>
        <Button variant='text' >View Register</Button>
      </Container>
    </Layout>
  )
}

export default waybillDetail

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const db = client.db("Gobill");

  let waybill = await db.collection("Waybill").findOne({_id : context.query.id})
  //waybill = JSON.parse(JSON.stringify(waybill));

  return {
    props: { waybill },
  };
}

/**
 * 
 * const data = await fetch(`http://localhost:3000/api/waybill_details?${context.query.id}`)
  const waybill = data.json()
  return {
    props: { waybill },
  };
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
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {waybills.map((data, idx) => {
                  return (
                    <TableRow
                      key={idx}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{data.itemsDescription[0].quantity}</TableCell>
                      <TableCell align="right">{data.itemsDescription[0].description}</TableCell>
                      <TableCell align="right">{data.itemsDescription[0].unitPrice}</TableCell>
                      <TableCell align="right">{data.itemsDescription[0].amount}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          style={{ color: "white", background: "#002244" }}
                        >
                          EDIT
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          const columns = [
    { field: 'Id', headerName: 'ID' },
    { field: 'quantity', headerName: 'Quantity' },
    { field: 'description', headerName: 'Description', width: 600 },
    { field: 'unitPrice', headerName: 'Unit Price', width: 300 },
    { field: 'amount', headerName: 'Amount', width: 300 }
  ]

  const getGridRows = () => {
    let idCounter = 0;
    idCounter += 1;
    {dbData.map((data, idx) => {
      return (
        {
        Id: idCounter,
        Quantity: data.itemsDescription[0].quantity,
        Description : data.itemsDescription[0].description, 
        UnitPrice : data.itemsDescription[0].unitPrice,
        Amount : data.itemsDescription[0].amount
      }
      );
    })}
  }

  const rows = [
    getGridRows()
  ]
 */