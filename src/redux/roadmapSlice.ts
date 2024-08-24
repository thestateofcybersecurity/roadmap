import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoadmapState, Framework, Task } from '../types';

const initialState: RoadmapState = {
  frameworks: ['CIS'], // Add more frameworks as needed
  selectedFramework: null,
  frameworkData: [],
  filters: {
    riskLevels: [],
    implementationGroups: []
  }
};

const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    setFrameworks: (state, action: PayloadAction<string[]>) => {
      state.frameworks = action.payload;
    },
    selectFramework: (state, action: PayloadAction<string>) => {
      state.selectedFramework = action.payload;
    },
    setFrameworkData: (state, action: PayloadAction<any[]>) => {
      state.frameworkData = action.payload;
    },
    setFilters: (state, action: PayloadAction<{ riskLevels: string[], implementationGroups: string[] }>) => {
      state.filters = action.payload;
    },
  },
});

export const { setFrameworks, selectFramework, setFrameworkData, setFilters } = roadmapSlice.actions;
export default roadmapSlice.reducer;
