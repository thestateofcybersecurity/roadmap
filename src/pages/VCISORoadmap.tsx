import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Slider, Select, MenuItem, Button } from '@mui/material';

const packages = {
    basic: { label: "Basic", hours: 20 },
    standard: { label: "Standard", hours: 40 },
    premium: { label: "Premium", hours: 60 },
};

const VCISORoadmap = ({ roadmapData }) => {
    const [selectedHours, setSelectedHours] = useState(40);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        filterTasks();
    }, [selectedHours, selectedPackage]);

    const filterTasks = () => {
        let tasks;
        if (selectedPackage) {
            const packageHours = packages[selectedPackage].hours;
            tasks = roadmapData.filter(task => task.package === selectedPackage);
            setSelectedHours(packageHours);
        } else {
            const minHours = selectedHours * 0.8;
            const maxHours = selectedHours * 1.2;
            tasks = roadmapData.filter(task => {
                const totalHours = task.hours.reduce((acc, hour) => acc + hour, 0);
                return totalHours >= minHours && totalHours <= maxHours;
            });
        }
        setFilteredTasks(tasks);
    };

    return (
        <Box>
            <Paper>
                <Typography variant="h4" gutterBottom>Select Your vCISO Roadmap</Typography>
                <Typography>Select Monthly Hours:</Typography>
                <Slider
                    value={selectedHours}
                    onChange={(e, value) => setSelectedHours(value)}
                    min={20}
                    max={80}
                    step={5}
                    valueLabelDisplay="auto"
                />
                <Typography>Or Select a Package:</Typography>
                <Select
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="">None</MenuItem>
                    {Object.keys(packages).map(key => (
                        <MenuItem key={key} value={key}>
                            {packages[key].label} - {packages[key].hours} hours/month
                        </MenuItem>
                    ))}
                </Select>
                <Button variant="contained" onClick={filterTasks}>Generate Roadmap</Button>
            </Paper>
            <Box mt={4}>
                <Typography variant="h5">Selected Tasks</Typography>
                {filteredTasks.map((task, index) => (
                    <Paper key={index} style={{ marginBottom: '16px', padding: '16px' }}>
                        <Typography>{task.task}</Typography>
                        <Typography>Quarter: {task.quarter}</Typography>
                        <Typography>Estimated Hours: {task.hours}</Typography>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
};

export default VCISORoadmap;
