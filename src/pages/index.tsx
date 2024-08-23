import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import FrameworkSelector from '../components/FrameworkSelector';

type RoadmapTask = {
  task: string;
  start: string;
  end: string;
  assignee: string;
  status: string;
  risk: string;
  subControl: number;
};

type RoadmapData = {
  [key: string]: RoadmapTask[];
};

const frameworks = ['CIS'];

const roadmapData: RoadmapData = {
  'CIS': [
    {
        "subControl":  6.05,
        "risk":  "High",
        "assignee":  "",
        "start":  "2024-07-15",
        "end":  "2024-07-31",
        "status":  "Completed",
        "task":  "Require MFA for Administrative Access"
    },
    {
        "subControl":  6.01,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-09-02",
        "end":  "2024-09-13",
        "status":  "New",
        "task":  "Establish an Access Granting Process"
    },
    {
        "subControl":  6.02,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-09-02",
        "end":  "2024-09-13",
        "status":  "New",
        "task":  "Establish an Access Revoking Process"
    },
    {
        "subControl":  5.01,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-09-02",
        "end":  "2024-09-16",
        "status":  "New",
        "task":  "Establish and Maintain an Inventory of Accounts"
    },
    {
        "subControl":  4.07,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-10-01",
        "end":  "2024-10-18",
        "status":  "New",
        "task":  "Manage Default Accounts on Enterprise Assets and Software"
    },
    {
        "subControl":  6.03,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-10-21",
        "end":  "2024-11-01",
        "status":  "New",
        "task":  "Require MFA for Externally-Exposed Applications"
    },
    {
        "subControl":  6.04,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-10-21",
        "end":  "2024-11-01",
        "status":  "New",
        "task":  "Require MFA for Remote Network Access"
    },
    {
        "subControl":  5.04,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-10-21",
        "end":  "2024-11-01",
        "status":  "New",
        "task":  "Restrict Administrator Privileges to Dedicated Administrator Accounts"
    },
    {
        "subControl":  5.02,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-10-21",
        "end":  "2024-11-01",
        "status":  "New",
        "task":  "Use Unique Passwords"
    },
    {
        "subControl":  5.03,
        "risk":  "Low",
        "assignee":  "",
        "start":  "2024-11-01",
        "end":  "2024-11-01",
        "status":  "New",
        "task":  "Disable Dormant Accounts"
    },
    {
        "subControl":  6.07,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Centralize Access Control"
    },
    {
        "subControl":  5.06,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Centralize Account Management"
    },
    {
        "subControl":  12.05,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Centralize Network Authentication, Authorization, and Auditing (AAA)"
    },
    {
        "subControl":  6.08,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Define and Maintain Role-Based Access Control"
    },
    {
        "subControl":  6.06,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Establish and Maintain an Inventory of Authentication and Authorization Systems"
    },
    {
        "subControl":  5.05,
        "risk":  "High",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Establish and Maintain an Inventory of Service Accounts"
    },
    {
        "subControl":  12.08,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Establish and Maintain Dedicated Computing Resources for All Administrative Work"
    },
    {
        "subControl":  13.05,
        "risk":  "High",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Manage Access Control for Remote Assets"
    },
    {
        "subControl":  2.03,
        "risk":  "High",
        "assignee":  "",
        "start":  "2024-07-01",
        "end":  "2024-07-15",
        "status":  "In Progress",
        "task":  "Address Unauthorized Software"
    },
    {
        "subControl":  9.01,
        "risk":  "High",
        "assignee":  "",
        "start":  "2024-07-01",
        "end":  "2024-07-15",
        "status":  "In Progress",
        "task":  "Ensure Use of Only Fully Supported Browsers and Email Clients"
    },
    {
        "subControl":  1.02,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-08-01",
        "end":  "2024-08-30",
        "status":  "In Progress",
        "task":  "Address Unauthorized Assets"
    },
    {
        "subControl":  2.02,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-08-01",
        "end":  "2024-08-30",
        "status":  "In Progress",
        "task":  "Ensure Authorized Software is Currently Supported"
    },
    {
        "subControl":  2.01,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-09-02",
        "end":  "2024-09-16",
        "status":  "New",
        "task":  "Establish and Maintain a Software Inventory"
    },
    {
        "subControl":  1.01,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-09-02",
        "end":  "2024-09-16",
        "status":  "New",
        "task":  "Establish and Maintain Detailed Asset Inventory"
    },
    {
        "subControl":  4.06,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-10-21",
        "end":  "2024-11-01",
        "status":  "New",
        "task":  "Securely Manage Enterprise Assets and Software"
    },
    {
        "subControl":  9.02,
        "risk":  "Low",
        "assignee":  "",
        "start":  "2024-12-02",
        "end":  "2024-12-16",
        "status":  "New",
        "task":  "Use DNS Filtering Services"
    },
    {
        "subControl":  2.06,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Allowlist Authorized Libraries"
    },
    {
        "subControl":  2.07,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Allowlist Authorized Scripts"
    },
    {
        "subControl":  2.05,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Allowlist Authorized Software"
    },
    {
        "subControl":  9.06,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Block Unnecessary File Types"
    },
    {
        "subControl":  4.09,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Configure Trusted DNS Servers on Enterprise Assets"
    },
    {
        "subControl":  12.02,
        "risk":  "High",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Establish and Maintain a Secure Network Architecture"
    },
    {
        "subControl":  12.04,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Establish and Maintain Architecture Diagram(s)"
    },
    {
        "subControl":  9.03,
        "risk":  "High",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Maintain and Enforce Network-Based URL Filters"
    },
    {
        "subControl":  9.04,
        "risk":  "High",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Restrict Unnecessary or Unauthorized Browser and Email Client Extensions"
    },
    {
        "subControl":  4.08,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Uninstall or Disable Unnecessary Services on Enterprise Assets and Software"
    },
    {
        "subControl":  1.05,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Use a Passive Asset Discovery Tool"
    },
    {
        "subControl":  1.04,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Use Dynamic Host Configuration Protocol (DHCP) Logging to Update Enterprise Asset Inventory"
    },
    {
        "subControl":  1.03,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Utilize an Active Discovery Tool"
    },
    {
        "subControl":  2.04,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Utilize Automated Software Inventory Tools"
    },
    {
        "subControl":  3.04,
        "risk":  "High",
        "assignee":  "",
        "start":  "2024-07-15",
        "end":  "2024-08-09",
        "status":  "In Progress",
        "task":  "Enforce Data Retention"
    },
    {
        "subControl":  3.05,
        "risk":  "High",
        "assignee":  "",
        "start":  "2024-07-15",
        "end":  "2024-08-09",
        "status":  "In Progress",
        "task":  "Securely Dispose of Data"
    },
    {
        "subControl":  3.03,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-09-02",
        "end":  "2024-09-17",
        "status":  "New",
        "task":  "Configure Data Access Control Lists"
    },
    {
        "subControl":  3.02,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-09-16",
        "end":  "2024-09-27",
        "status":  "New",
        "task":  "Establish and Maintain a Data Inventory"
    },
    {
        "subControl":  3.01,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-09-16",
        "end":  "2024-09-27",
        "status":  "New",
        "task":  "Establish and Maintain a Data Management Process"
    },
    {
        "subControl":  11.01,
        "risk":  "Low",
        "assignee":  "",
        "start":  "2024-11-18",
        "end":  "2024-11-29",
        "status":  "New",
        "task":  "Establish and Maintain a Data Recovery Process "
    },
    {
        "subControl":  11.04,
        "risk":  "Low",
        "assignee":  "",
        "start":  "2024-11-18",
        "end":  "2024-11-29",
        "status":  "New",
        "task":  "Establish and Maintain an Isolated Instance of Recovery Data "
    },
    {
        "subControl":  11.02,
        "risk":  "Low",
        "assignee":  "",
        "start":  "2024-12-02",
        "end":  "2024-12-16",
        "status":  "New",
        "task":  "Perform Automated Backups "
    },
    {
        "subControl":  11.03,
        "risk":  "Low",
        "assignee":  "",
        "start":  "2024-12-02",
        "end":  "2024-12-16",
        "status":  "New",
        "task":  "Protect Recovery Data"
    },
    {
        "subControl":  3.13,
        "risk":  "Critical",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Deploy a Data Loss Prevention Solution"
    },
    {
        "subControl":  3.08,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Document Data Flows"
    },
    {
        "subControl":  3.09,
        "risk":  "High",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Encrypt Data on Removable Media"
    },
    {
        "subControl":  3.11,
        "risk":  "High",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Encrypt Sensitive Data at Rest"
    },
    {
        "subControl":  3.1,
        "risk":  "High",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Encrypt Sensitive Data in Transit"
    },
    {
        "subControl":  3.07,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Establish and Maintain a Data Classification Scheme"
    },
    {
        "subControl":  3.12,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Segment Data Processing and Storage Based on Sensitivity"
    },
    {
        "subControl":  11.05,
        "risk":  "High",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Test Data Recovery"
    },
    {
        "subControl":  4.03,
        "risk":  "High",
        "assignee":  "",
        "start":  "2024-07-01",
        "end":  "2024-07-15",
        "status":  "In Progress",
        "task":  "Configure Automatic Session Locking on Enterprise Assets"
    },
    {
        "subControl":  4.05,
        "risk":  "High",
        "assignee":  "",
        "start":  "2024-07-01",
        "end":  "2024-07-15",
        "status":  "In Progress",
        "task":  "Implement and Manage a Firewall on End-User Devices"
    },
    {
        "subControl":  10.03,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-08-01",
        "end":  "2024-08-30",
        "status":  "In Progress",
        "task":  "Disable Autorun and Autoplay for Removable Media"
    },
    {
        "subControl":  3.06,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-08-01",
        "end":  "2024-08-30",
        "status":  "Completed",
        "task":  "Encrypt Data on End-User Devices"
    },
    {
        "subControl":  4.01,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-09-02",
        "end":  "2024-09-16",
        "status":  "New",
        "task":  "Establish and Maintain a Secure Configuration Process"
    },
    {
        "subControl":  4.02,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-09-02",
        "end":  "2024-09-16",
        "status":  "New",
        "task":  "Establish and Maintain a Secure Configuration Process for Network Infrastructure"
    },
    {
        "subControl":  4.04,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "2024-10-01",
        "end":  "2024-10-18",
        "status":  "New",
        "task":  "Implement and Manage a Firewall on Servers"
    },
    {
        "subControl":  10.02,
        "risk":  "Low",
        "assignee":  "",
        "start":  "2024-11-01",
        "end":  "2024-11-15",
        "status":  "New",
        "task":  "Configure Automatic Anti-Malware Signature Updates"
    },
    {
        "subControl":  10.01,
        "risk":  "Low",
        "assignee":  "",
        "start":  "2024-11-01",
        "end":  "2024-11-01",
        "status":  "New",
        "task":  "Deploy and Maintain Anti-Malware Software"
    },
    {
        "subControl":  10.06,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Centrally Manage Anti-Malware Software"
    },
    {
        "subControl":  10.04,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Configure Automatic Anti-Malware Scanning of Removable Media"
    },
    {
        "subControl":  13.02,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Deploy a Host-Based Intrusion Detection Solution"
    },
    {
        "subControl":  13.07,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Deploy a Host-Based Intrusion Prevention Solution"
    },
    {
        "subControl":  13.03,
        "risk":  "High",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Deploy a Network Intrusion Detection Solution"
    },
    {
        "subControl":  13.08,
        "risk":  "High",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Deploy a Network Intrusion Prevention Solution"
    },
    {
        "subControl":  9.07,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Deploy and Maintain Email Server Anti-Malware Protections"
    },
    {
        "subControl":  13.09,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Deploy Port-Level Access Control"
    },
    {
        "subControl":  10.05,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Enable Anti-Exploitation Features"
    },
    {
        "subControl":  4.1,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Enforce Automatic Device Lockout on Portable End-User Devices"
    },
    {
        "subControl":  4.11,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Enforce Remote Wipe Capability on Portable End-User Devices"
    },
    {
        "subControl":  12.07,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Ensure Remote Devices Utilize a VPN and are Connecting to an Enterprise’s AAA Infrastructure"
    },
    {
        "subControl":  13.1,
        "risk":  "High",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Perform Application Layer Filtering"
    },
    {
        "subControl":  13.04,
        "risk":  "High",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Perform Traffic Filtering Between Network Segments"
    },
    {
        "subControl":  12.03,
        "risk":  "Medium",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Securely Manage Network Infrastructure"
    },
    {
        "subControl":  4.12,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Separate Enterprise Workspaces on Mobile End-User Devices"
    },
    {
        "subControl":  8.04,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Standardize Time Synchronization"
    },
    {
        "subControl":  10.07,
        "risk":  "Low",
        "assignee":  "",
        "start":  "",
        "end":  "",
        "status":  "New",
        "task":  "Use Behavior-Based Anti-Malware Software"
    }
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
        {selectedFramework && roadmapData[selectedFramework] && (
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
