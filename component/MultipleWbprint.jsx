import React from "react";
import styles from "../styles/Invoice.module.css";
import Image from "next/image";
import {useSelector} from 'react-redux'

const MultipleWbprint = React.forwardRef(
  ({}, ref) => {
    const waybillSelected = useSelector(state => state.wbSelected)

    const toggleDisplay = () => {
     let ItemArr = []
     ItemArr.push(waybillSelected.wbSelected.items)
     const display = ItemArr[0].map(itm  => {
       return (
        <tr className={styles.item}>
        <td style={{ textAlign: "left" }}>{itm.quantity}</td>

        <td style={{ textAlign: "left" }}>{itm.description}</td>

        <td style={{ textAlign: "left" }}>&#8358; {itm.amount}</td>
      </tr>
       )
     })
     return display
    }

    return (
      <div className={styles["invoice-box"]} ref={ref}>
        <table cellPadding="0" cellSpacing="0">
          <tr className={styles.top} id="trinfo">
            <td colSpan="3">
              <table>
                <tr>
                  <td className={styles.title}>
                    <Image src="/logo.png" width={400} height={50} />
                  </td>

                  <td>
                    Invoice #: {waybillSelected.wbSelected.itemNo}
                    <br />
                    Created: {waybillSelected.wbSelected.dateCreated}
                    <br />
                    Due: 2 weeks
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr className={styles.information} id="trinfo">
            <td colSpan="3">
              <table>
                <tr>
                  <td>
                    Sparksuite, Inc.
                    <br />
                    12345 Sunny Road
                    <br />
                    Sunnyville, CA 12345
                  </td>

                  <td>
                    Acme Corp.
                    <br />
                    John Doe
                    <br />
                    john@example.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr className={styles.heading}>
            <td>Payment Method</td>

            <td></td>

            <td>Check #</td>
          </tr>

          <tr className={styles.details}>
            <td>Check</td>

            <td></td>

            <td>1000</td>
          </tr>

          <tr className={styles.heading}>
            <td style={{ textAlign: "left" }}>Quantity</td>

            <td style={{ textAlign: "left" }}>Item</td>

            <td style={{ textAlign: "left" }}>Price</td>
          </tr>

          { waybillSelected.wbSelected.items ? toggleDisplay() : <><p>No Waybill Selected</p></> }

          <tr className={styles.total}>
            <td></td>

            <td></td>

            <td style={{ textAlign: "rigth" }}>Total: &#8358; {waybillSelected.wbSelected.totalAmount}</td>
          </tr>
        </table>
      </div>
    );
  }
);

export default MultipleWbprint;


/**
 {selectedWaybill.wbSelected.items.map((itm) => {
          return (
            <tr className={styles.item}>
              <td style={{ textAlign: "left" }}>{itm.quantity}</td>

              <td style={{ textAlign: "left" }}>{itm.description}</td>

              <td style={{ textAlign: "left" }}>&#8358; {itm.amount}</td>
            </tr>
          );
        })}
 */

/**
 const toggleDisplay = () => {
      for(let i = 0; i < count; i++){
        return (
          <tr className={styles.item}>
              <td style={{ textAlign: "left" }}>{arr.items[i].quantity}</td>

              <td style={{ textAlign: "left" }}>{arr.items[i].description}</td>

              <td style={{ textAlign: "left" }}>&#8358; {arr.items[i].amount}</td>
            </tr>
        )
      }
    }
 */