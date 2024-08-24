import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Typography, Box, Paper } from '@mui/material';
import { VCISOTask } from '../types';

const RoadmapGanttChart: React.FC = () => {
  const { vcisoTasks } = useSelector((state: RootState) => state.roadmap);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const cellWidth = 30;
  const cellHeight = 30;
  const sidebarWidth = 200;
  const headerHeight = 60;

  const startDate = new Date('2024-08-01');
  const endDate = new Date('2024-12-31');
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const header = headerRef.current;
    const sidebar = sidebarRef.current;

    if (scrollContainer && header && sidebar) {
      const handleScroll = () => {
        header.style.transform = `translateX(-${scrollContainer.scrollLeft}px)`;
        sidebar.style.transform = `translateY(-${scrollContainer.scrollTop}px)`;
      };

      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const renderHeader = () => {
    const months = [];
    const days = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (currentDate.getDate() === 1 || currentDate.getTime() === startDate.getTime()) {
        months.push(
          <div key={`month-${currentDate.getTime()}`} style={{
            position: 'absolute',
            left: (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) * cellWidth,
            width: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() * cellWidth,
            height: cellHeight,
            borderRight: '1px solid #ccc',
            borderBottom: '1px solid #ccc',
            textAlign: 'center',
          }}>
            {currentDate.toLocaleString('default', { month: 'short' })}
          </div>
        );
      }

      days.push(
        <div key={`day-${currentDate.getTime()}`} style={{
          position: 'absolute',
          left: (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) * cellWidth,
          top: cellHeight,
          width: cellWidth,
          height: cellHeight,
          borderRight: '1px solid #ccc',
          borderBottom: '1px solid #ccc',
          textAlign: 'center',
        }}>
          {currentDate.getDate()}
        </div>
      );

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return (
      <>
        {months}
        {days}
      </>
    );
  };

  const renderTasks = () => {
    return vcisoTasks.map((task, index) => {
      const taskStart = new Date(task['Timeline - Start'] || startDate);
      const taskEnd = new Date(task['Timeline - End'] || taskStart);
      const taskStartDays = Math.floor((taskStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const taskDuration = Math.floor((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      return (
        <div key={index} style={{
          position: 'absolute',
          left: taskStartDays * cellWidth,
          top: index * cellHeight,
          width: taskDuration * cellWidth,
          height: cellHeight,
          backgroundColor: '#4CAF50',
          borderRadius: 4,
        }} />
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
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: sidebarWidth,
          height: headerHeight,
          backgroundColor: '#f0f0f0',
          zIndex: 3,
          borderRight: '1px solid #ccc',
          borderBottom: '1px solid #ccc',
        }}>
          Task
        </div>
        <div
          ref={headerRef}
          style={{
            position: 'absolute',
            top: 0,
            left: sidebarWidth,
            right: 0,
            height: headerHeight,
            zIndex: 2,
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative', width: totalDays * cellWidth, height: headerHeight }}>
            {renderHeader()}
          </div>
        </div>
        <div
          ref={sidebarRef}
          style={{
            position: 'absolute',
            top: headerHeight,
            left: 0,
            width: sidebarWidth,
            bottom: 0,
            zIndex: 2,
            overflow: 'hidden',
            backgroundColor: '#f0f0f0',
            borderRight: '1px solid #ccc',
          }}
        >
          <div style={{ position: 'relative', height: vcisoTasks.length * cellHeight }}>
            {vcisoTasks.map((task, index) => (
              <div key={index} style={{
                position: 'absolute',
                top: index * cellHeight,
                left: 0,
                width: '100%',
                height: cellHeight,
                borderBottom: '1px solid #ccc',
                padding: '5px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {task.Task}
              </div>
            ))}
          </div>
        </div>
        <div
          ref={scrollContainerRef}
          style={{
            position: 'absolute',
            top: headerHeight,
            left: sidebarWidth,
            right: 0,
            bottom: 0,
            overflow: 'auto',
          }}
        >
          <div style={{
            position: 'relative',
            width: totalDays * cellWidth,
            height: vcisoTasks.length * cellHeight,
          }}>
            {renderTasks()}
          </div>
        </div>
      </Box>
    </Paper>
  );
};

export default RoadmapGanttChart;
