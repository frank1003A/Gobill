import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material/'
//import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
const UpdateForm = () => {
    const paperStyle = { padding: '30px 20px', width: 400}
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <FontAwesomeIcon icon={faSignIn} />
                    </Avatar>
                    <h2 style={headerStyle}>Update Form</h2>
                    <Typography variant='caption' gutterBottom>Update Waybill data !</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Name' placeholder="Customer Name" sx={{marginBottom: '.3rem'}} />
                    <TextField fullWidth label='Email' placeholder="Customer Number" />
                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Sign Out</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                            <FormControlLabel value="female" control={<Radio />} label="not signed" />
                            <FormControlLabel value="male" control={<Radio />} label="signed" />
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth label='Phone Number' placeholder="Amount Paid" />
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I have crosschecked this update."
                    />
                    <Button type='submit' variant='contained' color='primary'>Save</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default UpdateForm;

/**
 <TextField fullWidth label='Password' placeholder="Enter your password"/>
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password"/>
 */