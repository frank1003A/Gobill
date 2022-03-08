import Layout from "../../component/Layout";
import Wbprints from "../../component/Wbprints";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styles from '../../styles/glb.module.css'

const waybillsview = () => {
  const selectedItems = useSelector((state) => state.itemsSelected);
  const componentRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //calculate waybill total
  const getSum = () => {
    const Sum = selectedItems.itemsSelected.reduce(
      (sum, item) => (sum = sum + item.amount),
      0
    );
    return Sum;
  };

  return (
    <Layout mTop={'100px'} mLeft={'100px'}>
        <Wbprints ref={componentRef} tot={getSum()} />;
        <div className={styles.btncontainer}>
        <Button sx={{background: "#002244", color: "#fff"}} onClick={handlePrint}>
        Print
      </Button>
        </div>
    </Layout>
  );
};

export default waybillsview;
