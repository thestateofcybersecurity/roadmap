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
      <Box my={4}>
        {/* Additional content can go here */}
      </Box>
    </Box>
  );
};

export default IndexPage;
