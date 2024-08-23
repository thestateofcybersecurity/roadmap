import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RootState } from '../redux/store';
import { Typography, Box } from '@mui/material';

const RoadmapGanttChart: React.FC = () => {
  const { frameworks, selectedFramework } = useSelector((state: RootState) => state.roadmap);

  const selectedTasks = selectedFramework
    ? frameworks.find(f => f.id === selectedFramework)?.tasks || []
    : [];

  const data = selectedTasks.map(task => ({
    name: task.name,
    start: task.start.getTime(),
    end: task.end.getTime(),
    status: task.status,
  }));

  if (data.length === 0) {
    return <Typography>Please select a framework to view the roadmap.</Typography>;
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" dataKey="start" domain={['dataMin', 'dataMax']} tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()} />
          <YAxis type="category" dataKey="name" width={150} />
          <Tooltip
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            formatter={(value: any) => [new Date(value).toLocaleDateString(), 'Date']}
          />
          <Legend />
          <Bar dataKey="start" stackId="a" fill="#8884d8" />
          <Bar dataKey="end" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RoadmapGanttChart;
