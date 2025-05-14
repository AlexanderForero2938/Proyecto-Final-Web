import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './ComboBox.css';

export default function ComboBox({ label, options, value, onChange }) {
  return (
    <Autocomplete className='combo'
      disablePortal
      options={options}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
