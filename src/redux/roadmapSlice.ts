import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoadmapState, Framework, Task, VCISOTask } from '../types';

const initialState: RoadmapState = {
  frameworks: [],
  selectedFramework: null,
  vcisoTasks: [],
};

const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    setFrameworks: (state, action: PayloadAction<Framework[]>) => {
      state.frameworks = action.payload;
    },
    selectFramework: (state, action: PayloadAction<string>) => {
      state.selectedFramework = action.payload;
    },
    updateTask: (state, action: PayloadAction<{ frameworkId: string; task: Task }>) => {
      const { frameworkId, task } = action.payload;
      const framework = state.frameworks.find(f => f.id === frameworkId);
      if (framework) {
        const taskIndex = framework.tasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
          framework.tasks[taskIndex] = task;
        }
      }
    },
    setVCISOTasks: (state, action: PayloadAction<VCISOTask[]>) => {
      state.vcisoTasks = action.payload;
    },
    updateVCISOTask: (state, action: PayloadAction<VCISOTask>) => {
      const taskIndex = state.vcisoTasks.findIndex(t => t.Task === action.payload.Task);
      if (taskIndex !== -1) {
        state.vcisoTasks[taskIndex] = action.payload;
      }
    },
  },
});

export const { setFrameworks, selectFramework, updateTask, setVCISOTasks, updateVCISOTask } = roadmapSlice.actions;
export default roadmapSlice.reducer;
