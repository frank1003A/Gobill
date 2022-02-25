import React from "react";
import StepLabel from "@mui/material/StepLabel";
import styles from "../styles/Waybill.module.css";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faFileDownload,
  faCircleInfo,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Waybill_Index from "./WaybillPrint/Waybill_Index";
import Modal from "../component/Modal";
import { PDFViewer } from "@react-pdf/renderer";
import Link from "next/link";
import { Checkbox } from "@mui/material";

const Waybill = ({ itemInventory, selectedItm, scItms}) => {
  /**Modal State */
  const [openPdfviewModal, setopenPdfviewModal] = useState(false);

  //modal method
  const handleOpenModal = () => setopenPdfviewModal(true);
  const handleCloseModal = () => setopenPdfviewModal(false);

  return (
    <div>
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

              <Button 
              variant="outlined" 
              sx={{ marginLeft: "auto" }}>
                <FontAwesomeIcon icon={faPrint} />
              </Button>
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
 * <Link href={'/waybill_pdf'} passHref>
                   <a target={'_blank'}rel="noopener noreferrer">
                   <Button
                  variant="outlined"
                  sx={{ marginLeft: "auto", color: "red" }}
                  onClick={selectedItm}
                > 
 */
