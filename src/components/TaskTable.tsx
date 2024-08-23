import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem } from '@mui/material';
import { RootState } from '../redux/store';
import { updateTask } from '../redux/roadmapSlice';
import { Task } from '../types';

const TaskTable: React.FC = () => {
  const dispatch = useDispatch();
  const { frameworks, selectedFramework } = useSelector((state: RootState) => state.roadmap);

  const selectedTasks = selectedFramework
    ? frameworks.find(f => f.id === selectedFramework)?.tasks || []
    : [];

  const handleTaskChange = (taskId: string, field: keyof Task, value: any) => {
    const task = selectedTasks.find(t => t.id === taskId);
    if (task && selectedFramework) {
      const updatedTask = { ...task, [field]: value };
      dispatch(updateTask({ frameworkId: selectedFramework, task: updatedTask }));
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
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <TextField
                  fullWidth
                  value={task.name}
                  onChange={(e) => handleTaskChange(task.id, 'name', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  value={task.start.toISOString().split('T')[0]}
                  onChange={(e) => handleTaskChange(task.id, 'start', new Date(e.target.value))}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  value={task.end.toISOString().split('T')[0]}
                  onChange={(e) => handleTaskChange(task.id, 'end', new Date(e.target.value))}
                />
              </TableCell>
              <TableCell>
                <Select
                  value={task.status}
                  onChange={(e) => handleTaskChange(task.id, 'status', e.target.value)}
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
