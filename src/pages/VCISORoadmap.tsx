import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Slider, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setVCISOTasks } from '../redux/roadmapSlice';
import RoadmapGanttChart from '../components/RoadmapGanttChart';
import TaskTable from '../components/TaskTable';

const packages = [
  { name: 'Lean', avgHours: 20 },
  { name: 'Standard', avgHours: 40 },
  { name: 'Premium', avgHours: 60 },
];

const VCISORadmap: React.FC = () => {
  const dispatch = useDispatch();
  const { vcisoTasks } = useSelector((state: RootState) => state.roadmap);
  const [monthlyHours, setMonthlyHours] = useState<number>(40);
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  useEffect(() => {
    // Fetch vCISO tasks from API or load from state
    // This is a placeholder and should be replaced with actual data fetching
    const fetchTasks = async () => {
      // const tasks = await fetchVCISOTasks();
      // dispatch(setVCISOTasks(tasks));
    };
    fetchTasks();
  }, [dispatch]);

  const handleHoursChange = (event: Event, newValue: number | number[]) => {
    setMonthlyHours(newValue as number);
    setSelectedPackage('');
  };

  const handlePackageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPackage(event.target.value);
    setMonthlyHours(packages.find(p => p.name === event.target.value)?.avgHours || 40);
  };

  const generateRoadmap = () => {
    // Logic to generate roadmap based on monthlyHours or selectedPackage
    // This is a placeholder and should be replaced with actual logic
    const selectedTasks = vcisoTasks.filter(task => {
      if (selectedPackage) {
        return task.Package === selectedPackage;
      } else {
        // Implement logic to select tasks based on monthlyHours
        // This is a simplified example
        return task['Estimated vCISO HR(s)'] <= monthlyHours * 3; // Assuming 3 months per quarter
      }
    });

    dispatch(setVCISOTasks(selectedTasks));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>vCISO Roadmap</Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Customize Your Roadmap</Typography>
        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom>Select monthly hours:</Typography>
          <Slider
            value={monthlyHours}
            onChange={handleHoursChange}
            aria-labelledby="monthly-hours-slider"
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={100}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom>Or choose a package:</Typography>
          <RadioGroup
            aria-label="package"
            name="package"
            value={selectedPackage}
            onChange={handlePackageChange}
          >
            {packages.map((pkg) => (
              <FormControlLabel 
                key={pkg.name} 
                value={pkg.name} 
                control={<Radio />} 
                label={`${pkg.name} (Avg. ${pkg.avgHours} hours/month)`} 
              />
            ))}
          </RadioGroup>
        </Box>
        <Button variant="contained" color="primary" onClick={generateRoadmap}>
          Generate Roadmap
        </Button>
      </Paper>
      <RoadmapGanttChart />
      <TaskTable />
    </Box>
  );
};

export default VCISORadmap;
