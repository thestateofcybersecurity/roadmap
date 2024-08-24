import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { RootState } from '../redux/store';
import { Typography, Box } from '@mui/material';
import { VCISOTask } from '../types';

const RoadmapGanttChart: React.FC = () => {
  const { vcisoTasks } = useSelector((state: RootState) => state.roadmap);

  const quarterColors = {
    'Onboarding': '#8884d8',
    'First Quarter': '#82ca9d',
    'Second Quarter': '#ffc658',
    'Third Quarter': '#ff8042',
    'Fourth Quarter': '#0088fe',
  };

  const data = vcisoTasks.map(task => ({
    name: task.Task,
    start: new Date(task['Timeline - Start'] || '').getTime(),
    end: new Date(task['Timeline - End'] || '').getTime(),
    quarter: task.Quarter,
    package: task.Package,
    hours: task['Estimated vCISO HR(s)'],
  }));

  if (data.length === 0) {
    return <Typography>Please generate a vCISO roadmap to view the chart.</Typography>;
  }

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 200, bottom: 5 }}
        >
          <XAxis 
            type="number" 
            dataKey="start" 
            domain={['dataMin', 'dataMax']} 
            tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={180}
          />
          <Tooltip
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            formatter={(value: any, name: string, props: any) => {
              if (name === 'start' || name === 'end') {
                return [new Date(value).toLocaleDateString(), name];
              }
              return [value, name];
            }}
          />
          <Legend />
          <Bar dataKey="start" stackId="a" fill="#8884d8" name="Start Date">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={quarterColors[entry.quarter as keyof typeof quarterColors]} />
            ))}
          </Bar>
          <Bar dataKey="end" stackId="a" fill="#82ca9d" name="End Date">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={quarterColors[entry.quarter as keyof typeof quarterColors]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RoadmapGanttChart;
