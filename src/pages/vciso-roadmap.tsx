import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Slider, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setVCISOTasks } from '../redux/roadmapSlice';
import { fetchVCISOTasks } from '../utils/api';
import TaskTable from '../components/TaskTable';
import { VCISOTask } from '../types';

const packages = [
  { name: 'Lean', avgHours: 20 },
  { name: 'Standard', avgHours: 40 },
  { name: 'Premium', avgHours: 60 },
];

const quarters = ['Onboarding', 'First Quarter', 'Second Quarter', 'Third Quarter', 'Fourth Quarter'];

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
    let selectedTasks: VCISOTask[] = [];
    
    if (selectedPackage) {
      const packageIndex = packages.findIndex(p => p.name === selectedPackage);
      selectedTasks = allTasks.filter(task => 
        packages.findIndex(p => p.name === task.Package) <= packageIndex
      );
    } else {
      const quarterlyHours = monthlyHours * 3;
      let remainingHours = quarterlyHours;
      
      quarters.forEach(quarter => {
        const quarterTasks = allTasks
          .filter(task => task.Quarter === quarter)
          .sort((a, b) => packages.findIndex(p => p.name === a.Package) - packages.findIndex(p => p.name === b.Package));
        
        for (const task of quarterTasks) {
          if (remainingHours >= task['Estimated vCISO HR(s)']) {
            selectedTasks.push(task);
            remainingHours -= task['Estimated vCISO HR(s)'];
          } else {
            break;
          }
        }
        
        remainingHours = quarterlyHours; // Reset for the next quarter
      });
    }

    // Add start and end dates to tasks
    const tasksWithDates = selectedTasks.map(task => {
      const quarterIndex = quarters.indexOf(task.Quarter);
      const startDate = new Date(2024, quarterIndex * 3, 1);
      const endDate = new Date(2024, (quarterIndex + 1) * 3, 0);
      return {
        ...task,
        'Timeline - Start': startDate.toISOString().split('T')[0],
        'Timeline - End': endDate.toISOString().split('T')[0],
      };
    });

    dispatch(setVCISOTasks(tasksWithDates));
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
      <TaskTable />
    </Box>
  );
};

export default VCISORadmap;
