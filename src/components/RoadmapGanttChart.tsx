import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Typography, Box, Paper } from '@mui/material';
import { VCISOTask } from '../types';

const RoadmapGanttChart: React.FC = () => {
  const { vcisoTasks } = useSelector((state: RootState) => state.roadmap);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const taskHeight = 30;
  const dayWidth = 20;
  const leftColumnWidth = 300;

  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const quarterColors = {
    'Onboarding': '#8884d8',
    'First Quarter': '#82ca9d',
    'Second Quarter': '#ffc658',
    'Third Quarter': '#ff8042',
    'Fourth Quarter': '#0088fe',
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const renderTimelineHeader = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
      months.push(
        <div key={i} style={{ position: 'absolute', left: i * dayWidth * 30, width: dayWidth * 30, borderLeft: '1px solid #ccc', paddingLeft: 5 }}>
          {monthDate.toLocaleString('default', { month: 'short' })}
        </div>
      );
    }
    return months;
  };

  const renderTasks = () => {
    return vcisoTasks.map((task, index) => {
      const taskStart = new Date(task['Timeline - Start'] || startDate);
      const taskEnd = new Date(task['Timeline - End'] || endDate);
      const taskStartDays = Math.floor((taskStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const taskDuration = Math.floor((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24));

      return (
        <div key={index} style={{ position: 'absolute', top: index * taskHeight, left: 0, right: 0, height: taskHeight, display: 'flex', alignItems: 'center' }}>
          <div style={{ width: leftColumnWidth, paddingRight: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {task.Task}
          </div>
          <div style={{
            position: 'absolute',
            left: leftColumnWidth + taskStartDays * dayWidth,
            width: taskDuration * dayWidth,
            height: taskHeight - 4,
            backgroundColor: quarterColors[task.Quarter as keyof typeof quarterColors] || '#ccc',
            borderRadius: 4,
          }} />
        </div>
      );
    });
  };

  if (vcisoTasks.length === 0) {
    return <Typography>Please generate a vCISO roadmap to view the chart.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3, overflow: 'hidden' }}>
      <Typography variant="h6" gutterBottom>Roadmap Gantt Chart</Typography>
      <Box sx={{ position: 'relative', height: 500, overflow: 'hidden' }}>
        <div style={{ position: 'sticky', top: 0, left: 0, width: leftColumnWidth, height: 30, backgroundColor: '#f0f0f0', zIndex: 2 }}>
          Task Name
        </div>
        <div
          ref={scrollContainerRef}
          style={{
            position: 'absolute',
            top: 30,
            left: 0,
            right: 0,
            bottom: 0,
            overflowX: 'auto',
            overflowY: 'auto',
          }}
        >
          <div style={{ position: 'relative', width: leftColumnWidth + totalDays * dayWidth, height: vcisoTasks.length * taskHeight }}>
            <div style={{ position: 'sticky', top: 0, left: leftColumnWidth, height: 30, zIndex: 1 }}>
              {renderTimelineHeader()}
            </div>
            {renderTasks()}
          </div>
        </div>
      </Box>
    </Paper>
  );
};

export default RoadmapGanttChart;
