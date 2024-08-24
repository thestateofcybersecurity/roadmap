import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { RootState } from '../redux/store';
import { CISControl } from '../types';

const TaskTable: React.FC = () => {
  const { selectedFramework, frameworkData, filters } = useSelector((state: RootState) => state.roadmap);

  const filteredData = frameworkData.filter((item: CISControl) => 
    filters.riskLevels.includes(item.RISK) &&
    filters.implementationGroups.some(ig => item[ig as keyof CISControl] !== NaN && item[ig as keyof CISControl] !== '')
  );

  if (!selectedFramework || filteredData.length === 0) {
    return <Typography>No data to display. Please select a framework and apply filters.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Risk</TableCell>
            <TableCell>Implementation Groups</TableCell>
            <TableCell>CIS Control</TableCell>
            <TableCell>CIS Sub-Control</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((item: CISControl, index) => (
            <TableRow key={index}>
              <TableCell>{item.Title}</TableCell>
              <TableCell>{item.RISK}</TableCell>
              <TableCell>
                {['IG1', 'IG2', 'IG3']
                  .filter(ig => item[ig as keyof CISControl] !== NaN && item[ig as keyof CISControl] !== '')
                  .join(', ')}
              </TableCell>
              <TableCell>{item['CIS Control']}</TableCell>
              <TableCell>{item['CIS Sub-Control']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
