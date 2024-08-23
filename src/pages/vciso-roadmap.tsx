import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Slider, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setVCISOTasks } from '../redux/roadmapSlice';
import { fetchVCISOTasks } from '../utils/api';
import RoadmapGanttChart from '../components/RoadmapGanttChart';
import TaskTable from '../components/TaskTable';
import { VCISOTask } from '../types';

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
  const [allTasks, setAllTasks] = useState<VCISOTask[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchVCISOTasks();
        setAllTasks(tasks);
      } catch (error) {
        console.error('Failed to fetch vCISO tasks:', error);
      }
    };
    loadTasks();
  }, []);

  const handleHoursChange = (event: Event, newValue: number | number[]) => {
    setMonthlyHours(newValue as number);
    setSelectedPackage('');
  };

  const handlePackageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPackage(event.target.value);
    setMonthlyHours(packages.find(p => p.name === event.target.value)?.avgHours || 40);
  };

  const generateRoadmap = () => {
    const selectedTasks = allTasks.filter(task => {
      if (selectedPackage) {
        return task.Package === selectedPackage;
      } else {
        const quarterHours = monthlyHours * 3; // Assuming 3 months per quarter
        const taskHours = task['Estimated vCISO HR(s)'];
        return taskHours <= quarterHours * 1.2 && taskHours >= quarterHours * 0.8; // 20% variance
      }
    });

    // Group tasks by quarter
    const groupedTasks = selectedTasks.reduce((acc, task) => {
      if (!acc[task.Quarter]) {
        acc[task.Quarter] = [];
      }
      acc[task.Quarter].push(task);
      return acc;
    }, {} as Record<string, VCISOTask[]>);

    // Sort tasks within each quarter by estimated hours
    Object.keys(groupedTasks).forEach(quarter => {
      groupedTasks[quarter].sort((a, b) => b['Estimated vCISO HR(s)'] - a['Estimated vCISO HR(s)']);
    });

    // Flatten the grouped tasks back into an array
    const sortedTasks = Object.values(groupedTasks).flat();

    dispatch(setVCISOTasks(sortedTasks));
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
