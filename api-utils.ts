import axios from 'axios';
import { Framework } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

export const fetchFrameworks = async (): Promise<Framework[]> => {
  const response = await axios.get(`${API_BASE_URL}/frameworks`);
  return response.data;
};
