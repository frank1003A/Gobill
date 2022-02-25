import React from 'react'
import styles from '../styles/Invoice.module.css'
import Image from 'next/image'

const Wbprint = ({qty, desc, amt, tot, ID}) => {
	//<Image src="/logo.png" width={400} height={50} />
  return (
    <div className={styles['invoice-box']} id={ID}>
			<table cellPadding="0" cellSpacing="0">
				<tr className={styles.top} id='trinfo'>
					<td colSpan="3">
						<table>
							<tr>
								<td className={styles.title}>
								<Image src="/logo.png" width={400} height={50} />
								</td>

								<td>
									Invoice #: 123<br />
									Created: January 1, 2015<br />
									Due: February 1, 2015
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr className={styles.information} id='trinfo'>
					<td colSpan="3">
						<table>
							<tr>
								<td>
									Sparksuite, Inc.<br />
									12345 Sunny Road<br />
									Sunnyville, CA 12345
								</td>

								<td>
									Acme Corp.<br />
									John Doe<br />
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
                    <td style={{textAlign:'left'}}>Quantity</td>

					<td style={{textAlign:'left'}}>Item</td>

					<td style={{textAlign:'left'}}>Price</td>
				</tr>

				<tr className={styles.item}>
                    <td style={{textAlign:'left'}}>{qty}</td>

					<td style={{textAlign:'left'}}>{desc}</td>

					<td style={{textAlign:'left'}}>&#8358; {amt}</td>
				</tr>

				<tr className={styles.total}>
					<td></td>

                    <td></td>

					<td style={{textAlign:'rigth'}}>Total: &#8358; {tot}</td>
				</tr>
			</table>
		</div>
  )
}

export default Wbprint