import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import FrameworkSelector from '../components/FrameworkSelector';

const frameworks = ['NIST CSF', 'CIS', 'ISO 27001']; // Example frameworks

const roadmapData = {
  'CIS': [
    { task: 'Account Management', start: '', end: '', assignee: 'Parker Brissette', status: 'New', risk: '', subControl: '' },
    { task: 'Require MFA for Administrative Access', start: '2024-07-15', end: '2024-07-31', assignee: '', status: 'Completed', risk: 'High', subControl: '6.05' },
    { task: 'Establish an Access Granting Process', start: '2024-09-02', end: '2024-09-13', assignee: '', status: 'New', risk: 'Medium', subControl: '6.01' },
    { task: 'Establish an Access Revoking Process', start: '2024-09-02', end: '2024-09-13', assignee: '', status: 'New', risk: 'Medium', subControl: '6.02' },
    { task: 'Establish and Maintain an Inventory of Accounts', start: '2024-09-02', end: '2024-09-16', assignee: '', status: 'New', risk: 'Medium', subControl: '5.01' },
    { task: 'Ensure All Accounts Have Passwords', start: '2024-09-17', end: '2024-09-30', assignee: '', status: 'New', risk: 'Medium', subControl: '5.02' },
    { task: 'Enable Password Managers', start: '2024-10-01', end: '2024-10-15', assignee: '', status: 'New', risk: 'Medium', subControl: '5.03' },
    { task: 'Enforce Password Complexity Requirements', start: '2024-10-16', end: '2024-10-31', assignee: '', status: 'New', risk: 'Medium', subControl: '5.04' },
    { task: 'Implement Multi-Factor Authentication', start: '2024-11-01', end: '2024-11-15', assignee: '', status: 'New', risk: 'High', subControl: '6.06' },
    { task: 'Monitor Account Access', start: '2024-11-16', end: '2024-11-30', assignee: '', status: 'New', risk: 'High', subControl: '6.07' },
    { task: 'Establish and Maintain an Inventory of Authorized Devices', start: '2024-12-01', end: '2024-12-15', assignee: '', status: 'New', risk: 'Medium', subControl: '1.01' },
    { task: 'Ensure Only Authorized Devices Can Access the Network', start: '2024-12-16', end: '2024-12-31', assignee: '', status: 'New', risk: 'High', subControl: '1.02' },
    { task: 'Establish and Maintain an Inventory of Authorized Software', start: '2025-01-01', end: '2025-01-15', assignee: '', status: 'New', risk: 'Medium', subControl: '2.01' },
    { task: 'Ensure Only Authorized Software Is Installed and Can Execute', start: '2025-01-16', end: '2025-01-31', assignee: '', status: 'New', risk: 'High', subControl: '2.02' },
    { task: 'Monitor and Block Unauthorized Software', start: '2025-02-01', end: '2025-02-15', assignee: '', status: 'New', risk: 'High', subControl: '2.03' },
    { task: 'Securely Configure All End-User Devices', start: '2025-02-16', end: '2025-02-28', assignee: '', status: 'New', risk: 'Medium', subControl: '4.01' },
    { task: 'Securely Configure All Network Devices', start: '2025-03-01', end: '2025-03-15', assignee: '', status: 'New', risk: 'Medium', subControl: '4.02' },
    { task: 'Ensure Security Configurations Are Maintained', start: '2025-03-16', end: '2025-03-31', assignee: '', status: 'New', risk: 'Medium', subControl: '4.03' },
    { task: 'Continuously Assess Security Configuration', start: '2025-04-01', end: '2025-04-15', assignee: '', status: 'New', risk: 'Medium', subControl: '4.04' },
    { task: 'Secure All Administrative Accounts', start: '2025-04-16', end: '2025-04-30', assignee: '', status: 'New', risk: 'High', subControl: '6.08' },
    { task: 'Manage and Track User Accounts', start: '2025-05-01', end: '2025-05-15', assignee: '', status: 'New', risk: 'Medium', subControl: '6.09' },
    { task: 'Establish and Enforce an Access Control Policy', start: '2025-05-16', end: '2025-05-31', assignee: '', status: 'New', risk: 'High', subControl: '6.10' },
    { task: 'Ensure Security of End-User Devices', start: '2025-06-01', end: '2025-06-15', assignee: '', status: 'New', risk: 'Medium', subControl: '5.05' },
    { task: 'Securely Configure Mobile Devices', start: '2025-06-16', end: '2025-06-30', assignee: '', status: 'New', risk: 'Medium', subControl: '5.06' },
    { task: 'Establish a Secure Network Perimeter', start: '2025-07-01', end: '2025-07-15', assignee: '', status: 'New', risk: 'High', subControl: '3.01' },
    { task: 'Monitor and Control Network Ports', start: '2025-07-16', end: '2025-07-31', assignee: '', status: 'New', risk: 'High', subControl: '3.02' },
    { task: 'Implement Web Content Filtering', start: '2025-08-01', end: '2025-08-15', assignee: '', status: 'New', risk: 'Medium', subControl: '3.03' },
    { task: 'Ensure Encryption of Sensitive Data', start: '2025-08-16', end: '2025-08-31', assignee: '', status: 'New', risk: 'High', subControl: '14.01' },
    { task: 'Implement a Data Loss Prevention Strategy', start: '2025-09-01', end: '2025-09-15', assignee: '', status: 'New', risk: 'High', subControl: '14.02' },
    { task: 'Ensure the Security of Wireless Access', start: '2025-09-16', end: '2025-09-30', assignee: '', status: 'New', risk: 'High', subControl: '13.01' },
    { task: 'Manage Removable Media', start: '2025-10-01', end: '2025-10-15', assignee: '', status: 'New', risk: 'Medium', subControl: '13.02' },
    { task: 'Ensure Secure Disposal of Data and Devices', start: '2025-10-16', end: '2025-10-31', assignee: '', status: 'New', risk: 'Medium', subControl: '13.03' },
    { task: 'Conduct Regular Vulnerability Assessments', start: '2025-11-01', end: '2025-11-15', assignee: '', status: 'New', risk: 'High', subControl: '7.01' },
    { task: 'Remediate Identified Vulnerabilities', start: '2025-11-16', end: '2025-11-30', assignee: '', status: 'New', risk: 'High', subControl: '7.02' },
    { task: 'Implement Continuous Vulnerability Monitoring', start: '2025-12-01', end: '2025-12-15', assignee: '', status: 'New', risk: 'High', subControl: '7.03' },
    { task: 'Establish a Security Awareness Program', start: '2025-12-16', end: '2025-12-31', assignee: '', status: 'New', risk: 'Medium', subControl: '17.01' },
    { task: 'Conduct Regular Phishing Simulations', start: '2026-01-01', end: '2026-01-15', assignee: '', status: 'New', risk: 'Medium', subControl: '17.02' },
    { task: 'Implement Security Awareness Training', start: '2026-01-16', end: '2026-01-31', assignee: '', status: 'New', risk: 'Medium', subControl: '17.03' },
    { task: 'Conduct Regular Penetration Testing', start: '2026-02-01', end: '2026-02-15', assignee: '', status: 'New', risk: 'High', subControl: '18.01' },
    { task: 'Remediate Penetration Testing Findings', start: '2026-02-16', end: '2026-02-29', assignee: '', status: 'New', risk: 'High', subControl: '18.02' },
    { task: 'Monitor External Service Providers', start: '2026-03-01', end: '2026-03-15', assignee: '', status: 'New', risk: 'High', subControl: '19.01' },
    { task: 'Establish and Maintain a Security Incident Response Plan', start: '2026-03-16', end: '2026-03-31', assignee: '', status: 'New', risk: 'High', subControl: '19.02' },
    { task: 'Conduct Regular Incident Response Exercises', start: '2026-04-01', end: '2026-04-15', assignee: '', status: 'New', risk: 'High', subControl: '19.03' },
    { task: 'Ensure Secure Software Development Practices', start: '2026-04-16', end: '2026-04-30', assignee: '', status: 'New', risk: 'High', subControl: '20.01' },
    { task: 'Conduct Regular Code Reviews', start: '2026-05-01', end: '2026-05-15', assignee: '', status: 'New', risk: 'High', subControl: '20.02' },
    { task: 'Ensure Security in the Software Supply Chain', start: '2026-05-16', end: '2026-05-31', assignee: '', status: 'New', risk: 'High', subControl: '20.03' },
    { task: 'Ensure Secure Cloud Configurations', start: '2026-06-01', end: '2026-06-15', assignee: '', status: 'New', risk: 'High', subControl: '20.04' },
    { task: 'Monitor and Respond to Emerging Threats', start: '2026-06-16', end: '2026-06-30', assignee: '', status: 'New', risk: 'High', subControl: '21.01' },
    { task: 'Establish and Enforce Data Protection Policies', start: '2026-07-01', end: '2026-07-15', assignee: '', status: 'New', risk: 'High', subControl: '21.02' },
    { task: 'Implement Security Analytics and Automation', start: '2026-07-16', end: '2026-07-31', assignee: '', status: 'New', risk: 'High', subControl: '22.01' },
    { task: 'Establish a Zero Trust Architecture', start: '2026-08-01', end: '2026-08-15', assignee: '', status: 'New', risk: 'High', subControl: '23.01' },
    { task: 'Ensure Compliance with Regulatory Requirements', start: '2026-08-16', end: '2026-08-31', assignee: '', status: 'New', risk: 'High', subControl: '24.01' },
    { task: 'Conduct Regular Audits and Assessments', start: '2026-09-01', end: '2026-09-15', assignee: '', status: 'New', risk: 'High', subControl: '24.02' },
    { task: 'Implement Security Metrics and Reporting', start: '2026-09-16', end: '2026-09-30', assignee: '', status: 'New', risk: 'Medium', subControl: '25.01' },
    { task: 'Review and Update Security Policies Regularly', start: '2026-10-01', end: '2026-10-15', assignee: '', status: 'New', risk: 'Medium', subControl: '25.02' },
    { task: 'Conduct Regular Third-Party Risk Assessments', start: '2026-10-16', end: '2026-10-31', assignee: '', status: 'New', risk: 'High', subControl: '26.01' },
    { task: 'Monitor and Enforce Third-Party Security Compliance', start: '2026-11-01', end: '2026-11-15', assignee: '', status: 'New', risk: 'High', subControl: '26.02' },
    { task: 'Establish and Maintain an Insider Threat Program', start: '2026-11-16', end: '2026-11-30', assignee: '', status: 'New', risk: 'High', subControl: '27.01' },
    { task: 'Implement Secure Communication Channels', start: '2026-12-01', end: '2026-12-15', assignee: '', status: 'New', risk: 'High', subControl: '27.02' },
    { task: 'Ensure the Security of Critical Infrastructure', start: '2026-12-16', end: '2026-12-31', assignee: '', status: 'New', risk: 'High', subControl: '28.01' },
    { task: 'Conduct Regular Business Continuity Planning', start: '2027-01-01', end: '2027-01-15', assignee: '', status: 'New', risk: 'High', subControl: '29.01' },
    { task: 'Implement and Test Disaster Recovery Plans', start: '2027-01-16', end: '2027-01-31', assignee: '', status: 'New', risk: 'High', subControl: '29.02' },
    { task: 'Establish and Maintain a Cybersecurity Workforce Program', start: '2027-02-01', end: '2027-02-15', assignee: '', status: 'New', risk: 'Medium', subControl: '30.01' },
    { task: 'Ensure Continuous Security Education and Training', start: '2027-02-16', end: '2027-02-28', assignee: '', status: 'New', risk: 'Medium', subControl: '30.02' },
  ]
};
    
const IndexPage: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  const handleFrameworkChange = (framework: string) => {
    setSelectedFramework(framework);
  };

  return (
    <Box>
      <Box my={4}>
        <Paper>
          <Typography variant="h4" component="h1" gutterBottom>
            Select a Framework
          </Typography>
          <FrameworkSelector
            frameworks={frameworks}
            selectedFramework={selectedFramework}
            onFrameworkChange={handleFrameworkChange}
          />
        </Paper>
      </Box>
      <Box my={4}>
        {selectedFramework && (
          <Paper>
            <Typography variant="h5" component="h2" gutterBottom>
              {selectedFramework} Roadmap
            </Typography>
            <ul>
              {roadmapData[selectedFramework].map((task, index) => (
                <li key={index}>
                  {task.task}: Start Date: {task.start || 'N/A'}, End Date: {task.end || 'N/A'}, Assignee: {task.assignee || 'N/A'}, Status: {task.status}, Risk: {task.risk || 'N/A'}, Sub-control: {task.subControl || 'N/A'}
                </li>
              ))}
            </ul>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default IndexPage;
