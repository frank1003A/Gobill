import React, {useEffect} from 'react'
import Layout from '../../component/Layout'
import { Container } from '@mui/material'
import Wb from '../../component/Wb'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import MultipleWbprint from '../../component/MultipleWbprint'
import { useReactToPrint } from 'react-to-print';
import styles from "../../styles/Wb.module.css";
import axios from 'axios'
import { updateWbSelected } from '../redux/wbSlice'

const waybills = () => {
  const dispatch = useDispatch()
  const [Waybill, setWaybill] = useState([])
  const [wbPressed, setwbPressed] = useState({})

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const api = axios.create({
    baseURL: "http://localhost:3000",
  });

  const fetchWb = async () => {
    try {
      await api.get('/api/waybill').then(res => {
        setWaybill(res.data)
      } )
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchWb()
  }, [])

  const wbClicked = (data) => {
    dispatch(updateWbSelected(data))
  }

  const getItemCount = (wb,p ) => {
    let itemNum = ''
    const itemCount = wb.map((item) => {
      if (item._id === p._id) return itemNum = item.items.length
    })
    return itemNum
  }

  const getWaybill = (p) => {
    const mainWb = []
    const wayb = Waybill.map(wb => {
      if (wb._id === p._id) return mainWb = wb
    })
    return mainWb
  }

  const wbCount = () => {
    const count = Waybill.filter(wb => wb)
    return count.length + 1
  }

  return (
      <Layout mTop={'100px'} mLeft={'100px'}>
          <div className={styles.maindiv}>
          <div className={styles.wblist} sx={{height: '90vh', overflow: 'auto', padding: 'none', width: '100%'}}>
            {Waybill.map(bill => {
              return (
                <Wb sItm={() => wbClicked(bill)} created={bill.dateCreated} amount={bill.totalAmount} itemcount={bill.items.length} stat={bill.signOut}   />
              )
            })}
          </div>
          <div className={styles.pdfview}>
          <MultipleWbprint ref={componentRef}/>
          </div>
          </div>
      </Layout>
  )
}

export default waybills

//<MultipleWbprint ref={componentRef} arr={selectedWaybill.wbSelected}/>
//<MultipleWbprint ref={componentRef} arr={wbPressed}/>
//<MultipleWbprint ref={componentRef} arr={wbPressed} count={getItemCount(Waybill, wbPressed)}/>