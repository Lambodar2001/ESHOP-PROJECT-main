import * as React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import Typography from '@mui/material';


export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState('left');
 
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleClick = () => {
    console.log("clicked");
    
  }
  return (
    <>
      <ToggleButtonGroup value={alignment} exclusive aria-label="text alignment" onChange={handleAlignment}>
        <ToggleButton value="left" aria-label="left aligned" onClick={()=>{handleClick()}}>
          <div>
            <FormatAlignLeftIcon />
          </div>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}


