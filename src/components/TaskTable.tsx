import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem } from '@mui/material';
import { RootState } from '../redux/store';
import { updateTask, updateVCISOTask } from '../redux/roadmapSlice';
import { Task, VCISOTask } from '../types';

const TaskTable: React.FC = () => {
  const dispatch = useDispatch();
  const { frameworks, selectedFramework, vcisoTasks } = useSelector((state: RootState) => state.roadmap);

  const selectedTasks = selectedFramework
    ? frameworks.find(f => f.id === selectedFramework)?.tasks || []
    : [];

  const tasks = selectedFramework ? selectedTasks : vcisoTasks;

  const handleTaskChange = (task: Task | VCISOTask, field: string, value: any) => {
    if ('id' in task) {
      // This is a regular Task
      const updatedTask = { ...task, [field]: value };
      dispatch(updateTask({ frameworkId: selectedFramework!, task: updatedTask }));
    } else {
      // This is a VCISOTask
      const updatedTask = { ...task, [field]: value };
      dispatch(updateVCISOTask(updatedTask));
    }
  };

  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return '';
    if (typeof date === 'string') return date.split('T')[0];
    return date.toISOString().split('T')[0];
  };

  const getStartDate = (task: Task | VCISOTask): string => {
    if ('Timeline - Start' in task) {
      return formatDate(task['Timeline - Start']);
    } else {
      return formatDate(task.start);
    }
  };

  const getEndDate = (task: Task | VCISOTask): string => {
    if ('Timeline - End' in task) {
      return formatDate(task['Timeline - End']);
    } else {
      return formatDate(task.end);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Status</TableCell>
            {!selectedFramework && <TableCell>Package</TableCell>}
            {!selectedFramework && <TableCell>Estimated Hours</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={'id' in task ? task.id : task.Task}>
              <TableCell>
                <TextField
                  fullWidth
                  value={'Task' in task ? task.Task : task.name}
                  onChange={(e) => handleTaskChange(task, 'Task' in task ? 'Task' : 'name', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  value={getStartDate(task)}
                  onChange={(e) => handleTaskChange(task, 'Timeline - Start' in task ? 'Timeline - Start' : 'start', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  value={getEndDate(task)}
                  onChange={(e) => handleTaskChange(task, 'Timeline - End' in task ? 'Timeline - End' : 'end', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Select
                  value={'Status' in task ? (task.Status || '') : task.status}
                  onChange={(e) => handleTaskChange(task, 'Status' in task ? 'Status' : 'status', e.target.value)}
                >
                  <MenuItem value="">Not Set</MenuItem>
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </TableCell>
              {!selectedFramework && (
                <>
                  <TableCell>{(task as VCISOTask).Package}</TableCell>
                  <TableCell>{(task as VCISOTask)['Estimated vCISO HR(s)']}</TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
