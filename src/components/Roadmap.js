import React, { useState, useEffect } from 'react';
import { Gantt } from '@dhtmlx/trial-react-gantt'; // or use any other Gantt chart library
import '@dhtmlx/trial-react-gantt/dist/index.css';

function Roadmap() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        // Process the data to fit the Gantt chart structure
        const formattedTasks = data.map((task, index) => ({
          id: index + 1,
          text: task.name,
          start_date: task.startDate || '',
          duration: task.dueDate ? calculateDuration(task.startDate, task.dueDate) : 0,
          progress: task.status === 'Completed' ? 1 : 0,
          open: true
        }));
        setTasks(formattedTasks);
      });
  }, []);

  const calculateDuration = (startDate, dueDate) => {
    const start = new Date(startDate);
    const end = new Date(dueDate);
    return (end - start) / (1000 * 60 * 60 * 24); // Duration in days
  };

  return (
    <div>
      <Gantt tasks={{ data: tasks }} />
    </div>
  );
}

export default Roadmap;
