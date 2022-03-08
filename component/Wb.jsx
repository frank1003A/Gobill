import react from 'react'
import styles from "../styles/Wb.module.css";
import StepLabel from "@mui/material/StepLabel";
import { Button, Chip, IconButton, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const Wb = ({created, stat, amount, itemcount, sItm }) => {

    const statusBadge = (data) => {
        if (data === false) return <><Chip label="not signed" color="error" variant="outlined" /></>
        if (data === true) return <><Chip label="signed" color="success" variant="outlined" /></>
      }
    

    return(
        <div className={styles.card}>
          <div className={styles.innercontainer}>
          <p>Date : {created}</p>
          <p>Status : {statusBadge(stat)}</p>
            <div>
               <StepLabel sx={{color: 'green', fontWeight: '800'}}>Paid : &#8358; {amount}</StepLabel>
               <StepLabel>Item No : {itemcount}</StepLabel>
            </div>
            <IconButton onClick={sItm}>
             <FontAwesomeIcon icon={faFilePdf} color='red'/>
            </IconButton>
          </div>
            <Divider variant='fullWidth' color='black'/>
        </div>
    )

}

export default Wb