import Layout from "../../component/Layout";
import Wbprint from "../../component/Wbprint";
import { useSelector } from 'react-redux';
import { Button } from "@mui/material";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import styles from '../../styles/glb.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";


const waybillview = () => {
    const selectedItem = useSelector((state) => state.itemSelected)
    const selectedItems = useSelector((state) => state.itemsSelected)
    const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Layout mTop={'100px'} mLeft={'100px'}>
        <Wbprint
        ID={'Htmltoprint'}
        qty={selectedItem.itemSelected.quantity}
        desc={selectedItem.itemSelected.description}
        amt={selectedItem.itemSelected.amount}
        tot={selectedItem.itemSelected.amount}
        ref={componentRef}
        />
      <div className={styles.btncontainer}>
          <Button sx={{background: "#002244", color: "#fff"}} onClick={handlePrint}>Print <FontAwesomeIcon icon={faPrint} /></Button>
        </div>
    </Layout>
  )
}

export default waybillview