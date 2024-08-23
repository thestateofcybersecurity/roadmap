import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const frameworks = [
  { value: "nist", label: "NIST CSF" },
  { value: "cis", label: "CIS Controls" },
];

const initialData = [
  { id: 1, task: "Require MFA for Administrative Access", start: new Date(2024, 6, 15), end: new Date(2024, 6, 31), status: "Completed" },
  { id: 2, task: "Establish an Access Granting Process", start: new Date(2024, 8, 2), end: new Date(2024, 8, 13), status: "New" },
  // Add more tasks here...
];

const CybersecurityRoadmap = () => {
  const [selectedFramework, setSelectedFramework] = useState(frameworks[0].value);
  const [roadmapData, setRoadmapData] = useState(initialData);

  const handleFrameworkChange = (value) => {
    setSelectedFramework(value);
    // In a real app, you would fetch the corresponding data for the selected framework
  };

  const handleDataChange = (id, field, value) => {
    setRoadmapData(roadmapData.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const formatDate = (date) => date.toISOString().split('T')[0];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cybersecurity Roadmap Tool</h1>
      
      <Select onValueChange={handleFrameworkChange} defaultValue={selectedFramework}>
        <SelectTrigger className="w-[180px] mb-4">
          <SelectValue placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent>
          {frameworks.map((framework) => (
            <SelectItem key={framework.value} value={framework.value}>
              {framework.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={roadmapData} layout="vertical">
            <XAxis type="number" dataKey="start" />
            <YAxis type="category" dataKey="task" width={150} />
            <Tooltip />
            <Legend />
            <Bar dataKey="end" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roadmapData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Input 
                  value={item.task} 
                  onChange={(e) => handleDataChange(item.id, 'task', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="date"
                  value={formatDate(item.start)}
                  onChange={(e) => handleDataChange(item.id, 'start', new Date(e.target.value))}
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="date"
                  value={formatDate(item.end)}
                  onChange={(e) => handleDataChange(item.id, 'end', new Date(e.target.value))}
                />
              </TableCell>
              <TableCell>
                <Input 
                  value={item.status}
                  onChange={(e) => handleDataChange(item.id, 'status', e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CybersecurityRoadmap;
