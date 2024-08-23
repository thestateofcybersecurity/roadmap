import axios from 'axios';
import { Framework, VCISOTask } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const fetchFrameworks = async (): Promise<Framework[]> => {
  const response = await axios.get(`${API_BASE_URL}/frameworks`);
  return response.data;
};

export const fetchVCISOTasks = async (): Promise<VCISOTask[]> => {
  const response = await axios.get(`${API_BASE_URL}/vciso-tasks`);
  return response.data;
};
