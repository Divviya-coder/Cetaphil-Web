import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';


function Logout({ imageCaptured, criterial_post, post_criteria_data, Reset_for_logout, handleClose, openCreate }) {
    let navigate = useNavigate()
    return (

        <Dialog open={openCreate} onClose={() => { handleClose(false) }} maxWidth="xl" minWidth="xl">

            <DialogTitle>Do you want to logout?</DialogTitle>
            <DialogContent>{
                imageCaptured.length != 0 || criterial_post.length != 0 || post_criteria_data.length != 0 ?
                    "Please note that if you logout, your store and shelf details will be deleted." : ""}</DialogContent>
            <DialogActions>
                <Button onClick={() => { handleClose(false) }}>NO</Button>
                <Button onClick={() => {
                    Reset_for_logout()
                    sessionStorage.clear();
                    handleClose(false)
                    navigate('/')
                }}>YES</Button>
            </DialogActions>
        </Dialog>
    )
}


export default Logout