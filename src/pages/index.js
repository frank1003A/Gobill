import Layout from '../../component/Layout'
import Paper from '../../component/Paper'
import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import Button from '@mui/material/Button'
import Modal from '../../component/Modal'
import {useState, useEffect} from 'react'
import { Container, Input } from '@mui/material'
import * as XLSX from 'xlsx'
import useLocalStorage from '../../hooks/localStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faReceipt } from '@fortawesome/free-solid-svg-icons'


export default function Home() {
  const [OpenModal, setOpenModal] = useState(false);
  const [OpenModal2, setOpenModal2] = useState(false)

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenModal2 = () => setOpenModal2(true);
  const handleCloseModal2 = () => setOpenModal2(false);

  //upload file 
  const [Mfile, setMfile] = useState('')

  //inventory
  const [itemInventory, setitemInventory] = useLocalStorage('Inventory', [])

  const readExcelFile = (file) =>{
    const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
  
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, {
            type: "buffer",
            cellDates: true,
            dateNF: "yyyy-mm-dd",
          });
  
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
  
      promise.then((d) => {
        const itemIvt = d.map((item) =>{
          let inventory = {
            WhatsApp : item.__EMPTY,
            CName : item.__EMPTY_1,
            Agent : item.__EMPTY_2,
            Amount : item.__EMPTY_9,
            Kilo : item.__EMPTY_5
          };
          return inventory
        })
          return (setitemInventory(itemIvt))
      });
}

  return (
    <Layout>
      <div className={styles.main}>
      <Paper elevation={24} sx={{borderRadius: '8px'}}>
        <p>Inventory Details ?</p>
          <div className={styles.card} onClick={() => handleOpenModal()}>
          <h2>Spreadsheet <FontAwesomeIcon icon={faFile} /></h2>
            <p>Create an inventory with existing spreadsheet!</p>
          </div>
          <div className={styles.card} onClick={() => handleOpenModal2()}>
          <h2 style={{color: 'blueviolet'}}>Gocreate &rarr;</h2>
            <p>Create an inventory and design invoice on the browser!</p>
          </div>
      </Paper>

      <div className={styles.maincontainer}>
      <Image src="/svg/4.svg" width={600} height={600} alt="illustration"/>
      </div>
    </div>
    <Modal OpenModal={OpenModal} handleCloseModal={handleCloseModal}>
    <Paper elevation={0}>
      <p>Upload Spreadsheet &rarr;</p>
    <Input
                variant="outlined"
                accept="file"
                id="icon-button-file"
                multiple
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setMfile(file);
                }}
                />

                <Button 
                variant='contained' 
                sx={{ gap: 1, color: '#fffff',background: '#002244'}}
                onClick={() => readExcelFile(Mfile)}
                >Create Inventory <FontAwesomeIcon icon={faReceipt}/> </Button>
      </Paper>
    </Modal>
    <Modal OpenModal={OpenModal2} handleCloseModal={handleCloseModal2}>
      <p>coming soon &rarr;</p>
    </Modal>
    </Layout>
    
  )
}
