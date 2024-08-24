import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import FrameworkSelector from '../components/FrameworkSelector';
import TaskTable from '../components/TaskTable';
import { RootState } from '../redux/store';
import { selectFramework, setFrameworkData, setFilters } from '../redux/roadmapSlice';
import { loadFrameworkData, getFrameworkFilters } from '../utils/frameworkUtils';

const IndexPage: React.FC = () => {
  const dispatch = useDispatch();
  const { frameworks, selectedFramework, filters } = useSelector((state: RootState) => state.roadmap);

  useEffect(() => {
    const loadData = async () => {
      if (selectedFramework) {
        const data = await loadFrameworkData(selectedFramework);
        dispatch(setFrameworkData(data));
      }
    };
    loadData();
  }, [selectedFramework, dispatch]);

  const handleFrameworkChange = (framework: string) => {
    dispatch(selectFramework(framework));
    const newFilters = getFrameworkFilters(framework);
    dispatch(setFilters(newFilters));
  };

  const handleFilterChange = (filterType: 'riskLevels' | 'implementationGroups', value: string) => {
    const newFilters = { ...filters };
    if (newFilters[filterType].includes(value)) {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    } else {
      newFilters[filterType].push(value);
    }
    dispatch(setFilters(newFilters));
  };

  return (
    <Box>
      <Box my={4}>
        <Paper>
          <Typography variant="h4" component="h1" gutterBottom>
            Select a Framework
          </Typography>
          <FrameworkSelector
            frameworks={frameworks}
            selectedFramework={selectedFramework}
            onFrameworkChange={handleFrameworkChange}
          />
        </Paper>
      </Box>
      {selectedFramework && (
        <Box my={4}>
          <Paper>
            <Typography variant="h5" component="h2" gutterBottom>
              Filters
            </Typography>
            <FormGroup>
              <Typography variant="h6">Risk Levels</Typography>
              {filters.riskLevels.map(risk => (
                <FormControlLabel
                  key={risk}
                  control={<Checkbox checked={filters.riskLevels.includes(risk)} onChange={() => handleFilterChange('riskLevels', risk)} />}
                  label={risk}
                />
              ))}
            </FormGroup>
            <FormGroup>
              <Typography variant="h6">Implementation Groups</Typography>
              {filters.implementationGroups.map(ig => (
                <FormControlLabel
                  key={ig}
                  control={<Checkbox checked={filters.implementationGroups.includes(ig)} onChange={() => handleFilterChange('implementationGroups', ig)} />}
                  label={ig}
                />
              ))}
            </FormGroup>
          </Paper>
        </Box>
      )}
      <Box my={4}>
        <Paper>
          <Typography variant="h5" component="h2" gutterBottom>
            Framework Data
          </Typography>
          <TaskTable />
        </Paper>
      </Box>
    </Box>
  );
};

export default IndexPage;
