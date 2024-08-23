import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { RootState } from '../redux/store';
import { selectFramework } from '../redux/roadmapSlice';

const FrameworkSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { frameworks, selectedFramework } = useSelector((state: RootState) => state.roadmap);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(selectFramework(event.target.value as string));
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="framework-select-label">Select Framework</InputLabel>
      <Select
        labelId="framework-select-label"
        id="framework-select"
        value={selectedFramework || ''}
        onChange={handleChange}
        label="Select Framework"
      >
        {frameworks.map((framework) => (
          <MenuItem key={framework.id} value={framework.id}>
            {framework.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FrameworkSelector;
