import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography, Box } from '@material-ui/core';
import FrameworkSelector from './components/FrameworkSelector';
import RoadmapGanttChart from './components/RoadmapGanttChart';
import TaskTable from './components/TaskTable';
import { fetchFrameworks } from './utils/api';
import { setFrameworks } from './redux/roadmapSlice';

const App: React.FC = () => {
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
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cybersecurity Roadmap Tool
        </Typography>
        <Box my={2}>
          <FrameworkSelector />
        </Box>
        <Box my={2}>
          <RoadmapGanttChart />
        </Box>
        <Box my={2}>
          <TaskTable />
        </Box>
      </Box>
    </Container>
  );
};

export default App;
