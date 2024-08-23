import React from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import { RootState } from '../redux/store';

const RoadmapGanttChart: React.FC = () => {
  const { frameworks, selectedFramework } = useSelector((state: RootState) => state.roadmap);

  const selectedTasks = selectedFramework
    ? frameworks.find(f => f.id === selectedFramework)?.tasks || []
    : [];

  const data = [
    [
      { type: 'string', label: 'Task ID' },
      { type: 'string', label: 'Task Name' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Dependencies' },
    ],
    ...selectedTasks.map(task => [
      task.id,
      task.name,
      task.start,
      task.end,
      null,
      task.status === 'Completed' ? 100 : task.status === 'In Progress' ? 50 : 0,
      null,
    ]),
  ];

  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType="Gantt"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        height: 400,
        gantt: {
          trackHeight: 30,
        },
      }}
    />
  );
};

export default RoadmapGanttChart;
