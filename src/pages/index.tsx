import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Box, Paper } from '@mui/material';
import FrameworkSelector from '../components/FrameworkSelector';
import RoadmapGanttChart from '../components/RoadmapGanttChart';
import TaskTable from '../components/TaskTable';
import { fetchFrameworks } from '../utils/api';
import { setFrameworks } from '../redux/roadmapSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFrameworks = async () => {
      try {
        const frameworks = await fetchFrameworks();
        dispatch(setFrameworks(frameworks));
      } catch (error) {
        console.error('Failed to fetch frameworks:', error);
      }
    };

    loadFrameworks();
  }, [dispatch]);

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Build Your Cybersecurity Roadmap
      </Typography>
      <Box my={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: 'white' }}>
          <Typography variant="h6" gutterBottom>
            Select a Framework
          </Typography>
          <FrameworkSelector />
        </Paper>
      </Box>
      <Box my={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: 'white' }}>
          <Typography variant="h6" gutterBottom>
            Roadmap Timeline
          </Typography>
          <RoadmapGanttChart />
        </Paper>
      </Box>
      <Box my={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: 'white' }}>
          <Typography variant="h6" gutterBottom>
            Tasks
          </Typography>
          <TaskTable />
        </Paper>
      </Box>
    </>
  );
};

export default Home;
