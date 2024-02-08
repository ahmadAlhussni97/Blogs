import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {constData} from '../../Helpers/ConstData';

export default function DeleteDialog(props) {

  const [open, setOpen] = React.useState(false);
  const styleDeleteButton = {background:'red',borderColor:"black",fontWeight:'bold',padding:'6px',fontSize:'10px',borderRadius:'0px',color:"black"}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (key) => {
  
    // delete
    if(key==="Confirm")
        fetch(constData().BasicApi+'/'+props?.id, {
            method: 'DELETE',
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                document.getElementById("Card_"+props?.id).remove()  // remove item
            })
            .catch((error)=> alert(error));   

    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button style={styleDeleteButton} variant="outlined" onClick={handleClickOpen}>  Delete </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"BLog Application?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are You Sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose("Close")}>Close</Button>
          <Button onClick={()=>handleClose("Confirm")} autoFocus>Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}