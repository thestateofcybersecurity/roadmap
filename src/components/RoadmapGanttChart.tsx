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

  const isVCISOTask = (task: Task | VCISOTask): task is VCISOTask => {
    return 'Task' in task;
  };

  const data = tasks.map(task => {
    if (isVCISOTask(task)) {
      return {
        name: task.Task,
        start: task['Timeline - Start'] ? new Date(task['Timeline - Start']).getTime() : undefined,
        end: task['Timeline - End'] ? new Date(task['Timeline - End']).getTime() : undefined,
        status: task.Status,
      };
    } else {
      return {
        name: task.name,
        start: task.start.getTime(),
        end: task.end.getTime(),
        status: task.status,
      };
    }
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
