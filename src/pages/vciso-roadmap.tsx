import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Slider, 
  Button, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setVCISOTasks } from '../redux/roadmapSlice';
import { fetchVCISOTasks } from '../utils/api';
import { VCISOTask } from '../types';
import * as XLSX from 'xlsx';

const packages = [
  { name: 'Small', avgHours: 20 },
  { name: 'Medium', avgHours: 40 },
  { name: 'Large', avgHours: 60 },
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
    let selectedTasks: VCISOTask[] = [];
    
    if (selectedPackage) {
      const packageIndex = packages.findIndex(p => p.name === selectedPackage);
      selectedTasks = allTasks.filter(task => 
        packages.findIndex(p => p.name === task.Package) <= packageIndex
      );
    } else {
      const quarterlyHours = monthlyHours * 3;
      let remainingHours = quarterlyHours;
      
      ['Onboarding', 'First Quarter', 'Second Quarter', 'Third Quarter', 'Fourth Quarter'].forEach(quarter => {
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

    dispatch(setVCISOTasks(selectedTasks));
  };

  const exportToCSV = () => {
    const headers = ['Task', 'Description', 'Quarter', 'Package', 'Estimated vCISO HR(s)'];
    const csvContent = [
      headers.join(','),
      ...vcisoTasks.map(task => [
        task.Task,
        task.Description,
        task.Quarter,
        task.Package,
        task['Estimated vCISO HR(s)']
      ].map(value => `"${value}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'vCISO_Roadmap.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
        <Button variant="contained" color="primary" onClick={generateRoadmap} sx={{ mr: 2 }}>
          Generate Roadmap
        </Button>
        <Button variant="outlined" color="secondary" onClick={exportToCSV} disabled={vcisoTasks.length === 0}>
          Export to CSV
        </Button>
      </Paper>
      
      {vcisoTasks.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="roadmap table">
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quarter</TableCell>
                <TableCell>Package</TableCell>
                <TableCell>Estimated Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vcisoTasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.Task}</TableCell>
                  <TableCell>{task.Description}</TableCell>
                  <TableCell>{task.Quarter}</TableCell>
                  <TableCell>{task.Package}</TableCell>
                  <TableCell>{task['Estimated vCISO HR(s)']}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default VCISORadmap;
