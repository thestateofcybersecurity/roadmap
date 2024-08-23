import axios from 'axios';
import { Framework, VCISOTask } from '../types';

export const fetchFrameworks = async (): Promise<Framework[]> => {
  const response = await axios.get('/api/frameworks');
  return response.data;
};

export const fetchVCISOTasks = async (): Promise<VCISOTask[]> => {
  const response = await axios.get('/api/vciso-tasks');
  return response.data;
};
