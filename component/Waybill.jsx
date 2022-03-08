import React from "react";
import styles from "../styles/Waybill.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusCircle, faFileInvoice} from "@fortawesome/free-solid-svg-icons";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Modal from "../component/Modal";
import Link from "next/link";
import {IconButton} from '@mui/material'

const Waybill = ({ itemInventory, selectedItm, scItms, createWb}) => {
  /**Modal State */
  const [openPdfviewModal, setopenPdfviewModal] = useState(false);

  //modal method
  const handleOpenModal = () => setopenPdfviewModal(true);
  const handleCloseModal = () => setopenPdfviewModal(false);

  return (
    <div>
      <div className={styles.card}>
            <div className={styles.innercontainer}>
               <h2>Phone Number: </h2> <p>{itemInventory['PHONE NUMBER']}</p>
            </div>
            <div className={styles.innercontainer}>
               <h2>Name: </h2>  <p>{itemInventory.NAME}</p>
            </div>
            <div className={styles.innercontainer}>
               <h2>Agent: </h2> <p>{itemInventory.AGENT}</p>
            </div>
            <div className={styles.innercontainer}>
               <h2>Kilo: </h2><p>{itemInventory.KILO}</p>
            </div>
            <div className={styles.innercontainer}>
                <IconButton
                 onClick={scItms}
                >
                <FontAwesomeIcon icon={faPlusCircle} style={{color: 'green'}}/>
                </IconButton>

                <Link href={'/waybill-view'} passHref>
                   <IconButton
                  variant="outlined"
                  sx={{ marginLeft: "auto", color: "red" }}
                  onClick={selectedItm}
                > 
                  <FontAwesomeIcon icon={faFilePdf} />
                </IconButton>
                </Link>

                <IconButton
                onClick={createWb}
                >
                 <FontAwesomeIcon icon={faFileInvoice} style={{color: '#002244'}} />
                </IconButton>
            </div>
          </div>
      <>
        <Modal OpenModal={openPdfviewModal} handleCloseModal={handleCloseModal}>
          <p>Something</p>
        </Modal>
      </>
    </div>
  );
};

export default Waybill;

/**
 * 
 * 
 * <div className={styles.innercontainer}>
              
                <Button variant='outlined'
                onClick={scItms}
                > <FontAwesomeIcon icon={faPlus} /></Button>

                <Link href={'/waybill-view'} passHref>
                   <Button
                  variant="outlined"
                  sx={{ marginLeft: "auto", color: "red" }}
                  onClick={selectedItm}
                > 
                  <FontAwesomeIcon icon={faFilePdf} />
                </Button>
                </Link>
            </div>

 * <Link href={'/waybill_pdf'} passHref>
                   <a target={'_blank'}rel="noopener noreferrer">
                   <Button
                  variant="outlined"
                  sx={{ marginLeft: "auto", color: "red" }}
                  onClick={selectedItm}
                > 


                <div className={styles.card}>
            <div className={styles.innercontainer}>
              <FontAwesomeIcon icon={faCircleInfo} />
              <h2>WhatsApp: </h2> <p>{itemInventory.WhatsApp}</p>
            </div>
            <div className={styles.innercontainer}>
              <FontAwesomeIcon icon={faCircleInfo} />
              <h2>CName: </h2> <p>{itemInventory.CName}</p>
            </div>
            <div className={styles.innercontainer}>
              <FontAwesomeIcon icon={faCircleInfo} />
              <h2>Agent: </h2> <p>{itemInventory.Agent}</p>
            </div>
            <div className={styles.innercontainer}>
              <FontAwesomeIcon icon={faCircleInfo} />
              <h2>Kilo: </h2> <p>{itemInventory.Kilo}</p>
            </div>
            <div className={styles.innercontainer}>
              
                <Button variant='outlined'
                onClick={scItms}
                > <FontAwesomeIcon icon={faPlus} /></Button>

                <Link href={'/waybill-view'} passHref>
                   <Button
                  variant="outlined"
                  sx={{ marginLeft: "auto", color: "red" }}
                  onClick={selectedItm}
                > 
                  <FontAwesomeIcon icon={faFilePdf} />
                </Button>
                </Link>
            </div>
          </div>
 */
