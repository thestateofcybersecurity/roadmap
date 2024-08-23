import { Framework } from '../types';

export const frameworks: Framework[] = [
  {
    id: 'nist-csf',
    name: 'NIST Cybersecurity Framework',
    tasks: [
      {
        id: 'id-1',
        name: 'Identify - Asset Management',
        start: new Date('2024-01-01'),
        end: new Date('2024-03-31'),
        status: 'New'
      },
      {
        id: 'id-2',
        name: 'Protect - Access Control',
        start: new Date('2024-02-01'),
        end: new Date('2024-05-31'),
        status: 'New'
      },
      // Add more tasks...
    ]
  },
  {
    id: 'cis-controls',
    name: 'CIS Controls',
    tasks: [
      {
        id: 'cis-1',
        name: 'Inventory and Control of Enterprise Assets',
        start: new Date('2024-01-15'),
        end: new Date('2024-04-15'),
        status: 'New'
      },
      {
        id: 'cis-2',
        name: 'Inventory and Control of Software Assets',
        start: new Date('2024-02-15'),
        end: new Date('2024-05-15'),
        status: 'New'
      },
      // Add more tasks...
    ]
  }
];
