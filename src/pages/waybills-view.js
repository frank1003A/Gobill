import Layout from "../../component/Layout";
import Wbprints from "../../component/Wbprints";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

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
    <Layout>
        <Wbprints ref={componentRef} tot={getSum()} />;
      <Button sx={{ background: "#002244" }} onClick={handlePrint}>
        Print this out!
      </Button>
    </Layout>
  );
};

export default waybillsview;
