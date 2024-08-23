import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem } from '@mui/material';
import { RootState } from '../redux/store';
import { updateTask } from '../redux/roadmapSlice';
import { Task, VCISOTask } from '../types';

const TaskTable: React.FC = () => {
  const dispatch = useDispatch();
  const { frameworks, selectedFramework, vcisoTasks } = useSelector((state: RootState) => state.roadmap);

  const selectedTasks = selectedFramework
    ? frameworks.find(f => f.id === selectedFramework)?.tasks || []
    : [];

  const tasks = selectedFramework ? selectedTasks : vcisoTasks;

  const handleTaskChange = (taskId: string, field: keyof (Task | VCISOTask), value: any) => {
    if (selectedFramework) {
      const task = selectedTasks.find(t => t.id === taskId) as Task;
      if (task) {
        const updatedTask = { ...task, [field]: value };
        dispatch(updateTask({ frameworkId: selectedFramework, task: updatedTask }));
      }
    }
    // For vCISO tasks, we might want to implement a separate update action
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
                  onChange={(e) => handleTaskChange('id' in task ? task.id : task.Task, 'Task' in task ? 'Task' : 'name', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  value={'Timeline - Start' in task ? task['Timeline - Start'] : task.start.toISOString().split('T')[0]}
                  onChange={(e) => handleTaskChange('id' in task ? task.id : task.Task, 'Timeline - Start' in task ? 'Timeline - Start' : 'start', new Date(e.target.value))}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  value={'Timeline - End' in task ? task['Timeline - End'] : task.end.toISOString().split('T')[0]}
                  onChange={(e) => handleTaskChange('id' in task ? task.id : task.Task, 'Timeline - End' in task ? 'Timeline - End' : 'end', new Date(e.target.value))}
                />
              </TableCell>
              <TableCell>
                <Select
                  value={'Status' in task ? task.Status : task.status}
                  onChange={(e) => handleTaskChange('id' in task ? task.id : task.Task, 'Status' in task ? 'Status' : 'status', e.target.value)}
                >
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
