import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoadmapState, CISControl, VCISOTask } from '../types';

const initialState: RoadmapState = {
  frameworks: ['CIS', 'vCISO'], // Add vCISO to the list of frameworks
  selectedFramework: null,
  frameworkData: [],
  vcisoTasks: [], // Add this line
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
    setFrameworkData: (state, action: PayloadAction<CISControl[]>) => {
      state.frameworkData = action.payload;
    },
    setVCISOTasks: (state, action: PayloadAction<VCISOTask[]>) => {
      state.vcisoTasks = action.payload;
    },
    setFilters: (state, action: PayloadAction<{ riskLevels: string[], implementationGroups: string[] }>) => {
      state.filters = action.payload;
    },
  },
});

export const { setFrameworks, selectFramework, setFrameworkData, setVCISOTasks, setFilters } = roadmapSlice.actions;
export default roadmapSlice.reducer;
