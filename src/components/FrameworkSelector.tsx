import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

type FrameworkSelectorProps = {
  frameworks: string[];
  selectedFramework: string | null;
  onFrameworkChange: (framework: string) => void;
};

const FrameworkSelector: React.FC<FrameworkSelectorProps> = ({
  frameworks,
  selectedFramework,
  onFrameworkChange,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onFrameworkChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="framework-select-label">Framework</InputLabel>
      <Select
        labelId="framework-select-label"
        id="framework-select"
        value={selectedFramework || ''}
        onChange={handleChange}
        label="Select Framework"
      >
        {frameworks.map((framework) => (
          <MenuItem key={framework} value={framework}>
            {framework}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FrameworkSelector;
