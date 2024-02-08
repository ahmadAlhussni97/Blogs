import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link,useNavigate } from "react-router-dom";
import  DeleteDialog  from '../Alert/Dialog'

export default function BasicButtonGroup(props) {

  const stylEditButton = {background:'white',borderColor:"black",color:'black',padding:'6px',fontWeight:'bold',padding:'6px',fontSize:'10px',borderRadius:'0px'}
  const navigate = useNavigate()

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button  onClick={() => navigate("/post/edit/"+props?.id)} style={stylEditButton}>Edit</Button>
      <DeleteDialog id={props?.id} />
    </ButtonGroup>
  );
}


