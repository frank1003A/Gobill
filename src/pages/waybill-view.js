import Layout from "../../component/Layout";
import Wbprint from "../../component/Wbprint";
import { useSelector } from 'react-redux';
import { Button } from "@mui/material";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';


const waybillview = () => {
    const selectedItem = useSelector((state) => state.itemSelected)
    const selectedItems = useSelector((state) => state.itemsSelected)
    const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Layout>
        <Wbprint
        ID={'Htmltoprint'}
        qty={selectedItem.itemSelected.quantity}
        desc={selectedItem.itemSelected.description}
        amt={selectedItem.itemSelected.amount}
        tot={selectedItem.itemSelected.amount}
        ref={componentRef}
        />
      <Button sx={{background: "#002244"}} onClick={handlePrint}>Print this out!</Button>
    </Layout>
  )
}

export default waybillview