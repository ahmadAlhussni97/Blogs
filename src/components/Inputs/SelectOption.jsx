import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {constData} from '../../Helpers/ConstData'

export default function SelectOption(props) {

  const [value, setValue] = React.useState('');
  const options = (props.label=="Limit") ?constData().limitList: constData().usersList
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value)
    props.Function(event)
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">{props.label}</InputLabel>
        <Select onChange={handleChange} value={value}  labelId="demo-simple-select-standard-label"id="demo-simple-select-standard"  label={props.label}>
        {options.map((item,index)=>(
           <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
        ))}  
        </Select>
      </FormControl>
    </div>
  );
}
