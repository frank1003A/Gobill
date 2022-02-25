import { PDFViewer, StyleSheet} from "@react-pdf/renderer/lib/react-pdf.browser.cjs.js"
import Waybill_Index from '../../component/WaybillPrint/Waybill_Index';
import { useSelector } from 'react-redux';

const waybill_pdf = () => {
  const selectedItem = useSelector((state) => state.itemSelected)
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100vh'
    },
  })

  return (
    <PDFViewer style={styles.container} >
          <Waybill_Index 
          compName={'MaryBeth Cargo'} 
          compAddress={'AJAO ESTATE LAGOS,NIGERIA'}
          itemData={selectedItem.itemSelected.description}
          />
    </PDFViewer>
  )
}

export default waybill_pdf