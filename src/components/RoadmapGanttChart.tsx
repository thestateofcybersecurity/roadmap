import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RootState } from '../redux/store';
import { Typography, Box } from '@mui/material';
import { Task, VCISOTask } from '../types';

const RoadmapGanttChart: React.FC = () => {
  const { frameworks, selectedFramework, vcisoTasks } = useSelector((state: RootState) => state.roadmap);

  const selectedTasks = selectedFramework
    ? frameworks.find(f => f.id === selectedFramework)?.tasks || []
    : [];

  const tasks = selectedFramework ? selectedTasks : vcisoTasks;

  const data = tasks.map(task => {
    const isVCISOTask = 'Task' in task;
    return {
      name: isVCISOTask ? (task as VCISOTask).Task : (task as Task).name,
      start: isVCISOTask 
        ? (task as VCISOTask)['Timeline - Start'] 
          ? new Date((task as VCISOTask)['Timeline - Start']).getTime() 
          : undefined
        : (task as Task).start.getTime(),
      end: isVCISOTask
        ? (task as VCISOTask)['Timeline - End']
          ? new Date((task as VCISOTask)['Timeline - End']).getTime()
          : undefined
        : (task as Task).end.getTime(),
      status: isVCISOTask ? (task as VCISOTask).Status : (task as Task).status,
    };
  });

  if (data.length === 0) {
    return <Typography>Please select a framework or generate a vCISO roadmap to view the chart.</Typography>;
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis 
            type="number" 
            dataKey="start" 
            domain={['dataMin', 'dataMax']} 
            tickFormatter={(unixTime) => unixTime ? new Date(unixTime).toLocaleDateString() : ''}
          />
          <YAxis type="category" dataKey="name" width={150} />
          <Tooltip
            labelFormatter={(value) => value ? new Date(value).toLocaleDateString() : ''}
            formatter={(value: any) => [value ? new Date(value).toLocaleDateString() : '', 'Date']}
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
