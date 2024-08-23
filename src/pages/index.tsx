import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import FrameworkSelector from '../components/FrameworkSelector';

const frameworks = ['NIST CSF', 'CIS', 'ISO 27001']; // Example frameworks

const IndexPage: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  const handleFrameworkChange = (framework: string) => {
    setSelectedFramework(framework);
    // Add any additional logic needed when the framework is selected
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Build Your Cybersecurity Roadmap
      </Typography>
      <Box my={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: 'white', borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Select a Framework
          </Typography>
          <FrameworkSelector />
        </Paper>
      </Box>
      <Box my={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: 'white', borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Roadmap Timeline
          </Typography>
          <RoadmapGanttChart />
        </Paper>
      </Box>
      <Box my={4}>
        <Paper elevation={0} sx={{ p: 3, backgroundColor: 'white', borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Tasks
          </Typography>
          <TaskTable />
        </Paper>
      </Box>
    </>
  );
};

export default IndexPage;
