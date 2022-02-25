import Layout from "../../component/Layout";
import Wbprint from "../../component/Wbprint";
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { Button } from "@mui/material";
import printJs from 'print-js'
import printJS from "print-js";

const waybillview = () => {
    const selectedItem = useSelector((state) => state.itemSelected)

    const options = {
      margin: 0.5,
      filename: 'wb.pdf',
      image: { 
        type: 'jpeg', 
        quality: 500
      },
      html2canvas: { 
        scale: 1 
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait' 
      }
    }

    const printDocument = () => {
      const doc = document.getElementById('Htmltoprint');
     html2canvas(doc, { 
       backgroundColor: '#FFFFFF'
     })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt','A4');
        pdf.addImage(imgData, 'PNG', 0, 0);
        // pdf.output('dataurlnewwindow');
       // pdf.save("waybill.pdf");
        window.open(pdf.output('bloburl')).print()
      })
     /**
      * printJS({
        printable: 'Htmltoprint',
        type: 'html',
        targetStyles: ['*'],
      }) 
      printJS('Htmltoprint', 'html') 
      const doc = document.getElementById('Htmltoprint');
     html2canvas(doc, { 
       backgroundColor: '#FFFFFF'
     })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt','A4');
        pdf.addImage(imgData, 'PNG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("waybill.pdf");
        window.open(pdf.output('bloburl'))
      })
      const doc = document.getElementById('Htmltoprint');
      const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
      pdf.html(doc, { html2canvas: { scale: 0.57 } }).then(() => {
        pdf.save("test.pdf");
      });

      const doc = document.getElementById('Htmltoprint');
     html2canvas(doc)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF(options);
        pdf.addImage(imgData, 'PNG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("waybill.pdf");
        window.open(pdf.output('bloburl'))
      })

       const doc = document.getElementById('Htmltoprint');
      const pdf = new jsPDF('p', 'pt','A4');
        pdf.html(doc, { html2canvas: {scale: 0.65,} }).then(() => {
          pdf.save('myDocument.pdf');
          window.open(pdf.output('bloburl')); // To debug.
        });

       * window.print()
       * const doc = document.getElementById('Htmltoprint');
      const pdf = new jsPDF('p', 'pt', 'letter', 'A4');
      pdf.html(doc, {
        callback: function () {
            pdf.save('myDocument.pdf');
            window.open(pdf.output('bloburl')); // To debug.
        }
        })
        const doc = document.getElementById('Htmltoprint');
     html2canvas(doc)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("waybill.pdf");
      })
        
        */
    }

  return (
    <Layout>
        <Wbprint
        ID={'Htmltoprint'}
        qty={selectedItem.itemSelected.quantity}
        desc={selectedItem.itemSelected.description}
        amt={selectedItem.itemSelected.amount}
        tot={selectedItem.itemSelected.amount}
        />
        <Button
        sx={{background: "#002244"}}
        onClick={() => printDocument()}
        >Generate Pdf</Button>
    </Layout>
  )
}

export default waybillview