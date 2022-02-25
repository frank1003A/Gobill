import { Document, Page, Text, Font, View, StyleSheet, PDFViewer} from "@react-pdf/renderer/lib/react-pdf.browser.cjs.js"
import Header from './Header'
import Image from 'next/image'
import ReactPDF from '@react-pdf/renderer';

const Waybill_Index = ({compName, compAddress, itemData}) => {
  // Create styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100vh'
  },
  page: {
    flexDirection: 'column',
    //backgroundColor: '#E4E4E4',
    backgroundColor: 'white',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: 800,
    textAlign: 'center',
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
  },
  htext:{
    fontSize: '12px',
    fontWeight: 800,
    textAlign: 'center',
    margin: 30
  },
  section: {
    //margin: 10,
    //padding: 10,
    //flexGrow: 1
  },
});

/*
Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});
*/

const Resume = props => (
  <Page {...props} style={styles.page}>
    <Header /> 
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image
          //src="https://react-pdf.org/static/images/luke.jpg"
          style={styles.image}
        />
        <Education />
        <Skills />
      </View>
      <Experience />
    </View>
    <Text style={styles.footer}>This IS the candidate you are looking for</Text>
  </Page>
);
//selectedItem.itemSelected.description
const MyDocument = () => {
    return(
      <Document >
    <Page size="A4" style={styles.page}>
      <View style={styles.detailColumn}>
        <Text>{compName}</Text>
        <Text>{compAddress}</Text>
      </View>
      <View style={styles.section}>
        <Text>Cash Sales Invoice</Text>
      </View>
      <View style={styles.table}>
        <Text>{itemData}</Text>
      </View>
    </Page>
    </Document>
    )
}

  return (
    <MyDocument/>
  )
}

export default Waybill_Index